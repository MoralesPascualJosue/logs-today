import React from "react";
import {Stack, StackDivider, Container, useColorModeValue, Button, Text} from "@chakra-ui/react";
import {useLocation, useHistory} from "react-router-dom";

import {useLogoutMutation} from "../Features/Api/ApiSlice";

const Settings = () => {
  const location = useLocation();
  const history = useHistory();
  let {background} = location.state || {from: {background: "/home"}};
  const [logout] = useLogoutMutation();

  const handleLogOut = () => {
    logout("");
    history.replace(background);
  };

  return (
    <Stack
      direction="row"
      divider={<StackDivider borderColor={useColorModeValue("gray.200", "whiteAlpha.300")} />}
      height="100%"
      spacing={0}
    >
      <Stack justifyContent="space-between" padding={5} spacing={8}>
        <Text>text</Text>
      </Stack>
      <Container
        alignItems="center"
        display="flex"
        flexDirection="column"
        maxHeight="100%"
        maxWidth="container.xl"
        padding={0}
      >
        <Button onClick={handleLogOut}>Log out</Button>
      </Container>
    </Stack>
  );
};

export default Settings;
