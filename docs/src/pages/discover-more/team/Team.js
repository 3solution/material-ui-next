import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';

const activeCore = [
  {
    name: 'Olivier Tassinari',
    github: 'oliviertassinari',
    twitter: 'olivtassinari',
    flag: 'v1.x co-creator',
    location: 'Paris, France',
  },
  {
    name: 'Matt Brookes',
    github: 'mbrookes',
    twitter: 'randomtechdude',
    flag: 'Pioneer',
    location: 'London, UK',
  },
  {
    name: 'Sebastian Silbermann',
    github: 'eps1lon',
    twitter: 'sebsilbermann',
    flag: 'Community team',
    location: 'Dresden, Germany',
  },
  {
    name: 'Damien Tassone',
    github: 'dtassone',
    twitter: 'madKakoO',
    flag: 'Enterprise team',
    location: 'London, UK',
  },
  {
    name: 'Marija Najdova',
    github: 'mnajdova',
    twitter: 'marijanajdova',
    flag: 'Community team',
    location: 'Skopje, North Macedonia',
  },
  {
    name: 'Danail Hadjiatanasov',
    github: 'DanailH',
    twitter: 'danail_h',
    flag: 'Enterprise team',
    location: 'Amsterdam, Netherlands',
  },
  {
    name: 'Josh Wooding',
    github: 'joshwooding',
    twitter: 'JoshWooding_',
    flag: 'Community member, J.P. Morgan',
    location: 'London, UK',
  },
];

const community = [
  {
    name: 'Dmitriy Kovalenko',
    github: 'dmtrKovalenko',
    twitter: 'dmtrKovalenko',
    flag: 'Date pickers',
    location: 'Kharkiv, Ukraine',
  },
  {
    name: 'Danica Shen',
    github: 'DDDDDanica',
    flag: '🇨🇳 Chinese docs',
    location: 'Ireland',
  },
  {
    name: 'Yan Lee',
    github: 'AGDholo',
    flag: '🇨🇳 Chinese docs',
    location: 'China',
  },
  {
    name: 'Jairon Alves Lima',
    github: 'jaironalves',
    flag: '🇧🇷 Brazilian docs',
    location: 'São Paulo, Brazil',
  },
  {
    name: 'Oleg Slobodskoi',
    github: 'kof',
    twitter: 'oleg008',
    flag: 'JSS',
    location: 'Berlin, Germany',
  },
];

const emeriti = [
  {
    name: 'Hai Nguyen',
    github: 'hai-cea',
    twitter: 'haicea',
    flag: 'v0.x creator',
    location: 'Dallas, Texas, US',
  },
  {
    name: 'Nathan Marks',
    github: 'nathanmarks',
    flag: 'v1.x co-creator',
    location: 'Toronto, ON',
  },
  {
    name: 'Kevin Ross',
    github: 'rosskevin',
    twitter: 'rosskevin',
    flag: 'Core focus',
    location: 'Franklin, Tennessee, US',
  },
  {
    name: 'Sebastian Sebald',
    github: 'sebald',
    twitter: 'sebastiansebald',
    flag: 'Core focus',
    location: 'Freiburg, Germany',
  },
  {
    name: 'Ken Gregory',
    github: 'kgregory',
    flag: 'Core focus',
    location: 'New Jersey, US',
  },
  {
    name: 'Tom Crockett',
    github: 'pelotom',
    twitter: 'pelotom',
    flag: 'Core focus',
    location: 'Los Angeles, California, US',
  },
  {
    name: 'Maik Marschner',
    github: 'leMaik',
    twitter: 'leMaikOfficial',
    flag: 'Core focus',
    location: 'Hannover, Germany',
  },
];

const styles = (theme) => ({
  details: {
    margin: theme.spacing(1, 1, 1, 0),
  },
  cover: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(2),
    borderRadius: '50%',
    flexShrink: 0,
    backgroundColor: theme.palette.background.default,
  },
  icon: {
    fontSize: 18,
    padding: theme.spacing(1),
  },
  container: {
    margin: theme.spacing(2, 0, 4),
  },
});

function Group(props) {
  const { title, description, classes, members } = props;
  return (
    <div>
      <Typography gutterBottom component="h2" variant="h5">
        {title}
      </Typography>
      <Typography>{description}</Typography>
      <Grid container spacing={2} className={classes.container}>
        {members.map((member) => (
          <Grid key={member.name} item xs={12} md={6}>
            <Paper variant="outlined">
              <Grid container wrap="nowrap">
                <Grid item>
                  <CardMedia
                    className={classes.cover}
                    image={`https://github.com/${member.github}.png`}
                    title="Avatar"
                  />
                </Grid>
                <Grid item>
                  <div className={classes.details}>
                    <Typography component="h3" variant="h6">
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.flag}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {member.location}
                    </Typography>
                    <Grid container>
                      {member.github && (
                        <IconButton
                          aria-label="github"
                          component="a"
                          href={`https://github.com/${member.github}`}
                          className={classes.icon}
                        >
                          <GitHubIcon fontSize="inherit" />
                        </IconButton>
                      )}
                      {member.twitter && (
                        <IconButton
                          aria-label="twitter"
                          component="a"
                          href={`https://twitter.com/${member.twitter}`}
                          className={classes.icon}
                        >
                          <TwitterIcon fontSize="inherit" />
                        </IconButton>
                      )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

Group.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  members: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

function Team(props) {
  return (
    <div>
      <Group
        title="Core team"
        description={`The development of the project and its ecosystem is
guided by an international team,
some of whom have chosen to be featured below.`}
        members={activeCore}
        {...props}
      />
      <Group
        title="Community contributors"
        description={`Some members of the community have so enriched it,
      that they deserve special mention.`}
        members={community}
        {...props}
      />
      <Group
        title="Community emeriti"
        description={`We honor some no-longer-active core team members who have made
valuable contributions in the past.
They advise us from time-to-time.`}
        members={emeriti}
        {...props}
      />
    </div>
  );
}

export default withStyles(styles)(Team);
