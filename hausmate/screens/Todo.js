import React from "react";
import {
  ListItem,
  ListItemText,
  Button,
  List,
  ListItemAvatar,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";

const firestore = firebase.firestore();

export default function TodoListItem({ todo, inprogress, id }) {
  function toggleInProgress() {
    firestore.collection("todos").doc(id).update({
      inprogress: !inprogress,
    });
  }

  function deleteTodo() {
    firestore.collection("todos").doc(id).delete();
  }

  return (
    <List className="listItem" style={{ height: "80px", width: "600px" }}>
      <ListItem style={{ height: "80px" }}>
        <ListItemAvatar></ListItemAvatar>
        <ListItemText
          primary={todo}
          secondary={inprogress ? "🕒 In Progress" : "✔️ Completed"}
        />
      </ListItem>
      <div className="Buttons">
        <Button onClick={toggleInProgress}>
          {inprogress ? "✔️ Done" : "✖️ UnDone"}
        </Button>
        <Button onClick={deleteTodo}>❌ Delete</Button>
      </div>
    </List>
  );
}
