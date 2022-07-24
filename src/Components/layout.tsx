import {Container, Stack, StackDivider, useColorModeValue} from "@chakra-ui/react";
import React from "react";

const Layout: React.FC = ({children}) => {
  return (
    <Container alignSelf="center" height="100%" maxWidth="container.xl">
      <Stack
        direction="row"
        divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.700")} />}
        height="100%"
        spacing={0}
      >
        {children}
      </Stack>
    </Container>
  );
};

export default Layout;
