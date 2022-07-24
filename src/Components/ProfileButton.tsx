import React from "react";
import {Stack, StackProps, Show, Image, Text, useColorModeValue, Icon} from "@chakra-ui/react";
import {IoEllipsisHorizontal} from "react-icons/io5";
import {Link, useLocation} from "react-router-dom";

import logo from "../resources/short.svg";

const ProfileButton: React.FC<StackProps> = (props) => {
  const logoColor = useColorModeValue("primary.500", "whiteAlpha.800");
  const location = useLocation();

  return (
    <Link
      to={{
        pathname: `/settings`,
        // This is the trick! This link sets
        // the `background` in location state.
        state: {background: location},
      }}
    >
      <Stack
        _hover={{backgroundColor: logoColor}}
        alignItems="center"
        borderRadius={40}
        className="contrastBackgroundColor"
        direction="row"
        justifyContent="space-between"
        padding={2}
        {...props}
      >
        <Icon as={IoEllipsisHorizontal} />
        <Show above="xl">
          <Stack alignItems="center" direction="row">
            <Stack spacing={0}>
              <Text fontWeight="bold">Bin.josue</Text>
              <Text color="white.600" fontSize="sm">
                @Bin
              </Text>
            </Stack>

            <Image
              alt="Perfil"
              backgroundColor={logoColor}
              borderRadius="50%"
              height={{base: 6, xl: 10}}
              objectFit="cover"
              src={logo}
              width={{base: 6, xl: 10}}
            />
          </Stack>
        </Show>
      </Stack>
    </Link>
  );
};

export default ProfileButton;
