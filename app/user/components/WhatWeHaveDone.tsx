"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

export default function WhatWeHaveDone() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setGallery(data);
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // 1. Flatten the nested structure into a single linear list of images
  // This ensures index 0, 1, 2, 3... are sequential for the pattern logic
  const flatImages = gallery.flatMap((item) =>
    item.images.map((img, imgIndex) => ({
      src: img,
      title: item.title,
      id: `${item._id}-${imgIndex}`,
    }))
  );

  if (loading) {
    return (
      <section className="py-24 text-center text-gray-400 animate-pulse">
        Loading gallery...
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What we have done!
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg">
            Our work reflects a commitment to real-world impact and
            community-focused initiatives.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[400px]">
          {flatImages.map((image, index) => {
            // 2. Pattern Logic: Every 4th item in a set of 5 (index 3, 8, 13...) spans 2 columns
            const isWide = index % 5 === 3;

            return (
              <div
                key={image.id}
                className={`relative overflow-hidden rounded-3xl shadow-md transition-all duration-500 hover:scale-[1.01] hover:shadow-xl ${
                  isWide ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}