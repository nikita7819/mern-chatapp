import {
  Avatar,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  IconButton,
  Box,
  useToast,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import React, { useRef, useState, useEffect } from "react";
import { ChatState } from "../../context/ChatProvider";
import axios from "axios";
import authHeader from "../../config/auth-header";

const Profile = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = ChatState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(user.profile || "");
  const [newEmail, setNewEmail] = useState(user.email);
  const fileInputRef = useRef();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const toast = useToast();
  // Reset preview and selectedImage when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedImage(null);
      setPreview(user.profile || "");
    }
  }, [isOpen, user.profile]);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Accept only jpeg/png
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
      toast({
        title: "Select an image of type jpg or png only!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    setPreview(URL.createObjectURL(file));
    // Upload to cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "chat-app");
    data.append("cloud_name", "mern-app");
    fetch("https://api.cloudinary.com/v1_1/mern-app/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setSelectedImage(data.url.toString());
      })
      .catch((err) => {
        toast({
          title: "Image upload failed!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      });
  };

  // TODO: Implement actual upload logic in handleUpdateProfile
  const handleUpdateProfile = async () => {
    // Upload selectedImage to backend and update user profile
    // On success, update preview and close modal
    try {
      const updatedUser = await axios.put(
        `${BASE_URL}/api/user/updateprofile/${user._id}`,
        {
          profile: selectedImage || user.profile,
          email: newEmail || user.email,
        },
        {
          headers: authHeader(),
        },
      );
      // console.log("Profile updated successfully:", updatedUser.data);
      setUser(updatedUser.data.data);
      localStorage.setItem("userInfo", JSON.stringify(updatedUser.data.data));
      onClose();
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (error) {
      toast({
        title: "Error occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="26px" display="flex">
            Update your profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDir="column" alignItems="center">
            <Box position="relative" mb={4}>
              <Avatar name={user.name} src={preview} size="xl" />
              <IconButton
                icon={<EditIcon />}
                size="sm"
                position="absolute"
                bottom={2}
                right={2}
                aria-label="Edit avatar"
                onClick={handleEditClick}
                colorScheme="teal"
                borderRadius="full"
                boxShadow="md"
              />
              <Input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                display="none"
              />
            </Box>
          </ModalBody>
          <FormControl px={3}>
            <Input
              type="email"
              placeholder="Enter your new email"
              value={newEmail}
              name={"newEmail"}
              onChange={(e) => setNewEmail(e.target.value)}
              required
            />
          </FormControl>
          <ModalFooter>
            <Button colorScheme="red" onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleUpdateProfile}
              isDisabled={
                (!selectedImage && newEmail === user.email) ||
                newEmail.trim() === ""
              }
            >
              Update Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
