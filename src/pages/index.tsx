import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useBreakpointValue } from "@chakra-ui/media-query";

import type { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import Image from "next/image";
import Head from "next/head";

import { SimpleHeader } from "../components/SimpleHeader";
import { parseCookies } from "nookies";

const Home: NextPage = () => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Head>
        <title>bethebox | Home</title>
        <meta name="description" content="bethebox landing page" />
      </Head>
      <Flex h="100vh" bg="gray.900" direction="column">
        <SimpleHeader />
        <HStack
          w="100%"
          flex="1"
          maxWidth={1480}
          mx="auto"
          px="6"
          my="6"
          alignItems="center"
          justifyContent="space-between"
          spacing="6"
        >
          <Flex
            direction="column"
            flex="1"
            textAlign={!isWideVersion ? "center" : "unset"}
            alignItems={isWideVersion ? "self-start" : "unset"}
          >
            <Heading as="h2" size="2xl" color="gray.300">
              Não se preocupe mais em receber suas entregas
            </Heading>
            <Text color="gray.500">Encontre a caixa postal mais próxima</Text>
            <NextLink href="/auth/signin" passHref>
              <Button as="a" size="md" colorScheme="pink" mt="6">
                Comece já
              </Button>
            </NextLink>
          </Flex>
          {isWideVersion && (
            <Box flex="1">
              <Image
                src="/images/pin.svg"
                width={525}
                height={409}
                layout="responsive"
                alt="landing page illustration"
              />
            </Box>
          )}
        </HStack>
      </Flex>
    </>
  );
};

export const getServerSideProps:GetServerSideProps = async (ctx) =>{
  const {['bethebox.token']:token} = parseCookies(ctx);

  if(token){
    return{
      redirect:{
        destination: '/map',
        permanent:false
      }
    }
  }

  return {
    props:{}
  }
}

export default Home;
