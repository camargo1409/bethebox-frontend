import React, { useEffect, useState } from "react";
import {
  Stack,
  HStack,
  VStack,
  StackDivider,
  Box,
  Text,
  Heading,
} from "@chakra-ui/react";
import { api } from "../../config/axios";

// import { Container } from './styles';

export const OrderList = () => {
  const [requests, setRequests] = useState([] as any[]);
  useEffect(() => {
    api
      .get("/requests", {
        params: {
          as: "customer",
        },
      })
      .then((response) => {
        setRequests(response.data);
        console.log(response.data);
      });
  }, []);
  function Feature({ title, address, provider_accepted, updatedAt, ...rest }:any) {
    return (
      <Box p={5} shadow="md" bg="blue.400" borderWidth="1px" borderColor="blue.400" borderRadius="5" {...rest}>
        <Heading fontSize="lg">{title}</Heading>
        <Text mt={2}>{address}</Text>
        <Text mt={2}><strong>Situação:</strong> {provider_accepted}</Text>
        <Text mt={2}><strong>Última atualização: </strong> {updatedAt}</Text>
      </Box>
    );
  }
  return (
    <Stack spacing={3} px="3">
    <Text fontSize="2xl" fontWeight="bold">Controle de encomendas</Text>
      {requests.map((request) => (
        <Feature
          title={request.provider.first_name + " " + request.provider.last_name}
          address={request.provider.address + " " + request.provider.city}
          provider_accepted={request.provider_accepted
              ? "Provider Accepted"
              : "Aguardando provedor"}
          updatedAt={request.updated_at}
        />
      ))}
    </Stack>
  );
};
