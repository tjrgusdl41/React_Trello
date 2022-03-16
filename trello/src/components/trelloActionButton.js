import React, { useState } from "react";
import { Icon } from "@material-ui/core";
import Textarea from "react-textarea-autosize";
import { Card } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { ExploreRounded } from "@material-ui/icons";
import { addList } from "../actions";
import { useDispatch } from "react-redux";
const TrelloActionButton = ({ list }) => {
  const [state, setState] = useState(false);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const renderForm = () => {
    const handleTextValue = (e) => {
      setText(e.target.value);
    };
    const Placeholder = list
      ? "Enter list title..."
      : "Enter a title for this card...";
    const buttonTitle = list ? "Add List" : "Add Card";
    const handleAddList = () => {
      if (text) {
        dispatch(addList(text));
      }
      return;
    };
    return (
      <div>
        <Card
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
          }}
        >
          <Textarea
            onChange={handleTextValue}
            placeholder={Placeholder}
            autoFocus
            onBlur={() => {
              setState(false);
            }}
            style={{
              resize: "none",
              overflow: "hidden",
              outline: "none",
              border: "none",
              width: "100%",
            }}
            value={text}
          />
        </Card>
        <div style={styles.formButtonGroup}>
          <Button
            onMouseDown={handleAddList}
            variant="contained"
            style={{ color: "white", backgroundColor: "#5aac44" }}
          >
            {buttonTitle}
          </Button>
          <Icon style={{ marginLeft: 8, cursor: "pointer" }}>close</Icon>
        </div>
      </div>
    );
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
  formButtonGroup: {
    marginTop: 8,
    display: "flex",
    alignItems: "center",
  },
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
