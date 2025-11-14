import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Not the RAF website uses Myriad pro in the header but it is not available as a google font so sticking with inter as per the design file.

export const metadata: Metadata = {
  title: "RAF demo",
  description: "RAF demo site by Jack Wakeham",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="bg-map text-map-foreground min-h-dvh">{children}</main>
      </body>
    </html>
  );
}
