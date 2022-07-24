import React from "react";
import {css} from "@emotion/css";

// different token types, styles found on Prismjs website
const LeafCode = ({attributes, children, leaf}) => {
  return (
    <span
      {...attributes}
      className={css`
        font-family: monospace;
        background: none;
        ${leaf.comment &&
        css`
          color: slategray;
        `}
        ${(leaf.operator || leaf.url) &&
        css`
          color: #9a6e3a;
        `}
        ${leaf.keyword &&
        css`
          color: #07a;
        `}
        ${(leaf.variable || leaf.regex) &&
        css`
          color: #e90;
        `}
        ${(leaf.number ||
          leaf.boolean ||
          leaf.tag ||
          leaf.constant ||
          leaf.symbol ||
          leaf["attr-name"] ||
          leaf.selector) &&
        css`
          color: #905;
        `}
        ${leaf.punctuation &&
        css`
          color: #999;
        `}
        ${(leaf.string || leaf.char) &&
        css`
          color: #690;
        `}
        ${(leaf.function || leaf["class-name"]) &&
        css`
          color: #dd4a68;
        `}
      `}
    >
      {children}
    </span>
  );
};

export default LeafCode;
