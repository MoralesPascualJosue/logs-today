import React from "react";
import {Stack, Container, Box} from "@chakra-ui/react";

import Layout from "./Components/layout";
import Logo from "./Components/logo";
import NavBar from "./Parts/NavBar";
import ProfileButton from "./Components/ProfileButton";
import Routes from "./Components/Routes";
import useAuth from "./Features/Auth/Hooks/useAuth";

const App: React.FC = () => {
  const {isLogged} = useAuth();

  return (
    <Layout>
      <Container
        alignItems="center"
        display="flex"
        flexDirection="column"
        maxHeight="100%"
        maxWidth="container.xl"
        padding={0}
      >
        <Routes />
      </Container>
      {isLogged ? (
        <Stack justifyContent="space-between" padding={5} spacing={8}>
          <Stack spacing={5}>
            <Logo />
          </Stack>
          <Stack height="100%" justifyContent="center" spacing={6}>
            <NavBar />
          </Stack>
          <Box padding={{base: 0, xl: 2}}>
            <ProfileButton />
          </Box>
        </Stack>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default App;
