import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";

export const SignInForm = () => {
  return (
    <VStack
      as="form"
      w="100%"
      bg="whiteAlpha.100"
      borderRadius={4}
      p="8"
      direction="column"
      spacing={4}
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
        />
      </FormControl>
      <Button colorScheme="pink" w="100%">
        Entrar
      </Button>
    </VStack>
  );
};
