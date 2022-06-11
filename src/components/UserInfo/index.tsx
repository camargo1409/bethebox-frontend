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
import { SubmitHandler } from "react-hook-form";
import { api } from "../../config/axios";
import { toast } from "react-toastify";

// import { Container } from './styles';
interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
  address: string;
  state: string;
  city: string;
  available: boolean;
  cellphone: string;
}

const UserInfo = () => {
  const { user, setUserInfo } = useContext(AuthContext);
  const { position } = useContext(MapContext);

  const handleUserUpdate: SubmitHandler<SignUpFormData> = async (values) => {
    try {
      const { confirm_password, address, ...rest } = values;

      const { city } = rest;

      const [street, neighborhood] = address.split(",");
      console.log(street, neighborhood);

      const { data: updatedUser }: any = await api.put("/users", {
        ...rest,
        address: {
          street,
          neighborhood,
          city,
        },
        lat: position.lat,
        long: position.long,
      });

      setUserInfo(updatedUser);
      console.log(updatedUser);
      toast("Usuário atualizado com sucesso!");
    } catch (error: any) {
      toast(`Erro ao atualizar usuário!`);
    }
  };

  return (
    <Container maxW="90%" centerContent mt="4">
      <Flex padding="4" w="100%" direction="column" alignItems="center">
        <Avatar
          size="2xl"
          name={`${user.first_name} ${user.last_name}`}
          border="4px"
          borderColor="gray.50"
        ></Avatar>
        <Box
          w="100%"
          borderRadius="10"
          mt="-55"
          pb="5"
          bgGradient="linear(to-br, #342c9c, #120650)"
        >
          <Flex mt="20" px={50} justifyContent="center">
            <SignUpForm
              labelColor="white"
              fillForm={user}
              onSubmit={handleUserUpdate}
            />
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default UserInfo;
