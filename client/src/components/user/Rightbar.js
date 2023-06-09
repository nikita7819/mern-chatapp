import { CheckIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  Text,
  useToast,
  Spinner,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import axios from "axios";
import React, { useEffect, useState } from "react";
import authHeader from "../../config/auth-header";
import { getSender } from "../../config/chatLogic";
import { ChatState } from "../../context/ChatProvider";
import UserListItem from "./UserListItem";
import ChatUser from "./ChatUser";

const Rightbar = ({ fetchAgain, setFetchAgain }) => {
  const {
    user,
    setSelectedChat,
    selectedChat,
    groupAdmin,
    setGroupAdmin,
    setIsRightbarOpen,
    chats,
    setChats,
  } = ChatState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [groupChatName, setGroupChatName] = useState("");
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        { headers: authHeader() }
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admin can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User already added!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        { headers: authHeader() }
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const { data } = await axios.put(
        `${BASE_URL}/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        {
          headers: authHeader(),
        }
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      toast({
        title: "Please enter name or email to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASE_URL}/api/user?search=${query}`, {
        headers: authHeader(),
      });
      // console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occured to fetch results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}/api/chat`,
        { userId },
        {
          headers: authHeader(),
          "Content-type": "application/json",
        }
      );
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
    } catch (error) {
      toast({
        title: "Error occured to fetch chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      {!selectedChat ? (
        <Box
          display="flex"
          flexDirection="column"
          bg="green.300"
          height="100vh"
          color="white"
          overflowY={"scroll"}
          boxShadow="xl"
          width="100%"
          padding={5}
          alignItems="center"
        >
          <Avatar
            src={user.profile}
            size="lg"
            name={user.name}
            boxShadow="md"
          />
          <Divider variant="solid" mt={5} />
          <Text mt={5} mb={2} fontSize="xl" fontWeight={"semibold"}>
            {user.name}
          </Text>
          <Text fontSize="sm" fontWeight={"medium"}>
            {user.email}
          </Text>
        </Box>
      ) : !selectedChat.isGroupChat ? (
        <Box
          display="flex"
          flexDirection="column"
          bg="green.300"
          height="100vh"
          color="white"
          boxShadow="xl"
          width={"100%"}
          padding={5}
          overflowY={"scroll"}
          alignItems="center"
        >
          <IconButton
            display={{ base: "block", lg: "none" }}
            alignSelf={"flex-start"}
            marginBottom={"2rem"}
            bg={"green.500"}
            icon={<CloseIcon />}
            size="xs"
            onClick={() => setIsRightbarOpen(false)}
          />
          <Avatar
            src={getSender(user, selectedChat.users).profile}
            size="lg"
            boxShadow="md"
          />
          <Divider variant="solid" mt={5} />
          <Text mt={5} mb={2} fontSize="xl" fontWeight={"semibold"}>
            {getSender(user, selectedChat.users).name}
          </Text>
          <Text fontSize="sm" fontWeight={"medium"}>
            {getSender(user, selectedChat.users).email}
          </Text>
        </Box>
      ) : (
        <Box
          bg="green.300"
          height="100vh"
          color="white"
          boxShadow="xl"
          padding={5}
          overflowY={"scroll"}
          alignItems="center"
        >
          <Box display="flex" alignItems="center" flexDirection="column">
            <IconButton
              display={{ base: "block", lg: "none" }}
              alignSelf={"flex-start"}
              marginBottom={"2rem"}
              bg={"green.500"}
              icon={<CloseIcon />}
              size="xs"
              onClick={() => setIsRightbarOpen(false)}
            />
            <Avatar name={selectedChat.chatName} size="lg" boxShadow="md" />
            <Text mt={2} fontSize="xl" fontWeight={"semibold"}>
              {selectedChat.chatName}
            </Text>
          </Box>

          <Divider variant="solid" mt={2} />
          <FormControl
            display="flex"
            alignItems={"center"}
            justifyContent="space-between"
            my={4}
          >
            <Input
              w="80%"
              variant="filled"
              placeholder="Rename chat"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button w="20px" isLoading={renameLoading}>
              <CheckIcon color="green" onClick={handleRename} />
            </Button>
          </FormControl>
          <FormControl mb={3}>
            <Input
              variant="flushed"
              placeholder="Add user"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          {loading ? (
            <Spinner size="lg" />
          ) : (
            <Box overflowY="scroll" height="20vh">
              {searchResult.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleAddUser(u)}
                />
              ))}
            </Box>
          )}
          <Text mt={3} fontSize="md">
            Members:
          </Text>
          <Box display="flex" flexWrap="wrap" overflowY="scroll" mt={2}>
            {selectedChat.users.map((u) => (
              <ChatUser
                user={u}
                currUserId={user._id}
                key={u._id}
                isAdmin={
                  selectedChat.groupAdmin._id === u._id ? "true" : "false"
                }
                handleChat={() => accessChat(u)}
                handleRemove={() => handleRemove(u)}
              />
            ))}
          </Box>
          <Button
            mt={{ base: "6", lg: "3" }}
            ml={{ base: "0", lg: "12" }}
            bg={"red.400"}
            _hover={{ bg: "red.600" }}
            onClick={() => handleRemove(user)}
          >
            Leave group
          </Button>
        </Box>
      )}
    </>
  );
};

export default Rightbar;
