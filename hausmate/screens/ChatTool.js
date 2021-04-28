import { useRef, useState } from "react";
import React from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./ChatTool.css";

const firestore = firebase.firestore();
const auth = firebase.auth();

function ChatMessage(props) {
  const { text, uid } = props.message;
  const [user] = useAuthState(auth);

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img
          src={
            "https://cnet1.cbsistatic.com/img/hexvS3BuwnRL8ecpa19ZqsHZTWY=/1200x675/2021/02/09/62a82602-5227-4b0c-875c-302af79cc49e/zoomcat.jpg"
          }
        />
        <p>{text}</p>
      </div>
    </>
  );
}

export default function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Chat"
        />

        <button type="submit" disabled={!formValue}>
          Enter
        </button>
      </form>
    </>
  );
}
