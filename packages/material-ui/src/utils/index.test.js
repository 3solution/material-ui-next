import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { isMuiElement, setRef, useForkRef } from '.';
import { Input, ListItemSecondaryAction, SvgIcon } from '..';

describe('utils/index.js', () => {
  describe('isMuiElement', () => {
    it('should match static muiName property', () => {
      const Component = () => null;
      Component.muiName = 'Component';

      expect(isMuiElement(<Component />, ['Component'])).to.equal(true);
      expect(isMuiElement(<div />, ['Input'])).to.equal(false);
      expect(isMuiElement(null, ['SvgIcon'])).to.equal(false);
      expect(isMuiElement('TextNode', ['SvgIcon'])).to.equal(false);
    });

    it('should be truthy for matching components', () => {
      [
        [Input, 'Input'],
        [ListItemSecondaryAction, 'ListItemSecondaryAction'],
        [SvgIcon, 'SvgIcon'],
      ].forEach(([Component, muiName]) => {
        expect(isMuiElement(<Component />, [muiName])).to.equal(true);
      });
    });
  });

  describe('setRef', () => {
    it('can handle callback refs', () => {
      const ref = spy();
      const instance = 'proxy';

      setRef(ref, instance);

      expect(ref.called).to.equal(true);
      expect(ref.firstCall.args[0]).to.equal(instance);
    });

    it('can handle ref objects', () => {
      const ref = React.createRef();
      const instance = 'proxy';

      setRef(ref, instance);

      expect(ref.current).to.equal(instance);
    });

    it('ignores falsy refs without errors', () => {
      const instance = 'proxy';

      // all no-ops
      setRef(undefined, instance);
      setRef(null, instance);
    });

    it('throws on legacy string refs', () => {
      expect(() => setRef('stringRef1', 'proxy')).to.throw();
    });
  });

  describe('useForkRef', () => {
    it('returns a single ref-setter function that forks the ref to its inputs', () => {
      function Component(props) {
        const { innerRef } = props;
        const ownRef = React.useRef(null);
        const [, forceUpdate] = React.useState(0);
        React.useEffect(() => forceUpdate((n) => !n), []);

        const handleRef = useForkRef(innerRef, ownRef);

        return <div ref={handleRef}>{ownRef.current ? 'has a ref' : 'has no ref'}</div>;
      }

      Component.propTypes = {
        innerRef: PropTypes.any,
      };

      const outerRef = React.createRef();

      expect(() => {
        mount(<Component innerRef={outerRef} />);
      }).not.toErrorDev();
      expect(outerRef.current.textContent).to.equal('has a ref');
    });

    it('forks if only one of the branches requires a ref', () => {
      const Component = React.forwardRef(function Component(props, ref) {
        const [hasRef, setHasRef] = React.useState(false);
        const handleOwnRef = React.useCallback(() => setHasRef(true), []);
        const handleRef = useForkRef(handleOwnRef, ref);

        return <div ref={handleRef}>{String(hasRef)}</div>;
      });

      let wrapper;
      expect(() => {
        wrapper = mount(<Component />);
      }).not.toErrorDev();
      expect(wrapper.containsMatchingElement(<div>true</div>)).to.equal(true);
    });

    it('does nothing if none of the forked branches requires a ref', () => {
      const Outer = React.forwardRef(function Outer(props, ref) {
        const { children } = props;
        const handleRef = useForkRef(children.ref, ref);

        return React.cloneElement(children, { ref: handleRef });
      });

      Outer.propTypes = { children: PropTypes.element.isRequired };

      function Inner() {
        return <div />;
      }

      expect(() => {
        mount(
          <Outer>
            <Inner />
          </Outer>,
        );
      }).not.toErrorDev();
    });

    describe('changing refs', () => {
      // use named props rather than ref attribute because enzyme ignores
      // ref attributes on the root component
      function Div(props) {
        const { leftRef, rightRef, ...other } = props;
        const handleRef = useForkRef(leftRef, rightRef);

        return <div {...other} ref={handleRef} />;
      }

      Div.propTypes = {
        leftRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        rightRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      };

      it('handles changing from no ref to some ref', () => {
        let wrapper;

        expect(() => {
          wrapper = mount(<Div id="test" />);
        }).not.toErrorDev();

        const ref = React.createRef();
        expect(() => {
          wrapper.setProps({ leftRef: ref });
        }).not.toErrorDev();
        expect(ref.current.id).to.equal('test');
      });

      it('cleans up detached refs', () => {
        const firstLeftRef = React.createRef();
        const firstRightRef = React.createRef();
        const secondRightRef = React.createRef();
        let wrapper;

        expect(() => {
          wrapper = mount(<Div leftRef={firstLeftRef} rightRef={firstRightRef} id="test" />);
        }).not.toErrorDev();
        expect(firstLeftRef.current.id).to.equal('test');
        expect(firstRightRef.current.id).to.equal('test');
        expect(secondRightRef.current).to.equal(null);

        wrapper.setProps({ rightRef: secondRightRef });

        expect(firstLeftRef.current.id).to.equal('test');
        expect(firstRightRef.current).to.equal(null);
        expect(secondRightRef.current.id).to.equal('test');
      });
    });
  });
});
