import './globals.css';
import type { ReactNode } from "react";
import AuthProvider from "../components/AuthProvider";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="az">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}