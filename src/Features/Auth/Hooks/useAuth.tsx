import {useCallback, useContext, useState} from "react";

import AuthContext from "../../../Context/AuthContext";
import AuthService from "../Services/AuthService";
import { useAppSelector} from "../../../Store/Hooks";
import {selectCurrentUser,isLoggedUser} from "../../../Features/Auth/Store/AuthSlice";

export default function useAuth() {
  const {auth, setAuth,stateMsg, setStateMsg} = useContext(AuthContext);
  const [state, setState] = useState({
    loading: false,
    error: false,
    errorMessage: "",
  });
  
  const user = useAppSelector(selectCurrentUser);
  const isLogged = useAppSelector(isLoggedUser);

  const login = useCallback(
    ({ email, password }) => {      
      setStateMsg("");
      setState({loading: true, error: false, errorMessage: ""});
      AuthService.login({email, password})
        .then((auth) => {
          localStorage.setItem("auth", JSON.stringify(auth));
          setState({loading: false, error: false, errorMessage: ""});
          setAuth(auth);
        })
        .catch((err) => {
          localStorage.removeItem("auth");
          setState({loading: false, error: true, errorMessage: err.message});
        });
    },
    [setAuth],
  );

  const logout = useCallback(() => {
    setStateMsg("");
    AuthService.logout()
      .then((auth) => {
        localStorage.removeItem("auth");
        setAuth({});
      })
      .catch((err) => {
        console.log(err);
      });
    
        localStorage.removeItem("auth");
        setAuth({});
  }, [setAuth]);

  const refresh = useCallback(() => {
    setStateMsg("");
    setState({loading: true, error: false, errorMessage: ""});
   return  AuthService.refresh(auth.accessToken, auth.refreshToken)
      .then((nauth) => {
        localStorage.setItem("auth", JSON.stringify(nauth));
        setState({loading: false, error: false, errorMessage: ""});
        setAuth(nauth);
        return {
          accessToken: nauth.accessToken,
          refreshToken: nauth.refreshToken,
        };
      })
      .catch((err) => {
        localStorage.removeItem("auth");
        setStateMsg("Session Has Expired!!");
        setAuth({});

        throw { error: true, message: "Authorization failed !! " };
      });
  }, [setAuth]);

  const refreshPromise = () => {
    setStateMsg("");
    setState({ loading: true, error: false, errorMessage: "" });
    return AuthService.refresh(auth.accessToken, auth.refreshToken)
      .then((auth) => {
        localStorage.setItem("auth", JSON.stringify(auth));
        setState({ loading: false, error: false, errorMessage: "" });
        setAuth(auth);
        return { accessToken: auth.accessToken,refreshToken:  auth.refreshToken };
      })
      .catch((err) => {
        localStorage.removeItem("auth");
        setState({
          loading: false,
          error: true,
          errorMessage: "Session Has Expired!!",
        });
        setStateMsg("Session Has Expired!!");
        setAuth({});
        throw {error: true, message: "Authorization failed !! "};
      });
  };

  return {
    isLogged: isLogged,
    roles: user?.roles,
    user: user,
    jwt: auth.accessToken,
    token: auth.refreshToken,
    isLogginLoading: state.loading,
    hasLoginError: state.error || stateMsg != "",
    errorMessage: state.errorMessage != "" ? state.errorMessage : stateMsg,
    refreshPromise,
    refresh,
    login,
    logout,
  };
}
