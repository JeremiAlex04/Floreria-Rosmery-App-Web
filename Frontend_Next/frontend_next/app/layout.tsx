import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "./Header";
import Footer from "./Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
//Colocar imagen a la pesataña de la pagina
export const metadata: Metadata = {
  title: "Floreria Rosmery",
  description: "Floreria Rosmery",
  icons: {
    icon: "/img-logo/logov2-ico-v1.ico"
  }
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
        {/*Estructura de la pagina completa*/}
        {/*Header*/}
        <Header />
        {/*Contenido*/}
        {children}
        {/*Footer*/}

        <Footer />
      </body>
    </html>
  );
}
