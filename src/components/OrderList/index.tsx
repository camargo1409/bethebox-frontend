import React, { useEffect, useState } from "react";
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

// import { Container } from './styles';

interface OrderListProps {
  requests: any[];
}

export const OrderList = ({ requests }: OrderListProps) => {
  const isBase = useBreakpointValue({ base: true, sm: false });
  function Feature({
    title,
    address,
    provider_accepted,
    updatedAt,
    price,
    location,
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
        <Flex>
          <Text mt={2} mr="7">{address}</Text>
          <PopLocale location={location}></PopLocale>
        </Flex>
        
        <Text mt={2}>
          <strong>Situação: </strong>
          <Badge variant="subtle" colorScheme="yellow">
            {provider_accepted ? "Aceito pelo provedor" : "Aguardando provedor"}
          </Badge>
        </Text>
        <Text mt={2}>
          <strong>Preço definido: </strong> R$ {price?.toFixed(2)}
        </Text>
        <Text mt={2}>
          <strong>Última atualização: </strong> {updatedAt}
        </Text>
        <Flex wrap="wrap">
          {provider_accepted && (
            <>
              <Button mt="2" w={isBase ? "100%" : "auto"} colorScheme="pink">
                Contratar por R$ {price?.toFixed(2)}
              </Button>
              <Button
                mt="2"
                w={isBase ? "100%" : "auto"}
                ml={!isBase ? "2" : 0}
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
            title={
              request.provider.first_name + " " + request.provider.last_name
            }
            address={request.provider.address + " " + request.provider.city}
            provider_accepted={
              request.provider_accepted
            }
            price={request.service_price}
            updatedAt={request.updated_at}
            location={{lat: request.provider.lat, long: request.provider.long}}
          />
        ))
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
