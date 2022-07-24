import React, {useState} from "react";
import {
  Box,
  Input,
  FormControl,
  FormHelperText,
  FormErrorMessage,
  FormLabel,
  InputProps,
} from "@chakra-ui/react";

interface InputTextAnimateProps {
  labelText: string;
  onErrorMessage?: string;
  helperText?: string;
  isError?: boolean;
  inputProps: InputProps;
}

const InputTextAnimate = (props: InputTextAnimateProps) => {
  return (
    <Box p={2} position="relative">
      <FormControl isRequired isInvalid={props.isError} variant="floating">
        <Input placeholder=" " {...props.inputProps} />
        {/* It is important that the Label comes after the Control due to css selectors */}
        <FormLabel className="backgroundColor">{props.labelText}</FormLabel>
        {!props.isError ? (
          <FormHelperText>{props.helperText}</FormHelperText>
        ) : (
          <FormErrorMessage>{props.onErrorMessage}</FormErrorMessage>
        )}
      </FormControl>
    </Box>
  );
};

export default InputTextAnimate;
