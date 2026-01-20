"use client";

import Image from "next/image";

const works = [
  { id: 1, src: "/image 6.png", alt: "Inauguration ceremony" },
  { id: 2, src: "/image 8.png", alt: "Ambulance service support" },
  { id: 3, src: "/image 10.png", alt: "DYFI blood donation activity" },
  { id: 4, src: "/image 7.png", alt: "CPI(M) Kaithodu Branch" }, // This one will span 2 columns
  { id: 5, src: "/image 9.png", alt: "Community outreach program" },
];

export default function WhatWeHaveDone() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 inline-block border-2 border-sky-500 px-2">
            What we have done!
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
            Our work reflects a commitment to addressing real issues faced by
            people through practical solutions, community-focused programs,
            and responsible governance.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {works.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-3xl shadow-md transition-transform duration-300 hover:scale-[1.02] ${
                item.id === 4 ? "md:col-span-2" : "md:col-span-1"
              }`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={item.id <= 3}
              />
              {/* Optional: Add a subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}