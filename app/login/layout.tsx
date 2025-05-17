import { AppShellFooter, AppShellMain, Center } from "@mantine/core";
import Footer from "../components/Footer";
import WrapperLayout from "../components/WrapperLayout";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <WrapperLayout
        header={{ height: 70 }}
        footer={{ height: { base: 80 } }}
        profile={null}
      >
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
      </WrapperLayout>
    </>
  );
}
