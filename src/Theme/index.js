import { createTheme } from "@mui/material/styles"; // Create a theme instance
const theme = createTheme({
  palette: {
    custom: {
      main: "#15168a",
      hover: "rgba(249, 131, 13, 0.9)",
      light: "#FA9B3D",
      dark: "#AE5B09",
      contrastText: "#FAFAFA",
      formLabel: "#555F78",
    },

    primary: {
      main: "#15168a",
      light: "#15168a",
      dark: "#15168a",
      contrastText: "#ffffff",
    },

    secondary: {
      main: "#F9830D",
      light: "#FA9B3D",
      dark: "#AE5B09",
      contrastText: "#ffffff",
    },
    error: {
      main: "#ff2020",
      light: "#ff644c",
      dark: "#c30000",
      contrastText: "#FF2083",
    },
    warning: {
      main: "#ff9800",
      light: "#ffb74d",
      dark: "#f57c00",
    },
    info: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388e3c",
      contrastText: "#0CC593",
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "Inter, sans-serif",
      },
      variants: [
        {
          props: { variant: "h1" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 60,
            fontWeight: 500,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "h2" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 38,
            fontWeight: 600,
            fontStyle: "normal",
            // color: '#000',
            lg: {
              fontSize: 26,
            },
            md: {
              fontSize: 22,
            },
            sm: {
              fontSize: 18,
            },
          },
        },
        {
          props: { variant: "h3" },
          style: {
            ffontFamily: "Inter, sans-serif",
            fontSize: 28,
            fontWeight: 500,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "h4" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 24,
            fontStyle: "normal",
            // color: '#000',
            lg: {
              fontSize: 24,
            },
            md: {
              fontSize: 18,
            },
            sm: {
              fontSize: 14,
            },
          },
        },
        {
          props: { variant: "h5" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 20,
            fontWeight: 400,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "h6" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "body1" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 15,
            fontWeight: 400,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "body2" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontSize: 14,
            fontWeight: 400,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "subtitle1" },
          style: {
            fontFamily: "Inter, sans-serif",
            fontWeight: 400,
            fontSize: 12,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "subtitle2" },
          style: {
            fontFamily: "sans-serif",
            fontWeight: 400,
            fontSize: 10,
            fontStyle: "normal",
            // color: '#000',
          },
        },
        {
          props: { variant: "caption" },
          style: {
            fontFamily: "Inter, sans-serif",
          },
        },
        {
          props: { variant: "button" },
          style: {
            fontSize: 24,
            fontStyle: "Inter, sans-serif",
          },
        },
      ],
    },
    MuiTextField: {
      defaultProps: {
        fontFamily: "Inter, sans-serif",
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            fontSize: 24,
            fontStyle: "Inter, sans-serif",
          },
        },
      ],
    },
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    h1: {
      fontFamily: "Inter, sans-serif",
      fontSize: 60,
      fontWeight: 500,
      fontStyle: "normal",
      // color: '#000',
    },
    h2: {
      fontFamily: "Inter, sans-serif",
      fontSize: 38,
      fontWeight: 600,
      fontStyle: "normal",
      // color: '#000',
      lg: {
        fontSize: 26,
      },
      md: {
        fontSize: 22,
      },
      sm: {
        fontSize: 18,
      },
    },
    h3: {
      fontFamily: "Inter, sans-serif",
      fontSize: 22,
      fontWeight: 500,
      fontStyle: "normal",
      // color: '#000',
    },
    h4: {
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      fontStyle: "normal",
      // color: '#000',
      lg: {
        fontSize: 18,
      },
      md: {
        fontSize: 16,
      },
      sm: {
        fontSize: 13,
      },
    },
    h5: {
      fontFamily: "Inter, sans-serif",
      fontSize: 18,
      fontWeight: 400,
      fontStyle: "normal",
      // color: '#000',
    },
    h6: {
      fontFamily: "Inter, sans-serif",
      fontSize: 14,
      fontWeight: 400,
      fontStyle: "normal",
      // color: '#000',
    },
    body1: {
      fontFamily: "Inter, sans-serif",
      fontSize: 15,
      fontWeight: 400,
      fontStyle: "normal",
      // color: '#000',
    },
    body2: {
      fontFamily: "Inter, sans-serif",
      fontSize: 12,
      fontWeight: 400,
      fontStyle: "normal",
      // color: '#000',
    },
    subtitle1: {
      fontFamily: "Inter, sans-serif",
      fontWeight: 400,
      fontSize: 10,
      fontStyle: "normal",
      // color: '#000',
    },
    subtitle2: {
      fontFamily: "sans-serif",
      fontWeight: 400,
      fontSize: 8,
      fontStyle: "normal",
      // color: '#000',
    },
  },
  input: {
    fontSize: 6,
  },
  spacing: 8,
  shape: {
    cardBorderRadius: 16,
  },
});

export default theme;
