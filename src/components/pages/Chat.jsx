import React, { useState, useContext, useEffect } from "react";
import "./Chat.css";
import { SigninContext } from "../../contexts/SigninContext";
import { useSelectedChat } from "../../contexts/ChatContext";
import { db } from "../../index";
import { updateDoc, doc, onSnapshot, setDoc, getDoc, arrayUnion } from "firebase/firestore";

function Chat() {
  const { selectedChat, r, n} = useSelectedChat();
  const chatID = selectedChat.chatID;
  const recepient = selectedChat.recepientid;
  const recName = selectedChat.recName;

  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const { currentUser } = useContext(SigninContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatID), (doc) => {
      if (doc.exists() && doc.data().messages != []){
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [chatID]);

  console.log(messages)

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue.trim() !== "") {
      const newMessage = {
        text: formValue,
        sender: currentUser.username,
      };
  
      // Update Firestore document
      try {
        const chatDocRef = doc(db, "chats", chatID);
        await updateDoc(chatDocRef, {
          messages: [...messages, newMessage]
        });

      const userChatsDocRef = doc(db, "userChats", currentUser.uid);
      const userChatsDocSnapshot = await getDoc(userChatsDocRef);

      if (userChatsDocSnapshot.exists()) {
        const userChatsData = userChatsDocSnapshot.data();
        const existingChats = userChatsData.chats || [];
        
        // Add chat ID if it doesn't already exist
        if (!existingChats.includes(chatID)) {
          await updateDoc(userChatsDocRef, {
            chats: arrayUnion(chatID)
          });
        }
      } else {
        // Create new userChats document and add chat ID
        await setDoc(userChatsDocRef, { chats: [chatID] });
      }

      const recepientRef = doc(db, "userChats", recepient);
      const recSnap = await getDoc(recepientRef);

      if (recSnap.exists()) {
        const recData = recSnap.data();
        const rExist = recData.chats || [];

        if(!rExist.includes(chatID)){
          await updateDoc(recepientRef, {
            chats: arrayUnion(chatID)
          });
        }
      } else {
        await setDoc(recepientRef, { chats: [chatID] });
      }


        setFormValue("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  

  return (
    <div className="chat-container">
      <h1>Chat Room</h1>
      <h2>{recName}</h2>
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
        {messages != [] && messages.map((msg, index) => (
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