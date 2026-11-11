import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generator de site-uri pentru restaurante",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ro">
      <body>{children}</body>
    </html>
  );
}
