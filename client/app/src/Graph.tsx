import { Flex, Text, IconButton } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

function Graph({ points, removePoint, bars, removeBar }) {
  function calculateVector(bar) {
    const vector = {
      x: bar.endPoint.x - bar.startPoint.x, // 0-0 = 0 // 3-0 = 3
      y: bar.endPoint.y - bar.startPoint.y, // 3-0 = 3 // 0-0 = 0
    };
    return vector;
  }

  function setWidth(bar) {
    const vector = calculateVector(bar);
    if (vector.y !== 0 && vector.x === 0) {
      return "0.4px";
    } else if (vector.x !== 0 && vector.y === 0) {
      const width = (bar.endPoint.x - bar.startPoint.x) * 60;
      return width;
    }
  }

  function setHeight(bar) {
    const vector = calculateVector(bar);
    if (vector.x === 0 && vector.y !== 0) {
      const height = (bar.endPoint.y - bar.startPoint.y) * 60;
      return height;
    } else if (vector.x !== 0 && vector.y === 0) {
      return "0.4px";
    }
  }

  function calculatePositon(bar) {
    if (calculateVector(bar).y === 0) {
      return `${bar.endPoint.x}px`;
    } else {
      return `${bar.endPoint.x * 60}px`;
    }
  }

  return (
    <Flex direction="column" alignItems="center">
      {/* CANVAS */}
      <Flex
        ml="20"
        w="500px"
        h="300px"
        borderLeft="1px solid black"
        borderBottom="1px solid black"
        position="relative"
      >
        {/* POINTS */}
        {points.map((point) => {
          return (
            <Flex
              w="2"
              h="2"
              m="3"
              background="blue"
              position="absolute"
              borderRadius="lg"
              bottom={`${point.y * 60}px`}
              left={`${point.x * 60}px`}
            />
          );
        })}

        {/* BARS */}
        {bars.map((bar) => {
          return (
            <Flex
              w={setWidth(bar)}
              h={setHeight(bar)}
              m="3"
              background="red"
              position="absolute"
              borderRadius="lg"
              bottom={`${bar.startPoint.y * 60}px`}
              left={calculatePositon(bar)}
            />
          );
        })}
      </Flex>
      {/* POINTS LISTED */}
      <Flex
        ml="20"
        w="500px"
        direction="row"
        justifyItems="flex-start"
        flexWrap="wrap"
      >
        {points.map((point) => {
          return (
            <Flex
              key={point.codeNumbers}
              mr="5"
              mt="4"
              p="2"
              border="1px solid black"
              borderRadius="md"
            >
              <Flex direction="column" mr="4">
                <Text>Point name:</Text>
                <Text>X coordinate:</Text>
                <Text>y coordinate:</Text>
                <Text>Code numbers:</Text>
              </Flex>
              <Flex direction="column">
                <Text as="b">{point.name}</Text>
                <Text as="b">{point.x}</Text>
                <Text as="b">{point.y}</Text>
                <Text as="b">{point.codeNumbers}</Text>
              </Flex>
              <IconButton
                aria-label="Close"
                size="xs"
                colorScheme="red"
                variant="outline"
                onClick={() => removePoint(point)}
                icon={<CloseIcon />}
              />
            </Flex>
          );
        })}
      </Flex>
      {/* BARS LISTED */}
      <Flex
        ml="20"
        w="500px"
        direction="row"
        justifyItems="flex-start"
        flexWrap="wrap"
      >
        {bars.map((bar) => {
          return (
            <Flex
              key={bar}
              mr="5"
              mt="4"
              p="2"
              border="1px solid black"
              borderRadius="md"
            >
              <Flex direction="column" mr="4">
                <Text>Bar name:</Text>
                <Text>Start Point:</Text>
                <Text>End Point:</Text>
              </Flex>
              <Flex direction="column">
                <Text as="b">{bar.name}</Text>
                <Text as="b">{bar.startPoint.name}</Text>
                <Text as="b">{bar.endPoint.name}</Text>
              </Flex>
              <IconButton
                aria-label="Close"
                size="xs"
                colorScheme="red"
                variant="outline"
                onClick={() => removeBar(bar)}
                icon={<CloseIcon />}
              />
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}

export default Graph;
