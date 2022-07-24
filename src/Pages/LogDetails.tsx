import React from "react";
import {Redirect} from "react-router-dom";
import {Stack, Text, StackDivider, useColorModeValue} from "@chakra-ui/react";

import Log from "../Features/Logs/Interfaces/Log";
import {useAppSelector, useAppDispatch} from "../Store/Hooks";
import {logUpdated, selectLogById} from "../Features/Logs/Store/LogsSlice";
import LogInput from "../Components/logInput";

const LogDetails = ({match}) => {
  const {logId} = match.params;
  const log: Log = useAppSelector(selectLogById(logId));
  const dispatch = useAppDispatch();

  const logUpdateHandler = (body: Array<any>) => {
    const date = new Date();
    const log = {
      id: logId,
      idLog: String(date.valueOf()),
      body: body,
      date: date.toDateString(),
    };

    dispatch(logUpdated(log));
  };

  return (
    <Stack
      divider={<StackDivider borderColor={useColorModeValue("gray.200", "gray.700")} />}
      overflowY="auto"
      spacing={0}
      width="100%"
    >
      {log ? (
        <Stack>
          <Text>Log Details</Text>
          <LogInput initialBody={log.body} name="logUpdateEditor" onSumit={logUpdateHandler} />
        </Stack>
      ) : (
        <Redirect
          to={{
            pathname: "/home",
          }}
        />
      )}
    </Stack>
  );
};

export default LogDetails;
