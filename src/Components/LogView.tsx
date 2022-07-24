import React, {useState} from "react";
import {motion} from "framer-motion";
import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  HStack,
  StackDivider,
  Avatar,
  Text,
  Container,
  Wrap,
  WrapItem,
  Heading,
  IconButton,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import {FaBookmark, FaPen, FaSave, FaTwitter, FaFacebook, FaInstagram} from "react-icons/fa";
import {GiOpenFolder} from "react-icons/gi";
import {Link as RouterLink} from "react-router-dom";

import Log from "../Features/Logs/Interfaces/Log";

import NodeViewCode from "./NodeViewCode";
import NodeViewDefault from "./NodeViewDefault";
import {ReactionButtons} from "./ReactionButtons";

interface LogInterface {
  Log: Log;
  onDeleted(log: string): any;
}

const LogView = (Props: LogInterface) => {
  const date = new Date(Number(Props.Log.idLog));
  const [ready, setReady] = useState<boolean>(true);
  const decoratorColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Stack
      key={Props.Log.id}
      animate={{scale: 1}}
      as={motion.div}
      border="1px solid"
      borderColor={decoratorColor}
      exit={{scale: 0}}
      initial={{scale: 0}}
      layoutId={String(Props.Log.id)}
      padding={5}
      spacing={4}
      onClick={() => {
        Props.onDeleted(Props.Log.id || "vacio");
      }}
    >
      {ready ? (
        <HStack alignItems="center" justifyContent="space-between" spacing={4}>
          <Stack direction="row">
            <Avatar
              name="Oshigaki Kisame"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fholatelcel.com%2Fwp-content%2Fuploads%2F2020%2F12%2Ffoto-perfil-whatsapp-.png&f=1&nofb=1"
            />
            <Stack justifyContent="space-between" spacing={0}>
              <Heading size="sm">Oshigaki Kisame</Heading>
              <Text as="time" size="sm">
                {/* Oct 5, 2020 at 18:22 */}
                {date.toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                at{" "}
                {date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </Stack>
          </Stack>
          <Wrap>
            <WrapItem>
              {Props.Log.reactions ? (
                <ReactionButtons idLog={String(Props.Log.id)} reactions={Props.Log.reactions} />
              ) : (
                ""
              )}
            </WrapItem>
            <WrapItem>
              <IconButton aria-label="twitter" fontSize="xl" icon={<FaTwitter />} variant="link" />
              <IconButton
                aria-label="facebook"
                fontSize="xl"
                icon={<FaFacebook />}
                variant="link"
              />
              <IconButton
                aria-label="instagram"
                fontSize="xl"
                icon={<FaInstagram />}
                variant="link"
              />
            </WrapItem>
            <WrapItem>
              <IconButton
                aria-label="Reader"
                color="orange.500"
                fontSize="7xl"
                icon={<FaBookmark />}
                variant="link"
              />
            </WrapItem>
          </Wrap>
        </HStack>
      ) : (
        <HStack alignItems="center" justifyContent="space-between" spacing={4}>
          <Stack direction="row">
            <SkeletonCircle height={12} width={12} />
            <Stack>
              <Skeleton height={6} width="120px" />
              <Skeleton height={3} width="80px" />
            </Stack>
          </Stack>
          <Wrap>
            <WrapItem>
              <SkeletonCircle height={12} width={12} />
            </WrapItem>
            <WrapItem>
              <SkeletonCircle height={12} width={12} />
            </WrapItem>
          </Wrap>
        </HStack>
      )}

      {ready ? (
        <Stack direction="row" spacing={0}>
          <Stack divider={<StackDivider borderColor={decoratorColor} />} spacing={10}>
            <Stack spacing={2}>
              <IconButton
                aria-label="Save"
                color="primary.500"
                fontSize="xl"
                icon={<FaSave />}
                variant="link"
              />
              <IconButton aria-label="files" fontSize="xl" icon={<GiOpenFolder />} variant="link" />
            </Stack>

            <Link
              _hover={{
                backgroundColor: decoratorColor,
              }}
              alignItems="center"
              as={RouterLink}
              display="flex"
              justifyContent="center"
              padding={2}
              to={`/logs/${Props.Log.id}`}
            >
              <FaPen width={4} />
            </Link>
          </Stack>
          <Container fontSize="xl" maxWidth="container.lg">
            {Props.Log.body.map((log, indexl) =>
              log.type == "code" ? (
                <NodeViewCode key={indexl} {...log} />
              ) : (
                <NodeViewDefault key={indexl} {...log} />
              ),
            )}
          </Container>
        </Stack>
      ) : (
        <SkeletonText height={32} noOfLines={6} />
      )}
    </Stack>
  );
};

export default LogView;
