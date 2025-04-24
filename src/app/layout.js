import "./globals.css";
import Layout from "../components/layout/header.jsx";
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Layout />
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
