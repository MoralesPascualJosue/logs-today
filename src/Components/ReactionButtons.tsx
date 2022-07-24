import React from "react";
import {Button} from "@chakra-ui/react";

import {reactions} from "../Features/Logs/Interfaces/Log";
import {reactionAdded} from "../Features/Logs/Store/LogsSlice";
import {useAppDispatch} from "../Store/Hooks";

const reactionEmoji = {
  reviewed: "👍",
  works: "🚀",
  seen: "👀",
};

interface ReactionButtonsInterface {
  idLog: String;
  reactions: reactions;
}

export const ReactionButtons = (Props: ReactionButtonsInterface) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <Button
        key={name}
        aria-label={name}
        fontSize="sm"
        height={6}
        variant="outline"
        onClick={() => dispatch(reactionAdded({idLog: Props.idLog, reaction: name}))}
      >
        {emoji} {Props.reactions[name]}
      </Button>
    );
  });

  return <div>{reactionButtons}</div>;
};
