export const metadata = {
  title: "Carbon Footprint Report Template",
  description: "Generate an accessible, optimized PDF report template"
};

import "./globals.css";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
