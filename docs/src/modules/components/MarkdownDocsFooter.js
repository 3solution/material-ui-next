/* eslint-disable no-restricted-globals */
import * as React from 'react';
import PropTypes from 'prop-types';
import { exactProp } from '@material-ui/utils';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Snackbar from '@material-ui/core/Snackbar';
import { getCookie, pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import Link from 'docs/src/modules/components/Link';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing(12),
  },
  pagination: {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  pageLinkButton: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
  },
  feedbackMessage: {
    margin: theme.spacing(0, 2),
  },
  feedback: {
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      order: 3,
      width: '100%',
    },
  },
  hidden: {
    ariaHidden: 'true',
    opacity: 0,
  },
});

function flattenPages(pages, current = []) {
  return pages.reduce((items, item) => {
    if (item.children && item.children.length > 1) {
      items = flattenPages(item.children, items);
    } else {
      items.push(item.children && item.children.length === 1 ? item.children[0] : item);
    }
    return items;
  }, current);
}

// To replace with .findIndex() once we stop IE11 support.
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

async function postFeedback(data) {
  const env = window.location.host.indexOf('material-ui.com') !== -1 ? 'prod' : 'dev';
  try {
    const response = await fetch(`${process.env.FEEDBACK_URL}/${env}/feedback`, {
      method: 'POST',
      referrerPolicy: 'origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getUserFeedback(id) {
  const env = location.hostname === 'material-ui.com' ? 'prod' : 'dev';
  const URL = `${process.env.FEEDBACK_URL}/${env}/feedback/${id}`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      cache: 'no-store',
      referrerPolicy: 'origin',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function submitFeedback(page, rating, comment, language) {
  const data = {
    id: getCookie('feedbackId'),
    page,
    rating,
    comment,
    version: process.env.LIB_VERSION,
    language,
  };

  const result = await postFeedback(data);
  if (result) {
    document.cookie = `feedbackId=${result.id};path=/;max-age=31536000`;
    setTimeout(async () => {
      const userFeedback = await getUserFeedback(result.id);
      if (userFeedback) {
        document.cookie = `feedback=${JSON.stringify(userFeedback)};path=/;max-age=31536000`;
      }
    });
  }
  return result;
}

function getCurrentRating(pathname) {
  let userFeedback;
  if (process.browser) {
    userFeedback = getCookie('feedback');
    userFeedback = userFeedback && JSON.parse(userFeedback);
  }
  return userFeedback && userFeedback[pathname] && userFeedback[pathname].rating;
}

function MarkdownDocsFooter(props) {
  const { classes } = props;
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const { activePage, pages } = React.useContext(PageContext);
  const [rating, setRating] = React.useState();
  const [comment, setComment] = React.useState('');
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);
  const inputRef = React.useRef();
  const bottomRef = React.useRef();
  const pageList = flattenPages(pages);
  const currentPageNum = findIndex(pageList, (page) => page.pathname === activePage?.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];

  const setCurrentRatingFromCookie = React.useCallback(() => {
    setRating(getCurrentRating(currentPage.pathname));
  }, [currentPage.pathname]);

  React.useEffect(() => {
    setCurrentRatingFromCookie();
  }, [setCurrentRatingFromCookie]);

  async function processFeedback() {
    const result = await submitFeedback(currentPage.pathname, rating, comment, userLanguage);
    if (result) {
      setSnackbarMessage(t('feedbackSubmitted'));
    } else {
      setCurrentRatingFromCookie();
      setSnackbarMessage(t('feedbackFailed'));
    }
    setSnackbarOpen(true);
  }

  const handleClickThumb = (vote) => async () => {
    if (vote !== rating) {
      setRating(vote);
      // Focus a hidden element at the bottom of the page
      // so that the texfield is visible when it opens.
      bottomRef.current.focus();
      setCommentOpen(true);
    }
  };

  const handleChangeTextfield = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = () => {
    setCommentOpen(false);
    processFeedback();
  };

  const handleCancelComment = () => {
    setCommentOpen(false);
    setCurrentRatingFromCookie();
  };

  const handleEntered = () => {
    inputRef.current.focus();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
      <footer className={classes.root}>
        {!currentPage ||
        currentPage.displayNav === false ||
        (nextPage.displayNav === false && !prevPage) ? null : (
          <React.Fragment>
            <Divider />
            <div className={classes.pagination}>
              {prevPage ? (
                <Button
                  component={Link}
                  naked
                  href={prevPage.pathname}
                  size="large"
                  className={classes.pageLinkButton}
                  startIcon={<ChevronLeftIcon />}
                >
                  {pageToTitleI18n(prevPage, t)}
                </Button>
              ) : (
                <div />
              )}
              <Grid
                container
                role="group"
                justifyContent="center"
                alignItems="center"
                aria-label={t('feedbackGroupLabel')}
                className={classes.feedback}
              >
                <Typography align="center" variant="subtitle1" className={classes.feedbackMessage}>
                  {t('feedbackMessage')}
                </Typography>
                <div>
                  <Tooltip title={t('feedbackYes')}>
                    <IconButton onClick={handleClickThumb(1)} aria-pressed={rating === 1}>
                      <ThumbUpIcon color={rating === 1 ? 'primary' : undefined} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('feedbackNo')}>
                    <IconButton onClick={handleClickThumb(0)} aria-pressed={rating === 0}>
                      <ThumbDownIcon color={rating === 0 ? 'error' : undefined} />
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
              {nextPage.displayNav === false ? null : (
                <Button
                  component={Link}
                  naked
                  href={nextPage.pathname}
                  size="large"
                  className={classes.pageLinkButton}
                  endIcon={<ChevronRightIcon />}
                >
                  {pageToTitleI18n(nextPage, t)}
                </Button>
              )}
            </div>
          </React.Fragment>
        )}
        <Collapse in={commentOpen} onEntered={handleEntered}>
          <div>
            <Typography variant="h6" gutterBottom id="feedback-title">
              {t('feedbackTitle')}
            </Typography>
            <div>
              <Typography color="textSecondary" gutterBottom>
                {rating === 1 ? t('feedbackMessageUp') : t('feedbackMessageDown')}
              </Typography>
              <TextField
                multiline
                variant="outlined"
                margin="dense"
                id="comment"
                fullWidth
                rows={6}
                value={comment}
                onChange={handleChangeTextfield}
                inputProps={{ ref: inputRef }}
                aria-labelledby="feedback-title"
              />
            </div>
            <DialogActions>
              <Button onClick={handleCancelComment}>{t('cancel')}</Button>
              <Button onClick={handleSubmitComment}>{t('submit')}</Button>
            </DialogActions>
          </div>
        </Collapse>
      </footer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
      <input tabIndex="-1" ref={bottomRef} className={classes.hidden} />
    </React.Fragment>
  );
}

MarkdownDocsFooter.propTypes = {
  classes: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsFooter.propTypes = exactProp(MarkdownDocsFooter.propTypes);
}

export default withStyles(styles)(MarkdownDocsFooter);
