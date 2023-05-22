import {
  Avatar,
  Box,
  Flex,
  Icon,
  Menu,
  MenuButton,
  IconButton,
  Input,
  MenuItem,
  Button,
  MenuList,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, ChevronLeftIcon } from "@chakra-ui/icons";
import React from "react";
import {
  RiWechatFill,
  RiChat1Line,
  RiPhoneLine,
  RiCalendar2Fill,
  RiMoonClearFill,
  RiSunFill,
  RiSettingsFill,
} from "react-icons/ri";
import { MdPeople } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { getSender } from "../../config/chatLogic";
import NotificationBadge, { Effect } from "react-notification-badge";

const Sidebar = () => {
  const { user, notification, setNotification, setSelectedChat } = ChatState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  return (
    <Box
      display="flex"
      bg="green.500"
      color="white"
      flexDir={"column"}
      minH={"100vh"}
      alignItems="center"
      justifyContent="space-between"
      padding={2}
    >
      <Box>
        <Box>
          <Icon as={RiWechatFill} w={10} h={10} />
        </Box>
        <Box
          marginTop="16"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Icon mb={"4"} as={RiChat1Line} w={6} h={6} />
          <Icon mb={"4"} as={RiPhoneLine} w={6} h={6} />
          <Icon mb={"4"} as={RiCalendar2Fill} w={6} h={6} />
          <Icon mb={"4"} as={MdPeople} w={6} h={6} />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Menu>
          <NotificationBadge
            count={notification.length}
            effect={Effect.SCALE}
            style={{
              color: "green",
              backgroundColor: "yellow",
              top: " ",
              bottom: " ",
              right: "7px",
            }}
          />
          <MenuButton
            as={IconButton}
            icon={
              <BellIcon
                w={{ base: "6", md: "8" }}
                h={{ base: "6", md: "8" }}
                mb={5}
              />
            }
            bg="none"
            _hover={{ bg: "none" }}
          />
          <MenuList color="black" pl={2}>
            {!notification.length && "No New Messages"}
            {notification.map((n) => (
              <MenuItem
                key={n._id}
                onClick={() => {
                  setSelectedChat(n.chat);
                  setNotification(notification.filter((nt) => nt !== n));
                }}
              >
                {n.chat.isGroupChat
                  ? `New Message in ${n.chat.chatName}`
                  : `New Message from ${getSender(user, n.chat.users).name}`}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button} bg="none">
            <Avatar name={user.name} src={user.profile} size="sm" />
          </MenuButton>
          <MenuList color="black">
            <MenuItem>My profile</MenuItem>
            <MenuItem onClick={handleLogout}>
              Logout <IoMdLogOut />
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Sidebar;
