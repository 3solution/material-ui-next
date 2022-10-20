import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiButton from '@material-ui/core/Button';
import { Icon } from './Icon';

interface Props {
  color: 'inherit' | 'primary' | 'secondary';
  disabled: boolean;
  disableElevation: boolean;
  endIcon: string;
  fullWidth: boolean;
  href?: string;
  size: 'large' | 'medium' | 'small';
  startIcon: string;
  startIconTheme: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  endIconTheme: 'Filled' | 'Outlined' | 'Rounded' | 'TwoTone' | 'Sharp';
  label: string;
  width: number | string;
  height: number;
  variant?: 'contained' | 'outlined' | 'text';
}

export function Button(props: Props): JSX.Element {
  const {
    endIcon,
    endIconTheme,
    height,
    label,
    startIcon,
    startIconTheme,
    variant,
    width,
    ...other
  } = props;

  const StartIcon = startIcon === '' ? undefined : <Icon icon={startIcon} theme={startIconTheme} />;
  const EndIcon = endIcon === '' ? undefined : <Icon icon={endIcon} theme={endIconTheme} />;

  return (
    <div>
      <MuiButton variant={variant} startIcon={StartIcon} endIcon={EndIcon} {...other}>
        {label}
      </MuiButton>
    </div>
  );
}

Button.defaultProps = {
  color: 'primary' as 'primary',
  disabled: false,
  disableElevation: false,
  endIcon: undefined,
  fullWidth: false,
  size: 'medium' as 'medium',
  startIcon: undefined,
  startIconTheme: 'Filled' as 'Filled',
  endIconTheme: 'Filled' as 'Filled',
  label: 'Button',
  width: 100,
  height: 38,
  variant: 'text' as 'text',
};

addPropertyControls(Button, {
  color: {
    type: ControlType.Enum,
    title: 'Color',
    options: ['inherit', 'primary', 'secondary'],
  },
  disabled: {
    type: ControlType.Boolean,
    title: 'Disabled',
  },
  disableElevation: {
    type: ControlType.Boolean,
    title: 'Disable elevation',
  },
  endIcon: {
    type: ControlType.String,
    title: 'End icon',
  },
  fullWidth: {
    type: ControlType.Boolean,
    title: 'Full width',
  },
  href: {
    type: ControlType.String,
    title: 'Href',
  },
  size: {
    type: ControlType.Enum,
    title: 'Size',
    options: ['large', 'medium', 'small'],
  },
  startIcon: {
    type: ControlType.String,
    title: 'Start icon',
  },
  startIconTheme: {
    type: ControlType.Enum,
    title: 'Start icon theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
  endIconTheme: {
    type: ControlType.Enum,
    title: 'End icon theme',
    options: ['Filled', 'Outlined', 'Rounded', 'TwoTone', 'Sharp'],
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
  variant: {
    type: ControlType.Enum,
    title: 'Variant',
    options: ['contained', 'outlined', 'text'],
  },
});
