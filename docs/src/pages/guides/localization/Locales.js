import * as React from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import Autocomplete from '@material-ui/core/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import * as locales from '@material-ui/core/locale';

export default function Locales() {
  const [locale, setLocale] = React.useState('zhCN');

  return (
    <div>
      <ThemeProvider
        theme={(outerTheme) => createMuiTheme(outerTheme, locales[locale])}
      >
        <Autocomplete
          options={Object.keys(locales)}
          getOptionLabel={(key) =>
            `${key.substring(0, 2)}-${key.substring(2, 4)}`
          }
          style={{ width: 300 }}
          value={locale}
          disableClearable
          onChange={(event, newValue) => {
            setLocale(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Locale"
              variant="outlined"
              fullWidth
            />
          )}
        />
        <TablePagination
          count={2000}
          rowsPerPage={10}
          page={1}
          component="div"
          onPageChange={() => {}}
        />
      </ThemeProvider>
    </div>
  );
}
