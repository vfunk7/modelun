"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = (menu: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdown(menu);
  };
  const handleDropdownLeave = () => {
    closeTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-gray-200" style={{ boxShadow: '0 4px 24px 0 rgba(1,15,113,0.08)' }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        <div className="flex items-center gap-2 ml-0 flex-1">
          <Link href="/" className="group flex items-center gap-2">
            <span className="flex flex-col justify-center cursor-pointer mt-1">
              <span className="text-4xl font-bold text-[#010f71] tracking-normal leading-tight hover:underline font-['Roboto_Condensed']">
                DragonMUN
              </span>
              <span className="text-xs text-[#010f71] font-extralight self-end text-right opacity-60 -translate-y-2 font-['Roboto_Condensed']">
                Saint George&apos;s College
              </span>
            </span>
            <Image
              src="/azul.png"
              alt="DragonMUN Logo"
              width={64}
              height={64}
              className="h-16 w-16 transition-transform group-hover:scale-105"
            />
          </Link>
        </div>
        <ul className="flex items-center gap-6 text-lg ml-auto">
          <li>
            <Link href="/" className="px-3 py-1 rounded-md text-[#010f71] font-semibold hover:bg-[#010f71]/10 transition font-['Roboto_Condensed']">
              Home
            </Link>
          </li>
          <li>
            <Link href="/secretariat" className="px-3 py-1 rounded-md text-[#010f71] font-semibold hover:bg-[#010f71]/10 transition font-['Roboto_Condensed']">
              Secretariat
            </Link>
          </li>
          <li
            className="relative"
            onMouseEnter={() => handleDropdownEnter('conference')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link href="/conference" className="px-3 py-1 rounded-md text-[#010f71] font-semibold hover:bg-[#010f71]/10 transition font-['Roboto_Condensed']">
              Conference
            </Link>
            <ul
              className={`absolute left-0 mt-2 w-max bg-white text-[#010f71] rounded-2xl shadow-2xl transition-opacity duration-200 z-50 min-w-[220px] border border-gray-100 p-2 space-y-1 ${openDropdown === 'conference' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              onMouseEnter={() => handleDropdownEnter('conference')}
              onMouseLeave={handleDropdownLeave}
            >
              <li><button onClick={() => window.location.href='/conference/resources'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Delegate Resources</button></li>
              <li><button onClick={() => window.location.href='/conference/location'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Location</button></li>
              <li><button onClick={() => window.location.href='/conference/archive'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Archive</button></li>
              <li><button onClick={() => window.location.href='/conference/schedule'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Schedule</button></li>
            </ul>
          </li>
          <li
            className="relative"
            onMouseEnter={() => handleDropdownEnter('committees')}
            onMouseLeave={handleDropdownLeave}
          >
            <Link href="/committees" className="px-3 py-1 rounded-md text-[#010f71] font-semibold hover:bg-[#010f71]/10 transition font-['Roboto_Condensed']">
              Committees
            </Link>
            <ul
              className={`absolute right-0 mt-2 w-max bg-white text-[#010f71] rounded-2xl shadow-2xl transition-opacity duration-200 z-50 min-w-[350px] border border-gray-100 p-2 space-y-1 ${openDropdown === 'committees' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
              onMouseEnter={() => handleDropdownEnter('committees')}
              onMouseLeave={handleDropdownLeave}
            >
              <li><button onClick={() => window.location.href='/committees/security-council'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Security Council</button></li>
              <li><button onClick={() => window.location.href='/committees/economic-social'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Economic and Social Council</button></li>
              <li><button onClick={() => window.location.href='/committees/historical-crisis'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Historical Crisis</button></li>
              <li><button onClick={() => window.location.href='/committees/ccpcj'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Commission on Crime Prevention and Criminal Justice</button></li>
              <li><button onClick={() => window.location.href='/committees/specpol'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Special Political and Decolonization Committee</button></li>
              <li><button onClick={() => window.location.href='/committees/hrc'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">Human Rights Committee</button></li>
              <li><button onClick={() => window.location.href='/committees/interpol'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">International Criminal Police Organization</button></li>
              <li><button onClick={() => window.location.href='/committees/wha'} className="w-full text-left block px-6 py-3 hover:bg-[#010f71]/10 rounded-lg font-['Roboto_Condensed'] transition">World Health Assembly</button></li>
            </ul>
          </li>
        </ul>
        <div className="flex items-center gap-4 ml-8">
          <Link href="/register" className="px-3 py-1 rounded-md text-[#010f71] font-semibold hover:bg-[#010f71]/10 transition font-['Roboto_Condensed']">
            Registration
          </Link>
        </div>
      </div>
    </nav>
  );
} 