import React, { useState } from "react";

import Chatpanel from "../components/chats/Chatpanel";

import Sidebar from "../components/chats/Sidebar";
import { Box, Flex } from "@chakra-ui/react";
import ChatBox from "../components/chats/ChatBox";
import Rightbar from "../components/user/Rightbar";
import { ChatState } from "../context/ChatProvider";

const Chats = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, isRightbarOpen } = ChatState();
  return (
    <Flex maxH="100vh" bg="#e8e8e8">
      <Box flex={"1%"}>
        <Sidebar />
      </Box>
      <Box flex={{ base: !selectedChat ? "90%" : "0", lg: "25%" }}>
        <Chatpanel fetchAgain={fetchAgain} />
      </Box>
      <Box flex={{ base: !selectedChat ? "0" : "90%", lg: "50%" }}>
        <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
      <Box
        flex={{ base: "19%", lg: "23%" }}
        display={{ base: isRightbarOpen ? "flex" : "none", lg: "flex" }}
      >
        <Rightbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
      </Box>
    </Flex>
  );
};

export default Chats;
