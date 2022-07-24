import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose(): any;
  children: React.ReactNode;
  isCentered: boolean;
  title: string;
  size:
    | (string & {})
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "full"
    | undefined;
  finalFocusRef?: React.RefObject<HTMLParagraphElement>;
}

const ModalLayout = (props: ModalLayoutProps) => {
  return (
    <Modal {...props}>
      <ModalOverlay backdropBlur="2px" backdropFilter="auto" bg="blackAlpha.600" />
      <ModalContent>
        <ModalHeader>
          {props.title ? props.title : ""}
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ModalLayout;
