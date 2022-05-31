import { IconButton } from '@chakra-ui/button';
import { Flex, Link } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import { BiMenu } from 'react-icons/bi'
import {AuthContext} from '../../contexts/AuthContext'

interface NavBarProps {
    onOpen: () => void;
}

const NavBar = ({onOpen}:NavBarProps) => {
  const { signOut } = useContext(AuthContext)

  return (
      <Flex h="7vh" px="4" bg="gray.900" alignItems="center" justifyContent="space-between">
          <IconButton
            fontSize="30px"
            colorScheme="gray.900"
            aria-label="open menu"
            icon={<BiMenu/>}
            onClick={onOpen}
          />
          <Link color='white' onClick={signOut}>Sair</Link>


      </Flex>
  );
}

export default NavBar;