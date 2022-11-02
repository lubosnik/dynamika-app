import { Flex } from "@chakra-ui/react";

function CrossSection({ w, h, material }) {
  return (
    <Flex direction="column" ml="10" alignItems="center">
      Cross section
      <Flex alignItems="center">
        <Flex
          m="2"
          w="50px"
          h="75px"
          background="gray.200"
          justifyContent="center"
          alignItems="center"
          borderRadius="md"
          fontSize={"sm"}
        >
          {material}
        </Flex>
        <Flex>{h}</Flex>
      </Flex>
      {w}
    </Flex>
  );
}

export default CrossSection;
