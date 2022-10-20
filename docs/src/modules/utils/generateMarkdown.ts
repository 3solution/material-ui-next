import * as doctrine from 'doctrine';
import * as recast from 'recast';
import {
  parse as docgenParse,
  PropDescriptor,
  PropTypeDescriptor,
  ReactDocgenApi,
} from 'react-docgen';
import { SOURCE_CODE_ROOT_URL, LANGUAGES_IN_PROGRESS } from 'docs/src/modules/constants';
import { pageToTitle } from './helpers';

interface DescribeablePropDescriptor {
  annotation: doctrine.Annotation;
  defaultValue: string | null;
  required: boolean;
  type: PropTypeDescriptor;
}

export interface ReactApi extends ReactDocgenApi {
  EOL: string;
  filename: string;
  forwardsRefTo: string | undefined;
  inheritance: { component: string; pathname: string } | null;
  name: string;
  pagesMarkdown: Array<{ components: string[]; filename: string; pathname: string }>;
  spread: boolean;
  src: string;
  styles: {
    classes: string[];
    globalClasses: Record<string, string>;
    name: string | null;
    descriptions: Record<string, string>;
  };
}

const PATH_REPLACE_REGEX = /\\/g;
const PATH_SEPARATOR = '/';
const DEMO_IGNORE = LANGUAGES_IN_PROGRESS.map((language) => `-${language}.md`);

function normalizePath(path: string): string {
  return path.replace(PATH_REPLACE_REGEX, PATH_SEPARATOR);
}

function generateHeader(reactAPI: ReactApi) {
  return ['---', `filename: ${normalizePath(reactAPI.filename)}`, '---'].join('\n');
}

