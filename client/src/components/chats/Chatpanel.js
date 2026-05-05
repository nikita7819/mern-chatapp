import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import MyChats from "./MyChats";
import { BiMessageSquareAdd } from "react-icons/bi";
// import { MdSearch } from "react-icons/md";
import axios from "axios";
import authHeader from "../../config/auth-header";
import ChatLoading from "./ChatLoading";
// import UserListItem from "../user/UserListItem";
import { ChatState } from "../../context/ChatProvider";
import GroupChatModal from "./GroupChatModal";

const Chatpanel = ({ fetchAgain }) => {
  // const [loadingChats, setLoadingChats] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [loggedUser, setLoggedUser] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // const { isOpen, onClose } = useDisclosure();

  const { selectedChat, chats, setChats } = ChatState();

  const toast = useToast();

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
        h="100%"
        minH={0}
        display={{ base: !selectedChat ? "flex" : "none", lg: "flex" }}
        flexDirection="column"
      >
        <Box px="3" py="2">
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
          {/* <Button
            variant="ghost"
            colorScheme="gray"
            bg="whiteAlpha.800"
            display="flex"
            justifyContent="space-between"
            onClick={onOpen}
          >
            <Text>Search</Text>
            <MdSearch size="20px" />
          </Button> */}
        </Box>
        <Box px="3" py="2" flex={1} minH={0} overflowY="auto">
          {chats ? (
            chats.length > 0 ? (
              chats.map((chat) => <MyChats key={chat._id} chat={chat} />)
            ) : (
              <Stack alignItems="center" mt="10">
                <Text
                  fontSize="xl"
                  fontWeight="medium"
                  color="gray.500"
                  userSelect={"none"}
                  textAlign={"center"}
                  w={"0.7"}
                >
                  No chats found.
                  <br />
                  Find a friend to start a new chat!
                </Text>
              </Stack>
            )
          ) : (
            <ChatLoading />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Chatpanel;
