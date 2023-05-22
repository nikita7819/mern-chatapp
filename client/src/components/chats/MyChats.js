import { Avatar, Box, Flex, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ChatState } from "../../context/ChatProvider";
import { getSender } from "../../config/chatLogic";

const MyChats = ({ chat }) => {
  const { user, setSelectedChat, selectedChat } = ChatState();
  return (
    <Box
      display="flex"
      onClick={() => setSelectedChat(chat)}
      cursor="pointer"
      bg={selectedChat === chat ? "green.500" : "#E8E8E8"}
      color={selectedChat === chat ? "white" : "black"}
      px={3}
      py={2}
      borderRadius="lg"
      key={chat._id}
    >
      <Avatar
        src={!chat.isGroupChat && getSender(user, chat.users).profile}
        name={chat.chatName}
      />
      <Box px={3}>
        <Text fontSize="md">
          {!chat.isGroupChat ? getSender(user, chat.users).name : chat.chatName}
        </Text>
        {chat.latestMessage ? (
          <Text fontSize="xs">
            <b>{chat.latestMessage.sender.name} : </b>
            {chat.latestMessage.content.length > 50
              ? chat.latestMessage.content.substring(0, 51) + "..."
              : chat.latestMessage.content}
          </Text>
        ) : (
          <Text fontSize="xs">No message yet</Text>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
