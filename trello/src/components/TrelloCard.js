import React from "react";
import { Card } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
const TrelloCard = ({ text }) => {
  return (
    <Card style={styles.CardContainer}>
      <CardContent>
        <Typography gutterBottom>{text}</Typography>
      </CardContent>
    </Card>
  );
};
const styles = {
  CardContainer: {
    marginBottom: 8,
  },
};
export default TrelloCard;
