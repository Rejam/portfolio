import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import textStyles from "./textStyles";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};
const theme = extendTheme({ colors, textStyles });

export default function Theme(props: any) {
  return <ChakraProvider theme={theme} {...props} />;
}
