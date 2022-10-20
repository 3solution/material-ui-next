import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Link from 'docs/src/modules/components/Link';

const styles = {
  root: {
    width: '100%',
  },
};

function LatestVersions(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography variant="body2">master branch</Typography>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                color="secondary"
                rel="nofollow"
                href="https://material-ui.netlify.app/"
              >
                Documentation
              </Link>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                color="secondary"
                href="https://github.com/mui-org/material-ui/tree/master"
              >
                Source code
              </Link>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography variant="body2">next branch</Typography>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                color="secondary"
                rel="nofollow"
                href="https://next--material-ui.netlify.app/"
              >
                Documentation
              </Link>
            </TableCell>
            <TableCell>
              <Link
                variant="body2"
                color="secondary"
                href="https://github.com/mui-org/material-ui/tree/next"
              >
                Source code
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}

LatestVersions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LatestVersions);
