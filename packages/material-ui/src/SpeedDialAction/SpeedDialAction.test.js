import * as React from 'react';
import { expect } from 'chai';
import {
  getClasses,
  createMount,
  describeConformance,
  act,
  createClientRender,
  fireEvent,
} from 'test/utils';
import { useFakeTimers } from 'sinon';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import SpeedDialAction from './SpeedDialAction';

describe('<SpeedDialAction />', () => {
  let clock;
  beforeEach(() => {
    clock = useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  const mount = createMount({ strict: true });
  const render = createClientRender();
  let classes;
  let fabClasses;

  before(() => {
    classes = getClasses(<SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />);
    fabClasses = getClasses(<Fab>Fab</Fab>);
  });

  describeConformance(
    <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    () => ({
      classes,
      inheritComponent: Tooltip,
      mount,
      refInstanceof: window.HTMLButtonElement,
      skip: ['componentProp', 'reactTestRenderer'],
    }),
  );

  it('should be able to change the Tooltip classes', () => {
    const { getByText, container } = render(
      <SpeedDialAction
        icon={<Icon>add</Icon>}
        open
        tooltipTitle="placeholder"
        TooltipClasses={{ tooltip: 'bar' }}
      />,
    );

    fireEvent.mouseOver(container.querySelector('button'));
    act(() => {
      clock.tick(100);
    });

    expect(getByText('placeholder')).to.have.class('bar');
  });

  it('should render a Fab', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(fabClasses.root);
  });

  it('should render the button with the fab class', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" open />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
  });

  it('should render the button with the fab and fabClosed classes', () => {
    const { container } = render(
      <SpeedDialAction icon={<Icon>add</Icon>} tooltipTitle="placeholder" />,
    );
    expect(container.querySelector('button')).to.have.class(classes.fab);
    expect(container.querySelector('button')).to.have.class(classes.fabClosed);
  });
});
