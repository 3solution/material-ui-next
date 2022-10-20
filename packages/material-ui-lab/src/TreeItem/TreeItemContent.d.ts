import { InternalStandardProps as StandardProps } from '@material-ui/core';
import * as React from 'react';

export interface ContentProps extends StandardProps<React.HTMLAttributes<HTMLElement>> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: {
    /** Styles applied to the root element. */
    root: string;
    /** Pseudo-class applied to the content element when expanded. */
    expanded: string;
    /** Pseudo-class applied to the content element when selected. */
    selected: string;
    /** Pseudo-class applied to the content element when focused. */
    focused: string;
    /** Pseudo-class applied to the element when disabled. */
    disabled: string;
    /** Styles applied to the tree node icon and collapse/expand icon. */
    iconContainer: string;
    /** Styles applied to the label element. */
    label: string;
  };
  /**
   * The tree node label.
   */
  label?: React.ReactNode;
  /**
   * The id of the node.
   */
  nodeId: string;
  /**
   * The icon to display next to the tree node's label.
   */
  icon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon?: React.ReactNode;
}

export type ContentClassKey = keyof NonNullable<ContentProps['classes']>;
