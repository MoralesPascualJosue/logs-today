import {Container, Button, Text} from "@chakra-ui/react";
import React, {useState} from "react";

import InputTextAnimate from "../../Components/InputTextAnimate";
// import AuthService from "../../Features/Auth/Services/AuthService";
import {useRegisterMutation} from "../../Features/Api/ApiSlice";
import {emailErrorValidation, minChartErrorValidation} from "../../Utils/FormErrorValidation";

const FormRegister = () => {
  // const [state, setState] = useState({
  //   isLoading: false,
  //   hasError: false,
  //   errorMessage: "",
  //   success: false,
  // });
  const [register, {isLoading, isSuccess, isError, error}] = useRegisterMutation();

  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputName, setInputName] = useState("");
  const handleInputEmailChange = (e) => setInputEmail(e.target.value);
  const handleInputPasswordChange = (e) => setInputPassword(e.target.value);
  const handleInputNameChange = (e) => setInputName(e.target.value);

  const isErrorEmail = emailErrorValidation(inputEmail);
  const isErrorPassword = inputPassword === "";
  const isErrorName = minChartErrorValidation(inputName);

  const valide = isErrorEmail || isErrorPassword || isErrorName;

  const submitLogin = () => {
    // setState({
    //   isLoading: true,
    //   hasError: false,
    //   errorMessage: "",
    //   success: false,
    // });

    register({email: inputEmail, name: inputName, password: inputPassword});

    // AuthService.register({email: inputEmail, name: inputName, password: inputPassword})
    //   .then((response) => {
    //     setState({isLoading: false, hasError: false, errorMessage: "", success: true});
    //   })
    //   .catch((error) => {
    //     setState({
    //       isLoading: false,
    //       hasError: true,
    //       errorMessage: error.message,
    //       success: false,
    //     });
    //   });
  };

  if (isSuccess) {
    return <h3>Congratulations! You´ve been successfully registered.</h3>;
  }

  return (
    <Container alignSelf="end" p={2}>
      <InputTextAnimate
        helperText="We'll never share your email"
        inputProps={{
          type: "email",
          value: inputEmail,
          onChange: handleInputEmailChange,
        }}
        isError={isErrorEmail}
        labelText="Email"
        onErrorMessage="Email is required !!"
      />
      <InputTextAnimate
        helperText="Letters 8+"
        inputProps={{
          type: "text",
          value: inputName,
          onChange: handleInputNameChange,
        }}
        isError={isErrorName}
        labelText="Name"
        onErrorMessage="Name is required !!"
      />
      <InputTextAnimate
        helperText="Character 8+"
        inputProps={{
          type: "password",
          value: inputPassword,
          onChange: handleInputPasswordChange,
        }}
        isError={isErrorPassword}
        labelText="Password"
        onErrorMessage="Password is required !!"
      />
      <Button
        alignSelf="center"
        backgroundColor="blue.500"
        isDisabled={valide}
        isLoading={isLoading}
        onClick={submitLogin}
      >
        Register
      </Button>
      {isError && (
        <Text color="red.500" p={5}>
          {error.error ? error.error : error.data.message}
        </Text>
      )}
    </Container>
  );
};

export default FormRegister;
