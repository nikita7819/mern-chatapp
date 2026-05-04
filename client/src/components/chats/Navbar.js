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
  Text,
  useDisclosure,
  Drawer,
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
import { MdPeople, MdSearch } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";
import { getSender } from "../../config/chatLogic";
import NotificationBadge, { Effect } from "react-notification-badge";
import SearchDrawer from "./SearchDrawer";
import Profile from "./Profile";

const Navbar = () => {
  const { user, notification, setNotification, setSelectedChat } = ChatState();
  const navigate = useNavigate();
  const { onOpen } = useDisclosure();
  // console.log(onOpen);
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  return (
    <Box
      display="flex"
      bg="green.500"
      color="white"
      flexDir={"row"}
      minW={"100%"}
      maxH={"20vh"}
      alignItems="center"
      justifyContent="space-between"
      padding={2}
    >
      <Box>
        <Icon as={RiWechatFill} w={10} h={10} />
      </Box>
      {/* <Box
          marginTop="16"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Icon mb={"4"} as={RiChat1Line} w={6} h={6} />
          <Icon mb={"4"} as={RiPhoneLine} w={6} h={6} />
          <Icon mb={"4"} as={RiCalendar2Fill} w={6} h={6} />
          <Icon mb={"4"} as={MdPeople} w={6} h={6} />
        </Box> */}
      <Box maxW={"100%"}>
        <SearchDrawer>
          <Button
            variant="ghost"
            colorScheme="green"
            bg="whiteAlpha.800"
            display="flex"
            width={"2xl"}
            w={{ base: "60", lg: "2xl" }}
            justifyContent="space-between"
            onClick={onOpen}
          >
            <Text>Search Users</Text>
            <MdSearch size="20px" />
          </Button>
        </SearchDrawer>
      </Box>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        gap={4}
        mr={4}
      >
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
              <BellIcon w={{ base: "6", md: "8" }} h={{ base: "6", md: "8" }} />
            }
            bg="none"
            _hover={{ bg: "green.700" }}
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
          <MenuButton
            // as={Button}
            bg="none"
            // display="flex"
            // alignItems="center"
            // mr={2}
          >
            <Avatar name={user.name} src={user.profile} size="sm" />
          </MenuButton>
          <MenuList color="black">
            <Profile>
              <MenuItem>My profile</MenuItem>
            </Profile>
            <MenuItem onClick={handleLogout}>
              Logout <IoMdLogOut />
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Navbar;
