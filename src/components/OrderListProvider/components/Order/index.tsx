import {
  Box,
  Heading,
  Badge,
  Flex,
  Button,
  Text,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { toast } from "react-toastify";
import { api } from "../../../../config/axios";
import { AcceptOrderModal } from "../AcceptOrderModal";

interface OrderProps {
  request?: {
    id: string;
    title: string;
    address: string;
    provider_accepted: boolean;
    customer_confirmed: boolean;
    has_arrived: boolean;
    updated_at: string;
    customer: {
      first_name: string,
      last_name: string,
      address: string,
      city: string
    }
  };
}

export const Order = ({ request }: OrderProps) => {
  const isBase = useBreakpointValue({ base: true, sm: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(request);
  
  const getStatus = () => {
    if (request?.has_arrived) {
      return "Item finalizado!";
    }

    if (request?.customer_confirmed) {
      return "O cliente aceitou a proposta!";
    }

    if (request?.provider_accepted) {
      return "Aguardando confirmação do cliente";
    } else {
      return "Cliente aguardando sua confirmação";
    }
  };

  const setOrderAsHasArrived = async (id: number) => {
    try {
      const res = await api.put(`/requests/${id}?action=has_arrived`);
      toast("O cliente será informado que a encomenda chegou!");
      onClose();
    } catch (error: any) {
      toast(
        "Erro ao enviar status para o cliente. Por favor, tente novamente",
        {
          type: "error",
        }
      );
    }
  };

  const refuse = async (id: number) => {
    try {
      const res = await api.put(`/requests/${id}?action=refuse`);
      toast("A solicitação foi recusada com sucesso!");
    } catch (error: any) {
      toast(
        "Erro ao enviar status para o cliente. Por favor, tente novamente",
        {
          type: "error",
        }
      );
    }
  };
  
  return (
    <>
      <Box
        p={5}
        shadow="md"
        bg="blue.400"
        borderWidth="1px"
        borderColor="blue.400"
        borderRadius="5"
      >
        <Heading fontSize="lg">{request?.title}</Heading>
        <Text mt={2}>{request?.address}</Text>
        <Text mt={2}>
          <strong>Cliente: </strong>{request?.customer.first_name} {request?.customer.last_name}
        </Text>
        <Text mt={2}>
          <strong>Celular: </strong>(17) 99138-8001
        </Text>
        <Text mt={2}>
          <strong>Endereço: </strong>{request?.customer.address}
        </Text>
        <Text mt={2}>
          <strong>Cidade: </strong>{request?.customer.city}
        </Text>
        <Text mt={2}>
          <strong>Situação:</strong>
          <Badge variant="solid" colorScheme="orange" ml={1}>
            {getStatus()}
          </Badge>
        </Text>
        <Text mt={2}>
          <strong>Última atualização: </strong> {request?.updated_at}
        </Text>
        <Flex wrap="wrap">
          {!request?.provider_accepted && (
            <>
              <Button
                onClick={onOpen}
                mt="2"
                w={isBase ? "100%" : "auto"}
                colorScheme="green"
              >
                Aceitar e definir preço
              </Button>
              <Button
                mt="2"
                w={isBase ? "100%" : "auto"}
                ml={!isBase ? "2" : 0}
                onClick={() => refuse(Number(request?.id))}
                colorScheme="red"
              >
                Recusar
              </Button>
            </>
          )}
          {(request?.customer_confirmed && !request?.has_arrived) ? (
            <Button
              colorScheme="pink"
              mt={2}
              onClick={() => setOrderAsHasArrived(Number(request?.id))}
            >
              Informar que a encomenda chegou!
            </Button>
          ) : null}
        </Flex>
      </Box>
      <AcceptOrderModal
        id={Number(request?.id)}
        onClose={onClose}
        isOpen={isOpen}
      />
    </>
  );
};
