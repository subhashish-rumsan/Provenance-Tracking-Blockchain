import "./globals.css";

import { Footer, NavBar } from "@components";

export const metadata = {
  title: "Token Drive",
  description:
    "Empowering Community, Driving Together: TokenDrive - Your Share in Every Journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
