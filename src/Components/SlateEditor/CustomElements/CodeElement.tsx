import React from "react";
import {useColorModeValue} from "@chakra-ui/react";

const CodeElement = (props) => {
  const backColor = useColorModeValue("#f5f2f0", "#252c3c");

  return (
    <pre {...props.attributes} style={{backgroundColor: backColor}}>
      <code>{props.children}</code>
    </pre>
  );
};

export default CodeElement;
