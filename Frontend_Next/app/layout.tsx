import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import LayoutWrapper from "./LayoutWrapper";
import { CartProvider } from "../context/CartContext";
import WhatsAppButton from "./WhatsAppButton";

export const metadata: Metadata = {
  title: "Floreria Rosmery",
  description: "Floreria Rosmery",
  //Colocar imagen a la pesataña de la pagina
  icons: {
    icon: "/img/img-logo/logov2-ico-v1.ico",
  },
};

{/*Estructura de la pagina Inicial del sitio web*/ }
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
