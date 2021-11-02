import { Container, Flex } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { SignUpForm } from "../../../components/SignUpForm";
import { SimpleHeader } from "../../../components/SimpleHeader";
import { MapProvider } from "../../../contexts/MapContenxt";

const SignUp = () => {
  return (
    <>
      <Head>
        <title>bethebox | Sign Up</title>
        <meta name="description" content="bethebox sign up page" />
      </Head>
      <Flex direction="column">
        <SimpleHeader />
        <Container my={8}>
            <SignUpForm />
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

export default SignUp;
