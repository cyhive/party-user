"use client";

import Image from "next/image";

const newsImages = [
  {
    id: 1,
    src: "/news/news1.png",
    alt: "News Update 1",
  },
  {
    id: 2,
    src: "/news/news2.png",
    alt: "News Update 2",
  },
];

export default function NewsPage() {
  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            News & Updates
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Latest news, announcements, and important updates from our
            organization.
          </p>
        </div>

        {/* Images stacked vertically */}
        <div className="space-y-10">
          {newsImages.map((item) => (
            <div
              key={item.id}
              className="relative w-full h-[450px] rounded-2xl overflow-hidden shadow-md"
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
