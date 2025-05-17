import React from "react";
import { AppShell, AppShellMain, Blockquote, Center } from "@mantine/core";

const Loading = () => {
  return (
    <AppShell padding="md">
      <AppShellMain>
        <Center w={{ base: "75%", md: "100%" }} m={"auto"} h={"100vh"}>
          <Blockquote color="blue" iconSize={30} cite="– Carl Sagan">
            Cada uno de nosotros es una preciosidad, en una perspectiva cósmica.
            Si alguien discrepa de tus opiniones, déjalo vivir. En un trillón de
            galaxias, no hallarías otro igual.
          </Blockquote>
        </Center>
      </AppShellMain>
    </AppShell>
  );
};

export default Loading;
