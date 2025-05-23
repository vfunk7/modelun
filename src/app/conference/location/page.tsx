import Image from 'next/image';

export default function ConferenceLocation() {
  return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center font-['Roboto_Condensed']">
      <div className="absolute inset-0 w-full h-[900px]">
        <Image src="/ruminot_landscape_2.JPG" alt="Location" fill priority className="object-cover w-full h-full" style={{zIndex: 0}} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010f71]/80 to-transparent" style={{zIndex: 1}} />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center pt-[180px] pb-12 px-4 sm:px-8 lg:px-32">
        <div className="w-full max-w-2xl bg-gray-50 rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl font-extrabold text-[#010f71] mb-6 tracking-tight">Location</h1>
          <p className="text-lg text-gray-700 mb-8">DragonMUN will be held at Saint George&apos;s College, Santiago, Chile. More details and maps coming soon. (Placeholder text)</p>
          <div className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
            <span className="text-[#010f71] font-bold text-lg">Venue Address</span>
            <span className="text-gray-600">Av. Sta. María 5600, Vitacura, Región Metropolitana, Chile</span>
          </div>
        </div>
      </div>
    </div>
  );
} 