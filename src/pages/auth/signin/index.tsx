import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Flex, Heading, VStack } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
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

export default SignIn;
