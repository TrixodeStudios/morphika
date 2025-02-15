// src/components/Header.js
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b from-black/30 to-transparent backdrop-blur-lg z-50 px-8 py-4 flex justify-between items-center max-w-full mx-auto">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3" aria-label="Home">
        <Image src="/logo.png" alt="Morphika Logo" width={40} height={40} className="w-auto h-10" />
        <h2 className="text-2xl font-bold tracking-wide text-white">MORPHIKA</h2>
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex gap-8 text-gray-300 text-lg" aria-label="Main navigation">
        <Link href="/about" className="hover:text-white transition">About</Link>
        <Link href="/features" className="hover:text-white transition">Features</Link>
        <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
        <Link href="/contact" className="hover:text-white transition">Contact</Link>
      </nav>

      {/* CTA Button */}
      <Link href="/auth" aria-label="Get Started">
        <button className="px-6 py-2 border border-white text-white rounded-full hover:bg-white hover:text-black transition duration-200">
          Get Started →
        </button>
      </Link>
    </header>
  );
}
