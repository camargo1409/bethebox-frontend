import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Table,
  TableCaption,
  Tbody,
  Thead,
  Tfoot,
  Td,
  Th,
  Tr,
  Text,
  Flex,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/avatar";
import { Button } from "@chakra-ui/button";
import { UserNearMeData } from "../Map";
import { useContext, useState } from "react";
import { RequestContext } from "../../contexts/RequestContext";
import { AuthContext } from "../../contexts/AuthContext";
import { api } from "../../config/axios";

interface RequestModalProps {
  user: UserNearMeData;
}

export const RequestModal = () => {
  const {
    requestModalIsOpen,
    onCloseRequestModal,
    selectedUser: user,
  } = useContext(RequestContext);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const createRequest = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/requests", {
        post_provider_id: user.id,
      });
      setIsLoading(false);
      onCloseRequestModal();
      toast({
        title: "Solicitação realizada com sucesso!",
        position: "top-right",
        isClosable: true,
        status: "success"
      })
    } catch (error:any) {
      setIsLoading(false);
      onCloseRequestModal();
      
      if(error.response.status >= 500){
        toast({
          title: "Houve algum erro ao realizar a solicitação!",
          position: "top-right",
          isClosable: true,
          status: "error"
        })
      }
      else{
        toast({
          title: error.response.data.msg,
          position: "top-right",
          isClosable: true,
          status: "warning"
        })
      }
    }
  };

  return (
    <Modal isOpen={requestModalIsOpen} onClose={onCloseRequestModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>informações de {user?.first_name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" alignItems="center">
            <HStack spacing="4">
              <Avatar
                size="xl"
                name={`${user?.first_name} ${user?.last_name}`}
              />
              <Flex direction="column">
                <Text fontWeight="bold" fontSize="3xl">
                  {user?.first_name}
                </Text>
                <Text fontSize="3xl" color="gray.300">
                  {user?.last_name}
                </Text>
              </Flex>
            </HStack>
            <Table variant="simple" mt="8">
              <TableCaption>Informações do provedor</TableCaption>
              <Thead></Thead>
              <Tbody>
                <Tr>
                  <Th>Email</Th>
                  <Td>{user?.email}</Td>
                </Tr>
                <Tr>
                  <Th>Cpf</Th>
                  <Td>{user?.cpf}</Td>
                </Tr>
                <Tr>
                  <Th>City</Th>
                  <Td>
                    {user?.city} - {user?.state}
                  </Td>
                </Tr>
                <Tr>
                  <Th>Address</Th>
                  <Td>{user?.address}</Td>
                </Tr>
              </Tbody>
              <Tfoot></Tfoot>
            </Table>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={isLoading}
            colorScheme="pink"
            onClick={() => createRequest()}
          >
            Solicitar contratação
          </Button>
          <Button variant="ghost" ml={3} onClick={onCloseRequestModal}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
