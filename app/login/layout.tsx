import { Center, Container } from "@mantine/core";
import Header from "../components/Header";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header userType={null} />
      <Container size="xl">
        <Center>{children}</Center>
      </Container>
    </>
  );
}
