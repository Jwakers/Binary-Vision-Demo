import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Not the RAF website uses Myriad pro in the header but it is not available as a google font so sticking with inter as per the design file.

export const metadata: Metadata = {
  title: "RAF demo",
  description: "RAF demo by Jack Wakeham",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
