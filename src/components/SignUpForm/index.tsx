import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
  Heading,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Checkbox,
} from "@chakra-ui/react";
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
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic<any>(() => import("../Map").then((mod) => mod.Map), {
  ssr: false,
});

import { MapContext, MapProvider } from "../../contexts/MapContenxt";
import { FaPray } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { useRouter } from "next/router";

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

interface SignUpFormProps {
  labelColor?: string;
  fillForm?: {
    first_name: string;
    last_name: string;
    email: string;
    cpf: string;
    address: {
      street: string;
      neighborhood: string;
      city: string;
    };
    state: string;
    city: string;
    available: boolean;
    cellphone: string;
  };
  onSubmit: SubmitHandler<SignUpFormData>;
}

export const SignUpForm = ({
  labelColor,
  fillForm,
  onSubmit,
}: SignUpFormProps) => {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();

  const [street, setStreet] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const { errors } = formState;

  useEffect(() => {
    for (const error in errors) {
      toast(errors[error].message);
    }
  }, [errors]);

  useEffect(() => {
    setStreet(fillForm?.address?.street || "");
    setNeighborhood(fillForm?.address?.neighborhood || "");
  }, [fillForm]);

  return (
    <>
      <VStack as="form" spacing="20" onSubmit={handleSubmit(onSubmit)}>
        <FormControl as="fieldset">
          <FormLabel
            color={labelColor}
            fontSize="larger"
            fontWeight="bold"
            as="legend"
          >
            Informações básicas
          </FormLabel>

          <HStack>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="first_name">
                Primeiro nome
              </FormLabel>
              <Input
                color={labelColor}
                defaultValue={fillForm?.first_name}
                id="first_name"
                variant="flushed"
                type="text"
                errorBorderColor="red.300"
                {...register("first_name", { value: fillForm?.first_name })}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="last_name">
                Sobrenome
              </FormLabel>
              <Input
                color={labelColor}
                defaultValue={fillForm?.last_name}
                id="last_name"
                variant="flushed"
                type="text"
                {...register("last_name", { value: fillForm?.last_name })}
              />
            </FormControl>
          </HStack>
          <FormControl mt={8}>
            <FormLabel color={labelColor} htmlFor="email">
              Email
            </FormLabel>
            <Input
              color={labelColor}
              defaultValue={fillForm?.email}
              id="email"
              variant="flushed"
              type="text"
              {...register("email", { value: fillForm?.email })}
            />
          </FormControl>
          <HStack mt={8}>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="email">
                Celular
              </FormLabel>
              <Input
                color={labelColor}
                defaultValue={fillForm?.cellphone}
                id="cellphone"
                variant="flushed"
                {...register("cellphone", { value: fillForm?.cellphone })}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="cpf">
                CPF
              </FormLabel>
              <Input
                color={labelColor}
                defaultValue={fillForm?.cpf}
                id="cpf"
                variant="flushed"
                type="text"
                {...register("cpf", { value: fillForm?.cpf })}
              />
            </FormControl>
          </HStack>

          <HStack mt={8}>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="password">
                Senha
              </FormLabel>
              <Input
                color={labelColor}
                placeholder={!!fillForm ? "********" : ""}
                id="password"
                variant="flushed"
                type="password"
                {...register("password")}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="confirm_password">
                Confirmar senha
              </FormLabel>
              <Input
                color={labelColor}
                placeholder={!!fillForm ? "********" : ""}
                id="confirm_password"
                variant="flushed"
                type="password"
                {...register("confirm_password")}
              />
            </FormControl>
          </HStack>
        </FormControl>

        <FormControl as="fieldset">
          <FormLabel
            color={labelColor}
            fontSize="larger"
            fontWeight="bold"
            as="legend"
          >
            Localização
          </FormLabel>

          <FormControl>
            <FormLabel color={labelColor} htmlFor="address">
              Endereço
            </FormLabel>
            <Input
              color={labelColor}
              defaultValue={
                !(street || neighborhood)
                  ? ""
                  : `${street}, ${neighborhood}`
              }
              id="address"
              variant="flushed"
              placeholder="Ex: Rua 7 de Setembro 777, Centro"
              type="text"
              {...register("address")}
            />
          </FormControl>
          <HStack mt={8}>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="city">
                Cidade
              </FormLabel>
              <Input
                color={labelColor}
                defaultValue={fillForm?.city}
                id="city"
                variant="flushed"
                type="text"
                {...register("city", { value: fillForm?.city })}
              />
            </FormControl>
            <FormControl>
              <FormLabel color={labelColor} htmlFor="state">
                Estado
              </FormLabel>
              <Input
                color={labelColor}
                defaultValue={fillForm?.state}
                id="state"
                variant="flushed"
                type="text"
                {...register("state", { value: fillForm?.state })}
              />
            </FormControl>
          </HStack>

          <Box height={300} w="100%" mt={8} fontSize="sm">
            <Box as="span" color={labelColor}>
              <b>Clique</b> no ponteiro para definir sua localização.
            </Box>
            <Map />
          </Box>
        </FormControl>

        <FormControl display="flex">
          <FormLabel color={labelColor} htmlFor="available" mb="0">
            Permitir que outros usuários me contratem para que eu receba
            encomendas?
          </FormLabel>
          <Switch
            colorScheme="pink"
            id="available"
            isChecked={fillForm?.available}
            {...register("available", { value: fillForm?.available })}
          />
        </FormControl>

        <FormControl display="flex">
          <FormLabel
            color={labelColor}
            htmlFor="available"
            mb="0"
            fontWeight="normal"
          >
            <Checkbox colorScheme="pink">
              Ao entrar, você esta concordando com nossa{" "}
              <Link color="teal.500" onClick={onOpen}>
                Política de Privacidade e Termos de Uso
              </Link>
            </Checkbox>
          </FormLabel>
        </FormControl>

        <Flex justifyContent="space-between" w="100%">
          <Button
            colorScheme="pink"
            type="submit"
            isLoading={formState.isSubmitting}
          >
            Salvar
          </Button>
          <Button
            colorScheme="gray"
            onClick={() => router.push("/auth/signin")}
          >
            Voltar
          </Button>
        </Flex>
      </VStack>
      <Modal isOpen={isOpen} size="xl" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Política de Privacidade e Termos de Uso</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              A sua privacidade é importante para nós. É política do BeTheBox
              respeitar a sua privacidade em relação a qualquer informação sua
              que possamos coletar no site BeTheBox, e outros sites que
              possuímos e operamos.
            </p>
            <br />
            <p>
              Solicitamos informações pessoais apenas quando realmente
              precisamos delas para lhe fornecer um serviço. Fazemos por meios
              justos e legais, com o seu conhecimento e consentimento. Também
              informamos por que estamos coletando e como será usado.
            </p>
            <br />
            <p>
              Apenas retemos as informações coletadas pelo tempo necessário para
              fornecer o serviço solicitado. Quando armazenamos dados,
              protegemos dentro de meios comercialmente aceitáveis para evitar
              perdas e roubos, bem como acesso, divulgação, cópia, uso ou
              modificação não autorizados.
            </p>
            <br />
            <p>
              Não compartilhamos informações de identificação pessoal
              publicamente ou com terceiros, exceto quando exigido por lei.
            </p>
            <br />
            <p>
              O nosso site pode ter links para sites externos que não são
              operados por nós. Esteja ciente de que não temos controle sobre o
              conteúdo e práticas desses sites e não podemos aceitar
              responsabilidade por suas respectivas políticas de privacidade.
            </p>
            <br />
            <p>
              Você é livre para recusar a nossa solicitação de informações
              pessoais, entendendo que talvez não possamos fornecer alguns dos
              serviços desejados.
            </p>
            <br />
            <p>
              O uso continuado de nosso site será considerado como aceitação de
              nossas práticas em torno de privacidade e informações pessoais. Se
              você tiver alguma dúvida sobre como lidamos com dados do usuário e
              informações pessoais, entre em contacto conosco.
            </p>
            <br />
            <Heading as="h4" size="md">
              Compromisso do Usuário
            </Heading>
            <p>
              O usuário se compromete a fazer uso adequado dos conteúdos e da
              informação que o BeTheBox oferece no site e com caráter
              enunciativo, mas não limitativo:
            </p>
            <br />
            <UnorderedList>
              <ListItem>
                Não se envolver em atividades que sejam ilegais ou contrárias à
                boa fé a à ordem pública;
              </ListItem>
              <ListItem>
                Não difundir propaganda ou conteúdo de natureza racista,
                xenofóbica, Onde Bola ou azar, qualquer tipo de pornografia
                ilegal, de apologia ao terrorismo ou contra os direitos humanos;
              </ListItem>
              <ListItem>
                Não causar danos aos sistemas físicos (hardwares) e lógicos
                (softwares) do BeTheBox, de seus fornecedores ou terceiros, para
                introduzir ou disseminar vírus informáticos ou quaisquer outros
                sistemas de hardware ou software que sejam capazes de causar
                danos anteriormente mencionados.
              </ListItem>
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Aceitar termos
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
