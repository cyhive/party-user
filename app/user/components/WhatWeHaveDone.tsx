"use client";

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
        } else {
          console.error("Failed to fetch gallery or data is not an array:", data);
        }
      } catch (error) {
        console.error("Failed to fetch gallery", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (loading) {
    return (
      <section className="py-16 text-center text-gray-500">
        Loading gallery...
      </section>
    );
  }

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
          {gallery.length > 0 ? (
            gallery.map((item) =>
              item.images.map((img, index) => (
                <div
                  key={`${item._id}-${index}`}
                  className="relative w-full h-[260px] rounded-2xl overflow-hidden shadow-sm"
                >
                  <img
                    src={img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))
            )
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No gallery items found.
            </p>
          )}
        </div>

      </div>
    </section>
  );
}