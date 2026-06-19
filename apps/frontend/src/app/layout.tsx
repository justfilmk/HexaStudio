import type { Metadata } from "next";
import { Providers } from "@/providers/query-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "HexaStudio",
  description: "3D creative studio — HexaStudio.net",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
