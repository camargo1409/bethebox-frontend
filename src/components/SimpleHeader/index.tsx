import { Flex, Heading } from "@chakra-ui/layout";

export const SimpleHeader = () => {
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      px="6"
      align="center"
    >
      <Heading as="h1" size="xl" color="gray.300">
        bethebox
      </Heading>
    </Flex>
  );
};
