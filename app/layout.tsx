import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Kore Comunicação | Agência Criativa em Belo Horizonte",
  description: "Kore é uma agência de comunicação em Belo Horizonte que une estratégia e criação com foco no que realmente importa. Campanhas com impacto real para marcas com foco em performance.",
  keywords: "agência de comunicação, agência de publicidade, agência criativa, agência de comunicação Belo Horizonte, agência de comunicação BH, comunicação estratégica, agencia",
  icons: {
    icon: "/logo-kore-mini.webp",
  },
};

import { ViewTransitions } from 'next-view-transitions';
import { Preloader } from '@/components/ui/Preloader/Preloader';
import { WhatsAppButton } from '@/components/ui/WhatsAppButton/WhatsAppButton';

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ViewTransitions>
      <html
        lang="pt-BR"
        className={`${inter.variable} ${montserrat.variable} font-sans h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <Preloader />
          <Header />
          <WhatsAppButton />
          {children}
        </body>
      </html>
    </ViewTransitions>
  );
}
