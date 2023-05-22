import { Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
    </Stack>
  );
};

export default ChatLoading;
