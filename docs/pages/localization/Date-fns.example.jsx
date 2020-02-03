import frLocale from 'date-fns/locale/fr';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import MoreIcon from '@material-ui/icons/MoreVert';
import React, { useState, useCallback } from 'react';
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns';
import { DatePicker } from '@material-ui/pickers';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  useTheme,
  createMuiTheme,
  ButtonGroup,
} from '@material-ui/core';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
};

function DateFnsLocalizationExample() {
  const theme = useTheme();
  const [locale, setLocale] = useState('ru');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMenuOpen = useCallback(e => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  }, []);

  const selectLocale = useCallback(locale => {
    setLocale(locale);
    setAnchorEl(null);
  }, []);

  const localizedTheme = React.useMemo(
    () =>
      createMuiTheme({
        ...theme,
        dateIOAdapter: new DateFnsAdapter({ locale: localeMap[locale] }),
      }),
    [locale, theme]
  );

  return (
    <ThemeProvider theme={localizedTheme}>
      <DatePicker
        value={selectedDate}
        onChange={handleDateChange}
        InputProps={{
          endAdornment: (
            <IconButton
              aria-label="Select locale"
              onClick={handleMenuOpen}
              aria-owns={anchorEl ? 'locale-menu' : undefined}
            >
              <MoreIcon />
            </IconButton>
          ),
        }}
      />

      <ButtonGroup variant="contained" color="primary" aria-label="text primary button group">
        {Object.keys(localeMap).map(localeItem => (
          <Button key={localeItem} onClick={() => selectLocale(localeItem)}>
            {localeItem}
          </Button>
        ))}
      </ButtonGroup>
    </ThemeProvider>
  );
}

export default DateFnsLocalizationExample;
