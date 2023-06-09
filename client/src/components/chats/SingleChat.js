import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Text,
  Flex,
  Spinner,
  FormControl,
  Input,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { ChatState } from "../../context/ChatProvider";
import { CloseIcon } from "@chakra-ui/icons";
import { getSender } from "../../config/chatLogic";
import axios from "axios";
import authHeader from "../../config/auth-header";
import Picker from "emoji-picker-react";
import io from "socket.io-client";
import { GoSmiley } from "react-icons/go";
import ScrollableChat from "./ScrollableChat";
import Lottie from "react-lottie";
import animationData from "../../animation/typing.json";

var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const {
    selectedChat,
    setSelectedChat,
    user,
    notification,
    setNotification,
    setIsRightbarOpen,
  } = ChatState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  // console.log(BASE_URL);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const toast = useToast();

  useEffect(() => {
    socket = io(BASE_URL);
    socket.emit("setup", user);
    socket.on("connected", () => {
      setSocketConnected(true);
    });
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageReceived.chat._id
      ) {
        //give notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([newMessageReceived, ...notification]);
          setFetchAgain(!fetchAgain);
        }
      } else {
        setMessages([...messages, newMessageReceived]);
      }
    });
  });

  const [showPicker, setShowPicker] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    setNewMessage((prevInput) => prevInput + emojiObject.emoji);
    setShowPicker(false);
  };

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await axios.get(
        `${BASE_URL}/api/message/${selectedChat._id}`,
        {
          headers: authHeader(),
        }
      );
      // console.log(data);
      setMessages(data);
      // console.log(messages);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error occured!",
        description: "Failed to load the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const { data } = await axios.post(
          `${BASE_URL}/api/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          {
            headers: authHeader(),
            "Content-type": "application/json",
          }
        );
        // console.log(data);
        setNewMessage("");
        socket.emit("new message", data);
        setMessages([...messages, data]);
        setFetchAgain(!fetchAgain);
      } catch (error) {
        toast({
          title: "Error occured!",
          description: "Failed to send message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    // console.log(selectedChat);
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  // console.log(notification);

  return (
    <>
      {selectedChat ? (
        <>
          <Box
            display="flex"
            width="100%"
            flexDirection="column"
            height="100vh"
            bg="#e8e8e8"
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              p={2}
              m={2}
              mb={0}
              bg="whiteAlpha.800"
              rounded="base"
            >
              <Flex flexDirection="column">
                <Text
                  fontWeight="semibold"
                  color="green.400"
                  fontSize={{ base: "13px", md: "20px" }}
                >
                  {!selectedChat.isGroupChat ? (
                    <>{getSender(user, selectedChat.users).name}</>
                  ) : (
                    <>{selectedChat.chatName.toUpperCase()}</>
                  )}
                </Text>
                <Text
                  color="blue.400"
                  cursor={"pointer"}
                  display={{ base: "block", lg: "none" }}
                  onClick={() => setIsRightbarOpen(true)}
                  fontSize={{ base: "xs", md: "sm" }}
                >
                  Info
                </Text>
              </Flex>
              <IconButton
                display={{ base: "flex" }}
                icon={<CloseIcon />}
                size="xs"
                onClick={() => setSelectedChat("")}
              />
            </Box>
            <Box
              display="flex"
              flexDir="column"
              justifyContent="flex-end"
              p={2}
              w={"100%"}
              // bg="red"
              h="100%"
              overflowY="hidden"
            >
              {loading ? (
                <Spinner
                  w={10}
                  h={10}
                  color="green"
                  alignSelf="center"
                  margin={"auto"}
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                  }}
                >
                  <ScrollableChat messages={messages} />
                </div>
              )}
              {showPicker && (
                <Picker
                  pickerStyle={{
                    width: "20%",
                    height: "50%",
                    position: "fixed",
                    bottom: "30px",
                    marginLeft: "28em",
                  }}
                  onEmojiClick={onEmojiClick}
                />
              )}
              {isTyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    height={70}
                    width={130}
                    style={{ marginBottom: 0, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <FormControl
                onKeyDown={sendMessage}
                isRequired
                boxShadow="xl"
                mt={3}
                display="flex"
                justifyContent={"space-between"}
                alignItems="center"
                bg="white"
                p={3}
                rounded={"full"}
              >
                <Input
                  variant="unstyled"
                  bg="whiteAlpha.800"
                  placeholder="Say something..."
                  onChange={typingHandler}
                  value={newMessage}
                  w={"95%"}
                  mr={3}
                />
                <Icon
                  as={GoSmiley}
                  w={5}
                  h={5}
                  onClick={() => setShowPicker((val) => !val)}
                />
              </FormControl>
            </Box>
          </Box>
        </>
      ) : (
        <Box mt={190} ml={120} display={{ base: "none", lg: "flex" }}>
          <Text fontSize="4xl" color="blackAlpha.300" cursor="default">
            Select a chat to start messaging
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
