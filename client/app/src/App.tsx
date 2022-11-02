import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Zadanie_1 from "./Zadanie_1";

function App() {
  function handleSubmit() {
    fetch("http://127.0.0.1:5000/create", {
      method: "POST",
      body: JSON.stringify({
        input: "hello",
      }),
      headers: {
        "Content-type": "application/json, charset=UTF-8",
      },
    })
      .then((resp) => resp.json())
      .then((message) => console.log(message));
  }

  function handleGet() {
    fetch("http://127.0.0.1:5000/matrices")
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((data) => console.log(data));
  }

  return (
    <Tabs>
      <TabList>
        <Tab>1.Zadanie</Tab>
        <Tab>2.Zadanie</Tab>
        <Tab>3.Zadanie</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Zadanie_1 />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default App;
