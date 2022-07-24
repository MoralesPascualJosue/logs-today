import {
  Stack,
  StackDivider,
  useColorModeValue,
  Text,
  Icon,
  Divider,
  Spinner,
  useDisclosure,
  Container,
} from "@chakra-ui/react";
import React from "react";
import {GiStarFormation} from "react-icons/gi";
import {AnimatePresence} from "framer-motion";

import LogInput from "../Components/logInput";
import LogInterface from "../Features/Logs/Interfaces/Log";
import LogView from "../Components/LogView";
import OptionsPaneFeed from "../Components/OptionsPanels/OptionsPaneFeed";
import MonthWise from "../Components/ActivitieHeadMap/MonthWise";
import ModalChannelIndex from "../Parts/Feed/ModalChannelIndex";
import {useAppSelector} from "../Store/Hooks";
import {selectLogs} from "../Features/Logs/Store/LogsSlice";
import {useGetLogsQuery, usePutLogMutation} from "../Features/Logs/Api/ApiSlice";

const Feed: React.FC = () => {
  const logsStore: LogInterface[] = useAppSelector(selectLogs);

  const {isLoading, isSuccess, error} = useGetLogsQuery("");
  const [putLog, {isLoading: isPutLoading}] = usePutLogMutation();

  const [channelName, setChannelName] = React.useState<String>("Inicio");

  const bgcolor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("primary.500", undefined);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const finalRef = React.useRef(null);

  const logInputHandler = (body: Array<any>) => {
    const date = new Date();
    const log = {
      idLog: String(date.valueOf()),
      body: body,
      date: date.toDateString(),
      reactions: {
        reviewed: 0,
        works: 0,
        seen: 0,
      },
    };

    putLog(log);
  };

  const logDeletedHandler = (id: string) => {
    // setLogs(logs.filter((logfilter) => logfilter.id != id));
  };

  return (
    <Stack
      direction="row"
      divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.700")} />}
      height="100%"
      spacing={0}
      width="100%"
    >
      <Stack justifyContent="space-between" padding={5} spacing={8}>
        <Stack spacing={5}>
          <MonthWise />
        </Stack>
        <Stack height="100%" justifyContent="center" spacing={6}>
          <OptionsPaneFeed openModal={onOpen} />
          <ModalChannelIndex finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} />
        </Stack>
      </Stack>
      <Stack
        divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.700")} />}
        overflowY="auto"
        spacing={0}
        width="100%"
      >
        <Stack divider={<StackDivider />} position="sticky" spacing={0} top="-1px">
          <Stack alignItems="center" direction="row" justifyContent="space-between" padding={2}>
            <Text ref={finalRef} cursor="default" fontSize="lg" fontWeight="bold" userSelect="none">
              {channelName}
            </Text>
            <Icon as={GiStarFormation} color="primary.500" height={5} width={5} />
          </Stack>
        </Stack>
        <LogInput isLoading={isPutLoading} name="inputLogEditor" onSumit={logInputHandler} />
        <Divider borderWidth={2} width="99.5%" />
        <AnimatePresence>
          {isSuccess ? (
            logsStore.map((log) => (
              <LogView key={log.id + "log"} Log={log} onDeleted={logDeletedHandler} />
            ))
          ) : isLoading ? (
            <Spinner
              alignSelf="center"
              color={color}
              emptyColor={bgcolor}
              marginTop="10"
              size="xl"
              speed="0.65s"
              thickness="4px"
            />
          ) : (
            <Container
              backgroundColor="red.500"
              borderRadius="lg"
              fontSize="3xl"
              marginY={10}
              padding={5}
              width="xl"
            >
              {" "}
              {error.error ? error.error : error.data.message}
            </Container>
          )}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
};

export default Feed;
