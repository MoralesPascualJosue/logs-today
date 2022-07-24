import React, {useMemo, useCallback, useState} from "react";
import {
  Stack,
  Button,
  StackDivider,
  CircularProgress,
  Select,
  Wrap,
  WrapItem,
  IconButton,
} from "@chakra-ui/react";
import {AiFillCaretDown, AiOutlineBold, AiOutlineClear} from "react-icons/ai";
import {FaPlus} from "react-icons/fa";
import {AiOutlineCalendar} from "react-icons/ai";
//@ts-ignore
import escapeHtml from "escape-html";
//@ts-ignore
import Prism from "prismjs";
import "../../Resources/prism.css";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/components/prism-markup-templating.js";
import "prismjs/components/prism-php";
import "prismjs/components/prism-php-extras";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-csharp";
//import {Node} from "slate";
import {Container, useColorModeValue} from "@chakra-ui/react";
// Import the Slate editor factory.
import {createEditor, Editor, Transforms, Descendant} from "slate";
// Import the Slate components and React plugin.
import {Slate, Editable, withReact} from "slate-react";
import {withHistory} from "slate-history";
// TypeScript users only add this code
import {BaseEditor, Text} from "slate";
import {ReactEditor} from "slate-react";

import Log from "../../Features/Logs/Interfaces/Log";

// Custom Elements
import CodeElement from "./CustomElements/CodeElement";
import DefaultElement from "./CustomElements/DefaultElement";
// Leaf Components
import LeafText from "./LeafComponents/LeafText";
import LeafCode from "./LeafComponents/LeafCode";
// ToolBar component
//import HoveringToolbar from "./Toolbar/HoveringToolbar";

type CustomElement = {type: "paragraph" | "code"; children: CustomText[]};
type CustomText = {text: string; bold?: boolean; language?: string};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const getLength = (token) => {
  if (typeof token === "string") {
    return token.length;
  } else if (typeof token.content === "string") {
    return token.content.length;
  } else {
    return token.content.reduce((l, t) => l + getLength(t), 0);
  }
};

const serialize = (node) => {
  if (Text.isText(node)) {
    let string = escapeHtml(node.text);

    if (node.bold) {
      string = `<strong>${string}</strong>`;
    }

    return string;
  }

  const children = node.children.map((n) => serialize(n)).join("");

  switch (node.type) {
    case "quote":
      return `<blockquote><p>${children}</p></blockquote>`;
    case "paragraph":
      var str = "";

      children == "" ? (str = `<br/>`) : (str = `<p>${children}</p>`);

      return str;
    case "link":
      return `<a href="${escapeHtml(node.url)}">${children}</a>`;
    case "code":
      var str = "";

      children == ""
        ? (str = `<pre style="background-color: #252c3c;"><br/></pre>`)
        : (str = `<pre style="background-color: #252c3c;"><code>${children}</code></pre>`);

      return str;
    default:
      return children;
  }
};

const serializeblock = (node) => {
  const blocks = [];

  let languageText = "text";
  let typeText = "paragraph";

  let bloques = [];

  node.children.map((line) => {
    if (line.language != languageText) {
      blocks.push({
        language: languageText,
        childrens: bloques,
        type: typeText,
      });

      languageText = line.language;
      bloques = [];
      typeText = line.type;
    }

    bloques.push(line);
  });

  blocks.push({
    language: languageText,
    childrens: bloques,
    type: typeText,
  });

  return blocks;
};
const parseblock = (body: Array<any>) => {
  if (!body) return null;
  const blocks: Array<any> = [];

  body.map((bloque) => {
    blocks.push(...bloque.childrens);
  });
  

  return blocks;
}

// Define set of helpers.
const CustomEditor = {
  undo(editor) {
    editor.undo();
  },

  redo(editor) {
    editor.redo();
  },

  save(editor) {
    const html = serializeblock(editor);

    return html;
    // return JSON.parse(localStorage.getItem("content"));
  },

  reset(editor) {
    editor.children = [
      {
        type: "paragraph",
        language: "text",
        children: [{text: "A line of text in a paragraph."}],
      },
    ];

    editor.onChange();
  },

  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);

    Transforms.setNodes(
      editor,
      {bold: isActive ? null : true},
      {match: (n) => Text.isText(n), split: true},
    );
  },

  toggleCodeBlock(editor, language) {
    const isActive = CustomEditor.isCodeBlockActive(editor);

    Transforms.setNodes(
      editor,
      {type: isActive ? "paragraph" : "code", language: isActive ? "text" : language},
      {match: (n) => Editor.isBlock(editor, n)},
    );
  },
};

interface SlateEditorProps {
  onSave(log: Object): void;
  body?: Array<any>;
  name?: String;
}

