import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      ...theme.typography.body2,
      '& [role="separator"]': {
        margin: theme.spacing(0, 2),
      },
    },
  }),
);

export default function VerticalDividerText() {
  const classes = useStyles();
  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs>
        {content}
      </Grid>
      <Divider orientation="vertical" flexItem>
        VERTICAL
      </Divider>
      <Grid item xs>
        {content}
      </Grid>
    </Grid>
  );
}
