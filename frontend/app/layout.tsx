import React from 'react';
import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'RealResume',
  description: 'Your active resume hosting platform.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}