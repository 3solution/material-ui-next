import * as React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { spacing } from '@material-ui/system';
import styledComponents, {
  ThemeProvider as StyledComponentsThemeProvider,
} from 'styled-components';

const materialSystemTheme = createMuiTheme();
const BasicStyleComponents = styledComponents('div')(spacing);

export default function BasicStyledComponents() {
  return (
    <StyledComponentsThemeProvider theme={materialSystemTheme}>
      {new Array(1000).fill().map(() => (
        <BasicStyleComponents
          color="primary.main"
          bgcolor="background.paper"
          fontFamily="h6.fontFamily"
          fontSize={['h6.fontSize', 'h4.fontSize', 'h3.fontSize']}
          p={[2, 3, 4]}
        >
          styled-components
        </BasicStyleComponents>
      ))}
    </StyledComponentsThemeProvider>
  );
}
