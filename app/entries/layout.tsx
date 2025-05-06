import { Center, Container } from "@mantine/core";
import Header from "../components/Header";
import { authProfile } from "../utils/authProfile";

export default async function EntriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await authProfile();

  return (
    <>
      <Header userType={profile} />
      <Container size="xl">
        <Center>{children}</Center>
      </Container>
    </>
  );
}
