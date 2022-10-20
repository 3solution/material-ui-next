import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createClientRender } from 'test/utils';
import TabIndicator from './TabIndicator';

describe('<TabIndicator />', () => {
  const render = createClientRender();
  let classes;
  const defaultProps = {
    direction: 'left',
    orientation: 'horizontal',
    color: 'secondary',
  };
  const style = { left: 1, width: 2 };

  before(() => {
    classes = getClasses(<TabIndicator {...defaultProps} />);
  });

  it('should render with the root class', () => {
    const { container } = render(<TabIndicator {...defaultProps} />);
    expect(container.firstChild).to.have.tagName('span');
    expect(container.firstChild).to.have.class(classes.root);
  });

  describe('prop: style', () => {
    it('should be applied on the root element', () => {
      const { container } = render(<TabIndicator {...defaultProps} style={style} />);
      const tab = container.firstChild;

      expect(tab.style).to.have.property('left', '1px');
      expect(tab.style).to.have.property('width', '2px');
    });
  });

  describe('prop: className', () => {
    it('should append the className on the root element', () => {
      const { container } = render(<TabIndicator {...defaultProps} className="foo" />);
      expect(container.firstChild).to.have.tagName('span');
      expect(container.firstChild).to.have.class('foo');
    });
  });
});
