import { Flex, Text } from "@chakra-ui/react";

function CrossSection({ section }) {
  return (
    <Flex
      direction="column"
      ml="5"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Text as="b" textAlign="center">
        Cross section
      </Text>
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
        {section.material}
      </Flex>
      <Text>{`w = ${section.width} mm`}</Text>
      <Text>{`h = ${section.height} mm`}</Text>
    </Flex>
  );
}

export default CrossSection;
