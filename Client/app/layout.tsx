import { Web3Provider } from "@context/Web3context";
import "./globals.css";

import { Footer, NavBar } from "@components";
import { ModalProvider } from "@context/ModalContext";
import SnackbarWrapper from "@components/snackbar/SnackbarWrapper";

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
        <SnackbarWrapper>
          <Web3Provider>
            <ModalProvider>
              <NavBar />
              {children}
              <Footer />
            </ModalProvider>
          </Web3Provider>
        </SnackbarWrapper>
      </body>
    </html>
  );
}
