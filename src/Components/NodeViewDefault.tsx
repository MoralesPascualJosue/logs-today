import {Container} from "@chakra-ui/react";
import React from "react";
import parse from "html-react-parser";
//@ts-ignore
import escapeHtml from "escape-html";

const attributes = (text) => {
  let string = escapeHtml(text.text);

  if (text.bold) {
    string = `<strong>${string}</strong>`;
  }

  return string;
};
const NodeViewDefault = (Props) => {
  return (
    <Container>
      {Props.childrens.map((log, indexnt) => {
        var str = "";

        log.children[0].text == ""
          ? (str = `<br key=${indexnt} />`)
          : (str = `<p key=${indexnt} >${attributes(log.children[0])}</p>`);

        return parse(str);
      })}
    </Container>
  );
};

export default NodeViewDefault;
