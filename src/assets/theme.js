import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8d8d8d',
      main: '#121212',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffff59',
      main: '#e0ff00',
      dark: '#aacc00',
      contrastText: '#000000',
    },

  },
}
);


export default theme;