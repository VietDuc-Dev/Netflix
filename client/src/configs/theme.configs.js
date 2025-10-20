import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";

export const themeModes = {
  dark: "dark",
  light: "light",
};

const color = {
  primary: "#ff0000",
  secondary: "#f44336",
};

const themeConfigs = {
  custom: ({ mode }) => {
    const customPalette =
      mode === themeModes.dark
        ? {
            primary: {
              main: color.primary,
              contrastText: "#ffffff",
            },
            secondary: {
              main: color.secondary,
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: color.primary,
            },
            secondary: {
              main: color.secondary,
            },
            background: {
              default: colors.grey["100"],
            },
          };

    return createTheme({
      palette: {
        mode,
        ...customPalette,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};

export default themeConfigs;
