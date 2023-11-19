import { Web3Provider } from "@context/Web3context";
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
        <Web3Provider>
          <NavBar />
          {children}
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
