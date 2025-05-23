import Image from 'next/image';
import Link from 'next/link';

const galleryImages = [
  '/delegate_landscape.JPG',
  '/delegate_landscape_2.JPG',
  '/delegate_landscape_3.JPG',
  '/delegate_landscape_4.JPG',
  '/awards_landscape.jpg',
  '/placards.JPG',
  '/coaches_landscape.JPG',
  '/delegate_resources.JPG',
  '/delegates_working.JPG',
];

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION - FLIPPED BACKGROUND IMAGE, LEFT-ALIGNED TEXT OVERLAY */}
      <section className="relative w-screen h-[90vh] min-h-[600px] flex items-center justify-start overflow-hidden bg-[#010f71]">
        <Image 
          src="/home_landscape.JPG" 
          alt="DragonMUN Conference" 
          fill
          priority
          className="object-cover w-full h-full absolute inset-0 z-0 scale-x-[-1]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#010f71]/80 to-transparent z-10" />
        <div className="relative z-20 flex flex-col items-start justify-center h-full text-left max-w-2xl px-12">
          <h1 className="text-white font-extrabold text-6xl sm:text-7xl md:text-8xl drop-shadow-lg mb-6 tracking-tight font-['Roboto_Condensed']">
            <span className="opacity-80">This Is</span> <span className="text-[#EAB308]">DragonMUN.</span>
          </h1>
          <p className="text-white text-2xl sm:text-3xl font-semibold mb-8 max-w-xl font-['Roboto_Condensed']">Where the next generation of diplomats, leaders, and changemakers meet.</p>
          <div className="flex gap-4">
            <Link href="/register" className="px-8 py-4 bg-[#EAB308] text-[#010f71] font-bold rounded-lg text-lg shadow hover:bg-[#EAB308]/90 transition font-['Roboto_Condensed']">Register</Link>
          </div>
        </div>
      </section>

      {/* ABOUT DRAGONMUN SECTION */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-justify md:w-3/4 max-w-4xl">
            <div className="w-full text-justify max-w-5xl mx-auto">
              <h2 className="text-4xl font-extrabold text-[#010f71] mb-6 tracking-tight font-['Roboto_Condensed']">About DragonMUN</h2>
              <p className="text-lg text-gray-700 mb-4 font-['Roboto_Condensed'] text-justify">
                DragonMUN is a Saint George's College student-led conference to foster dialogue and understanding of global affairs among our fellow students of various contexts.
              </p>
              <p className="text-lg text-gray-700 mb-4 font-['Roboto_Condensed'] text-justify">
                DragonMUN was born as an idea that has since evolved to become the most successful Model UN conference in the country. We welcome students from varying backgrounds and ideas to create an instance of mutual cooperation, collaboration, and unity in order to foster global learning.
              </p>
              <p className="text-lg text-gray-700 mb-4 font-['Roboto_Condensed'] text-justify">
                We pride ourselves in being student-led; that is, the Saint George's College MUN & Debate Team elects its Secretariat for the year, a body which handles all aspects of organising DragonMUN.
              </p>
              <p className="text-lg text-gray-700 font-['Roboto_Condensed'] text-justify">
                Whether you're a seasoned delegate or new to MUN, DragonMUN offers a unique experience to grow, connect, and make an impact.
              </p>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <div className="w-80 h-96 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <Image 
                src="/delegate_vertical_2.JPG" 
                alt="DragonMUN Delegate" 
                fill 
                className="object-cover object-center" 
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* SPECIAL GUESTS SECTION */}
      <section className="bg-[#f5f7fa] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-[#010f71] mb-12 text-left tracking-tight font-['Roboto_Condensed']">Special Guests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full overflow-hidden shadow-2xl mb-6 border-4 border-white flex items-center justify-center bg-white">
                <Image 
                  src="/ambassador_vertical.JPG" 
                  alt="Bernadette Meehan" 
                  width={224} 
                  height={224} 
                  className="w-full h-full object-cover object-center scale-125" 
                  style={{objectPosition: 'center', transform: 'scale(1.25)'}} 
                />
              </div>
              <span className="text-xl font-semibold text-[#010f71] text-center font-['Roboto_Condensed']">Bernadette Meehan<br /><span className='font-normal text-base text-gray-600'>US Ambassador to Chile</span></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full overflow-hidden shadow-2xl mb-6 border-4 border-white flex items-center justify-center bg-white">
                <Image 
                  src="/ruminot_landscape.JPG" 
                  alt="José García Ruminot" 
                  width={224} 
                  height={224} 
                  className="w-full h-full object-cover object-center scale-125" 
                  style={{objectPosition: 'center', transform: 'scale(1.25)'}} 
                />
              </div>
              <span className="text-xl font-semibold text-[#010f71] text-center font-['Roboto_Condensed']">José García Ruminot<br /><span className='font-normal text-base text-gray-600'>President of the Senate of Chile</span></span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-56 h-56 rounded-full overflow-hidden shadow-2xl mb-6 border-4 border-white flex items-center justify-center bg-white">
                <Image 
                  src="/van_klaveren_landscape.JPG" 
                  alt="Alberto van Klaveren" 
                  width={224} 
                  height={224} 
                  className="w-full h-full object-cover object-center scale-125" 
                  style={{objectPosition: 'center', transform: 'scale(1.25)'}} 
                />
              </div>
              <span className="text-xl font-semibold text-[#010f71] text-center font-['Roboto_Condensed']">Alberto van Klaveren<br /><span className='font-normal text-base text-gray-600'>Minister of Foreign Affairs of Chile</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION - FEATURE AWARDS IMAGE */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-[#010f71] mb-12 text-left tracking-tight font-['Roboto_Condensed']">Conference Highlights</h2>
          <div className="w-full mb-12 flex justify-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white w-full max-w-4xl">
              <Image 
                src="/awards_landscape.jpg" 
                alt="DragonMUN Awards Ceremony" 
                width={1200} 
                height={600} 
                className="w-full h-[400px] object-cover object-center" 
                priority
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {galleryImages.filter(img => img !== '/awards_landscape.jpg').map((src, idx) => (
              <div key={src} className="rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src={src} 
                  alt={`Conference Highlight ${idx + 1}`} 
                  width={400} 
                  height={300} 
                  className="w-full h-56 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
} 