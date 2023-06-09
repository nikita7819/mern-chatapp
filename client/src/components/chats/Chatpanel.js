import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Input,
  Spinner,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MyChats from "./MyChats";
import { BiMessageSquareAdd } from "react-icons/bi";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import authHeader from "../../config/auth-header";
import ChatLoading from "./ChatLoading";
import UserListItem from "../user/UserListItem";
import { ChatState } from "../../context/ChatProvider";
import GroupChatModal from "./GroupChatModal";

const Chatpanel = ({ fetchAgain }) => {
  const [loadingChats, setLoadingChats] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loggedUser, setLoggedUser] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { user, setSelectedChat, selectedChat, chats, setChats } = ChatState();

  const toast = useToast();

  const handleSearch = async () => {
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
        }
      );
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
      setLoadingChats(true);
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
      setLoadingChats(false);
      onClose();
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

  const fetchChats = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/chat`, {
        headers: authHeader(),
      });
      setChats(data);
    } catch (error) {
      toast({
        title: "Error occured to load chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    // setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <>
      <Box
        bg="#f1f1f1"
        w="100%"
        h="100vh"
        display={{ base: !selectedChat ? "block" : "none", lg: "block" }}
      >
        <Stack px="3" py="2">
          <Box
            justifyContent="space-between"
            alignItems="center"
            display="flex"
          >
            <Text
              fontSize="2xl"
              fontWeight="semibold"
              color="green.600"
              align="left"
            >
              Messages
            </Text>
            <GroupChatModal
              loading={loading}
              search={search}
              setSearch={setSearch}
              searchResult={searchResult}
            >
              <Icon
                as={BiMessageSquareAdd}
                cursor={"pointer"}
                w="6"
                h="6"
                color="green.600"
              />
            </GroupChatModal>
          </Box>
          <Button
            variant="ghost"
            colorScheme="gray"
            bg="whiteAlpha.800"
            display="flex"
            justifyContent="space-between"
            onClick={onOpen}
          >
            <Text>Search</Text>
            <MdSearch size="20px" />
          </Button>
        </Stack>
        <Stack px="3" py="2" overflowY="scroll" h={{ base: "80vh" }}>
          {chats ? (
            chats.map((chat) => <MyChats key={chat._id} chat={chat} />)
          ) : (
            <ChatLoading />
          )}
        </Stack>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
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
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChats && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Chatpanel;
