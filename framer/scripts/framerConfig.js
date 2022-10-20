// Generate types but not controls
export const ignoredControls = ['children', 'width', 'height'];

export const componentSettings = {
  all: {
    ignoredProps: [
      'children',
      'classes',
      'className',
      'component',
      'disableRipple',
      'id',
      'name',
      '.*Props',
      '.*Ref',
      'aria.*',
    ],
  },
  Avatar: {
    ignoredProps: [
      'alt',
      'imgProps',
      'sizes',
      'src',
      'srcSet',
      // FIXME: `Union`
      'variant',
    ],
    propValues: {
      // Note: MUI Avatar doesn't have the normal `color` prop.
      backgroundColor: "'#4154af'",
      textColor: "'#ffffff'",
      icon: "'face'",
      avatarImageFile: "''",
      avatarImageUrl: "'https://i.pravatar.cc/300'",
      label: "'MB'",
      width: 40,
      height: 40,
    },
    template: 'avatar.txt',
  },
  Badge: {
    ignoredProps: [
      'anchorOrigin',
      'children',
      'color',
      'disableFocusRipple',
      'invisible',
      'overlap',
      // FIXME: `Union`
      'variant',
    ],
    propValues: {
      icon: "''",
      theme: 'Filled',
      badgeContent: "'8'",
      badgeColor: "'primary'",
      width: 22,
      height: 22,
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    template: 'badge.txt',
  },
  BottomNavigation: {
    ignoredProps: ['children', 'onChange', 'ScrollButtonComponent', 'value'],
    propValues: {
      icons: "['restore', 'favorite', 'location_on', 'folder']",
      labels: "['Recents', 'Favorites', 'Nearby', 'Saved']",
      width: 500,
      height: 56,
    },
    template: 'bottom_navigation.txt',
  },
  Button: {
    ignoredProps: [
      'children',
      'disableFocusRipple',
      // union not supported by framer ControlType
      // interface, control types and default value need to be hardcoded
      'variant',
    ],
    propValues: {
      startIcon: "''",
      startIconTheme: 'Filled',
      endIcon: "''",
      endIconTheme: 'Filled',
      label: "'Button'",
      width: 100,
      height: 38,
    },
    template: 'button.txt',
  },
  Checkbox: {
    ignoredProps: [
      'checkedIcon',
      'icon',
      'indeterminate',
      'indeterminateIcon',
      'onChange',
      'required',
      'type',
      'value',
    ],
    propValues: {
      label: "'Checkbox'",
      width: 100,
      height: 42,
      checked: false,
      disabled: false,
    },
    template: 'selection_control.txt',
  },
  Chip: {
    ignoredProps: [
      'avatar',
      'children',
      'onDelete',
      // FIXME: `Union`
      'variant',
    ],
    propValues: {
      avatarImageFile: "''",
      avatarImageUrl: "''",
      clickable: true,
      deletable: false,
      deleteIcon: "''",
      icon: "'star'",
      iconTheme: 'Filled',
      label: "'Chip'",
      width: 100,
      height: 32,
    },
    template: 'chip.txt',
  },
  CircularProgress: {
    ignoredProps: ['disableShrink', 'size'],
    propValues: {
      width: 44,
      height: 44,
      size: 44,
      thickness: 4,
      progressValue: 75,
      variant: "'determinate'",
    },
    style: {
      width: 'width',
      height: 'height',
    },
    template: 'circular_progress.txt',
  },
  Fab: {
    ignoredProps: [
      'children',
      'disableFocusRipple',
      // FIXME: `Union`
      'variant',
    ],
    propValues: {
      icon: "'add'",
      iconTheme: 'Filled',
      label: "'extended'",
      width: 56,
      height: 56,
    },
    template: 'fab.txt',
  },
  Icon: {
    ignoredProps: ['children', 'fontSize'],
    propValues: {
      icon: "'add'",
      theme: 'Filled',
      width: 24,
      height: 24,
    },
    template: 'icon.txt',
  },
  IconButton: {
    ignoredProps: ['children', 'edge', 'disableRipple', 'disableFocusRipple'],
    propValues: {
      icon: "'favorite'",
      iconTheme: 'Filled',
      badgeContent: "''",
      badgeColor: "'default'",
      width: 48,
      height: 48,
    },
    template: 'icon_button.txt',
  },
  ListItem: {
    ignoredProps: ['children', 'ContainerComponent', 'ContainerProps'],
    propValues: {
      width: 568,
      height: 48,
      inset: false,
      label: "'Primary label'",
      secondaryLabel: "''",
      primaryAction: "'icon'",
      primaryIcon: "'star'",
      imageFile: "''",
      imageUrl: "''",
      secondaryAction: "'none'",
      secondaryIcon: "''",
    },
    template: 'list_item.txt',
  },
  LinearProgress: {
    ignoredProps: [],
    propValues: {
      width: 200,
      height: 5,
      progressValue: 75,
      valueBuffer: 75,
      variant: "'determinate'",
    },
    template: 'self_closing.txt',
  },
  Paper: {
    ignoredProps: [
      // FIXME: `Union`
      'variant',
    ],
    propValues: {
      width: 100,
      height: 100,
      elevation: 2,
    },
    template: 'paper.txt',
  },
  Radio: {
    ignoredProps: ['checked', 'checkedIcon', 'icon', 'onChange', 'required', 'type', 'value'],
    propValues: {
      label: "'Radio'",
      width: "'100%'",
      height: 42,
      disabled: false,
    },
    template: 'radio.txt',
  },
  RadioGroup: {
    ignoredProps: ['children', 'defaultValue', 'onChange', 'value'],
    propValues: {
      labels: "['Paris', 'New York', 'London']",
      label: "'Radio group'",
      width: 160,
      height: 180,
    },
    template: 'radio_group.txt',
  },
  Slider: {
    ignoredProps: [
      'defaultValue',
      'getAriaLabel',
      'getAriaValueText',
      'onChange',
      'onChangeCommitted',
      'scale',
      'ThumbComponent',
      'value',
      'ValueLabelComponent',
      'valueLabelFormat',
      'marks',
    ],
    propValues: {
      width: 160,
      height: 24,
    },
    template: 'slider.txt',
  },
  SnackbarContent: {
    ignoredProps: ['action', 'role'],
    propValues: {
      width: 568,
      height: 48,
      message: "'I love candy. I love cookies. I love cupcakes.'",
      label: "'Nom nom nom'",
    },
    template: 'snackbar_content.txt',
  },
  Switch: {
    ignoredProps: ['checkedIcon', 'edge', 'icon', 'onChange', 'required', 'type', 'value'],
    propValues: {
      label: "'Switch'",
      width: 100,
      height: 38,
      checked: 'false',
      disabled: false,
    },
    template: 'switch.txt',
  },
  Tabs: {
    ignoredProps: [
      'action',
      'children',
      'onChange',
      'orientation',
      'ScrollButtonComponent',
      'value',
    ],
    propValues: {
      appBarColor: "'primary'",
      icons: "['phone', 'favorite', 'person_pin']",
      labels: "['Tab 1', 'Tab 2', 'Tab 3']",
      width: 500,
      height: 64,
    },
    template: 'tabs.txt',
  },
  TextField: {
    // FIXME: defaultValue - fix `Union`
    ignoredProps: [
      'autoComplete',
      'defaultValue',
      'margin',
      'onChange',
      'rows',
      'minRows',
      'maxRows',
      'select',
      'type',
      'value',
    ],
    propValues: {
      helperText: "''",
      label: "'TextField'",
      width: 280,
      height: 56,
      fullWidth: true,
    },
    template: 'self_closing.txt',
  },
  Typography: {
    ignoredProps: [
      'children',
      'display',
      'gutterBottom',
      'internalDeprecatedVariant',
      'paragraph',
      // FIXME: `Union`
      'variant',
      'variantMapping',
    ],
    propValues: {
      label: "'Typography'",
      width: 100,
      height: 38,
    },
    template: 'label_as_children.txt',
  },
};
