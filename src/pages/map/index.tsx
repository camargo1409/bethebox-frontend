import { Flex, Box, VStack, Text, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import { MapProps } from "../../components/Map";
import { api } from "../../config/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { DashboardLayout } from "../../layouts/dashboardLayout";
import { useToast } from "@chakra-ui/react";
const Map = dynamic<MapProps>(
  () => import("../../components/Map").then((mod) => mod.Map),
  {
    ssr: false,
  }
);

interface UserNear {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  
  available: boolean;
  address: string;
  city: string;
  state: string;
  
  distance: number;
  lat: number;
  long: number;
  
  created_at: string;
  updated_at: string;
}

const MapPage = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [usersNearMe, setUsersNearMe] = useState<UserNear[]>([] as UserNear[]);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  useEffect(() => {
    api
      .get("/search")
      .then(({ data }) => {
        setUsersNearMe(data);
      })
      .catch((err) => {
        toast({
          title: err?.response?.status,
          description: err?.message,
          isClosable: true,
          status: "error",
          duration: 9000,
          position: "top-right",
        });
      });
  }, []);

  return (
    <DashboardLayout>
      <Flex h="93vh" w="100%" bg="gray.200" position="relative">
        {isWideVersion && (
          <VStack
            zIndex="1"
            spacing="4"
            w={300}
            position="absolute"
            right="0"
            pt="4"
            pr="4"
            overflowY="auto"
          >
            {usersNearMe?.map((user) => (
              <>
                <Box
                  key={user.id}
                  bg="white"
                  w="100%"
                  p="4"
                  borderRadius="4"
                  direction="column"
                  _hover={{
                    bg: "gray.100",
                  }}
                  boxShadow="lg"
                >
                  <Text>
                    {user.first_name} {user.last_name}
                  </Text>
                  <Text fontSize="xs" color="gray.400">
                    {user.city} - {user.distance.toFixed(2)} km de distância
                  </Text>
                  <Text mt="2">{user.address}</Text>
                </Box>
              </>
            ))}
          </VStack>
        )}

        <Box zIndex="0" h="100%" w="100%">
          <Map isDraggable={false} usersNearMe={usersNearMe} />
        </Box>
      </Flex>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { ["bethebox.token"]: token } = parseCookies(ctx);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default MapPage;
