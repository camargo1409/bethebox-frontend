import { IconButton } from '@chakra-ui/button';
import { Flex } from '@chakra-ui/layout';
import React from 'react';
import { BiMenu } from 'react-icons/bi'

interface NavBarProps {
    onOpen: () => void;
}

const NavBar = ({onOpen}:NavBarProps) => {
  return (
      <Flex h="7vh" px="4" bg="gray.900" alignItems="center">
          <IconButton
            fontSize="30px"
            colorScheme="gray.900"
            aria-label="open menu"
            icon={<BiMenu/>}
            onClick={onOpen}
          />


      </Flex>
  );
}

export default NavBar;