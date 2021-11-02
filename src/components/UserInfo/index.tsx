import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { Wrap, WrapItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { SignUpForm } from "../SignUpForm";
import { Stack } from "@chakra-ui/layout";
import { MdModeEdit } from "react-icons/md";
import { MapContext } from "../../contexts/MapContenxt";

// import { Container } from './styles';

const UserInfo = () => {
  const { user } = useContext(AuthContext);
  // const { handleSetPosition } = useContext(MapContext);

  // useEffect(() => {
  //   handleSetPosition({
  //     lat: user?.lat,
  //     long: user?.long
  //   });
  // }, []);
  
  return (
    <Container maxW="90%" centerContent mt="4">
      <Flex padding="4" w="100%" direction="column" alignItems="center">
        <Avatar
          size="2xl"
          name={`${user.first_name} ${user.last_name}`}
          border="4px"
          borderColor="gray.50"
        >

        </Avatar>
        <Box
          w="100%"
          borderRadius="10"
          mt="-55"
          pb="5"
          bgGradient="linear(to-br, #342c9c, #120650)"
        >
          <Flex mt="20" px={50} justifyContent="center">
            <SignUpForm labelColor="white" fillForm={user} />
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default UserInfo;
