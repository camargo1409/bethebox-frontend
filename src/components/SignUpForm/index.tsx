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
import { useContext, useEffect } from "react";
import dynamic from "next/dynamic";

const Map = dynamic<any>(() => import("../Map").then((mod) => mod.Map), {
  ssr: false,
});

import { MapContext, MapProvider } from "../../contexts/MapContenxt";

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
}

interface SignUpFormProps{
  labelColor?: string;
  fillForm?: {
    first_name: string;
    last_name: string;
    email: string;
    cpf: string;
    address: string;
    state: string;
    city: string;
    available: boolean;
  }
}

export const SignUpForm = ({labelColor, fillForm}:SignUpFormProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const { position } = useContext(MapContext);
  console.log(position);

  const handleSignUp: SubmitHandler<SignUpFormData> = async (values) => {
    try {
      const { confirm_password, ...rest } = values;

      const { data } = await api.post("/users", {
        ...rest,
        lat: position.lat,
        long: position.lng,
      });

      toast("Usuário criado com sucesso!")
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
        <FormLabel color={labelColor} fontSize="larger" fontWeight="bold" as="legend">
          Informações básicas
        </FormLabel>

        <HStack>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="first_name">Primeiro nome</FormLabel>
            <Input color={labelColor}
              value={fillForm?.first_name}
              id="first_name"
              variant="flushed"
              type="text"
              errorBorderColor="red.300"
              {...register("first_name")}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="last_name">Sobrenome</FormLabel>
            <Input color={labelColor}
              value={fillForm?.last_name}
              id="last_name"
              variant="flushed"
              type="text"
              {...register("last_name")}
            />
          </FormControl>
        </HStack>

        <HStack mt={8}>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="email">Email</FormLabel>
            <Input color={labelColor}
              value={fillForm?.email}
              id="email"
              variant="flushed"
              type="email"
              {...register("email")}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="cpf">CPF</FormLabel>
            <Input color={labelColor}
              value={fillForm?.cpf}
              id="cpf"
              variant="flushed"
              type="text"
              {...register("cpf")}
            />
          </FormControl>
        </HStack>

        <HStack mt={8}>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="password">Senha</FormLabel>
            <Input color={labelColor}
              placeholder={!!fillForm ? '********' : ''}
              id="password"
              variant="flushed"
              type="password"
              {...register("password")}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="confirm_password">Confirmar senha</FormLabel>
            <Input color={labelColor}
              placeholder={!!fillForm ? '********' : ''}
              id="confirm_password"
              variant="flushed"
              type="password"
              {...register("confirm_password")}
            />
          </FormControl>
        </HStack>
      </FormControl>

      <FormControl as="fieldset">
        <FormLabel color={labelColor} fontSize="larger" fontWeight="bold" as="legend">
          Localização
        </FormLabel>

        <FormControl>
          <FormLabel color={labelColor} htmlFor="address">Endereço</FormLabel>
          <Input color={labelColor}
            value={fillForm?.address}
            id="address"
            variant="flushed"
            type="text"
            {...register("address")}
          />
        </FormControl>
        <HStack mt={8}>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="city">Cidade</FormLabel>
            <Input color={labelColor}
              value={fillForm?.city}
              id="city"
              variant="flushed"
              type="text"
              {...register("city")}
            />
          </FormControl>
          <FormControl>
            <FormLabel color={labelColor} htmlFor="state">Estado</FormLabel>
            <Input color={labelColor}
              value={fillForm?.state}
              id="state"
              variant="flushed"
              type="text"
              {...register("state")}
            />
          </FormControl>
        </HStack>

        <Box height={300} w="100%" bg="gray.200" mt={8}>
          <Map />
        </Box>
      </FormControl>

      <FormControl display="flex">
        <FormLabel color={labelColor} htmlFor="available" mb="0">
          Permitir que outros usuários me contratem para que eu receba
          encomendas?
        </FormLabel>
        <Switch colorScheme="pink" id="available" value={fillForm?.available} {...register("available")} />
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
