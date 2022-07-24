import {
  Stack,
  StackDivider,
  useColorModeValue,
  Text,
  Icon,
  Divider,
  Spinner,
  useDisclosure,
  Container
} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import {GiStarFormation} from "react-icons/gi";
import {AnimatePresence} from "framer-motion";
import {nanoid} from "@reduxjs/toolkit";

import LogInput from "../Components/logInput";
import LogInterface from "../Features/Logs/Interfaces/Log";
import LogView from "../Components/LogView";
import LogService from "../Features/Logs/Services/LogService";
import OptionsPaneFeed from "../Components/OptionsPanels/OptionsPaneFeed";
import MonthWise from "../Components/ActivitieHeadMap/MonthWise";
import ModalChannelIndex from "../Parts/Feed/ModalChannelIndex";
import useAuth from "../Features/Auth/Hooks/useAuth";
import {useAppSelector, useAppDispatch} from "../Store/Hooks";
import {fetchLogs, logsStatus,logsError, selectLogs, logAdded,addNewLog} from "../Features/Logs/Store/LogsSlice";

const Feed: React.FC = () => {
  const logsStore: LogInterface[] = useAppSelector(selectLogs);
  const logsStoreStatus = useAppSelector(logsStatus);
  const logsStoreError = useAppSelector(logsError);
  

  const dispatch = useAppDispatch();

  const [logs, setLogs] = React.useState<LogInterface[]>([]);
  const [channelName, setChannelName] = React.useState<String>("Inicio");
  // const [ready, setReady] = React.useState<Boolean>(false);
  const [ready, setReady] = React.useState<Boolean>(true);

  const bgcolor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("primary.500", undefined);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const location = useLocation();
  const finalRef = React.useRef(null);
  const { jwt, token, refreshPromise } = useAuth();
  
  useEffect(() => {
    if (logsStoreStatus === "idle") {
        dispatch(
          fetchLogs({
            channelName: location.state ? location.state.channel : "feed",
            jwt,
            token,
          })
        );
    }

  }, [logsStatus, dispatch]);

  // useEffect(() => {
  //   setReady(false);
  //   onClose();

  //   LogService.getLogsChannel(
  //     location.state ? location.state.channel : "feed",
  //     jwt,
  //     token
  //   )
  //     .then((res) => {
  //       setLogs(res.logs);
  //       setChannelName(res.channelName);
  //       setReady(true);
  //     })
  //     .catch((error) => {
  //       if (error.status == 401) {
  //         return refreshPromise().then((auth) => {
  //           return LogService.getLogsChannel(
  //             location.state ? location.state.channel : "feed",
  //             auth?.accessToken,
  //             auth?.refreshToken
  //           ).then((res) => {
  //             setLogs(res.logs);
  //             setChannelName(res.channelName);
  //             setReady(true);
  //           });
  //         });
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [location.state]);

  const logInputHandler = (body: Array<any>) => {
    const date = new Date();
    const log = {
      // id: nanoid(),
      idLog: String(date.valueOf()),
      body: body,
      date: date.toDateString(),
      reactions: {
        reviewed: 0,
        works: 0,
        seen: 0,
      },
    };

    // dispatch(logAdded(body));

     dispatch(addNewLog({log,jwt,token})).unwrap();

    // LogService.push(log, jwt, token)
    //   .then((createdLog) => {
    //     setLogs(() => [createdLog, ...logs]);
    //   })
    //   .catch((error) => {
    //     if (error.status == 401) {
    //       return refreshPromise().then((auth) => {
    //         return LogService.push(log, auth?.accessToken, auth?.refreshToken).then(
    //           (createdLog) => {
    //             setLogs(() => [createdLog, ...logs]);
    //           },
    //         );
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
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
        <LogInput name="inputLogEditor" onSumit={logInputHandler} />
        <Divider borderWidth={2} width="99.5%" />
        <AnimatePresence>
          {logsStoreStatus === 'succeeded' ? (
            logsStore.map((log) => <LogView key={log.id+"lv"} Log={log} onDeleted={logDeletedHandler} />)
          ) : ( logsStoreStatus === 'loading'?
            (<Spinner
              alignSelf="center"
              color={color}
              emptyColor={bgcolor}
              marginTop="10"
              size="xl"
              speed="0.65s"
              thickness="4px"
              />) : <Container marginY={10} padding={5} width="xl" fontSize="3xl" backgroundColor="red.500" borderRadius="lg">{ logsStoreError }</Container>
          )}
        </AnimatePresence>
      </Stack>
    </Stack>
  );
};

export default Feed;
