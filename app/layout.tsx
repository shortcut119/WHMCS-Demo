import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WHMCS Demo - Dedicated Servers",
  description: "Clean middleware architecture demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
