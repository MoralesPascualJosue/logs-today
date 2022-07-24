import {Container} from "@chakra-ui/react";
import React, {useEffect} from "react";
//@ts-ignore
import Prism from "prismjs";
import "../Resources/prism.css";

import parse from "html-react-parser";
//@ts-ignore
import escapeHtml from "escape-html";

const NodeViewCode = (Props) => {
  useEffect(() => {
    Prism.highlightAll();
  });

  return (
    <Container>
      <pre
        style={{
          color: "unset",
          textShadow: "unset",
        }}
      >
        <code
          className={`language-${Props.language}`}
          style={{
            color: "unset",
            textShadow: "unset",
          }}
        >
          {Props.childrens.map((log, indexnvc) => {
            var str = "";

            log.children[0].text == ""
              ? (str = ` \n`)
              : (str = `${escapeHtml(log.children[0].text)}\n`);

            return parse(str);
          })}
        </code>
      </pre>
    </Container>
  );
};

export default NodeViewCode;
