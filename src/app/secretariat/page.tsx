import Image from 'next/image';
import React from 'react';

const secretariat = [
  { name: 'Vicente Fones', role: 'Secretary-General', initials: 'VF' },
  { name: 'Blanca Prieto', role: 'Deputy Secretary-General', initials: 'BP' },
  { name: 'Julia Prieto', role: 'Undersecretary of Logistics', initials: 'JP' },
  { name: 'Baltazar Velasco', role: 'Undersecretary of Logistics', initials: 'BV' },
  { name: 'Matías Arriagada', role: 'Undersecretary of Media', initials: 'MA' },
  { name: 'Javier Fernández', role: 'Director of Committees', initials: 'JF' },
  { name: 'Paz Pinedo', role: 'Shadow for the Secretary-General', initials: 'PP' },
];

export default function SecretariatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center px-4 relative font-['Roboto_Condensed']">
      <div className="relative w-full h-[800px] mb-[-300px] flex items-center justify-center">
        <Image src="/quiroga.JPG" alt="Secretariat Background" fill priority className="object-cover w-full h-full" style={{zIndex: 0, objectPosition: '43% 90%'}} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010f71]/60 via-white/80 to-white" style={{zIndex: 1}} />
        <h1 className="absolute z-10 text-6xl font-extrabold text-[#010f71] drop-shadow-lg tracking-tight text-center w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Secretariat</h1>
      </div>
      <div className="relative z-10 flex flex-col items-center w-full pt-0 pb-20">
        <div className="max-w-4xl w-full bg-white/80 rounded-3xl shadow-2xl p-10 flex flex-wrap justify-center gap-10 pt-4">
          {secretariat.map((member) => (
            <div key={member.name} className="flex flex-col items-center gap-2 w-48">
              <div className="w-28 h-28 rounded-full bg-[#010f71] flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-2 border-4 border-white">
                {member.initials}
              </div>
              <span className="text-xl font-bold text-[#010f71] text-center">{member.name}</span>
              <span className="text-base text-gray-700 text-center">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 