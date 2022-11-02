import { useState } from "react";

import {
  Button,
  Flex,
  Input,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";

import CrossSection from "./CrossSection";
import Graph from "./Graph";

function Zadanie_1() {
  // CROSS SECTION AND MATERIAL
  const [material, setMaterial] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [crossSectionSchema, setCrossSectionSchema] = useState(false);

  // POINTS
  const [point_x, setPoint_x] = useState("");
  const [point_y, setPoint_y] = useState("");
  const [point_name, setPoint_name] = useState("");
  const [point_codeNumbers, setPoint_codeNumbers] = useState("");

  // BARS
  const [bar_startPoint, setBar_startPoint] = useState("");
  const [bar_endPoint, setBar_endPoint] = useState("");
  const [bars, setBars] = useState([]);

  const pointSchema = {
    x: point_x,
    y: point_y,
    name: point_name,
    codeNumbers: point_codeNumbers,
  };

  const crossSectionMaterialSchema = {
    material: material,
    width: width,
    height: height,
  };

  const barSchema = {
    startPoint: bar_startPoint,
    endPoint: bar_endPoint,
    name: `${bar_startPoint.name}-${bar_endPoint.name}`,
  };

  const [points, setPoints] = useState([]);
  const [crossSectionMaterial, setCrossSectionMaterial] = useState([]);

  function addPoint() {
    setPoints([...points, pointSchema]);
  }

  function removePoint(point) {
    setPoints(points.filter((p) => p !== point));
  }

  function removeBar(point) {
    setBars(bars.filter((b) => b !== bar));
  }

  function addCrossSectionMaterial() {
    setCrossSectionMaterial([crossSectionMaterialSchema]);
    if (width !== "" && height !== "" && material !== "") {
      setCrossSectionSchema(true);
    }
  }

  function createBar() {
    setBars([...bars, barSchema]);
  }

  return (
    <Flex>
      <Accordion defaultIndex={[0]} allowMultiple w="400px">
        {/* Material and cross section */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Define Material and Cross Section
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack>
              <HStack gap="1">
                <Input
                  placeholder="height"
                  w="25%"
                  onChange={(e) => setHeight(e.target.value)}
                />
                <Input
                  placeholder="width"
                  w="25%"
                  onChange={(e) => setWidth(e.target.value)}
                />
                <Input
                  placeholder="material"
                  w="50%"
                  onChange={(e) => setMaterial(e.target.value)}
                />
              </HStack>
              <Button
                colorScheme="whatsapp"
                onClick={() => {
                  addCrossSectionMaterial();
                }}
              >
                Create
              </Button>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* POINTS */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Create Points
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack>
              <HStack gap="1">
                <Input
                  placeholder="x"
                  w="20%"
                  onChange={(e) => setPoint_x(e.target.value)}
                />
                <Input
                  placeholder="y"
                  w="20%"
                  onChange={(e) => setPoint_y(e.target.value)}
                />
                <Input
                  placeholder="name"
                  w="40%"
                  onChange={(e) => setPoint_name(e.target.value)}
                />
                <Input
                  placeholder="code numbers"
                  onChange={(e) => setPoint_codeNumbers(e.target.value)}
                />
              </HStack>
              <HStack gap="1">
                <Button colorScheme="whatsapp" onClick={() => addPoint()}>
                  Add Point
                </Button>
              </HStack>
            </VStack>
          </AccordionPanel>
        </AccordionItem>

        {/* BARS */}
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Create Bars
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <VStack direction="column">
              <HStack gap="1">
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                  >
                    {bar_startPoint.name}
                  </MenuButton>
                  <MenuList>
                    {points.map((point) => (
                      <MenuItem
                        key={point.codeNumbers}
                        onClick={() => setBar_startPoint(point)}
                      >
                        {point.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>

                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    variant="outline"
                  >
                    {bar_endPoint.name}
                  </MenuButton>
                  <MenuList>
                    {points.map((point) => (
                      <MenuItem
                        key={point.codeNumbers}
                        onClick={() => setBar_endPoint(point)}
                      >
                        {point.name}
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </HStack>
              <Button
                colorScheme="whatsapp"
                onClick={() => {
                  createBar();
                }}
              >
                Create
              </Button>
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
      {crossSectionSchema && (
        <CrossSection w={width} h={height} material={material} />
      )}
      <Graph
        points={points}
        bars={bars}
        removePoint={removePoint}
        removeBar={removeBar}
      />
    </Flex>
  );
}

export default Zadanie_1;
