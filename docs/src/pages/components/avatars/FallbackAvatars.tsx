import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  }),
);

export default function FallbackAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar
        alt="Remy Sharp"
        src="/broken-image.jpg"
        className={classes.orange}
      >
        B
      </Avatar>
      <Avatar
        alt="Remy Sharp"
        src="/broken-image.jpg"
        className={classes.orange}
      />
      <Avatar src="/broken-image.jpg" />
    </div>
  );
}
