import { Container, Flex } from "@chakra-ui/layout";
import Head from "next/head";
import { SignUpForm } from "../../../components/SignUpForm";
import { SimpleHeader } from "../../../components/SimpleHeader";

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

export default SignUp;
