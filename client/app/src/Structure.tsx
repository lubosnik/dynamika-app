import { Flex, Heading } from "@chakra-ui/react";
import Bars from "./Bars";
import CrossSection from "./CrossSection";
import Points from "./Points";
import Loads from "./Loads";

function Structure({
  section,
  points,
  removePoint,
  bars,
  removeBar,
  loads,
  removeLoad,
}) {
  return (
    <Flex
      border="1px solid black"
      borderRadius="lg"
      p="10"
      w="70%"
      mx="auto"
      my="5"
      maxW="80rem"
      direction="column"
    >
      <Heading mb={4}>Structure</Heading>
      <Flex direction="column">
        <CrossSection section={section} />
        <Points points={points} removePoint={removePoint} />
        <Bars bars={bars} removeBar={removeBar} />
        <Loads loads={loads} removeLoad={removeLoad} />
      </Flex>
    </Flex>
  );
}

export default Structure;
