import {
  createTheme,
  Theme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider } from "next-themes";

interface AppThemeContext {
  colorMode: {
    toggleColorMode: () => void;
  };
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme);
  mode?: "light" | "dark";
}

const AppThemeContextMode = createContext<AppThemeContext>({
  colorMode: {
    toggleColorMode: () => {},
  },
  theme: createTheme(),
});

export default function AppThemeContextProvider({
  children,
  attribute,
}: {
  children: React.ReactNode;
  attribute: string | "class";
}) {
  const [mode, setMode] = useState<"light" | "dark">();

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const mode = prevMode === "light" ? "dark" : "light";
          return mode;
        });
      },
    }),
    []
  );

  const theme = createTheme({
    palette:{
      mode: mode
    }
  });
  
  theme.typography.h1 = {
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "3rem",
    },
    fontFamily: 'Inter'
  };

  theme.typography.h2 = {
    [theme.breakpoints.between("lg", "xl")]: {
      fontSize: "1.5rem",
    },
  };
  const themeMui = useMemo(() => theme, [mode]);

  let sharedState: AppThemeContext = {
    colorMode,
    theme: themeMui,
    mode,
  };

  return (
    <StyledEngineProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <AppThemeContextMode.Provider value={sharedState}>
          <ThemeProvider attribute={attribute}>{children}</ThemeProvider>
        </AppThemeContextMode.Provider>
      </MuiThemeProvider>
    </StyledEngineProvider>
  );
}


declare module "@mui/material/styles" {
  interface TypographyVariants {
    poster: React.CSSProperties;
    contrast: React.CSSProperties;
    frontCover: React.CSSProperties;
    link: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    poster?: React.CSSProperties;
    contrast?: React.CSSProperties;
    frontCover?: React.CSSProperties;
    link?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    poster: true;
    contrast: true;
    frontCover: true;
    link: true;
  }
}


export function useAppThemeContext() {
  return useContext(AppThemeContextMode);
}
