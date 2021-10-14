import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Flex, Heading, VStack } from "@chakra-ui/layout";
import Head from "next/head";
import { SignInForm } from "../../../components/SignInForm";
import { SimpleHeader } from "../../../components/SimpleHeader";

const SignIn = () => {
  return (
    <>
      <Head>
        <title>bethebox | Sign In</title>
        <meta name="description" content="bethebox sign in page" />
      </Head>
      <Flex direction="column" minH="100vh" bg="gray.900">
        <SimpleHeader />
        <Container
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          flex="1"
        >   
            <Heading mb="4" color="gray.300">Login</Heading>
            <SignInForm />
        </Container>
      </Flex>
    </>
  );
};

export default SignIn;
