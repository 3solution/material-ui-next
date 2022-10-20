import * as React from 'react';
import {
  createMuiTheme,
  experimentalStyled as styled,
  ThemeProvider,
  darken,
} from '@material-ui/core/styles';
import Slider from '@material-ui/lab/SliderStyled';
import Box from '@material-ui/core/Box';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#20b2aa',
    },
  },
});

const CustomizedSlider = styled(Slider)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};

  :hover {
    color: ${darken(theme.palette.primary.main, 0.2)};
  }
`,
);

export default function StyledComponentsTheme() {
  return (
    <Box width={300}>
      <ThemeProvider theme={customTheme}>
        <CustomizedSlider defaultValue={30} />
      </ThemeProvider>
    </Box>
  );
}
