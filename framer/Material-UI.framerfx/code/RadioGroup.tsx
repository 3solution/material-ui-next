import * as React from 'react';
import { addPropertyControls, ControlType } from 'framer';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import MuiFormLabel from '@material-ui/core/FormLabel';
import { Radio } from './Radio';

interface Props {
  labels: string[];
  label: string;
  width: number | string;
  height: number;
}

export function RadioGroup(props: Props): JSX.Element {
  const { label, labels, ...other } = props;

  return (
    <div style={{ margin: 16 }}>
      <MuiFormLabel component="legend">{label}</MuiFormLabel>
      <MuiRadioGroup defaultValue={labels[0]} style={{ marginTop: '8px' }} {...other}>
        {labels.map((radioLabel) => {
          return <Radio key={radioLabel} value={radioLabel} label={radioLabel} />;
        })}
      </MuiRadioGroup>
    </div>
  );
}

RadioGroup.defaultProps = {
  labels: ['Paris', 'New York', 'London'],
  label: 'Radio group',
  width: 160,
  height: 180,
};

addPropertyControls(RadioGroup, {
  labels: {
    type: ControlType.Array,
    title: 'Labels',
    propertyControl: { type: ControlType.String },
  },
  label: {
    type: ControlType.String,
    title: 'Label',
  },
});
