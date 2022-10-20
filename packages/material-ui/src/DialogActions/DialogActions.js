import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: 8,
    justifyContent: 'flex-end',
    flex: '0 0 auto',
  },
  /* Styles applied to the root element unless `disableSpacing={true}`. */
  spacing: {
    '& > :not(:first-child)': {
      marginLeft: 8,
    },
  },
};

const DialogActions = React.forwardRef(function DialogActions(props, ref) {
  const { disableSpacing = false, classes, className, ...other } = props;

  return (
    <div
      className={clsx(classes.root, { [classes.spacing]: !disableSpacing }, className)}
      ref={ref}
      {...other}
    />
  );
});

DialogActions.propTypes = {
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
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiDialogActions' })(DialogActions);
