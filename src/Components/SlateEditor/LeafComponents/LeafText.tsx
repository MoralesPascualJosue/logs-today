import React from "react";
// Define a React component to render leaves with bold text.
const LeafText = (props) => {
  return (
    <span {...props.attributes} style={{fontWeight: props.leaf.bold ? "bold" : "normal"}}>
      {props.children}
    </span>
  );
};

export default LeafText;
