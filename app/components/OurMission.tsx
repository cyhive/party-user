"use client";

import Image from "next/image";

export default function OurMission() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            To serve citizens by enabling access to welfare schemes,
            strengthening community support systems, and promoting
            inclusive development across all sections of society.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We aim to work closely with people at the ground level,
            identify real needs, and support initiatives that bring
            meaningful and measurable improvement to everyday lives.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center">
          <Image
            src="/cpi.png"
            alt="CPI(M) Mission Illustration"
            width={420}
            height={420}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