function getDeprecatedInfo(type: PropTypeDescriptor) {
  const marker = /deprecatedPropType\((\r*\n)*\s*PropTypes\./g;
  const match = type.raw.match(marker);
  const startIndex = type.raw.search(marker);
  if (match) {
    const offset = match[0].length;

    return {
      propTypes: type.raw.substring(startIndex + offset, type.raw.indexOf(',')),
      explanation: recast.parse(type.raw).program.body[0].expression.arguments[1].value,
    };
  }

  return false;
}

function getChained(type: PropTypeDescriptor) {
  if (type.raw) {
    const marker = 'chainPropTypes';
    const indexStart = type.raw.indexOf(marker);

    if (indexStart !== -1) {
      const parsed = docgenParse(
        `
        import PropTypes from 'prop-types';
        const Foo = () => <div />
        Foo.propTypes = {
          bar: ${recast.print(recast.parse(type.raw).program.body[0].expression.arguments[0]).code}
        }
        export default Foo
      `,
        null,
        null,
        // helps react-docgen pickup babel.config.js
        { filename: './' },
      );
      return {
        type: parsed.props.bar.type,
        required: parsed.props.bar.required,
      };
    }
  }

  return false;
}

function escapeCell(value: string): string {
  // As the pipe is use for the table structure
  return value.replace(/</g, '&lt;').replace(/`&lt;/g, '`<').replace(/\|/g, '\\|');
}

function isElementTypeAcceptingRefProp(type: PropTypeDescriptor): boolean {
  return type.raw === 'elementTypeAcceptingRef';
}

function isRefType(type: PropTypeDescriptor): boolean {
  return type.raw === 'refType';
}

function isElementAcceptingRefProp(type: PropTypeDescriptor): boolean {
  return /^elementAcceptingRef/.test(type.raw);
}

function resolveType(type: NonNullable<doctrine.Tag['type']>): string {
  if (type.type === 'AllLiteral') {
    return 'any';
  }

  if (type.type === 'VoidLiteral') {
    return 'void';
  }

  if (type.type === 'TypeApplication') {
    const arrayTypeName = resolveType(type.applications[0]);
    return `${arrayTypeName}[]`;
  }

  if (type.type === 'UnionType') {
    return type.elements.map((t) => resolveType(t)).join(' \\| ');
  }

  if ('name' in type) {
    return type.name;
  }
  throw new TypeError(`resolveType for '${type.type}' not implemented`);
}

function generatePropDescription(prop: DescribeablePropDescriptor, propName: string): string {
  const { annotation } = prop;
  const type = prop.type;
  let deprecated = '';

  if (type.name === 'custom') {
    const deprecatedInfo = getDeprecatedInfo(type);
    if (deprecatedInfo) {
      deprecated = `*Deprecated*. ${deprecatedInfo.explanation}<br><br>`;
    }
  }

  // Two new lines result in a newline in the table.
  // All other new lines must be eliminated to prevent markdown mayhem.
  const jsDocText = escapeCell(annotation.description)
    .replace(/(\r?\n){2}/g, '<br>')
    .replace(/\r?\n/g, ' ');

  let signature = '';

  // Split up the parsed tags into 'arguments' and 'returns' parsed objects. If there's no
  // 'returns' parsed object (i.e., one with title being 'returns'), make one of type 'void'.
  const parsedArgs: doctrine.Tag[] = annotation.tags.filter((tag) => tag.title === 'param');
  let parsedReturns:
    | { description?: string | null; type?: doctrine.Type | null }
    | undefined = annotation.tags.find((tag) => tag.title === 'returns');
  if (type.name === 'func' && (parsedArgs.length > 0 || parsedReturns !== undefined)) {
    parsedReturns = parsedReturns ?? { type: { type: 'VoidLiteral' } };

    // Remove new lines from tag descriptions to avoid markdown errors.
    annotation.tags.forEach((tag) => {
      if (tag.description) {
        tag.description = tag.description.replace(/\r*\n/g, ' ');
      }
    });

    signature += '<br><br>**Signature:**<br>`function(';
    signature += parsedArgs
      .map((tag, index) => {
        if (tag.type != null && tag.type.type === 'OptionalType') {
          return `${tag.name}?: ${(tag.type.expression as any).name}`;
        }

        if (tag.type === undefined) {
          throw new TypeError(
            `In function signature for prop '${propName}' Argument #${index} has no type.`,
          );
        }
        return `${tag.name}: ${resolveType(tag.type!)}`;
      })
      .join(', ');

    const returnType = parsedReturns.type;
    if (returnType == null) {
      throw new TypeError(
        `Function signature for prop '${propName}' has no return type. Try \`@returns void\`. Otherwise it might be a bug with doctrine.`,
      );
    }

    const returnTypeName = resolveType(returnType);

    signature += `) => ${returnTypeName}\`<br>`;
    signature += parsedArgs
      .filter((tag) => tag.description)
      .map((tag) => `*${tag.name}:* ${tag.description}`)
      .join('<br>');
    if (parsedReturns.description) {
      signature += `<br> *returns* (${returnTypeName}): ${parsedReturns.description}`;
    }
  }

  let notes = '';
  if (isElementAcceptingRefProp(type) || isElementTypeAcceptingRefProp(type)) {
    notes += '<br>⚠️ [Needs to be able to hold a ref](/guides/composition/#caveat-with-refs).';
  }

  return `${deprecated}${jsDocText}${signature}${notes}`;
}

function generatePropType(type: PropTypeDescriptor): string | undefined {
  switch (type.name) {
    case 'custom': {
      if (isElementTypeAcceptingRefProp(type)) {
        return `element type`;
      }
      if (isElementAcceptingRefProp(type)) {
        return `element`;
      }
      if (isRefType(type)) {
        return `ref`;
      }
      if (type.raw === 'HTMLElementType') {
        return `HTML element`;
      }

      const deprecatedInfo = getDeprecatedInfo(type);
      if (deprecatedInfo !== false) {
        return generatePropType({
          // eslint-disable-next-line react/forbid-foreign-prop-types
          name: deprecatedInfo.propTypes,
        } as any);
      }

      const chained = getChained(type);
      if (chained !== false) {
        return generatePropType(chained.type);
      }

      return type.raw;
    }

    case 'shape':
      return `{ ${Object.keys(type.value)
        .map((subValue) => {
          const subType = type.value[subValue];
          return `${subValue}${subType.required ? '' : '?'}: ${generatePropType(subType)}`;
        })
        .join(', ')} }`;

    case 'union':
      return (
        type.value
          .map((type2) => {
            return generatePropType(type2);
          })
          // Display one value per line as it's better for visibility.
          .join('<br>&#124;&nbsp;')
      );
    case 'enum':
      return (
        type.value
          .map((type2) => {
            return escapeCell(type2.value);
          })
          // Display one value per line as it's better for visibility.
          .join('<br>&#124;&nbsp;')
      );

    case 'arrayOf': {
      return `Array&lt;${generatePropType(type.value)}&gt;`;
    }

    case 'instanceOf': {
      if (type.value.startsWith('typeof')) {
        return /typeof (.*) ===/.exec(type.value)![1];
      }
      return type.value;
    }

    default:
      return type.name;
  }
}

function generateName(reactAPI: ReactApi) {
  if (reactAPI.styles.classes.length && !reactAPI.styles.name) {
    throw new Error(`Missing styles name on ${reactAPI.name} component`);
  }

  if (!reactAPI.styles.name) {
    return '\n';
  }

  return `## Component name

The \`${reactAPI.styles.name}\` name can be used for providing [default props](/customization/globals/#default-props) or [style overrides](/customization/globals/#css) at the theme level.
`;
}

/**
 * Returns `null` if the prop should be ignored.
 * Throws if it is invalid.
 * @param prop
 * @param propName
 */
function createDescribeableProp(
  prop: PropDescriptor,
  propName: string,
): DescribeablePropDescriptor | null {
  const { defaultValue, jsdocDefaultValue, description, required, type } = prop;

  const renderedDefaultValue = defaultValue?.value.replace(/\r?\n/g, '');
  const renderDefaultValue = Boolean(
    renderedDefaultValue &&
      // Ignore "large" default values that would break the table layout.
      renderedDefaultValue.length <= 150,
  );

  if (description === undefined) {
    throw new Error(`The "${propName}" prop is missing a description.`);
  }

  const annotation = doctrine.parse(description, {
    sloppy: true,
  });

  if (
    annotation.description.trim() === '' ||
    annotation.tags.some((tag) => tag.title === 'ignore')
  ) {
    return null;
  }

  if (jsdocDefaultValue !== undefined && defaultValue === undefined) {
    throw new Error(
      `Declared a @default annotation in JSDOC for prop '${propName}' but could not find a default value in the implementation.`,
    );
  } else if (jsdocDefaultValue === undefined && defaultValue !== undefined && renderDefaultValue) {
    const shouldHaveDefaultAnnotation =
      // Discriminator for polymorphism which is not documented at the component level.
      // The documentation of `component` does not know in which component it is used.
      propName !== 'component';

    if (shouldHaveDefaultAnnotation) {
      throw new Error(`JSDOC @default annotation not found for '${propName}'.`);
    }
  } else if (jsdocDefaultValue !== undefined) {
    // `defaultValue` can't be undefined or we would've thrown earlier.
    if (jsdocDefaultValue.value !== defaultValue!.value) {
      throw new Error(
        `Expected JSDOC @default annotation for prop '${propName}' of "${jsdocDefaultValue.value}" to equal runtime default value of "${defaultValue?.value}"`,
      );
    }
  }

  return {
    annotation,
    defaultValue: renderDefaultValue ? renderedDefaultValue! : null,
    required: Boolean(required),
    type,
  };
}

function generateProps(reactAPI: ReactApi) {
  const header = '## Props';

  let text = `${header}

| Name | Type | Default | Description |
|:-----|:-----|:--------|:------------|\n`;

  Object.keys(reactAPI.props).forEach((propName) => {
    const propDescriptor = reactAPI.props[propName];
    if (propName === 'classes') {
      propDescriptor.description += ' See [CSS API](#css) below for more details.';
    }

    const prop = createDescribeableProp(propDescriptor, propName);
    if (prop === null) {
      return;
    }

    const description = generatePropDescription(prop, propName);

    let defaultValueColumn = '';
    // give up on "large" default values e.g. big functions or objects
    if (prop.defaultValue) {
      defaultValueColumn = `<span class="prop-default">${escapeCell(prop.defaultValue!)}</span>`;
    }

    const chainedPropType = getChained(prop.type);

    let propNameColumn = propName;
    if (
      prop.required ||
      /\.isRequired/.test(prop.type.raw) ||
      (chainedPropType !== false && chainedPropType.required)
    ) {
      propNameColumn = `<span class="prop-name required">${propName}<abbr title="required">*</abbr></span>`;
    } else {
      propNameColumn = `<span class="prop-name">${propName}</span>`;
    }

    if (prop.type.name === 'custom') {
      if (getDeprecatedInfo(prop.type)) {
        propNameColumn = `~~${propNameColumn}~~`;
      }
    }

    text += `| ${propNameColumn} | <span class="prop-type">${generatePropType(
      prop.type,
    )}</span> | ${defaultValueColumn} | ${description} |\n`;
  });

  let refHint = 'The `ref` is forwarded to the root element.';
  if (reactAPI.forwardsRefTo == null) {
    refHint = 'The component cannot hold a ref.';
  } else if (reactAPI.forwardsRefTo === 'React.Component') {
    refHint = 'The `ref` is attached to a component class.';
  } else if (reactAPI.forwardsRefTo === 'Object') {
    refHint = `The \`ref\` is attached to an Imperative Handle. Have a look at the [implementation of the component](${SOURCE_CODE_ROOT_URL}${normalizePath(
      reactAPI.filename,
    )}) for more detail.`;
  }
  text = `${text}\n${refHint}\n`;

  if (reactAPI.spread) {
    text = `${text}
Any other props supplied will be provided to the root element (${
      reactAPI.inheritance
        ? `[${reactAPI.inheritance.component}](${reactAPI.inheritance.pathname})`
        : 'native element'
    }).`;
  }

  return text;
}

function generateClasses(reactAPI: ReactApi) {
  if (!reactAPI.styles.classes.length) {
    return '';
  }

  if (!reactAPI.styles.name) {
    throw new Error(`Missing styles name on ${reactAPI.name} component`);
  }

  let text = '';

  text = `| Rule name | Global class | Description |
|:-----|:-------------|:------------|\n`;
  text += reactAPI.styles.classes
    .map((styleRule) => {
      if (styleRule === '@global') {
        return '| <span class="prop-name">@global</span> | | Apply global styles.';
      }

      const description = reactAPI.styles.descriptions[styleRule];

      if (typeof description === 'undefined' && ['Grid', 'Paper'].indexOf(reactAPI.name) === -1) {
        throw new Error(`The "${styleRule}" style rule is missing a description`);
      }

      return `| <span class="prop-name">${styleRule}</span> | <span class="prop-name">.${
        reactAPI.styles.globalClasses[styleRule]
      }</span> | ${description ? escapeCell(description) : ''}`;
    })
    .join('\n');

  return `## CSS

${text}

You can override the style of the component thanks to one of these customization points:

- With a rule name of the [\`classes\` object prop](/customization/components/#overriding-styles-with-classes).
- With a [global class name](/customization/components/#overriding-styles-with-global-class-names).
- With a theme and an [\`overrides\` property](/customization/globals/#css).

If that's not sufficient, you can check the [implementation of the component](${SOURCE_CODE_ROOT_URL}${normalizePath(
    reactAPI.filename,
  )}) for more detail.

`;
}

function generateInheritance(reactAPI: ReactApi): string {
  const { inheritance } = reactAPI;

  if (!inheritance) {
    return '';
  }

  let suffix = '';

  switch (inheritance.component) {
    case 'Transition':
      suffix = ', from react-transition-group,';
      break;

    default:
      break;
  }

  return `## Inheritance

The props of the [${inheritance.component}](${inheritance.pathname}) component${suffix} are also available.
You can take advantage of this behavior to [target nested components](/guides/api/#spread).

`;
}

function generateDemos(reactAPI: ReactApi): string {
  const pagesMarkdown = reactAPI.pagesMarkdown.filter((page) => {
    return (
      !DEMO_IGNORE.includes(page.filename.slice(-6)) && page.components.includes(reactAPI.name)
    );
  });

  if (pagesMarkdown.length === 0) {
    return '';
  }

  return `## Demos

${pagesMarkdown.map((page) => `- [${pageToTitle(page)}](${page.pathname}/)`).join('\n')}

`;
}

function generateImportStatement(reactAPI: ReactApi): string {
  const source = normalizePath(reactAPI.filename)
    // determine the published package name
    .replace(
      /\/packages\/material-ui(-(.+?))?\/src/,
      (match, dash, pkg) => `@material-ui/${pkg || 'core'}`,
    )
    // convert things like `/Table/Table.js` to ``
    .replace(/\/([^/]+)\/\1\.js$/, '');
  return `## Import

\`\`\`js
import ${reactAPI.name} from '${source}/${reactAPI.name}';
// or
import { ${reactAPI.name} } from '${source}';
\`\`\`

You can learn more about the difference by [reading this guide](/guides/minimizing-bundle-size/).`;
}

export default function generateMarkdown(reactAPI: ReactApi) {
  return [
    generateHeader(reactAPI),
    '',
    '<!--- This documentation is automatically generated, do not try to edit it. -->',
    '',
    `# ${reactAPI.name} API`,
    '',
    `<p class="description">The API documentation of the ${reactAPI.name} React component. ` +
      'Learn more about the props and the CSS customization points.</p>',
    '',
    generateImportStatement(reactAPI),
    '',
    reactAPI.description,
    '',
    generateName(reactAPI),
    generateProps(reactAPI),
    '',
    `${generateClasses(reactAPI)}${generateInheritance(reactAPI)}${generateDemos(reactAPI)}`,
  ].join('\n');
}
