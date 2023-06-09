import {
  Avatar,
  AvatarBadge,
  Badge,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";

const ChatUser = ({ user, handleChat, handleRemove, isAdmin, currUserId }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mr={5}
      ml={2}
      position={"relative"}
    >
      <Avatar src={user.profile} />

      <Badge
        bg="whiteAlpha.900"
        variant="subtle"
        rounded={"full"}
        position="absolute"
        ml={-9}
        w="5"
        h="5"
        display="flex"
        alignItems="center"
        cursor="pointer"
        onClick={() => handleRemove(user)}
      >
        <CloseIcon w={"10px"} color="red.400" />
      </Badge>
      <Text
        fontSize="sm"
        color={isAdmin === "true" ? "black" : "white"}
        cursor="pointer"
        onClick={() => handleChat(user)}
      >
        {user.name}
      </Text>
      <Text fontSize="xs">
        {isAdmin === "true" && "(A)"}
        {currUserId === user._id && "(me)"}
      </Text>
    </Box>
  );
};

export default ChatUser;
