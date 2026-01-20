"use client";

import Image from "next/image";

// Sample with more than 5 items to show the repeating pattern
const works = [
  { id: 1, src: "/image 6.png", alt: "Inauguration ceremony" },
  { id: 2, src: "/image 8.png", alt: "Ambulance service support" },
  { id: 3, src: "/image 10.png", alt: "DYFI blood donation activity" },
  { id: 4, src: "/image 7.png", alt: "CPI(M) Kaithodu Branch" },   // Spans 2
  { id: 5, src: "/image 9.png", alt: "Community outreach program" }, // Spans 1
  { id: 6, src: "/image 6.png", alt: "Inauguration ceremony" },
  { id: 7, src: "/image 8.png", alt: "Ambulance service support" },
  { id: 8, src: "/image 10.png", alt: "DYFI blood donation activity" },
     // Spans 1
];

export default function WhatWeHaveDone() {
  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What we have done!
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
            Our work reflects a commitment to addressing real issues faced by
            people through practical solutions, community-focused programs,
            and responsible governance.
          </p>
        </div>

        {/* Repeating Bento Grid Pattern */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {works.map((item, index) => {
            // Pattern logic: Every 4th item in a group of 5 (index 3, 8, 13...) spans 2 columns
            const isWide = index % 5 === 3;

            return (
              <div
                key={item.id}
                className={`relative overflow-hidden rounded-3xl shadow-md transition-all duration-500 hover:scale-[1.01] hover:shadow-xl ${
                  isWide ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3}
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}