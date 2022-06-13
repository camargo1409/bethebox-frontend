import React, { useContext, useEffect, useState } from "react";
import {
  Stack,
  Box,
  Text,
  Heading,
  Center,
  Badge,
  Flex,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { api } from "../../config/axios";
import PopLocale from "../PopLocale";
import { toast } from "react-toastify";
import { RequestContext } from "../../contexts/RequestContext";

// import { Container } from './styles';

interface OrderListProps {
  requests: any[];
}
function Feature({ request }: any) {
  const isBase = useBreakpointValue({ base: true, sm: false });
  const { getRequests } = useContext(RequestContext);
  const acceptProposal = async (id: number) => {
    try {
      const res = await api.put(`/requests/${id}?action=hire_provider`);
      toast(
        "Você aceitou a proposta. Agora é só aguardar o provedor receber o seu pedido!"
      );
      getRequests();
    } catch (error: any) {
      toast("Erro ao enviar proposta. Por favor, tente novamente", {
        type: "error",
      });
    }
  };

  const getStatus = () => {
    if (request?.has_arrived) {
      return "Sua encomenda chegou! Você pode retirá-la no endereço do provedor ao efetuar o pagamento diretamente com ele!";
    }

    if (request?.customer_confirmed) {
      return "Aguardando recebimento da encomenda";
    }

    if (request?.provider_accepted) {
      return "Aceito pelo provedor";
    } else {
      return "Aguardando confirmação do provedor";
    }
  };

  const refuse = async (id: number) => {
    try {
      const res = await api.put(`/requests/${id}?action=refuse`);
      toast("A solicitação foi recusada com sucesso!");
      getRequests();
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
          <strong>Provedor: </strong>{request?.provider.first_name} {request?.provider.last_name}
        </Text>
        <Text mt={2}>
          <strong>Celular: </strong>(17) 99126-7046
        </Text>
        <Text mt={2}>
          <strong>Endereço: </strong>{request?.provider?.addresses[0]?.street}, {request?.provider?.addresses[0]?.neighborhood}
        </Text>
        <Text mt={2}>
          <strong>Cidade: </strong>{request?.provider.city}
        </Text>
        <Text mt={2}>
          <strong>Situação:</strong>
          <Badge variant="solid" colorScheme="orange" ml={1}>
            {getStatus()}
          </Badge>
        </Text>
        <Text mt={2}>
          <strong>Preço definido: </strong>{" "}
          {request?.service_price
            ? `R$ ${request?.service_price?.toFixed(2)}`
            : "Sem preço definido"}
        </Text>
        <Text mt={2}>
          <strong>Última atualização: </strong> {request?.updated_at}
        </Text>
        <Flex wrap="wrap">
          {(request?.provider_accepted && !request?.customer_confirmed) ? (
            <>
              <Button
                mt="2"
                w={isBase ? "100%" : "auto"}
                colorScheme="green"
                onClick={() => acceptProposal(request?.id)}
              >
                Contratar por R$ {request?.service_price?.toFixed(2)}
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
          ) : null}
        </Flex>
      </Box>
  );
}

export const OrderList = ({ requests }: OrderListProps) => {
  return (
    <Stack spacing={3}>
      <Text fontSize="2xl" fontWeight="bold">
        Controle de encomendas
      </Text>
      {!!requests?.length ? (
        requests?.map((request) => <Feature request={request} />)
      ) : (
        <Center>
          <Text mt="10" color="gray.400">
            Você não realizou nenhuma contratação
          </Text>
        </Center>
      )}
    </Stack>
  );
};
