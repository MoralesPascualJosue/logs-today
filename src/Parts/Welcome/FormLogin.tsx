import {Container, Button, Text, useToast} from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";

import InputTextAnimate from "../../Components/InputTextAnimate";
import {  useLoginMutation } from "../../Features/Api/ApiSlice";
// import useAuth from "../../Features/Auth/Hooks/useAuth";
import { emailErrorValidation } from "../../Utils/FormErrorValidation";
import { useAppDispatch, useAppSelector } from "../../Store/Hooks";
import {selectCurrentUser, isLoggedUser, setCredentials} from "../../Features/Auth/Store/AuthSlice"

const FormLogin = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  // const toast = useToast();
  // const {isLogginLoading, hasLoginError, errorMessage} = useAuth();
  let { from } = location.state || { from: { pathname: "/home" } };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleemailChange = (e) => setEmail(e.target.value);
  const handlepasswordChange = (e) => setPassword(e.target.value);

  const isErrorEmail = emailErrorValidation(email);
  const isErrorPassword = password === "";
  const valide = isErrorEmail || isErrorPassword;

  const user = useAppSelector(selectCurrentUser);
  const isLogged = useAppSelector(isLoggedUser);

  const [
    login,
    {
      isLoading,
    isSuccess,
    isError,
    error}
  ] = useLoginMutation();

  useEffect(() => {
    if (isLogged) history.replace(from);    
  }, [isLogged, history]);

const submitLogin = async () => {
  // login({ email, password });
  
    try {
      const credentials = await login({ email, password }).unwrap();
      // Being that the result is handled in extraReducers in authSlice,
      // we know that we're authenticated after this, so the user
      // and token will be present in the store
      console.log("you are logged");
      dispatch(setCredentials(credentials));
      
    } catch (err) {
      // toast({
      //   status: "error",
      //   title: "Error",
      //   description: "Oh no, there was an error!",
      //   isClosable: true,
      // });
    }
    // login({email, password});
  };

  return (
    <Container alignSelf="end" p={2}>
      <InputTextAnimate
        helperText="We'll never share your email"
        inputProps={{
          type: "email",
          value: email,
          onChange: handleemailChange,
        }}
        isError={isErrorEmail}
        labelText="Email"
        onErrorMessage="Email is required !!"
      />
      <InputTextAnimate
        helperText="Character 8+"
        inputProps={{
          type: "password",
          value: password,
          onChange: handlepasswordChange,
        }}
        isError={isErrorPassword}
        labelText="Password"
        onErrorMessage="Password is required !!"
      />
      <Button
        backgroundColor="green.500"
        isDisabled={valide}
        isLoading={isLoading}
        loadingText="Sending"
        size="md"
        onClick={submitLogin}
      >
        Log in
      </Button>
      {isError && (
        <Text color="red.500" p={5}>
          {error.error?error.error: error.data.message}
        </Text>
      )}
    </Container>
  );
};

export default FormLogin;
