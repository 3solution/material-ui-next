import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, createClientRender, describeConformance } from 'test/utils';
import Icon from '@material-ui/core/Icon';
import SpeedDialIcon from './SpeedDialIcon';

describe('<SpeedDialIcon />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;
  const icon = <Icon>font_icon</Icon>;

  before(() => {
    classes = getClasses(<SpeedDialIcon />);
  });

  describeConformance(<SpeedDialIcon />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  it('should render the Add icon by default', () => {
    const { getAllByTestId } = render(<SpeedDialIcon />);
    expect(getAllByTestId('AddIcon').length).to.equal(1);
  });

  it('should render an Icon', () => {
    const { container } = render(<SpeedDialIcon icon={icon} />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.icon);
  });

  it('should render an openIcon', () => {
    const { container } = render(<SpeedDialIcon openIcon={icon} />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIcon);
  });

  it('should render the icon with the icon class', () => {
    const { container } = render(<SpeedDialIcon />);
    expect(container.querySelector('svg')).to.have.class(classes.icon);
    expect(container.querySelector('svg')).to.not.have.class(classes.iconOpen);
    expect(container.querySelector('svg')).to.not.have.class(classes.iconWithOpenIconOpen);
  });

  it('should render the icon with the icon and iconOpen classes', () => {
    const { container } = render(<SpeedDialIcon open />);
    expect(container.querySelector('svg')).to.have.class(classes.icon);
    expect(container.querySelector('svg')).to.have.class(classes.iconOpen);
    expect(container.querySelector('svg')).to.not.have.class(classes.iconWithOpenIconOpen);
  });

  it('should render the icon with the icon, iconOpen iconWithOpenIconOpen classes', () => {
    const { container } = render(<SpeedDialIcon open openIcon={icon} />);
    expect(container.querySelector('svg')).to.have.class(classes.icon);
    expect(container.querySelector('svg')).to.have.class(classes.iconOpen);
    expect(container.querySelector('svg')).to.have.class(classes.iconWithOpenIconOpen);
  });

  it('should render the openIcon with the openIcon class', () => {
    const { container } = render(<SpeedDialIcon openIcon={icon} />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIcon);
    expect(container.firstChild.querySelector('span')).to.not.have.class(classes.openIconOpen);
  });

  it('should render the openIcon with the openIcon, openIconOpen classes', () => {
    const { container } = render(<SpeedDialIcon openIcon={icon} open />);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIcon);
    expect(container.firstChild.querySelector('span')).to.have.class(classes.openIconOpen);
  });
});
