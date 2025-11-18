import "./globals.css";
import Link from "next/link";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <Link href="/">Home</Link> | <Link href="/login">Login</Link> |{" "}
            <Link href="/register">Register</Link> |{" "}
            <Link href="/dashboard">Dashboard</Link>
          </nav>
          <hr />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
