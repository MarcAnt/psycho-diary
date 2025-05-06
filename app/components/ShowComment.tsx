import React from "react";
import { Box, Divider, Flex, Stack, Text } from "@mantine/core";
import { type Comment } from "../types";
import dayjs from "dayjs";

type Props = Comment;

const ShowComment = ({ comment, created_at }: Props) => {
  if (!comment) {
    return null;
  }

  return (
    <Stack>
      <Flex justify={"space-between"} align={"center"}>
        <Text>Comentario:</Text>
        <Text c="dimmed" fs={"italic"} size="sm" component="span">
          {dayjs(created_at).format("DD/MM/YYYY HH:mm")}
        </Text>
      </Flex>
      <Divider my="sm" />
      <Box m={0} p={0} dangerouslySetInnerHTML={{ __html: comment }} />
    </Stack>
  );
};

export default ShowComment;
