import { useDisclosure } from "@chakra-ui/hooks";
import { Flex, List, ListItem, Link as ChakraLink } from "@chakra-ui/layout";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMapPin5Line } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";
import Link from "next/link";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { ReactNode, useRef } from "react";
import NavBar from "../../components/NavBar";

interface DashboardLayoutProps {
  children: ReactNode;
}
export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  return (
    <Flex minH="100vh" direction="column">
      <NavBar onOpen={onOpen} />
      {children}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader pt="6">Barra de navegação</DrawerHeader>
          <DrawerBody>
            <List spacing={3}>
              <ListItem>
                <Link href="/profile" passHref>
                  <ChakraLink>
                    <Icon as={FaUserAlt} mr="3" />
                    Meu perfil
                  </ChakraLink>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/dashboard" passHref>
                  <ChakraLink>
                    <Icon as={MdOutlineDashboard} mr="3" />
                    Dashboard
                  </ChakraLink>
                </Link>
              </ListItem>
              <ListItem>
                <Link href="/map" passHref>
                  <ChakraLink>
                    <Icon as={RiMapPin5Line} mr="3" />
                    Mapa
                  </ChakraLink>
                </Link>
              </ListItem>
              <ListItem>
                <a href="">
                  <Icon as={BsGear} mr="3" />
                  Configurações
                </a>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
