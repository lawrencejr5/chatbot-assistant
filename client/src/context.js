import React, { createContext, useContext, useState, useEffect } from "react";
import { jokes, quotes } from "./data";

const AppContext = createContext();
const ContextApp = ({ children }) => {
  return <AppContext.Provider value={{}}>{children}</AppContext.Provider>;
};
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { ContextApp, useGlobalContext };
