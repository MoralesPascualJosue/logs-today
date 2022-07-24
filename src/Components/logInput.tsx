import React from "react";
import {Stack, StackDivider, Image, useColorModeValue, Spinner} from "@chakra-ui/react";

import logos from "../resources/short.svg";

import SlateEditor from "./SlateEditor/SlateEditor";

interface LogInputProps {
  onSumit(body: Array<any>): any;
  initialBody?: Array<any>;
  name: String;
  isLoading?: boolean;
}

const LogInput = (Props: LogInputProps) => {
  const logoColor = useColorModeValue("primary.500", "whiteAlpha.800");

  return (
    <Stack
      direction="row"
      filter={Props.isLoading ? "blur(1px)" : ""}
      paddingX={5}
      paddingY={2}
      spacing={4}
    >
      <Image backgroundColor={logoColor} borderRadius="50%" height={12} src={logos} width={12} />
      <Stack divider={<StackDivider />} width="100%">
        <SlateEditor
          body={Props.initialBody}
          isLoading={Props.isLoading}
          name={Props.name}
          onSave={(html) => Props.onSumit(html)}
        />
      </Stack>
    </Stack>
  );
};

export default LogInput;
