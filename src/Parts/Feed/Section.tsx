import React from "react";
import {Stack, Text, Flex, Link} from "@chakra-ui/react";
import {Link as LinkRouter} from "react-router-dom";

interface SectionProps {
  groupChannels: Object;
}

const Section = (props: SectionProps) => {
  return (
    <Stack spacing={1}>
      <Text color="primary.500" fontWeight="600">
        {props.groupChannels.type}
      </Text>
      <Flex wrap="wrap">
        {props.groupChannels.channels.map((channel) => (
          <Link
            key={channel.id}
            _hover={{color: "primary.500", textDecoration: "underline"}}
            as={LinkRouter}
            colorScheme="primary.500"
            marginLeft={2}
            marginTop={2}
            to={{pathname: `/channel/${channel.name}`, state: {channel: channel.id}}}
          >
            {channel.name},
          </Link>
        ))}
      </Flex>
    </Stack>
  );
};

export default Section;
