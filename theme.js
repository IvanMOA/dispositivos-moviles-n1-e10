import { extendTheme } from "native-base";
import { Colors } from "./values/colors";

export const theme = extendTheme({
  colors: {
    primary: {
      50: Colors.primary["50"],
      100: Colors.primary["50"],
      200: Colors.primary["50"],
      300: Colors.primary["50"],
      400: Colors.primary["100"],
      500: Colors.primary["100"],
      600: Colors.primary["100"],
      700: Colors.primary["700"],
      800: Colors.primary["800"],
      900: Colors.primary["900"],
    },
  },
});
