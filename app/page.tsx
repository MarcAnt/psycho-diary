import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Center,
  Flex,
  Title,
} from "@mantine/core";
import MainForm from "./components/MainForm";
import Header from "./components/Header";
import DiaryEntries from "./components/DiaryEntries";
import { type Profile } from "./types";
import { Suspense } from "react";
import { auth } from "@/auth";
import AppInitializer from "./components/AppInitializer";
import Footer from "./components/Footer";

export default async function Home() {
  const session = await auth();
  const userType = session?.user?.name;
  const profile: Profile =
    userType === "psychologist" ? "psychologist" : "patient";

  return (
    <Suspense>
      <AppInitializer>
        <AppShell header={{ height: 70 }} footer={{ height: { base: 80 } }}>
          <AppShellHeader p={"md"}>
            <Header userType={profile} />
          </AppShellHeader>

          <AppShellMain>
            <Center>
              {profile === "patient" ? (
                <Flex
                  my={"sm"}
                  pos={"relative"}
                  direction={"column"}
                  align={"center"}
                  justify={"center"}
                  w={"100%"}
                >
                  <Title order={3} my={"md"} ta="center">
                    ¡Hola! Bienvenido de nuevo. ¿Qué notas tienes para hoy?
                  </Title>
                  <MainForm />
                  <DiaryEntries profile={profile} />
                </Flex>
              ) : (
                <Flex
                  my={"sm"}
                  pos={"relative"}
                  direction={"column"}
                  align={"center"}
                  justify={"center"}
                  w={"100%"}
                >
                  <Title order={3} my={"md"} ta="center">
                    ¡Hola! Bienvenido de nuevo. Estas son las notas de tu
                    paciente.
                  </Title>
                  <DiaryEntries profile={profile} />
                </Flex>
              )}
            </Center>
          </AppShellMain>

          <AppShellFooter
            p={"md"}
            styles={{
              footer: {
                display: "flex",
                justifyContent: "center",
              },
            }}
            withBorder={false}
          >
            <Footer />
          </AppShellFooter>
        </AppShell>
      </AppInitializer>
    </Suspense>
  );
}
