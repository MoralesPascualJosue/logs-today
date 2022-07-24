import React from "react";
import {Stack, StackDivider, Container, useColorModeValue, Button, Text} from "@chakra-ui/react";
import {useLocation, useHistory} from "react-router-dom";

const Unauthorized = () => {
  const location = useLocation();
  const history = useHistory();
  let {from} = location.state || {from: {pathname: "/home"}};

  const handleLogOut = () => {
    history.goBack();
  };

  return (
    <Stack
      direction="row"
      divider={<StackDivider borderColor={useColorModeValue("gray.200", "whiteAlpha.300")} />}
      height="100%"
      spacing={0}
    >
      <Container
        alignItems="center"
        display="flex"
        flexDirection="column"
        maxHeight="100%"
        maxWidth="container.xl"
        padding={10}
      >
        <Stack justifyContent="space-between" padding={5} spacing={8}>
          <Button onClick={handleLogOut}>back from {from.pathname}</Button>
          <Text>Unauthorized ...</Text>
          <Text>You do not have access to the requested page.</Text>
        </Stack>
      </Container>
    </Stack>
  );
};

export default Unauthorized;
