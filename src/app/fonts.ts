import { Inter, Roboto_Condensed } from 'next/font/google';

export const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const robotoCondensed = Roboto_Condensed({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-condensed',
}); 