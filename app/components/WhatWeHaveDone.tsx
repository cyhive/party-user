"use client";

import Image from "next/image";

const works = [
  { id: 1, src: "/image 6.png", alt: "Inauguration ceremony" },
  { id: 2, src: "/image 8.png", alt: "Ambulance service support" },
  { id: 3, src: "/image 10.png", alt: "DYFI blood donation activity" },
  { id: 4, src: "/image 7.png", alt: "CPI(M) Kaithodu Branch" },
  { id: 5, src: "/image 9.png", alt: "Community outreach program" },
];

export default function WhatWeHaveDone() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What we have done!
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Our work reflects a commitment to addressing real issues faced by
            people through practical solutions, community-focused programs,
            and responsible governance.
          </p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {works.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-[260px] rounded-2xl overflow-hidden shadow-sm"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
