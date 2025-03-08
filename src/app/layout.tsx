import type { Metadata } from "next";
import { inter } from './fonts'
import Providers from "@/Providers";
import "@/css/satoshi.css";
import "@/css/style.css";

export const metadata: Metadata = {
  title: "FastBuka",
  description: "Your No. 1 food delivery App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
