import "./globals.css";
import Layout from "../components/layout/header.jsx";
import { Inter } from "next/font/google"
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <main className="w-full fixed">{children}</main>
        <ToastContainer />
      </body>
    </html>
  );
}
