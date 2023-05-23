import {
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    // console.log(email, password);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${BASE_URL}/api/user/login`,
        { email, password },
        config
      );

      // console.log(JSON.stringify(data));
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
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
  };

  return (
    <Stack spacing={4}>
      <FormControl id="lemail" isRequired colorScheme="green">
        <FormLabel>Email address</FormLabel>
        <Input type="email" onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <FormControl id="lpassword" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement h={"full"}>
            <Button
              variant={"ghost"}
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Stack spacing={10}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align={"start"}
          justify={"space-between"}
        >
          <Checkbox>Remember me</Checkbox>
          <Link color={"blue.400"}>Forgot password?</Link>
        </Stack>
        <Button
          bg={"green.400"}
          color={"white"}
          _hover={{
            bg: "green.600",
          }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
      </Stack>
    </Stack>
  );
};
export default Login;
