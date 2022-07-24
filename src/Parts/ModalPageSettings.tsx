import React, {useEffect, useState} from "react";
import {Container, Spinner, useColorModeValue, useDisclosure} from "@chakra-ui/react";

import ModalLayout from "../Components/ModalLayout";
import Settings from "../Pages/Settings";
import { useHistory } from "react-router-dom";

const ModalPageSettings = () => {
  const [ready, setReady] = useState<Boolean>(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const bgcolor = useColorModeValue("gray.200", "gray.700");
  const color = useColorModeValue("primary.500", undefined);
  const history = useHistory();

    useEffect(() => {
        onOpen();
        setReady(true);
    }, [])

    const back = () => {        
      onClose();
      history.goBack();
    };
    

    return (
    <ModalLayout isCentered={false} isOpen={isOpen} size="full" title="Settings" onClose={back}>
      {ready ? (
        <Container
          alignItems="center"
          display="flex"
          flexDirection="column"
          maxHeight="100%"
          maxWidth="container.xl"
          padding={0}
        >
          <Settings />
        </Container>
      ) : (
        <Spinner
          alignSelf="center"
          color={color}
          emptyColor={bgcolor}
          marginTop="10"
          size="xl"
          speed="0.65s"
          thickness="4px"
        />
      )}
    </ModalLayout>
  );
};

export default ModalPageSettings;
