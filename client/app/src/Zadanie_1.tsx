import { useState } from "react";
import { ReactDOM } from "react";

import {
  Button,
  Flex,
  Input,
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
  Select,
  Heading,
  Tooltip,
} from "@chakra-ui/react";

import { ChevronDownIcon } from "@chakra-ui/icons";
import Structure from "./Structure";

function Zadanie_1() {
  // MATERIAL AND CROSS SECTION
  const sectionSchema = {
    material: "",
    width: "",
    height: "",
  };

  const [section, setSection] = useState(sectionSchema);

  // POINTS
  const pointSchema = {
    x: "",
    y: "",
    name: "",
    codeNumbers: "",
    dof: "",
  };

  const [point, setPoint] = useState(pointSchema);
  const [points, setPoints] = useState([]);

  // BARS

  const barSchema = {
    startPoint: "",
    endPoint: "",
    name: "",
  };

  const [bar, setBar] = useState(barSchema);
  const [bars, setBars] = useState([]);

  // LOADS

  const loadSchema = {
    bar: "",
    Q: "",
    F: "",
    F_position: "",
  };

  const [load, setLoad] = useState(loadSchema);
  const [loads, setLoads] = useState([]);

  function handleLoadChange(e, bar) {
    const { name, value } = e.target;
    if (e.target.name === "bar") {
      setLoad({ ...load, bar: bar.name });
    } else {
      setLoad({ ...load, [name]: value });
    }
  }

  function handleLoadSubmit(e) {
    e.preventDefault();
    setLoads([...loads, load]);
  }

  function handleBarChange(e, point) {
    if (e.target.name === "startPoint") {
      setBar({ ...bar, startPoint: point });
    } else if (e.target.name === "endPoint") {
      setBar({ ...bar, endPoint: point });
    } else if (e.target.name === "name") {
      setBar({ ...bar, name: e.target.value });
    }
  }

  function handleBarSubmit(e) {
    e.preventDefault();
    setBars([...bars, bar]);
  }

  function handleSectionChange(e: Event) {
    let { name, value } = e.target;
    if (name === "") {
      name = "material";
    }
    setSection({ ...section, [name]: value });
  }

  function handlePointChange(e: Event) {
    let { name, value } = e.target;
    if (name === "") {
      name = "dof";
    }
    setPoint({ ...point, [name]: value });
  }

  function handlePointSubmit(e: Event) {
    e.preventDefault();
    setPoints([...points, point]);
  }

  function removePoint(point) {
    setPoints(points.filter((p) => p !== point));
  }

  function removeBar(bar) {
    setBars(bars.filter((b) => b !== bar));
  }

  function removeLoad(load) {
    setLoads(loads.filter((l) => l !== load));
  }

  function bundleState() {
    const state = {
      section,
      points,
      bars,
      loads,
    };
    return state;
  }

  function handleCalculation(e) {
    e.preventDefault();
    const state = bundleState();
    fetch("http://127.0.0.1:5000/new", {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-type": "application/json, charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((message) => console.log(message));
  }

  const [tables, setTables] = useState();

  function handleMyStructure(e) {
    e.preventDefault();
    fetch("http://127.0.0.1:5000/moje", {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((message) => setTables(message));
  }

  return (
    <>
      {/* INPUT */}
      <Flex
        border="1px solid black"
        borderRadius="lg"
        p="10"
        w="70%"
        maxW="80rem"
        mx="auto"
        direction="column"
      >
        <Heading mb={4}>Input</Heading>
        <Accordion defaultIndex={[0]} allowMultiple w="100%">
          {/* MATERIAL AND CROSS SECTION */}
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
              <HStack gap="1">
                <Tooltip label="Cross section height in milimeters">
                  <Input
                    placeholder="height"
                    name="height"
                    onChange={(e) => {
                      handleSectionChange(e);
                    }}
                  />
                </Tooltip>
                <Tooltip label="Cross section width in milimeters">
                  <Input
                    placeholder="width"
                    name="width"
                    onChange={(e) => {
                      handleSectionChange(e);
                    }}
                  />
                </Tooltip>
                <Select
                  placeholder="Select material"
                  name="material"
                  onChange={(e) => {
                    handleSectionChange(e);
                  }}
                >
                  <option value="C16/20">C16/20</option>
                  <option value="C20/25">C20/25</option>
                  <option value="C25/30">C25/30</option>
                  <option value="C30/37">C30/37</option>
                  <option value="C35/45">C35/45</option>
                </Select>
              </HStack>
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
              <HStack gap="1">
                <Tooltip label="x coordinate in meters">
                  <Input
                    placeholder="x"
                    name="x"
                    onChange={(e) => {
                      handlePointChange(e);
                    }}
                  />
                </Tooltip>
                <Tooltip label="y coordinate in meters">
                  <Input
                    placeholder="y"
                    name="y"
                    onChange={(e) => {
                      handlePointChange(e);
                    }}
                  />
                </Tooltip>
                <Tooltip label="Point name">
                  <Input
                    placeholder="name"
                    name="name"
                    onChange={(e) => {
                      handlePointChange(e);
                    }}
                  />
                </Tooltip>
                <Tooltip label="3 numbers for each point. Used to locate point in stiffness matrix. Start with 0 e.g. 0,1,2. Next point 3,4,5...">
                  <Input
                    placeholder="code numbers"
                    name="codeNumbers"
                    onChange={(e) => {
                      handlePointChange(e);
                    }}
                  />
                </Tooltip>
                <Select
                  placeholder="Select dof"
                  name="dof"
                  onChange={(e) => {
                    handlePointChange(e);
                  }}
                >
                  <option value="1,1,1">1,1,1 - free</option>
                  <option value="0,0,0">0,0,0 - stiff</option>
                  <option value="1,0,1">1,0,1 - free in 'x' + rot.</option>
                  <option value="0,1,1">0,1,1 - free in 'y' + rot.</option>
                  <option value="0,0,1">0,0,1 - rotation</option>
                </Select>

                <Button
                  minW="-moz-fit-content"
                  colorScheme="whatsapp"
                  onClick={(e) => {
                    handlePointSubmit(e);
                  }}
                >
                  Add Point
                </Button>
              </HStack>
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
              <HStack gap="1">
                <Menu>
                  <Tooltip label="Choose starting point">
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="outline"
                      minW="-moz-fit-content"
                    >
                      point A
                    </MenuButton>
                  </Tooltip>
                  <MenuList>
                    {points.map((point) => {
                      return (
                        <MenuItem
                          key={point.x + point.y}
                          name="startPoint"
                          onClick={(e) => {
                            handleBarChange(e, point);
                          }}
                        >
                          {point.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>

                <Menu>
                  <Tooltip label="Choose ending point">
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="outline"
                      minW="-moz-fit-content"
                    >
                      point B
                    </MenuButton>
                  </Tooltip>
                  <MenuList>
                    {points.map((point) => {
                      return (
                        <MenuItem
                          key={point.x + point.y}
                          name="endPoint"
                          onClick={(e) => {
                            handleBarChange(e, point);
                          }}
                        >
                          {point.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Tooltip label="Bar name">
                  <Input
                    placeholder="name"
                    name="name"
                    onChange={(e) => {
                      handleBarChange(e, null);
                    }}
                  />
                </Tooltip>

                <Button
                  colorScheme="whatsapp"
                  onClick={(e) => {
                    handleBarSubmit(e);
                  }}
                >
                  Create
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>

          {/* LOADS */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Define Loads
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <HStack gap="1">
                <Menu>
                  <Tooltip label="Choose bar">
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      variant="outline"
                      minW="-moz-fit-content"
                    >
                      Bar
                    </MenuButton>
                  </Tooltip>
                  <MenuList>
                    {bars.map((bar) => {
                      return (
                        <MenuItem
                          key={bar.name + bar.startPoint.x + bar.startPoint.y}
                          name="bar"
                          onClick={(e) => {
                            handleLoadChange(e, bar);
                          }}
                        >
                          {bar.name}
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Menu>
                <Tooltip label="F [kN]">
                  <Input
                    placeholder="Point load"
                    name="F"
                    onChange={(e) => {
                      handleLoadChange(e, null);
                    }}
                  />
                </Tooltip>
                <Tooltip label="Choose from 0 to 1. Default is 0.5">
                  <Input
                    placeholder="Point load position"
                    name="F_position"
                    onChange={(e) => {
                      handleLoadChange(e, null);
                    }}
                  />
                </Tooltip>
                <Tooltip label="Q [kN/m]">
                  <Input
                    placeholder="Distributed load"
                    name="Q"
                    onChange={(e) => {
                      handleLoadChange(e, null);
                    }}
                  />
                </Tooltip>
                <Button
                  colorScheme="whatsapp"
                  minW="-moz-fit-content"
                  onClick={(e) => {
                    handleLoadSubmit(e);
                  }}
                >
                  Add Load
                </Button>
              </HStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
      {/* INPUT CHECK */}
      <Structure
        section={section}
        points={points}
        removePoint={removePoint}
        removeBar={removeBar}
        removeLoad={removeLoad}
        bars={bars}
        loads={loads}
      />
      <Button
        onClick={(e) => {
          handleCalculation(e);
        }}
      >
        OK
      </Button>
      <Button
        onClick={(e) => {
          handleMyStructure(e);
        }}
      >
        Moje
      </Button>
      {tables && (
        <Flex direction="column">
          <Flex dangerouslySetInnerHTML={{ __html: tables.modelMatrix }} />
          <Flex dangerouslySetInnerHTML={{ __html: tables.bc_modelMatrix }} />
          <Flex dangerouslySetInnerHTML={{ __html: tables.bc_LoadVector }} />
          <Flex
            dangerouslySetInnerHTML={{ __html: tables.modelDisplacements }}
          />
          <Flex
            dangerouslySetInnerHTML={{ __html: tables.barInternalForces }}
          />
        </Flex>
      )}
    </>
  );
}

export default Zadanie_1;
