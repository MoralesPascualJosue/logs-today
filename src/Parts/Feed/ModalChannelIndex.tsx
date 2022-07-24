import React, {useEffect, useState} from "react";
import {Stack, Spinner, useColorModeValue} from "@chakra-ui/react";

import ChannelService from "../../Features/Channels/Services/ChannelService";
import ModalLayout from "../../Components/ModalLayout";

import Section from "./Section";

interface ModalChannelIndexProps {
  isOpen: boolean;
  onClose(): any;
  finalFocusRef: React.RefObject<HTMLParagraphElement>;
}

const ModalChannelIndex = (props: ModalChannelIndexProps) => {
  const [channelsType, setChannelsType] = useState([]);
  const [ready, setReady] = React.useState<Boolean>(false);
  const bgcolor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("primary.500", undefined);

  useEffect(() => {
    ChannelService.getChannels()
      .then((res) => {
        setChannelsType(res);
        setReady(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <ModalLayout isCentered={false} size="4xl" title="Channel Index" {...props}>
      {ready ? (
        <Stack spacing={5}>
          {channelsType.map((groupChannels, groupChannelsindex) => (
            <Section key={groupChannelsindex} groupChannels={groupChannels} />
          ))}
        </Stack>
      ) : (
        <Spinner
          alignSelf="center"
          color={color}
          emptyColor={bgcolor}
          marginTop="10"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
      )}
    </ModalLayout>
  );
};

export default ModalChannelIndex;
