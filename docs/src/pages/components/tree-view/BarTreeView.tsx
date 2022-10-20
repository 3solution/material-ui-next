import React from 'react';
import { makeStyles, alpha, createStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  ContentProps,
} from '@material-ui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 400,
    position: 'relative',
  },
});

const useContentStyles = makeStyles((theme) =>
  createStyles({
    root: {
      WebkitTapHighlightColor: 'transparent',
      '&:hover, &$disabled, &$focused, &$selected, &$selected$focused, &$selected:hover': {
        backgroundColor: 'transparent',
      },
    },
    label: {
      width: '100%',
      paddingLeft: 4,
      position: 'relative',
    },
    bar: {
      position: 'absolute',
      width: '100%',
      height: 24,
      left: 0,
      '$root:hover &': {
        backgroundColor: theme.palette.action.hover,
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '$root$disabled &': {
        opacity: theme.palette.action.disabledOpacity,
        backgroundColor: 'transparent',
      },
      '$root$focused &': {
        backgroundColor: theme.palette.action.focus,
      },
      '$root$selected &': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
      '$root$selected:hover &': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
      '$root$selected$focused &': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity +
            theme.palette.action.focusOpacity,
        ),
      },
    },
    expanded: {},
    selected: {},
    focused: {},
    disabled: {},
  }),
);

const CustomContent = React.forwardRef(function CustomContent(
  props: ContentProps,
  ref,
) {
  const {
    classes,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const contentClasses = useContentStyles();

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    preventSelection(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
    handleSelection(event);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={clsx(classes.root, contentClasses.root, {
        [contentClasses.expanded]: expanded,
        [contentClasses.selected]: selected,
        [contentClasses.focused]: focused,
        [contentClasses.disabled]: disabled,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div className={contentClasses.bar} />
      <div className={classes.iconContainer}>{icon}</div>
      <Typography component="div" className={classes.label}>
        {label}
      </Typography>
    </div>
  );
});

const CustomTreeItem = (props: TreeItemProps) => (
  <TreeItem ContentComponent={CustomContent} {...props} />
);

export default function BarTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      aria-label="icon expansion"
      className={classes.root}
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <CustomTreeItem nodeId="1" label="Applications">
        <CustomTreeItem nodeId="2" label="Calendar" />
        <CustomTreeItem nodeId="3" label="Chrome" />
        <CustomTreeItem nodeId="4" label="Webstorm" />
      </CustomTreeItem>
      <CustomTreeItem nodeId="5" label="Documents">
        <CustomTreeItem nodeId="10" label="OSS" />
        <CustomTreeItem nodeId="6" label="Material-UI">
          <CustomTreeItem nodeId="7" label="src">
            <CustomTreeItem nodeId="8" label="index.js" />
            <CustomTreeItem nodeId="9" label="tree-view.js" />
          </CustomTreeItem>
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
  );
}
