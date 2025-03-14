import { createTheme } from '@mantine/core';

const theme = createTheme({
  colors: {
    'primary': ['#ebf5ee', '#d2e8d8', '#b9dcc2', '#9fcfad', '#86c397', '#6cb781', '#56ac6f', '#449958', '#328642', '#20742b'],
    'secondary': ['#fdf2eb', '#fae1d2', '#f6cfb9', '#f2bea1', '#f0ad88', '#ec9b6f', '#e88a56', '#e47942', '#e0682d', '#dd5619'],
    'green': ['#ebf5ed', '#d2e9d6', '#b9dcbf', '#9fd0a8', '#86c492', '#6cb77b', '#56ac68', '#449955', '#328642', '#20742e'],
    'background': ['#fcfaf5', '#f8f5eb', '#f5f0e0', '#f2ebd6', '#efe6cc', '#ebe0c1', '#e8dbb7', '#e5d6ad', '#e2d1a3', '#deca98'],
  },
  primaryColor: 'primary',
  primaryShade: 6,
  defaultRadius: 'md',
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  },
  components: {
    Button: {
      defaultProps: {
        radius: 'md',
      },
    },
  },
});

export default theme; 