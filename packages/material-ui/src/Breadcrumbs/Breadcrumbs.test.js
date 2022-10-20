import * as React from 'react';
import { expect } from 'chai';
import {
  getClasses,
  createMount,
  describeConformance,
  act,
  createClientRender,
  screen,
} from 'test/utils';
import Breadcrumbs from './Breadcrumbs';

describe('<Breadcrumbs />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(
      <Breadcrumbs>
        <span>Hello World</span>
      </Breadcrumbs>,
    );
  });

  describeConformance(<Breadcrumbs>Conformance?</Breadcrumbs>, () => ({
    classes,
    inheritComponent: 'nav',
    mount,
    refInstanceof: window.HTMLElement,
    testComponentPropWith: 'div',
  }));

  it('should render inaccessible separators between each listitem', () => {
    const { getAllByRole, getByRole } = render(
      <Breadcrumbs>
        <span>first</span>
        <span>second</span>
      </Breadcrumbs>,
    );

    expect(getAllByRole('listitem', { hidden: false })).to.have.length(2);
    expect(getByRole('list')).to.have.text('first/second');
  });

  it('should render an ellipsis between `itemsAfterCollapse` and `itemsBeforeCollapse`', () => {
    const { getAllByRole, getByRole } = render(
      <Breadcrumbs>
        <span>first</span>
        <span>second</span>
        <span>third</span>
        <span>fourth</span>
        <span>fifth</span>
        <span>sixth</span>
        <span>seventh</span>
        <span>eighth</span>
        <span>ninth</span>
      </Breadcrumbs>,
    );

    const listitems = getAllByRole('listitem', { hidden: false });

    expect(listitems).to.have.length(3);
    expect(getByRole('list')).to.have.text('first//ninth');
    expect(getByRole('button').querySelector('[data-testid="MoreHorizIcon"]')).not.to.equal(null);
  });

  it('should expand when `BreadcrumbCollapsed` is clicked', () => {
    const { getAllByRole, getByRole, getByText } = render(
      <Breadcrumbs>
        <span tabIndex="-1">first</span>
        <span>second</span>
        <span>third</span>
        <span>fourth</span>
        <span>fifth</span>
        <span>sixth</span>
        <span>seventh</span>
        <span>eighth</span>
        <span>ninth</span>
      </Breadcrumbs>,
    );

    act(() => {
      getByRole('button').click();
    });

    expect(document.activeElement).to.equal(getByText('first'));
    expect(getAllByRole('listitem', { hidden: false })).to.have.length(9);
  });

  it('should warn about invalid input', () => {
    expect(() => {
      render(
        <Breadcrumbs maxItems={3} itemsAfterCollapse={2} itemsBeforeCollapse={2}>
          <span>first</span>
          <span>second</span>
          <span>third</span>
          <span>fourth</span>
        </Breadcrumbs>,
      );
    }).toErrorDev([
      'Material-UI: You have provided an invalid combination of props to the Breadcrumbs.\nitemsAfterCollapse={2} + itemsBeforeCollapse={2} >= maxItems={3}',
      'Material-UI: You have provided an invalid combination of props to the Breadcrumbs.\nitemsAfterCollapse={2} + itemsBeforeCollapse={2} >= maxItems={3}',
    ]);
    expect(screen.getAllByRole('listitem', { hidden: false })).to.have.length(4);
    expect(screen.getByRole('list')).to.have.text('first/second/third/fourth');
  });
});
