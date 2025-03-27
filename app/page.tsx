import { Container, Divider, Flex } from "@mantine/core";
import MainForm from "./components/MainForm";
import Header from "./components/Header";
import DiaryEntries from "./components/DiaryEntries";
import { type Profile } from "./types";
// import fs from "fs/promises";
// import path from "path";

// async function getData() {
//   try {
//     const filePath = path.join(process.cwd(), "public/data/entries.json");
//     const jsonData = await fs.readFile(filePath, "utf-8");
//     return JSON.parse(jsonData);
//   } catch (error) {
//     console.error("Error reading JSON:", error);
//     return []; // Return an empty array or handle the error appropriately
//   }
// }

export default async function Home() {
  const profile: Profile = "patient";

  return (
    <Container size="xl">
      <Header />

      {profile === "patient" ? (
        <Flex
          my={"md"}
          pos={"relative"}
          direction={{ base: "column", md: "row" }}
        >
          <MainForm />
          <Divider my="md" />
          <DiaryEntries />
        </Flex>
      ) : (
        <DiaryEntries />
      )}
    </Container>
  );
}
