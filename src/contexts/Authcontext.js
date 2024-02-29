import { createContext, useState } from "react";

export const authContext = createContext();

export function AuthContextProvider({ children }) {
  const [isLoggin, setIsLoggin] = useState(!!localStorage.getItem("token"));
  return (
    <authContext.Provider value={{ isLoggin, setIsLoggin }}>
      {children}
    </authContext.Provider>
  );
}
