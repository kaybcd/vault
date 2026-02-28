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

        {/* --- Professional Investor Statement --- */}
        <div className="bg-black py-12 px-8">
          <div className="max-w-7xl mx-auto">
            {/* The short white line */}
            <div className="w-310 h-[0.5px] bg-slate-700 mb-6"></div>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed max-w-10xl">
              <span className="text-white">Professional Investors Only.</span> This platform and its content are restricted to individuals or entities meeting the "Accredited Investor" or "Professional Investor" criteria under respective global jurisdictions.
            </p>
          </div>
        </div>


        {/* 4. The Footer is now part of the global layout */}
        <Footer />
      </body>
    </html>
  );
}