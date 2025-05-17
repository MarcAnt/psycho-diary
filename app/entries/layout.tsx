import { AppShellFooter, AppShellMain, Center } from "@mantine/core";
import { authProfile } from "../utils/authProfile";
import Footer from "../components/Footer";
import WrapperLayout from "../components/WrapperLayout";

export default async function EntriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { profile } = await authProfile();

  return (
    <>
      <WrapperLayout
        header={{ height: 70 }}
        footer={{ height: { base: 80 } }}
        profile={profile}
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
