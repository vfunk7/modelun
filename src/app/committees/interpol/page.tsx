import Image from 'next/image';

export default function Interpol() {
  return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center font-['Roboto_Condensed']">
      <div className="absolute inset-0 w-full h-[600px]">
        <Image src="/ambassador_landscape.JPG" alt="International Criminal Police Organization" fill priority className="object-cover w-full h-full" style={{zIndex: 0}} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010f71]/80 to-transparent" style={{zIndex: 1}} />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center pt-[180px] pb-12 px-4 sm:px-8 lg:px-32">
        <div className="w-full max-w-2xl bg-gray-50 rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl font-extrabold text-[#010f71] mb-6 tracking-tight">International Criminal Police Organization</h1>
          <p className="text-lg text-gray-700 mb-8">INTERPOL coordinates international police cooperation to combat transnational crime. (Placeholder text)</p>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
            <span className="text-[#010f71] font-bold text-lg">Topics</span>
            <span className="text-gray-600">To be announced. (Placeholder)</span>
          </div>
        </div>
      </div>
    </div>
  );
} 