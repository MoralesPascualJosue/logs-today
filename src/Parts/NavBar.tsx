import React from "react";
import {Show, Icon, Stack, StackProps, Text} from "@chakra-ui/react";
import {Link, useLocation} from "react-router-dom";
import {BiHash, BiBell, BiEnvelope, BiBookmark, BiListUl, BiUser} from "react-icons/bi";
import {IoEllipsisHorizontalCircleOutline, IoHomeSharp, IoHomeOutline} from "react-icons/io5";
import {IconType} from "react-icons";

interface ListLink {
  href: String;
  text: String;
  activeIcon: IconType;
  inactiveIcon: IconType;
}

const LINKS: ListLink[] = [
  {
    href: "/home",
    text: "Inicio",
    activeIcon: IoHomeSharp,
    inactiveIcon: IoHomeOutline,
  },
  {
    href: "/explorer",
    text: "Explorar",
    activeIcon: BiHash,
    inactiveIcon: BiHash,
  },
  {
    href: "/notifications",
    text: "Notificaciones",
    activeIcon: BiBell,
    inactiveIcon: BiBell,
  },
  {
    href: "/messages",
    text: "Mensajes",
    activeIcon: BiEnvelope,
    inactiveIcon: BiEnvelope,
  },
  {
    href: "/save",
    text: "Guardados",
    activeIcon: BiBookmark,
    inactiveIcon: BiBookmark,
  },
  {
    href: "/list",
    text: "Listas",
    activeIcon: BiListUl,
    inactiveIcon: BiListUl,
  },
  {
    href: "/options",
    text: "Más opciones",
    activeIcon: IoEllipsisHorizontalCircleOutline,
    inactiveIcon: IoEllipsisHorizontalCircleOutline,
  },
];

const NavBar: React.FC<StackProps> = (props) => {
  const {pathname} = useLocation();

  return (
    <Stack spacing={5} {...props}>
      {LINKS.map((link) => (
        <Link key={link.href} to={link.href}>
          <Stack
            alignItems="center"
            color={pathname == link.href ? "primary.500" : "inherit"}
            direction="row"
            spacing={6}
          >
            <Icon
              as={pathname == link.href ? link.activeIcon : link.inactiveIcon}
              height={6}
              width={6}
            />
            <Show above="xl">
              <Text fontSize="lg" fontWeight="bold">
                {link.text}
              </Text>
            </Show>
          </Stack>
        </Link>
      ))}
    </Stack>
  );
};

export default NavBar;
