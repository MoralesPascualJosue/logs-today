import React, {useState, createContext} from "react";

interface AuthContext {
  auth?: any;
  setAuth?: any;
  stateMsg?: String;
  setStateMsg?: any;
}
const AuthContext = createContext<Partial<AuthContext>>({});

export const AuthContextProvider = ({children}: any) => {
  const [auth, setAuth] = useState(() => {
    return JSON.parse(localStorage.getItem("auth") || "{}");
  });
  const [stateMsg, setStateMsg] = useState("");

  return (
    <AuthContext.Provider value={{auth, setAuth, stateMsg, setStateMsg}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
