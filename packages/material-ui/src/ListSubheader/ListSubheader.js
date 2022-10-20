import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';
import capitalize from '../utils/capitalize';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    boxSizing: 'border-box',
    lineHeight: '48px',
    listStyle: 'none',
    color: theme.palette.text.secondary,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.pxToRem(14),
  },
  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main,
  },
  /* Styles applied to the root element if `color="inherit"`. */
  colorInherit: {
    color: 'inherit',
  },
  /* Styles applied to the inner `component` element unless `disableGutters={true}`. */
  gutters: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    paddingLeft: 72,
  },
  /* Styles applied to the root element unless `disableSticky={true}`. */
  sticky: {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: 'inherit',
  },
});

const ListSubheader = React.forwardRef(function ListSubheader(props, ref) {
  const {
    classes,
    className,
    color = 'default',
    component: Component = 'li',
    disableGutters = false,
    disableSticky = false,
    inset = false,
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes[`color${capitalize(color)}`]]: color !== 'default',
          [classes.inset]: inset,
          [classes.sticky]: !disableSticky,
          [classes.gutters]: !disableGutters,
        },
        className,
      )}
      ref={ref}
      {...other}
    />
  );
});

ListSubheader.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   * @default 'default'
   */
  color: PropTypes.oneOf(['default', 'inherit', 'primary']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * If `true`, the List Subheader will not have gutters.
   * @default false
   */
  disableGutters: PropTypes.bool,
  /**
   * If `true`, the List Subheader will not stick to the top during scroll.
   * @default false
   */
  disableSticky: PropTypes.bool,
  /**
   * If `true`, the List Subheader is indented.
   * @default false
   */
  inset: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiListSubheader' })(ListSubheader);
