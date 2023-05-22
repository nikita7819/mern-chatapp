import React, { useState } from "react";

import Chatpanel from "../components/chats/Chatpanel";

import Sidebar from "../components/chats/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import ChatBox from "../components/chats/ChatBox";
import Rightbar from "../components/user/Rightbar";

const Chats = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <Flex minH="100vh" bg="#e8e8e8">
      <Box flex="0.5">
        <Sidebar />
      </Box>
      <Box flex="2.5">
        <Chatpanel fetchAgain={fetchAgain} />
      </Box>
      <Box flex="7">
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
      <Box flex="2.5">
        <Rightbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </Flex>
  );
};

export default Chats;
