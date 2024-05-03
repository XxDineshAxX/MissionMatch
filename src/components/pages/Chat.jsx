import React, { useState } from "react";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (formValue.trim() !== "") {
      const newMessage = {
        text: formValue,
        sender: "User",
      };
      setMessages([...messages, newMessage]);
      setFormValue("");
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat Room</h1>
      <div className="chat">
        <section>
          <ChatRoom
            messages={messages}
            formValue={formValue}
            setFormValue={setFormValue}
            sendMessage={sendMessage}
          />
        </section>
      </div>
    </div>
  );
}

function ChatRoom({ messages, formValue, setFormValue, sendMessage }) {
  return (
    <>
      <main>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
      </main>
      <div className="form-wrapper">
        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Enter Message"
          />
          <button type="submit" disabled={!formValue}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

function ChatMessage({ message }) {
  return (
    <div className="message">
      <p>
        {message.sender}: {message.text}
      </p>
    </div>
  );
}

export default Chat;
