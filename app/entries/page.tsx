import React from "react";
import DiaryEntries from "../components/DiaryEntries";
import { Container } from "@mantine/core";
import Header from "../components/Header";

const EntriesPage = () => {
  return (
    <Container size="xl">
      <Header />
      <DiaryEntries />
    </Container>
  );
};

export default EntriesPage;
