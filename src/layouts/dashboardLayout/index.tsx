import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Flex, List, ListItem } from "@chakra-ui/layout";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { RiMapPin5Line } from "react-icons/ri";
import { BsGear } from "react-icons/bs";
import { Box, Icon } from "@chakra-ui/react"
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { ReactNode, RefObject, useRef } from "react";
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
          <DrawerBody >
            <List spacing={3}>
              <ListItem>
                <a href=""><Icon as={FaUserAlt} mr="3"/>Meu perfil</a>
              </ListItem>
              <ListItem>
                <a href=""><Icon as={MdOutlineDashboard} mr="3"/>Dashboard</a>
              </ListItem>
              <ListItem>
                <a href=""><Icon as={RiMapPin5Line} mr="3"/>Mapa</a>
              </ListItem>
              <ListItem>
                <a href=""><Icon as={BsGear} mr="3"/>Configurações</a>
              </ListItem>
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
