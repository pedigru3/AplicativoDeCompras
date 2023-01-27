import React from "react";
import { ItemContextProvider } from "./item/context";

const GlobalContext: React.FC<any> = ({ children }) => (
  <ItemContextProvider>{children}</ItemContextProvider>
);

export default GlobalContext;
