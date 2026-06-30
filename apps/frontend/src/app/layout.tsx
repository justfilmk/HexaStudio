import type { Metadata } from "next";
import { Providers } from "@/providers/query-provider";
import { GlobalErrorBoundary } from "@/components/GlobalErrorBoundary";
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
        <GlobalErrorBoundary>
          <Providers>{children}</Providers>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
