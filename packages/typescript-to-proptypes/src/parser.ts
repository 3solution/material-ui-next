import * as doctrine from 'doctrine';
import * as ts from 'typescript';
import * as t from './types';

/**
 * Options that specify how the parser should act
 */
export interface ParserOptions {
  /**
   * Called before a PropType is added to a component/object
   * @returns true to include the PropType, false to skip it, or undefined to
   * use the default behavior
   * @default name !== 'ref'
   */
  shouldInclude: (data: { name: string; depth: number }) => boolean | undefined;
  /**
   * Called before the shape of an object is resolved
   * @returns true to resolve the shape of the object, false to just use a object, or undefined to
   * use the default behavior
   * @default propertyCount <= 50 && depth <= 3
   */
  shouldResolveObject: (data: {
    name: string;
    propertyCount: number;
    depth: number;
  }) => boolean | undefined;
  /**
   * Control if const declarations should be checked
   * @default false
   * @example declare const Component: React.ComponentType<Props>;
   */
  checkDeclarations?: boolean;
}

/**
 * A wrapper for `ts.createProgram`
 * @param files The files to later be parsed with `parseFromProgram`
 * @param options The options to pass to the compiler
 */
export function createTSProgram(files: string[], options: ts.CompilerOptions) {
  return ts.createProgram(files, options);
}

/**
 * Parses the specified file and returns the PropTypes as an AST
 * @param filePath The file to get the PropTypes from
 * @param program The program object returned by `createProgram`
 * @param parserOptions Options that specify how the parser should act
 */
