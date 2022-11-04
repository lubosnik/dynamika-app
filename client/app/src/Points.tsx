import { Flex, Text, Button } from "@chakra-ui/react";

function Points({ points, removePoint }) {
  return (
    <Flex ml="5" w="100%" h="fit-content">
      {points.map((point) => {
        return (
          <Flex
            key={point.codeNumbers}
            mr="5"
            mt="4"
            p="2"
            border="3px solid"
            borderColor="blue.400"
            borderRadius="md"
          >
            <Flex direction="column">
              <Flex>
                <Flex direction="column" mr="4">
                  <Text color="blue.600">Point name:</Text>
                  <Text color="blue.600">X coordinate:</Text>
                  <Text color="blue.600">y coordinate:</Text>
                  <Text color="blue.600">Code numbers:</Text>
                  <Text color="blue.600">Degree of freedom:</Text>
                </Flex>
                <Flex direction="column">
                  <Text as="b">{point.name}</Text>
                  <Text as="b">{point.x}</Text>
                  <Text as="b">{point.y}</Text>
                  <Text as="b">{point.codeNumbers}</Text>
                  <Text as="b">{point.dof}</Text>
                </Flex>
              </Flex>
              <Button
                size="xs"
                colorScheme="red"
                variant="outline"
                onClick={() => removePoint(point)}
              >
                Delete point
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default Points;
