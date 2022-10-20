import * as React from 'react';
import { expect } from 'chai';
import { getClasses, createMount, describeConformance, createClientRender } from 'test/utils';
import FormControl from '../FormControl';
import IconButton from '../IconButton';
import Radio from './Radio';

describe('<Radio />', () => {
  const render = createClientRender();
  let classes;
  const mount = createMount();

  before(() => {
    classes = getClasses(<Radio />);
  });

  describeConformance(<Radio />, () => ({
    classes,
    inheritComponent: IconButton,
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));

  describe('styleSheet', () => {
    it('should have the classes required for SwitchBase', () => {
      expect(typeof classes.root).to.equal('string');
      expect(typeof classes.checked).to.equal('string');
      expect(typeof classes.disabled).to.equal('string');
    });
  });

  describe('prop: unchecked', () => {
    it('should render an unchecked icon', () => {
      const { getAllByTestId } = render(<Radio />);
      expect(getAllByTestId('RadioButtonUncheckedIcon').length).to.equal(1);
    });
  });

  describe('prop: checked', () => {
    it('should render a checked icon', () => {
      const { getAllByTestId } = render(<Radio checked />);
      expect(getAllByTestId('RadioButtonCheckedIcon').length).to.equal(1);
    });
  });

  describe('with FormControl', () => {
    describe('enabled', () => {
      it('should not have the disabled class', () => {
        const { getByRole } = render(
          <FormControl>
            <Radio />
          </FormControl>,
        );

        expect(getByRole('radio')).not.to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl>
            <Radio disabled />
          </FormControl>,
        );

        expect(getByRole('radio')).to.have.attribute('disabled');
      });
    });

    describe('disabled', () => {
      it('should have the disabled class', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Radio />
          </FormControl>,
        );

        expect(getByRole('radio')).to.have.attribute('disabled');
      });

      it('should be overridden by props', () => {
        const { getByRole } = render(
          <FormControl disabled>
            <Radio disabled={false} />
          </FormControl>,
        );

        expect(getByRole('radio')).not.to.have.attribute('disabled');
      });
    });
  });
});
