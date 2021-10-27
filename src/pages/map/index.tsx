import {
  Flex,
  Box,
  VStack,
  Text,
  useBreakpointValue,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import { MapProps, UserNearMeData } from "../../components/Map";
import { api } from "../../config/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { MapContext } from "../../contexts/MapContenxt";
import { DashboardLayout } from "../../layouts/dashboardLayout";

const Map = dynamic<MapProps>(
  () => import("../../components/Map").then((mod) => mod.Map),
  {
    ssr: false,
  }
);

const MapPage = () => {
  const { user } = useContext(AuthContext);
  
  const [usersNearMe, setUsersNearMe] = useState([] as any[]);

  const { handleSetPosition } = useContext(MapContext);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  useEffect(() => {
    api.get("/search").then(({ data }) => {
      setUsersNearMe(data);
    });
  }, []);

  useEffect(() => {
    handleSetPosition([user?.lat, user?.long]);
  }, [user]);
  return (
    <DashboardLayout>
      <Flex h="93vh" w="100%" bg="gray.200" position="relative">
        {isWideVersion && (
          <VStack
            zIndex="1"
            spacing="4"
            h="100%"
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
                    {user.distance.toFixed(2)} km de distância
                  </Text>
                  <Text mt="2">{user.address}</Text>
                </Box>
              </>
            ))}
          </VStack>
        )}

        <Box zIndex="0" h="100%" w="100%">
          <Map isDraggable={false} usersNearMe={usersNearMe}/>
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
