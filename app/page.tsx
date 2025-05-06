import { Container, Divider, Flex } from "@mantine/core";
import MainForm from "./components/MainForm";
import Header from "./components/Header";
import DiaryEntries from "./components/DiaryEntries";
import { type Profile } from "./types";
import { Suspense } from "react";
import { auth } from "@/auth";
import AppInitializer from "./components/AppInitializer";

export default async function Home() {
  const session = await auth();
  const userType = session?.user?.name;
  const profile: Profile =
    userType === "psychologist" ? "psychologist" : "patient";

  return (
    <Suspense>
      <Header userType={profile} />
      <Container size="xl">
        <AppInitializer>
          {profile === "patient" ? (
            <Flex
              my={"sm"}
              pos={"relative"}
              direction={{ base: "column", md: "row" }}
            >
              <MainForm />
              <Divider my="md" />
              <DiaryEntries profile={profile} />
            </Flex>
          ) : (
            <DiaryEntries profile={profile} />
          )}
        </AppInitializer>
      </Container>
    </Suspense>
  );
}
