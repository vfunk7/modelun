import Image from 'next/image';

export default function DelegateResources() {
  return (
    <div className="min-h-screen bg-white relative flex flex-col items-center justify-center font-['Roboto_Condensed']">
      <div className="absolute inset-0 w-full h-[1200px]">
        <Image src="/delegate_resources.JPG" alt="Delegate Resources" fill priority className="object-cover w-full h-full" style={{zIndex: 0}} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#010f71]/80 to-transparent" style={{zIndex: 1}} />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center pt-[180px] pb-12 px-4 sm:px-8 lg:px-32">
        <div className="w-full max-w-2xl bg-gray-50 rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl font-extrabold text-[#010f71] mb-6 tracking-tight">Delegate Resources</h1>
          <p className="text-lg text-gray-700 mb-8">Find all the resources you need to prepare for DragonMUN. Download study guides, research tips, and more. (Placeholder text)</p>
          <ul className="space-y-4">
            <li className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
              <span className="text-[#010f71] font-bold text-lg">Study Guide</span>
              <span className="text-gray-600">Download the official study guide for your committee. (Placeholder)</span>
            </li>
            <li className="bg-white rounded-xl p-6 shadow flex flex-col gap-2">
              <span className="text-[#010f71] font-bold text-lg">Position Paper Template</span>
              <span className="text-gray-600">A template to help you write your position paper. (Placeholder)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 