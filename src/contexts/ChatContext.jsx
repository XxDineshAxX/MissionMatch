import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext(null);

export const useSelectedChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState({
    chatID: null,
    recepientID: null,
    recName: null,
  });

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};