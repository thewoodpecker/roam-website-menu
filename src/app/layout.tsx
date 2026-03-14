import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const possibility = localFont({
  src: "../../public/fonts/Possibility-Bold.otf",
  weight: "700",
  style: "normal",
  variable: "--font-possibility",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roam - AI-Powered Virtual Office Platform",
  description: "Virtual Office, Drop-In Meetings, AI Notetaker, AI Assistant, Screen Recorder, AI Agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.variable} ${inter.className} ${possibility.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
