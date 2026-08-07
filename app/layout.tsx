import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Asia - Comunicação focada no que realmente importa.",
  description: "Asia é uma agência criativa e cultural que conecta marcas à cultura por meio de experiências físicas e digitais.",
  icons: {
    icon: "/favicon-asia.png",
  },
};

import { ViewTransitions } from 'next-view-transitions';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        className={`${inter.variable} font-sans h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Header />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
