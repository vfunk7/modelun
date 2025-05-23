import './globals.css';
import { Roboto_Condensed, Roboto } from 'next/font/google';
import Navbar from '../components/Navbar';

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'], weight: ['400', '700'] });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${robotoCondensed.className} ${roboto.className}`}> 
      <body className="bg-[#f5f7fa] min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <footer className="w-full bg-[#010f71] text-white text-center py-4 font-semibold text-lg mt-12">
          © 2025 by DragonMUN Secretariat, Saint George's College.
        </footer>
      </body>
    </html>
  );
} 