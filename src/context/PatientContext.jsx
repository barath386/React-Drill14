import React, { createContext, useState } from "react";

export const PatientContext = createContext(null);

export function PatientProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <PatientContext.Provider value={{ loggedUser, setLoggedUser }}>
      {children}
    </PatientContext.Provider>
  );
}