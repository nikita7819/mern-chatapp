import {
  Box,
  Heading,
  useColorModeValue,
  Container,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";

const Home = () => {
  return (
    <Container
      maxW="xl"
      centerContent
      maxh={"calc(110vh)"}
      justifyContent="center"
    >
      <Box
        // bg={useColorModeValue("whatsapp.50", "gray.800")}
        d="flex"
        rounded="2xl"
        alignItems={"center"}
        p={3}
        w="50%"
        m="20px 0 15px 0"
      >
        <Heading fontSize={"3xl"} color="whatsapp.800" textAlign={"center"}>
          Chit-Chat
        </Heading>
      </Box>
      <Box
        rounded={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        boxShadow={"xl"}
        w="100%"
        p={8}
        border={"2px"}
        borderColor={"blackAlpha.50"}
      >
        <Tabs isFitted variant="soft-rounded" colorScheme="green">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
