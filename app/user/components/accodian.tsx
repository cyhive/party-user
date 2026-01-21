"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Define the type for our dynamic data
export interface WelfareItem {
  _id: string;
  title: string;
  description?: string;
  content?: string;
  icon?: string;
}

export default function WelfareAccordion({ items }: { items: WelfareItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No welfare schemes found.
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-6">
      <div className="space-y-4">
        {items.map((scheme) => (
          <div
            key={scheme._id}
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            {/* Header Row */}
            <div className="p-6 flex flex-col md:flex-row items-start justify-between gap-4">
              <div className="flex gap-6 items-start">
                <div className="bg-red-50 p-4 rounded-2xl flex-shrink-0 relative w-16 h-16">
                  {scheme.icon ? (
                    <Image
                      src={scheme.icon}
                      alt={scheme.title}
                      fill
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-red-200 rounded-full" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {scheme.title}
                  </h3>
                  <p className="text-gray-600 mt-1 max-w-2xl text-sm md:text-base">
                    {scheme.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpenId(openId === scheme._id ? null : scheme._id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all shrink-0 ${openId === scheme._id
                  ? "bg-red-600 text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
                  }`}
              >
                {openId === scheme._id ? "Learn Less" : "Learn More"}
                {openId === scheme._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Expanded Content (The Rich Text Editor Content) */}
            <AnimatePresence>
              {openId === scheme._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-8 pt-2 md:ml-24 border-t border-gray-50">
                    {scheme.content ? (
                      <div
                        /* Changed 'prose' to 'rich-text-content' */
                        className="rich-text-content text-gray-700 max-w-none"
                        dangerouslySetInnerHTML={{ __html: scheme.content }}
                      />
                    ) : (
                      <p className="text-gray-400 italic">No detailed information available.</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}