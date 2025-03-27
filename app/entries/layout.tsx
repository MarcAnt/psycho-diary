import { Flex } from "@mantine/core";

export default function EntriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flex h={"100vh"} justify={"center"} align={"center"}>
      <>{children}</>
    </Flex>
  );
}
