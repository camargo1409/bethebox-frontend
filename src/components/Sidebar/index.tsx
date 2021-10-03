import { Flex, Link } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import { ActiveLink } from "./ActiveLink";

export const Sidebar = () => {
  return (
    <Flex h="100vh" w={100} bg="gray.900">
      <VStack as="ul" spacing="6">
        <ActiveLink href="/dashboard" passHref>
          <Link>Map</Link>
        </ActiveLink>
        <ActiveLink href="/map" passHref>
          <Link>Map</Link>
        </ActiveLink>
        <ActiveLink href="/map" passHref>
          <Link>Map</Link>
        </ActiveLink>
        <ActiveLink href="/map" passHref>
          <Link>Map</Link>
        </ActiveLink>
      </VStack>
    </Flex>
  );
};