export function parseFromProgram(
  filePath: string,
  program: ts.Program,
  parserOptions: Partial<ParserOptions> = {},
) {
  const { checkDeclarations = false } = parserOptions;

  const sigilIds: Map<ts.Symbol | ts.Type, number> = new Map();
  /**
   *
   * @param sigil - Prefer ts.Type if available since these are re-used in the type checker. Symbols (especially those for literals) are oftentimes re-created on every usage.
   */
  function createPropTypeId(sigil: ts.Symbol | ts.Type) {
    if (!sigilIds.has(sigil)) {
      sigilIds.set(sigil, sigilIds.size);
    }

    return sigilIds.get(sigil)!;
  }

  const shouldInclude: ParserOptions['shouldInclude'] = (data) => {
    if (parserOptions.shouldInclude) {
      const result = parserOptions.shouldInclude(data);
      if (result !== undefined) {
        return result;
      }
    }

    return data.name !== 'ref';
  };

  const shouldResolveObject: ParserOptions['shouldResolveObject'] = (data) => {
    if (parserOptions.shouldResolveObject) {
      const result = parserOptions.shouldResolveObject(data);
      if (result !== undefined) {
        return result;
      }
    }

    return data.propertyCount <= 50 && data.depth <= 3;
  };

  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  const programNode = t.createProgram();
  const reactImports: string[] = [];

  function visitImports(node: ts.Node) {
    if (
      ts.isImportDeclaration(node) &&
      ts.isStringLiteral(node.moduleSpecifier) &&
      node.moduleSpecifier.text === 'react' &&
      node.importClause
    ) {
      const imports = ['Component', 'PureComponent', 'memo', 'forwardRef'];

      // import x from 'react'
      if (node.importClause.name) {
        const nameText = node.importClause.name.text;
        reactImports.push(...imports.map((x) => `${nameText}.${x}`));
      }

      // import {x, y as z} from 'react'
      const bindings = node.importClause.namedBindings;
      if (bindings) {
        if (ts.isNamedImports(bindings)) {
          bindings.elements.forEach((spec) => {
            const nameIdentifier = spec.propertyName || spec.name;
            const nameText = nameIdentifier.getText();
            if (imports.includes(nameText)) {
              reactImports.push(spec.name.getText());
            }
          });
        }
        // import * as x from 'react'
        else {
          const nameText = bindings.name.text;
          reactImports.push(...imports.map((x) => `${nameText}.${x}`));
        }
      }
    }
  }

  function isTypeJSXElementLike(type: ts.Type): boolean {
    if (type.isUnion()) {
      return type.types.every(
        (subType) => subType.flags & ts.TypeFlags.Null || isTypeJSXElementLike(subType),
      );
    }
    if (type.symbol) {
      const name = checker.getFullyQualifiedName(type.symbol);
      return name === 'global.JSX.Element' || name === 'React.ReactElement';
    }

    return false;
  }

  function getDocumentation(symbol?: ts.Symbol): string | undefined {
    if (!symbol) {
      return undefined;
    }

    const decl = symbol.getDeclarations();
    if (decl) {
      // @ts-ignore
      const comments = ts.getJSDocCommentsAndTags(decl[0]) as any[];
      if (comments && comments.length === 1) {
        const commentNode = comments[0];
        if (ts.isJSDoc(commentNode)) {
          return doctrine.unwrapComment(commentNode.getText()).trim();
        }
      }
    }

    const comment = ts.displayPartsToString(symbol.getDocumentationComment(checker));
    return comment !== '' ? comment : undefined;
  }

  function checkType(type: ts.Type, typeStack: number[], name: string): t.PropType {
    // If the typeStack contains type.id we're dealing with an object that references itself.
    // To prevent getting stuck in an infinite loop we just set it to an createObjectType
    if (typeStack.includes((type as any).id)) {
      return t.createObjectType();
    }

    {
      const typeNode = type as any;

      const symbol = typeNode.aliasSymbol ? typeNode.aliasSymbol : typeNode.symbol;
      const typeName = symbol ? checker.getFullyQualifiedName(symbol) : null;
      switch (typeName) {
        case 'global.JSX.Element':
        case 'React.ReactElement': {
          return t.createElementType('element');
        }
        case 'React.ElementType': {
          return t.createElementType('elementType');
        }
        case 'React.ReactNode': {
          return t.createUnionType([t.createElementType('node'), t.createUndefinedType()]);
        }
        case 'React.Component': {
          return t.createInstanceOfType(typeName);
        }
        case 'Element':
        case 'HTMLElement': {
          return t.createDOMElementType();
        }
        default:
          // continue with function execution
          break;
      }
    }

    // @ts-ignore
    if (checker.isArrayType(type)) {
      // @ts-ignore
      const arrayType: ts.Type = checker.getElementTypeOfArrayType(type);
      return t.createArrayType(checkType(arrayType, typeStack, name));
    }

    if (type.isUnion()) {
      const node = t.createUnionType(type.types.map((x) => checkType(x, typeStack, name)));

      return node.types.length === 1 ? node.types[0] : node;
    }

    if (type.flags & ts.TypeFlags.String) {
      return t.createStringType();
    }

    if (type.flags & ts.TypeFlags.Number) {
      return t.createNumericType();
    }

    if (type.flags & ts.TypeFlags.Undefined) {
      return t.createUndefinedType();
    }

    if (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) {
      return t.createAnyType();
    }

    if (type.flags & ts.TypeFlags.Literal) {
      if (type.isLiteral()) {
        return t.createLiteralType(
          type.isStringLiteral() ? `"${type.value}"` : type.value,
          getDocumentation(type.symbol),
        );
      }
      return t.createLiteralType(checker.typeToString(type));
    }

    if (type.flags & ts.TypeFlags.Null) {
      return t.createLiteralType('null');
    }

    if (type.getCallSignatures().length) {
      return t.createFunctionType();
    }

    // Object-like type
    {
      const properties = type.getProperties();
      if (properties.length) {
        if (
          shouldResolveObject({ name, propertyCount: properties.length, depth: typeStack.length })
        ) {
          const filtered = properties.filter((symbol) =>
            shouldInclude({ name: symbol.getName(), depth: typeStack.length + 1 }),
          );
          if (filtered.length > 0) {
            return t.createInterfaceType(
              filtered.map((x) => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define -- TODO dependency cycle between checkSymbol and checkType
                const definition = checkSymbol(x, [...typeStack, (type as any).id]);

                return [definition.name, definition.propType];
              }),
            );
          }
        }

        return t.createObjectType();
      }
    }

    // Object without properties or object keyword
    if (
      type.flags & ts.TypeFlags.Object ||
      (type.flags & ts.TypeFlags.NonPrimitive && checker.typeToString(type) === 'object')
    ) {
      return t.createObjectType();
    }

    console.warn(
      `Unable to handle node of type "ts.TypeFlags.${ts.TypeFlags[type.flags]}", using any`,
    );
    return t.createAnyType();
  }

  function getSymbolFileNames(symbol: ts.Symbol): Set<string> {
    const declarations = symbol.getDeclarations() || [];

    return new Set(declarations.map((declaration) => declaration.getSourceFile().fileName));
  }

  function checkSymbol(symbol: ts.Symbol, typeStack: number[]): t.PropTypeDefinition {
    const declarations = symbol.getDeclarations();
    const declaration = declarations && declarations[0];

    const symbolFilenames = getSymbolFileNames(symbol);

    // TypeChecker keeps the name for
    // { a: React.ElementType, b: React.ReactElement | boolean }
    // but not
    // { a?: React.ElementType, b: React.ReactElement }
    // get around this by not using the TypeChecker
    if (
      declaration &&
      ts.isPropertySignature(declaration) &&
      declaration.type &&
      ts.isTypeReferenceNode(declaration.type)
    ) {
      const name = declaration.type.typeName.getText();
      if (
        name === 'React.ElementType' ||
        name === 'React.ComponentType' ||
        name === 'React.ReactElement'
      ) {
        const elementNode = t.createElementType(
          name === 'React.ReactElement' ? 'element' : 'elementType',
        );

        return t.createPropTypeDefinition(
          symbol.getName(),
          getDocumentation(symbol),
          declaration.questionToken
            ? t.createUnionType([t.createUndefinedType(), elementNode])
            : elementNode,
          symbolFilenames,
          createPropTypeId(symbol),
        );
      }
    }

    const symbolType = declaration
      ? // The proptypes aren't detailed enough that we need all the different combinations
        // so we just pick the first and ignore the rest
        checker.getTypeOfSymbolAtLocation(symbol, declaration)
      : // The properties of Record<..., ...> don't have a declaration, but the symbol has a type property
        ((symbol as any).type as ts.Type);
    // get `React.ElementType` from `C extends React.ElementType`
    const declaredType =
      declaration !== undefined ? checker.getTypeAtLocation(declaration) : undefined;
    const baseConstraintOfType =
      declaredType !== undefined ? checker.getBaseConstraintOfType(declaredType) : undefined;
    const type =
      baseConstraintOfType !== undefined && baseConstraintOfType !== declaredType
        ? baseConstraintOfType
        : symbolType;

    if (!type) {
      throw new Error('No types found');
    }

    // Typechecker only gives the type "any" if it's present in a union
    // This means the type of "a" in {a?:any} isn't "any | undefined"
    // So instead we check for the questionmark to detect optional types
    let parsedType: t.PropType | undefined;
    if (
      (type.flags & ts.TypeFlags.Any || type.flags & ts.TypeFlags.Unknown) &&
      declaration &&
      ts.isPropertySignature(declaration)
    ) {
      parsedType = declaration.questionToken
        ? t.createUnionType([t.createUndefinedType(), t.createAnyType()])
        : t.createAnyType();
    } else {
      parsedType = checkType(type, typeStack, symbol.getName());
    }

    return t.createPropTypeDefinition(
      symbol.getName(),
      getDocumentation(symbol),
      parsedType,
      symbolFilenames,
      createPropTypeId(type),
    );
  }

  function parsePropsType(name: string, type: ts.Type, propsSourceFile: ts.SourceFile | undefined) {
    const properties = type
      .getProperties()
      .filter((symbol) => shouldInclude({ name: symbol.getName(), depth: 1 }));
    if (properties.length === 0) {
      return;
    }

    const propsFilename = propsSourceFile !== undefined ? propsSourceFile.fileName : undefined;

    programNode.body.push(
      t.createComponent(
        name,
        properties.map((x) => checkSymbol(x, [(type as any).id])),
        propsFilename,
      ),
    );
  }

  function parseFunctionComponent(node: ts.VariableDeclaration | ts.FunctionDeclaration) {
    if (!node.name) {
      return;
    }

    const symbol = checker.getSymbolAtLocation(node.name);
    if (!symbol) {
      return;
    }
    const componentName = node.name.getText();

    // Discriminate render functions to components
    if (componentName[0].toUpperCase() !== componentName[0]) {
      return;
    }

    const type = checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration);
    type.getCallSignatures().forEach((signature) => {
      if (!isTypeJSXElementLike(signature.getReturnType())) {
        return;
      }

      const propsType = checker.getTypeOfSymbolAtLocation(
        signature.parameters[0],
        signature.parameters[0].valueDeclaration,
      );

      parsePropsType(componentName, propsType, node.getSourceFile());
    });

    // squash props
    // { variant: 'a', href: string } & { variant: 'b' }
    // to
    // { variant: 'a' | 'b', href?: string }
    const props: Record<string, t.PropTypeDefinition> = {};
    const usedPropsPerSignature: Set<String>[] = [];
    programNode.body = programNode.body.filter((componentNode) => {
      if (componentNode.name === componentName) {
        const usedProps: Set<string> = new Set();
        // squash props
        componentNode.types.forEach((typeNode) => {
          usedProps.add(typeNode.name);

          let { [typeNode.name]: currentTypeNode } = props;
          if (currentTypeNode === undefined) {
            currentTypeNode = typeNode;
          } else if (currentTypeNode.$$id !== typeNode.$$id) {
            currentTypeNode = t.createPropTypeDefinition(
              currentTypeNode.name,
              currentTypeNode.jsDoc,
              t.createUnionType([currentTypeNode.propType, typeNode.propType]),
              new Set(Array.from(currentTypeNode.filenames).concat(Array.from(typeNode.filenames))),
              undefined,
            );
          }

          props[typeNode.name] = currentTypeNode;
        });

        usedPropsPerSignature.push(usedProps);

        // delete each signature, we'll add it later unionized
        return false;
      }
      return true;
    });

    programNode.body.push(
      t.createComponent(
        componentName,
        Object.entries(props).map(([name, propType]) => {
          const onlyUsedInSomeSignatures = usedPropsPerSignature.some(
            (usedProps) => !usedProps.has(name),
          );
          if (onlyUsedInSomeSignatures) {
            // mark as optional
            return {
              ...propType,
              propType: t.createUnionType([propType.propType, t.createUndefinedType()]),
            };
          }
          return propType;
        }),
        node.getSourceFile().fileName,
      ),
    );
  }

  function visit(node: ts.Node) {
    // function x(props: type) { return <div/> }
    if (ts.isFunctionDeclaration(node) && node.name && node.parameters.length === 1) {
      parseFunctionComponent(node);
    }
    // const x = ...
    else if (ts.isVariableStatement(node)) {
      ts.forEachChild(node.declarationList, (variableNode) => {
        // x = (props: type) => { return <div/> }
        // x = function(props: type) { return <div/> }
        // x = function y(props: type) { return <div/> }
        // x = react.memo((props:type) { return <div/> })

        if (ts.isVariableDeclaration(variableNode) && variableNode.name) {
          const type = checker.getTypeAtLocation(variableNode.name);
          if (!variableNode.initializer) {
            if (
              checkDeclarations &&
              type.aliasSymbol &&
              type.aliasTypeArguments &&
              checker.getFullyQualifiedName(type.aliasSymbol) === 'React.ComponentType'
            ) {
              parsePropsType(
                variableNode.name.getText(),
                type.aliasTypeArguments[0],
                node.getSourceFile(),
              );
            } else if (checkDeclarations) {
              parseFunctionComponent(variableNode);
            }
          } else if (
            (ts.isArrowFunction(variableNode.initializer) ||
              ts.isFunctionExpression(variableNode.initializer)) &&
            variableNode.initializer.parameters.length === 1
          ) {
            parseFunctionComponent(variableNode);
          }
          // x = react.memo((props:type) { return <div/> })
          else if (
            ts.isCallExpression(variableNode.initializer) &&
            variableNode.initializer.arguments.length > 0
          ) {
            const callString = variableNode.initializer.expression.getText();
            const arg = variableNode.initializer.arguments[0];
            if (
              reactImports.includes(callString) &&
              (ts.isArrowFunction(arg) || ts.isFunctionExpression(arg)) &&
              arg.parameters.length > 0
            ) {
              const symbol = checker.getSymbolAtLocation(arg.parameters[0].name);
              if (symbol) {
                parsePropsType(
                  variableNode.name.getText(),
                  checker.getTypeOfSymbolAtLocation(symbol, symbol.valueDeclaration),
                  node.getSourceFile(),
                );
              }
            }
          }
        }
      });
    } else if (
      ts.isClassDeclaration(node) &&
      node.name &&
      node.heritageClauses &&
      node.heritageClauses.length === 1
    ) {
      const heritage = node.heritageClauses[0];
      if (heritage.types.length !== 1) return;

      const arg = heritage.types[0];
      if (!arg.typeArguments) return;

      if (reactImports.includes(arg.expression.getText())) {
        parsePropsType(
          node.name.getText(),
          checker.getTypeAtLocation(arg.typeArguments[0]),
          node.getSourceFile(),
        );
      }
    }
  }

  if (sourceFile) {
    ts.forEachChild(sourceFile, visitImports);
    ts.forEachChild(sourceFile, visit);
  } else {
    throw new Error(`Program doesn't contain file "${filePath}"`);
  }

  return programNode;
}

/**
 * Creates a program, parses the specified file and returns the PropTypes as an AST, if you need to parse more than one file
 * use `createProgram` and `parseFromProgram` for better performance
 * @param filePath The file to parse
 * @param options The options from `loadConfig`
 * @param parserOptions Options that specify how the parser should act
 */
export function parseFile(
  filePath: string,
  options: ts.CompilerOptions,
  parserOptions: Partial<ParserOptions> = {},
) {
  const program = ts.createProgram([filePath], options);
  return parseFromProgram(filePath, program, parserOptions);
}
