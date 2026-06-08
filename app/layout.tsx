import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CravaCopa - Bolão Copa do Mundo 2026",
  description: "Monte seu bolão, chame os amigos e crave seus palpites na Copa do Mundo 2026!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Font Awesome Icons */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
