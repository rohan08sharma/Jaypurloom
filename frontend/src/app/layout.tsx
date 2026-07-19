import type { Metadata } from 'next';
import { Playfair_Display, Poppins } from 'next/font/google';
import './globals.css';
import { Providers } from '../context/Providers';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { CartDrawer } from '../components/CartDrawer';
import { Footer } from '../components/Footer';
import { WhatsAppChatButton } from '../components/WhatsAppChatButton';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jaypurloom | Premium Women's Ethnic Wear & Royal Home Furnishing",
  description:
    "Explore authentic Rajasthani Chanderi Silk Suit Sets, Sanganeri Block-Printed Cotton Kurtas, Anarkalis, and 300 TC Luxury Bedsheets. Handcrafted by royal artisans in Jaipur, India.",
  keywords:
    "Jaypurloom, Jaipur ethnic wear, women suit sets, cotton anarkali, chanderi silk, king size bedsheets, block print bedsheets, gota patti suits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#FAF8F5]">
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <CartDrawer />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppChatButton />
        </Providers>
      </body>
    </html>
  );
}
