import type { Metadata } from "next";
import {  Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700', '900'], // Choose weights you need
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: "VNS Protocol",
  description: "by rythmastic labs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable}  antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
