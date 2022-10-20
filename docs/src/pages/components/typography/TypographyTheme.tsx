import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    },
  }),
);

export default function TypographyTheme() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {"This div's text looks like that of a button."}
    </div>
  );
}