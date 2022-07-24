import {Container, Stack, Image, Heading, Text} from "@chakra-ui/react";
import React from "react";

import FormLogin from "../Parts/Welcome/FormLogin";
import FormRegister from "../Parts/Welcome/FormRegister";

const Welcome = () => {
  return (
    <Stack direction={{base: "column", lg: "row"}} overflowY="auto" p={5} spacing={0} width="100%">
      <Stack alignItems="center" width="100%">
        <Container>
          <Text fontWeight="700">Log in .</Text>
        </Container>
        <FormLogin />
      </Stack>
      <Stack alignItems="center" width="100%">
        <Image
          alt="Finger Log"
          backgroundColor="white"
          border="5px solid #22c35e"
          borderRadius="20px"
          height="30%"
          marginY={10}
          src="src/Resources/complete.svg"
          width="80%"
        />
        <Heading size="3xl">Finger Log</Heading>
        <Container>
          <Text fontWeight="700">Register .</Text>
        </Container>
        <FormRegister />
      </Stack>
    </Stack>
  );
};

export default Welcome;
