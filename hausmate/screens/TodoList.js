import React from "react";
import "./TodoList.css";
import TextField from "@material-ui/core/TextField";
import { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
//import { db } from "./firebase_config";
import firebase from "firebase/app";
import TodoListItem from "./Todo";

const firestore = firebase.firestore();

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(() => {
    getTodos();
  }, []);

  function getTodos() {
    firestore.collection("todos").onSnapshot(function (querySnapshot) {
      setTodos(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          todo: doc.data().todo,
          inprogress: doc.data().inprogress,
        }))
      );
    });
  }

  function addTodo(e) {
    e.preventDefault();

    firestore.collection("todos").add({
      inprogress: true,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      todo: todoInput,
    });

    setTodoInput("");
  }

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <div>
          <FormControl>
            <InputLabel>Write a To-do!</InputLabel>
            <Input
              value={todoInput}
              onChange={(event) => {
                setTodoInput(event.target.value);
              }}
            ></Input>
          </FormControl>
          <Button
            disabled={!todoInput}
            type="submit"
            onClick={addTodo}
            variant="contained"
            color="primary"
            style={{ paddingTop: "20px" }}
          >
            Add To-do
          </Button>
        </div>

        <div style={{ width: "90vw", maxWidth: "500px", marginTop: "24px" }}>
          {todos.map((todo) => (
            <TodoListItem
              todo={todo.todo}
              inprogress={todo.inprogress}
              id={todo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TodoList;

/*
<TextField
            id="standard-basic"
            label="Write a Todo"
            value={todoInput}
            style={{ width: "90vw", maxWidth: "500px" }}
            onChange={(e) => setTodoInput(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            onClick={addTodo}
            style={{ display: "none" }}
          >
            Default
          </Button>
*/
