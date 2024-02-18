import { Contexts } from "@/context";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/app.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Contexts>{children}</Contexts>
      </body>
    </html>
  );
}
