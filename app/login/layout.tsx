import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  Center,
} from "@mantine/core";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppShell header={{ height: 70 }} footer={{ height: { base: 80 } }}>
        <AppShellHeader p={"md"}>
          <Header userType={null} />
        </AppShellHeader>

        <AppShellMain>
          <Center>{children}</Center>
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
    </>
  );
}
