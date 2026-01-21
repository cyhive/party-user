"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type NewsItem = {
  _id: string;
  images: string[];
};

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  /* ===================== FETCH ===================== */
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("/admin/api/news-items");
        if (!res.ok) throw new Error("Failed to fetch");
        setItems(await res.json());
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-500">
        Loading images...
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            News & Updates
          </h2>
        </div>

        {/* IMAGE GRID ONLY */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.flatMap((item) =>
            item.images.map((img, index) => (
              <div
                key={`${item._id}-${index}`}
                className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md"
              >
                <Image
                  src={img}
                  alt="News image"
                  fill
                  className="object-cover"
                />
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}
