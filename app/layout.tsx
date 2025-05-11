import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/tiptap/styles.css";
import "@mantine/notifications/styles.css";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { EntryStoreProvider } from "@/providers/entries-store-provider";
// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/auth";

export const metadata = {
  title: "Registro diario",
  description: "Registro diario de problemas",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await auth();
  return (
    <>
      <html lang="en" {...mantineHtmlProps}>
        <head>
          <ColorSchemeScript />
        </head>
        <body>
          <MantineProvider defaultColorScheme="auto">
            <Notifications />
            {/* <SessionProvider session={session}> */}
            <EntryStoreProvider>{children}</EntryStoreProvider>
            {/* </SessionProvider> */}
          </MantineProvider>
        </body>
      </html>
    </>
  );
}
