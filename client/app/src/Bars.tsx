import { Flex, Text, Button } from "@chakra-ui/react";

function Bars({ bars, removeBar }) {
  return (
    <Flex ml="5" w="100%" h="fit-content">
      {bars.map((bar) => {
        return (
          <Flex
            key={bar.name}
            mr="5"
            mt="4"
            p="2"
            border="3px solid"
            borderColor="red.400"
            borderRadius="md"
          >
            <Flex direction="column">
              <Flex>
                <Flex direction="column" mr="4">
                  <Text color="red.600">Bar name:</Text>
                  <Text color="red.600">Start Point:</Text>
                  <Text color="red.600">End Point:</Text>
                </Flex>
                <Flex direction="column">
                  <Text as="b">{bar.name}</Text>
                  <Text as="b">{bar.startPoint.name}</Text>
                  <Text as="b">{bar.endPoint.name}</Text>
                </Flex>
              </Flex>
              <Button
                size="xs"
                colorScheme="red"
                variant="outline"
                onClick={() => removeBar(bar)}
              >
                Delete bar
              </Button>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default Bars;
