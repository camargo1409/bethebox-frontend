import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import { Switch } from "@chakra-ui/switch";
import { Box, Flex, VStack } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpFormSchema } from "./schema";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

interface SignUpFormData {
  first_name: string;
  last_name: string;
  email: string;
  cpf: string;
  password: string;
  confirm_password: string;
  address: string;
  city: string;
  available: boolean;
}

export const SignUpForm = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    try {
      const { confirm_password, ...data } = values;

      const response = await api.post("/users", {
        ...data,
        lat: -20.8712273,
        long: -49.4186457,
      });
      console.log(response);
    } catch (error: any) {
      console.log(error.response);
      toast(`${error.response.status} - ${error.response.data.msg}`);
    }
  };

  const { errors } = formState;

  useEffect(() => {
    for (const error in errors) {
      toast(errors[error].message);
    }
  }, [errors]);

  return (
    <VStack as="form" spacing="20" onSubmit={handleSubmit(handleSignUp)}>
      <FormControl as="fieldset">
        <FormLabel fontSize="larger" fontWeight="bold" as="legend">
          Informações básicas
        </FormLabel>

        <HStack>
          <FormControl>
            <FormLabel htmlFor="first_name">Primeiro nome</FormLabel>
            <Input
              id="first_name"
              variant="flushed"
              type="text"
              errorBorderColor="red.300"
              {...register("first_name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="last_name">Sobrenome</FormLabel>
            <Input
              id="last_name"
              variant="flushed"
              type="text"
              {...register("last_name")}
            />
          </FormControl>
        </HStack>

        <HStack mt={8}>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              variant="flushed"
              type="email"
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="cpf">CPF</FormLabel>
            <Input
              id="cpf"
              variant="flushed"
              type="text"
              {...register("cpf")}
            />
          </FormControl>
        </HStack>

        <HStack mt={8}>
          <FormControl>
            <FormLabel htmlFor="password">Senha</FormLabel>
            <Input
              id="password"
              variant="flushed"
              type="password"
              {...register("password")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="confirm_password">Confirmar senha</FormLabel>
            <Input
              id="confirm_password"
              variant="flushed"
              type="password"
              {...register("confirm_password")}
            />
          </FormControl>
        </HStack>
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel fontSize="larger" fontWeight="bold" as="legend">
          Localização
        </FormLabel>

        <FormControl>
          <FormLabel htmlFor="address">Endereço</FormLabel>
          <Input
            id="address"
            variant="flushed"
            type="text"
            {...register("address")}
          />
        </FormControl>
        <HStack mt={8}>
          <FormControl>
            <FormLabel htmlFor="city">Cidade</FormLabel>
            <Input
              id="city"
              variant="flushed"
              type="text"
              {...register("city")}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="state">Estado</FormLabel>
            <Input
              id="state"
              variant="flushed"
              type="text"
              {...register("state")}
            />
          </FormControl>
        </HStack>

        <Box height={300} w="100%" bg="gray.200" mt={8}></Box>
      </FormControl>

      <FormControl display="flex">
        <FormLabel htmlFor="available" mb="0">
          Permitir que outros usuários me contratem para que eu receba
          encomendas?
        </FormLabel>
        <Switch colorScheme="pink" id="available" {...register("available")} />
      </FormControl>

      <Flex justifyContent="space-between" w="100%">
        <Button
          colorScheme="pink"
          type="submit"
          isLoading={formState.isSubmitting}
        >
          Salvar
        </Button>
        <Button colorScheme="gray">Cancelar</Button>
      </Flex>
    </VStack>
  );
};
