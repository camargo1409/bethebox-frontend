import {
  Flex,
  Box,
  VStack,
  Text,
  useBreakpointValue,
  Container,
  useDisclosure,
  Collapse,
  Button,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import React, { useContext, useEffect, useState } from "react";
import { MapProps } from "../../components/Map";
import { api } from "../../config/axios";
import { AuthContext } from "../../contexts/AuthContext";
import { SidebarWithHeader } from "../../layouts/dashboardLayout";
import { useToast } from "@chakra-ui/react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { SliderRadius } from "../../components/SliderRadius";
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
  addresses: {
    street: string;
    neighborhood: string;
    city: string;
  }[];
  city: string;
  state: string;
  cellphone: string;

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
  const { isOpen, onToggle } = useDisclosure();
  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const [distance, setDistance] = useState(20);

  useEffect(() => {
    api
      .get("/search", { params: { distance } })
      .then(({ data }) => {
        console.log(data)
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
  }, [distance]);

  const handleChange = (value: number) => {
    setDistance(value);
  };
  return (
    <SidebarWithHeader>
      <Flex h="93vh" w="100%" bg="gray.200" position="relative">
        {isWideVersion && (
          <Container
            position="absolute"
            top={10}
            right={10}
            zIndex="1"
            pt="4"
            pr="4"
            overflowY="auto"
            w={300}
            bg="blackAlpha.300"
            pb={4}
            borderRadius="4"
            boxShadow="lg"
          >
            <Button
              width="100%"
              rightIcon={isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
              justifyContent="flex-start"
              variant="ghost"
              as="h4"
              size="md"
              onClick={onToggle}
            >
              Pessoas perto de você
            </Button>

            <Collapse in={!isOpen} animateOpacity>
              <VStack spacing="4">
                {usersNearMe?.map((user) => (
                  <React.Fragment key={user.id}>
                    <Box
                      mt="4"
                      bg="white"
                      w="100%"
                      px={3}
                      py={2}
                      borderRadius="4"
                      direction="column"
                      transition="width 100ms ease-in-out, background-color 100ms ease-in-out"
                      _hover={{
                        bg: "gray.100",
                        w: "105%",
                      }}
                      cursor="pointer"
                    >
                      <Box
                        mt="1"
                        fontWeight="semibold"
                        fontSize="lg"
                        lineHeight="tight"
                        noOfLines={1}
                      >
                        {user.first_name} {user.last_name}
                      </Box>
                      <Box fontSize="sm">
                        {user.distance.toFixed(2)} km de distância
                      </Box>
                      <Box fontSize="xs" color="gray.600">
                        {user.city}
                      </Box>

                      <Text mt="2">{user?.addresses[0]?.street || ""}, {user?.addresses[0]?.neighborhood || ""}</Text>
                    </Box>
                  </React.Fragment>
                ))}
              </VStack>
            </Collapse>
          </Container>
        )}

        <Box zIndex="0" h="100%" w="100%">
          <Map isDraggable={false} usersNearMe={usersNearMe} />
        </Box>
        <Box
          position="absolute"
          bottom={10}
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            w="50%"
            borderRadius={20}
            p={4}
            bg="blackAlpha.300"
            boxShadow="lg"
          >
            <SliderRadius onChange={(value) => handleChange(value)} />
          </Box>
        </Box>
      </Flex>
    </SidebarWithHeader>
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
