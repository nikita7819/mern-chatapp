import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Portal,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ChatLoading from "./ChatLoading";
import UserListItem from "../user/UserListItem";
import axios from "axios";
import authHeader from "../../config/auth-header";
import { ChatState } from "../../context/ChatProvider";
import { MdSearch } from "react-icons/md";

const SearchDrawer = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [loadingChats, setLoadingChats] = useState();

  const toast = useToast();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [searchResult, setSearchResult] = useState([]);
  const [searched, setSearched] = useState(false);
  const { setSelectedChat, chats, setChats } = ChatState();
  const handleSearch = async () => {
    setSearched(false);
    if (!search) {
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
      const { data } = await axios.get(
        `${BASE_URL}/api/user?search=${search}`,
        {
          headers: authHeader(),
        },
      );
      setLoading(false);
      setSearchResult(data);
      setSearched(true);
    } catch (error) {
      toast({
        title: "Error occured to fetch results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setSearched(true);
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChats(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/chat`,
        { userId },
        {
          headers: authHeader(),
          "Content-type": "application/json",
        },
      );
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      setSelectedChat(data);
      setLoadingChats(false);
      // onClose();
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
      <span onClick={onOpen}>{children}</span>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search user by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : searchResult.length > 0 ? (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            ) : (
              searched && (
                <Text mt={2} textAlign="center">
                  No results found
                </Text>
              )
            )}
            {loadingChats && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SearchDrawer;
