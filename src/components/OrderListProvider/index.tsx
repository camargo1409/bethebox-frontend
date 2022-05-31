import React from "react";
import { Stack, Text, Center, useBreakpointValue } from "@chakra-ui/react";
import { Order } from "./components/Order";

interface OrderListProviderProps {
  requests: any[];
}

export const OrderListProvider = ({ requests }: OrderListProviderProps) => {
  const isBase = useBreakpointValue({ base: true, sm: false });

  return (
    <Stack spacing={3}>
      <Text fontSize="2xl" fontWeight="bold">
        Controle de encomendas
      </Text>
      {!!requests?.length ? (
        requests?.map((request) => (
          <Order
            request={request}
            // id={request.id}
            // title={
            //   request.customer.first_name + " " + request.customer.last_name
            // }
            // address={request.customer.address + " " + request.customer.city}
            // provider_accepted={request.provider_accepted}
            // updatedAt={request.updated_at}
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
