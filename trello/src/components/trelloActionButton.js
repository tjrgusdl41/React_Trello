import React, { useState } from "react";
import { Icon } from "@material-ui/core";
const TrelloActionButton = ({ list }) => {
  const [state, setState] = useState(false);
  const renderForm = () => {
    return <div>hello</div>;
  };
  const renderAddbutton = () => {
    const buttonText = list ? "Add another list" : "Add another Card";
    const buttonTextOpacity = list ? 1 : 0.5;
    const buttonTextColor = list ? "white" : "inherit";
    const buttonTextBackgroud = list ? "rgba(0,0,0,.15)" : "inherit";
    return (
      <div
        onClick={() => {
          setState(true);
        }}
        style={{
          ...styles.openFormButtonGroup,
          opacity: buttonTextOpacity,
          color: buttonTextColor,
          backgroundColor: buttonTextBackgroud,
        }}
      >
        <Icon>add</Icon>
        <p>{buttonText}</p>
      </div>
    );
  };
  return state ? renderForm() : renderAddbutton();
};
const styles = {
  openFormButtonGroup: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: 3,
    height: 36,
    width: 272,
    paddingLeft: 10,
  },
};

export default TrelloActionButton;
