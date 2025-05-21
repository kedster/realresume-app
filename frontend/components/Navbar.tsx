import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white text-lg font-bold">RealResume</div>
        <div className="space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link href="/seekers" className="text-gray-300 hover:text-white">Seekers</Link>
          <Link href="/recruiters" className="text-gray-300 hover:text-white">Recruiters</Link>
          <Link href="/admins" className="text-gray-300 hover:text-white">Admins</Link>
          <Link href="/techs" className="text-gray-300 hover:text-white">Techs</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;