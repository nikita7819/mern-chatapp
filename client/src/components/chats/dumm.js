<Box
  display="flex"
  flexDirection={{ base: "column", md: "row" }}
  justifyContent={{ base: "center", md: "flex-end" }}
  bg="none"
  rounded="md"
>
  <Menu>
    <MenuButton
      as={IconButton}
      icon={<BellIcon w={{ base: "4", md: "6" }} h={{ base: "4", md: "6" }} />}
      bg="none"
    />
    {/* <MenuList></MenuList> */}
  </Menu>
  <Menu>
    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="none">
      <Avatar
        size={{ base: "xs", md: "sm" }}
        name={user.name}
        src={user.profile}
      />
    </MenuButton>
    <MenuList>
      <MenuItem>My profile</MenuItem>
      <MenuItem onClick={handleLogout}>
        Logout <IoMdLogOut />
      </MenuItem>
    </MenuList>
  </Menu>
</Box>;
