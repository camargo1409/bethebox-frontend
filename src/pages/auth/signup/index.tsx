import { Container, Flex } from "@chakra-ui/layout";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { parseCookies } from "nookies";
import { useContext } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { SignUpForm } from "../../../components/SignUpForm";
import { SimpleHeader } from "../../../components/SimpleHeader";
import { api } from "../../../config/axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { MapContext, MapProvider } from "../../../contexts/MapContenxt";

interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
  address: string;
  state: string;
  city: string;
  available: boolean;
  cellphone: string;
}

const SignUp = () => {
  const { signIn } = useContext(AuthContext);
  const { position } = useContext(MapContext);

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    try {
      const { confirm_password, address, ...rest } = values;
  
      const { email, password, city } = rest;
  
      const [street, neighborhood] = address.split(",");
  
      await api.post("/users", {
        ...rest,
        address: {
          street,
          neighborhood,
          city,
        },
        lat: position.lat,
        long: position.long,
      });
  
      toast("Usuário criado com sucesso!");
      await signIn({ email, password });
    } catch (error: any) {
      toast(`${error.response.status} - ${error.response.data.msg}`);
    }
  };

  return (
    <>
      <Head>
        <title>bethebox | Sign Up</title>
        <meta name="description" content="bethebox sign up page" />
      </Head>
      <Flex direction="column">
        <SimpleHeader />
        <Container my={8}>
            <SignUpForm onSubmit={handleSignUp}/>
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
