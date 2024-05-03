import React, { createContext, useContext, useState } from 'react';

const SelectedUidContext = createContext(null);

export const useSelectedUid = () => useContext(SelectedUidContext);

export const SelectedUidProvider = ({ children }) => {
  const [selectedUidData, setSelectedUidData] = useState({
    selectedUid: null,
    donationType: null,
    amount: null,
    title: null,
    description: null,
    dispensed: null,
  });

  return (
    <SelectedUidContext.Provider value={{ selectedUidData, setSelectedUidData }}>
      {children}
    </SelectedUidContext.Provider>
  );
};