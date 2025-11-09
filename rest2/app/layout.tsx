import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adhula — Yemeni Restaurant",
  description: "Authentic Yemeni non-veg classics — Mandi, Madfoon, Fahsa.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
