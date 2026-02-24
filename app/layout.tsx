import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer'
import DisclaimerModal from '@/components/DisclaimerModal';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vault Management System",
  description: "Secure investment vault tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen bg-black`}
      >
        {/* 2. Place the Modal here. It will stay hidden until the user visits */}
        <DisclaimerModal />

        {/* 3. The <main> tag with 'flex-grow' ensures that even if a page has 
           very little content, the footer is pushed to the bottom. 
        */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 4. The Footer is now part of the global layout */}
        <Footer />
      </body>
    </html>
  );
}