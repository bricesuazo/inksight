import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Footer from "~/components/footer";
import Header from "~/components/header";
import { TooltipProvider } from "~/components/ui/tooltip";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InkSight",
  description: "Your Digital Gateway to Book Discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <TooltipProvider>
          <Header />
          {children}
          <Footer />
        </TooltipProvider>
      </body>
    </html>
  );
}
