import {extendTheme, theme, useColorModeValue} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
};

export default extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorModel: false,
  },
  colors: {
    primary: theme.colors.whatsapp,
  },
  styles: {
    global: (props) => ({
      "html, body, #root": {
        color: mode(undefined, "whiteAlpha.800")(props),
        height: "100%",
      },
      "::-webkit-scrollbar": {
        width: "1px",
      },
      "::-webkit-scrollbar-thumb": {
        boxShadow: `inset 0 0 5px ${useColorModeValue("#e2e8f0", "#2d3748")}`,
      },
      // Slate editor custom css
      //prismjs custem css
      ":not(pre)>code[class*=language-], pre[class*=language-]": {
        background: `${useColorModeValue("#f5f2f0", "#2d37488c")}`,
      },
      ".token.operator": {
        color: "#d8da5c",
        backgroundColor: "unset",
      },
      ".token.boolean, .token.constant, .token.deleted, .token.number, .token.property, .token.symbol, .token.tag":
        {color: `${useColorModeValue("#905", "#a92e72")}`},
      ".language-css .token.string, .style .token.string, .token.entity, .token.operator, .token.url":
        {
          backgroundColor: "unset",
        },
      "text.subdomain-name,text.title, text.domain-name": {
        fill: `${useColorModeValue("#000", "#ffff")}`,
      },
      // End Slate editor custom css
      ".backgroundColor": {
        backgroundColor: `${useColorModeValue("#ffff", "#1a202c")}`,
      },
      ".contrastBackgroundColor": {
        background: `${useColorModeValue("#f5f2f0", "#2d37488c")}`,
      },
      ".backgroundDecoration": {
        background: useColorModeValue("gray.200", "gray.700"),
      },
      ".colorPrimaryVariant": {
        color: useColorModeValue("primary.500", undefined),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        borderLeftRadius: 9999,
        borderRightRadius: 9999,
      },
      sizes: {
        lg: {
          paddingY: 3,
          fontsize: "md",
        },
      },
      variants: {
        solid: (props) => ({
          backgroundColor: `${props.colorScheme}.500`,
          color: mode(undefined, "white")(props),
          fontWeight: "bold",
          _hover: {
            backgroundColor: `${props.colorScheme}.600`,
          },
          outline: (props) => ({
            backgroundColor: `${props.colorScheme}.500`,
            color: `${props.colorScheme}.500`,
            fontWeight: "bold",
            _hover: {
              borderColor: `${props.colorScheme}.600`,
              color: `${props.colorScheme}.600`,
            },
          }),
        }),
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label": {
              ...activeLabelStyles,
            },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});
