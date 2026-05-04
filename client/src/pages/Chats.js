import React, { useState } from "react";
import Chatpanel from "../components/chats/Chatpanel";
import { Box, Flex } from "@chakra-ui/react";
import ChatBox from "../components/chats/ChatBox";
import Rightbar from "../components/user/Rightbar";
import { ChatState } from "../context/ChatProvider";
import Navbar from "../components/chats/Navbar";

const Chats = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { selectedChat, isRightbarOpen } = ChatState();
  return (
    <Flex bg="#e8e8e8" flexDir={"column"} h="100vh" minH={0}>
      <Box flexShrink={0}>
        <Navbar />
      </Box>
      <Flex flexDir={"row"} justifyContent={"space-between"} flex={1} minH={0}>
        <Box
          flex={{ base: !selectedChat ? "90%" : "0", lg: "30%" }}
          minH={0}
          h="100%"
        >
          <Chatpanel fetchAgain={fetchAgain} />
        </Box>
        <Box
          flex={{ base: !selectedChat ? "0" : "90%", lg: "50%" }}
          minH={0}
          h="100%"
        >
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
        <Box
          flex={{ base: "19%", lg: "20%" }}
          display={{ base: isRightbarOpen ? "flex" : "none", lg: "flex" }}
          minH={0}
          h="100%"
        >
          <Rightbar fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default Chats;
