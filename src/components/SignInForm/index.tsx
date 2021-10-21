import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack, Link } from "@chakra-ui/layout";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext";
import NextLink from 'next/link'

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const { register, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const handleSignIn: SubmitHandler<SignInFormData> = async ({
    email,
    password,
  }) => {
    await signIn({ email, password });
  };

  return (
    <VStack
      as="form"
      w="100%"
      bg="whiteAlpha.100"
      borderRadius={4}
      p="8"
      direction="column"
      spacing={4}
      onSubmit={handleSubmit(handleSignIn)}
    >
      <FormControl>
        <FormLabel color="gray.300" htmlFor="email">
          Email
        </FormLabel>
        <Input
          variant="filled"
          focusBorderColor="pink.500"
          type="email"
          id="email"
          bg="gray.800"
          color="gray.300"
          _hover={{
            bg: "gray.700",
          }}
          {...register("email")}
        />
      </FormControl>
      <FormControl>
        <FormLabel color="gray.300" htmlFor="password">
          Password
        </FormLabel>
        <Input
          variant="filled"
          focusBorderColor="pink.500"
          type="password"
          id="password"
          bg="gray.800"
          color="gray.300"
          _hover={{
            bg: "gray.700",
          }}
          {...register("password")}
        />
      </FormControl>
      <Button colorScheme="pink" w="100%" type="submit">
        Entrar
      </Button>
      <NextLink href="/auth/signup" passHref>
          <Link color="pink.500">Nao possui uma conta ? Cadastre-se!</Link>
      </NextLink>
    </VStack>
  );
};
