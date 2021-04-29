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
        {
          <img
            src={
              className === sent
                ? "https://scontent-lax3-1.cdninstagram.com/v/t51.2885-19/s150x150/118577194_645907619663595_8572174081709089933_n.jpg?tp=1&_nc_ht=scontent-lax3-1.cdninstagram.com&_nc_ohc=JlLiuXS_Mg0AX8sLGVF&edm=ABfd0MgBAAAA&ccb=7-4&oh=1c53dcc2200ed30a2aeec8c2b6c91f1e&oe=60ADC5E7&_nc_sid=7bff83"
                : "https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/44452996_333100514132084_7206387791867936768_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=09cbfe&_nc_ohc=2PxJMGa9FA4AX_DYHlS&_nc_ht=scontent-lax3-1.xx&oh=582d30a89cd3162e34cb9389f219d23b&oe=60B06BA2"
            }
          />
        }
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
