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
  other: {
    "theme-color": "#000000",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${inter.variable} ${inter.className} ${possibility.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
