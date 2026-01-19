"use client";

import Image from "next/image";

export default function OurVision() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Image Section */}
        <div className="relative flex justify-center">
          <Image
            src="/vision-fist.png"
            alt="Vision Illustration"
            width={420}
            height={520}
            className="object-contain"
            priority
          />
        </div>

        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Vision
          </h2>

          <p className="text-gray-700 leading-relaxed mb-6">
            To build a just, inclusive, and progressive society where
            every citizen has equal access to opportunity, dignity,
            and essential services.
          </p>

          <p className="text-gray-700 leading-relaxed">
            We envision a future where welfare reaches every household,
            communities are empowered, and development is driven by
            compassion, accountability, and collective growth.
          </p>
        </div>
      </div>
    </section>
  );
}
