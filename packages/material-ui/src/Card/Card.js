import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';

export const styles = {
  /* Styles applied to the root element. */
  root: {
    overflow: 'hidden',
  },
};

const Card = React.forwardRef(function Card(props, ref) {
  const { classes, className, raised = false, ...other } = props;

  return (
    <Paper
      className={clsx(classes.root, className)}
      elevation={raised ? 8 : 1}
      ref={ref}
      {...other}
    />
  );
});

Card.propTypes = {
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
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: PropTypes.bool,
};

export default withStyles(styles, { name: 'MuiCard' })(Card);
