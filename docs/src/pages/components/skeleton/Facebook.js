import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/core/Skeleton';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));

function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
            />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          ) : (
            'Ted'
          )
        }
        subheader={
          loading ? (
            <Skeleton animation="wave" height={10} width="40%" />
          ) : (
            '5 hours ago'
          )
        }
      />
      {loading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          className={classes.media}
        />
      ) : (
        <CardMedia
          className={classes.media}
          image="https://pi.tedcdn.com/r/talkstar-photos.s3.amazonaws.com/uploads/72bda89f-9bbf-4685-910a-2f151c4f3a8a/NicolaSturgeon_2019T-embed.jpg?w=512"
          title="Ted talk"
        />
      )}

      <CardContent>
        {loading ? (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        ) : (
          <Typography variant="body2" color="textSecondary" component="p">
            {
              "Why First Minister of Scotland Nicola Sturgeon thinks GDP is the wrong measure of a country's success:"
            }
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function Facebook() {
  return (
    <div>
      <Media loading />
      <Media />
    </div>
  );
}
