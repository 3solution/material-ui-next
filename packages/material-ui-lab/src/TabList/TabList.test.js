// @ts-check
import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, getClasses, createMount, describeConformance } from 'test/utils';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TabList from './TabList';
import TabContext from '../TabContext';

describe('<TabList />', () => {
  const mount = createMount();
  /**
   * @type {Record<string, string>}
   */
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<Tabs />);
  });

  /**
   *
   * @param {React.ReactNode} node
   */
  function mountInContext(node) {
    const wrapper = mount(<TabContext value="0">{node}</TabContext>);
    return wrapper.childAt(0);
  }

  describeConformance(<TabList />, () => ({
    classes,
    inheritComponent: Tabs,
    mount: mountInContext,
    refInstanceof: window.HTMLDivElement,
    // TODO: no idea why reactTestRenderer fails
    skip: [/** @type {'reactTestRenderer'} */ ('reactTestRenderer')],
  }));

  // outside of TabContext pass every test in Tabs

  it('provides the active value to Tab so that they can be indicated as selected', () => {
    const { getAllByRole } = render(
      <TabContext value="0">
        <TabList>
          <Tab value="0" />
          <Tab value="1" />
        </TabList>
      </TabContext>,
    );
    const [tabOne, tabTwo] = getAllByRole('tab');

    expect(tabOne).to.have.attribute('aria-selected', 'true');
    expect(tabTwo).to.have.attribute('aria-selected', 'false');
  });
});
