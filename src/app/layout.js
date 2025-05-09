// app/layout.js
import "./globals.css";
import Header from "../components/layout/header.jsx";
import Footer from "../components/layout/footer.jsx"; // atualize se o path for diferente
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header />
        <main className="w-full">{children}</main>
        <ToastContainer />
        <Footer/>
      </body>
    </html>
  );
}
