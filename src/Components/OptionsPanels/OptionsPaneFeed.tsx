import React from "react";
import {Stack, Button} from "@chakra-ui/react";
import {BiHash} from "react-icons/bi";

interface OptionsPaneFeedProps {
  openModal(): void;
}

const OptionsPaneFeed = (props: OptionsPaneFeedProps) => {
  return (
    <Stack spacing={5}>
      <Button rightIcon={<BiHash />} variant="link" onClick={props.openModal}>
        Channels
      </Button>
    </Stack>
  );
};

export default OptionsPaneFeed;
