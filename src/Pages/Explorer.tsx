import React from "react";
import {Container, Stack, Text} from "@chakra-ui/react";

import Layout from "../Components/layout";
import Section from "../Parts/Explorer/Section";

const Explorer = () => {
  return (
    <Layout>
      <Stack justifyContent="space-between" padding={5} spacing={8}>
        <Stack spacing={5}>
          <Text cursor="default" fontSize="lg" fontWeight="bold" userSelect="none">
            Posts
          </Text>
        </Stack>
        <Stack height="100%" justifyContent="center" spacing={6}>
          options
        </Stack>
      </Stack>
      <Container>
        <Section />
      </Container>
    </Layout>
  );
};

export default Explorer;
