import React, { useEffect } from "react";
import {
  Stack,
  Box,
  Text,
  Heading,
  Center,
  Button,
  HStack,
  Flex,
  useBreakpointValue,
  Badge,
} from "@chakra-ui/react";
import { api } from "../../config/axios";

interface OrderListProviderProps {
  requests: any[];
}

export const OrderListProvider = ({ requests }: OrderListProviderProps) => {
  const isBase = useBreakpointValue({ base: true, sm: false });

  const accept = async (id: any) => {
    try {
      const res = await api.put(`/requests/${id}?action=accept`, {
        service_price: 2.5,
      });
      alert(JSON.stringify(res.data));
    } catch (error: any) {
      alert(JSON.stringify(error.response.data));
    }
  };

  function Feature({
    id,
    title,
    address,
    provider_accepted,
    updatedAt,
    ...rest
  }: any) {
    return (
      <Box
        p={5}
        shadow="md"
        bg="blue.400"
        borderWidth="1px"
        borderColor="blue.400"
        borderRadius="5"
        {...rest}
      >
        <Heading fontSize="lg">{title}</Heading>
        <Text mt={2}>{address}</Text>
        <Text mt={2}>
          <strong>Situação:</strong>
          <Badge variant="subtle" colorScheme="yellow">
            {provider_accepted
              ? "Aguardando confirmação do cliente"
              : "Cliente aguardando sua confirmação"}
          </Badge>
        </Text>
        <Text mt={2}>
          <strong>Última atualização: </strong> {updatedAt}
        </Text>
        <Flex wrap="wrap">
          {!provider_accepted && (
            <>
              <Button
                onClick={() => accept(id)}
                mt="2"
                w={isBase ? "100%" : "auto"}
                colorScheme="pink"
              >
                Aceitar e definir preço
              </Button>
              <Button
                mt="2"
                w={isBase ? "100%" : "auto"}
                ml={!isBase ? "2" : 0}
                // colorScheme="purple"
              >
                Recusar
              </Button>
            </>
          )}
        </Flex>
      </Box>
    );
  }
  return (
    <Stack spacing={3}>
      <Text fontSize="2xl" fontWeight="bold">
        Controle de encomendas
      </Text>
      {!!requests?.length ? (
        requests?.map((request) => (
          <Feature
            id={request.id}
            title={
              request.customer.first_name + " " + request.customer.last_name
            }
            address={request.customer.address + " " + request.customer.city}
            provider_accepted={request.provider_accepted}
            updatedAt={request.updated_at}
          />
        ))
      ) : (
        <Center>
          <Text mt="10" color="gray.400">
            Você não recebeu nenhuma solicação de contratação ainda
          </Text>
        </Center>
      )}
    </Stack>
  );
};