const SlateEditor = (Props: SlateEditorProps) => {
  const progressColor = useColorModeValue("gray.100", "whiteAlpha.300");
  // tracks changes to the Slate value state over time, and enables undo and redo functionality.
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [language, setLanguage] = useState("text");
  const name = Props.name || "inputEditorContent";

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    if (typeof props.children.props.parent === "undefined") {
      return <LeafText {...props} />;
    }

    switch (props.children.props.parent.type) {
      case "code":
        return <LeafCode {...props} />;
      default:
        return <LeafText {...props} />;
    }
  }, []);

  // decorate function depends on the language selected
  const decorate = useCallback(
    ([node, path]) => {
      const ranges = [];

      if (node.type != "code") {
        return ranges;
      }
      const tokens = Prism.tokenize(
        node.children[0].text,
        Prism.languages[node.language ? node.language : language],
      );

      let start = 0;

      for (const token of tokens) {
        const length = getLength(token);
        const end = start + length;

        if (typeof token !== "string") {
          ranges.push({
            [token.type]: true,
            anchor: {path, offset: start},
            focus: {path, offset: end},
          });
        }

        start = end;
      }

      return ranges;
    },
    [language],
  );

  const initialValue: Descendant[] = useMemo(
    () =>
      parseblock(Props.body) ||
      JSON.parse(localStorage.getItem(name)) || [
        {
          type: "paragraph",
          language: "text",
          children: [{ text: "" }],
        },
      ],
    []
  );

  return (
    <Container fontSize="xl" fontWeight="500">
      <Slate
        editor={editor}
        value={initialValue}
        onChange={(value) => {
          const isAstChange = editor.operations.some((op) => "set_selection" !== op.type);

          if (isAstChange) {
            // Save the value to Local Storage.
            const content = JSON.stringify(value);

            localStorage.setItem(name, content);
          }
        }}
      >
        {/* <HoveringToolbar /> */}
        <Editable
          decorate={decorate}
          placeholder="Type something"
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          // Pass in the `renderElement` function.
          renderPlaceholder={({children, attributes}) => (
            <span {...attributes}>
              <span>{children}</span>
              <br />
              <code>Use the editor to push a log!</code>
            </span>
          )}
          // Pass in the `renderLeaf` function.
          onKeyDown={(event) => {
            if (!event.ctrlKey) {
              return;
            }

            // Replace the `onKeyDown` logic with our new commands.
            switch (event.key) {
              case "<": {
                event.preventDefault();
                CustomEditor.toggleCodeBlock(editor, language);
                break;
              }

              case "b": {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
                break;
              }
            }
          }}
        />
        <Stack
          alignItems="center"
          bottom="-1px"
          className="backgroundColor"
          direction="row"
          justifyContent="space-between"
          paddingTop="0.5"
          position="sticky"
        >
          <Wrap>
            <WrapItem>
              <IconButton
                aria-label="Clear editor"
                bgColor="unset"
                color="primary.500"
                fontSize="2xl"
                height={8}
                icon={<AiOutlineClear />}
                minWidth={8}
                onClick={(event) => {
                  event.preventDefault();
                  CustomEditor.reset(editor);
                }}
              />
            </WrapItem>
            <WrapItem>
              <IconButton
                aria-label="Date editor"
                bgColor="unset"
                color="primary.500"
                fontSize="2xl"
                height={8}
                icon={<AiOutlineCalendar />}
                minWidth={8}
              />
            </WrapItem>
            <WrapItem
              onMouseDown={(event) => {
                event.preventDefault();
                CustomEditor.toggleBoldMark(editor);
              }}
            >
              <IconButton
                aria-label="Bold text"
                bgColor="unset"
                color="primary.500"
                fontSize="2xl"
                height={8}
                icon={<AiOutlineBold />}
                minWidth={8}
              />
            </WrapItem>
            <WrapItem />
          </Wrap>
          <Stack direction="row">
            <Stack alignItems="center" direction="row" divider={<StackDivider />} spacing={4}>
              <Select
                color="primary.500"
                fontWeight="bold"
                icon={<AiFillCaretDown />}
                size="md"
                style={{float: "right"}}
                value={language}
                onChange={(event) => {
                  setLanguage(event.target.value);
                }}
                onFocus={(event) => {
                  event.preventDefault();
                  if (event.relatedTarget) {
                    // Revert focus back to previous blurring element
                    event.relatedTarget.focus();
                  } else {
                    // No previous focus target, blur instead
                    event.currentTarget.blur();
                  }
                }}
              >
                <option value="text">Text</option>
                <option value="js">JavaScript</option>
                <option value="css">CSS</option>
                <option value="html">HTML</option>
                <option value="python">Python</option>
                <option value="sql">SQL</option>
                <option value="java">Java</option>
                <option value="php">PHP</option>
                <option value="csharp">C#</option>
              </Select>
              <CircularProgress
                color="primary.500"
                size={6}
                trackColor={progressColor}
                value={20}
              />
              <IconButton
                aria-label="add twitt"
                colorScheme="primary"
                height={8}
                icon={<FaPlus />}
                minWidth={8}
                variant="outline"
                width={8}
              />
            </Stack>
            <Button
              colorScheme="primary"
              onClick={() => {
                var html = CustomEditor.save(editor);

                if (html[0].childrens.length == 1 && html[0].childrens[0].children[0].text == "") {
                  console.log("vacio");
                } else {
                  Props.onSave(html);
                }
              }}
            >
              Push
            </Button>
          </Stack>
        </Stack>
      </Slate>
    </Container>
  );
};

export default SlateEditor;
