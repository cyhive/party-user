"use client";

import Image from "next/image";

export default function AboutUs() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-10 items-center">
        
        {/* Text Section */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            About us
          </h2>

          <p className="text-gray-700 leading-relaxed mb-4">
            We are a people-focused organization committed to improving
            the quality of life for every citizen. Our work centers on
            connecting communities with welfare initiatives that support
            education, healthcare, employment, and social security.
          </p>

          <p className="text-gray-700 leading-relaxed mb-8">
            Through grassroots engagement and responsible leadership,
            we strive to ensure that government welfare programs reach
            those who need them most. We believe in transparency,
            inclusiveness, and action-driven service to the public.
          </p>

          <button className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-md font-semibold">
            Contact us
          </button>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[300px] md:h-[360px] rounded-2xl overflow-hidden">
          <Image
            src="/about.png"
            alt="Community welfare meeting"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
