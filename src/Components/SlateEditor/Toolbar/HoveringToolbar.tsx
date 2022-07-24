import React, {useRef, useEffect} from "react";
import {useSlate, useFocused} from "slate-react";
import {Editor, Range} from "slate";
import {css} from "@emotion/css";
import {AiOutlineBold, AiOutlineItalic, AiOutlineUnderline} from "react-icons/ai";

import {Button, Icon, Menu, Portal} from "./ToolbarComponents";

const HoveringToolbar = () => {
  const ref = useRef<HTMLDivElement | null>();
  const editor = useSlate();
  const inFocus = useFocused();

  useEffect(() => {
    const el = ref.current;
    const {selection} = editor;

    if (!el) {
      return;
    }

    if (
      !selection ||
      !inFocus ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ""
    ) {
      el.removeAttribute("style");

      return;
    }

    const domSelection = window.getSelection();
    const domRange = domSelection.getRangeAt(0);
    const rect = domRange.getBoundingClientRect();

    el.style.opacity = "1";
    el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
    el.style.left = `${rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2}px`;
  });

  return (
    <Portal>
      <Menu
        ref={ref}
        className={css`
          padding: 8px 7px 6px;
          position: absolute;
          z-index: 1;
          top: -10000px;
          left: -10000px;
          margin-top: -6px;
          opacity: 0;
          background-color: #222;
          border-radius: 4px;
          transition: opacity 0.75s;
        `}
        onMouseDown={(e) => {
          // prevent toolbar from taking focus away from editor
          e.preventDefault();
        }}
      >
        <FormatButton format="bold" icon={<AiOutlineBold />} />
        <FormatButton format="italic" icon={<AiOutlineItalic />} />
        <FormatButton format="underlined" icon={<AiOutlineUnderline />} />
      </Menu>
    </Portal>
  );
};

const FormatButton = ({format, icon}) => {
  const editor = useSlate();

  return (
    <Button
      reversed
      ///active={isFormatActive(editor, format)}
      active={false}
      //onClick={() => toggleFormat(editor, format)}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};

export default HoveringToolbar;
