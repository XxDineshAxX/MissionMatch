import React, { createContext, useState, useContext } from 'react';

const SelectedUidContext = createContext(null);

export const useSelectedUid = () => useContext(SelectedUidContext);

export const SelectedUidProvider = ({ children }) => {
  const [selectedUid, setSelectedUid] = useState(null);

  return (
    <SelectedUidContext.Provider value={{ selectedUid, setSelectedUid }}>
      {children}
    </SelectedUidContext.Provider>
  );
};