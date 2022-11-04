import { Flex, Text, Button } from "@chakra-ui/react";

function Loads({ loads, removeLoad }) {
  return (
    <Flex ml="5" w="100%" h="fit-content">
      {loads.map((load) => {
        return (
          <Flex
            key={load.bar}
            mr="5"
            mt="4"
            p="2"
            border="3px solid"
            borderColor="green.400"
            borderRadius="md"
          >
            <Flex direction="column">
              <Flex>
                <Flex direction="column" mr="4">
                  <Text color="green.600">Load on bar:</Text>
                  <Text color="green.600">Point load:</Text>
                  <Text color="green.600">Point load position:</Text>
                  <Text color="green.600">Distributed load:</Text>
                </Flex>
                <Flex direction="column">
                  <Text as="b">{load.bar}</Text>
                  <Text as="b">{load.F}</Text>
                  <Text as="b">{load.F_position}</Text>
                  <Text as="b">{load.Q}</Text>
                </Flex>
              </Flex>
              <Button
                size="xs"
                colorScheme="red"
                variant="outline"
                onClick={() => removeLoad(load)}
              >
                Delete load
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default Loads;
