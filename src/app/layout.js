import "./globals.css";
import Layout from "../components/layout/header.jsx";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body>
        <Layout/>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
