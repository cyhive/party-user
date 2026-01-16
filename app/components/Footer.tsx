"use client";

import Image from "next/image";
import {
  MapPin,
  Instagram,
  Facebook,
  Mail,
  Twitter,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Divider */}
        <div className="border-t border-gray-200 mb-12" />

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Left Section */}
            <div className="space-y-1">
            <div className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md">
          <span className="text-lg">☭</span>
          <span className="text-sm font-semibold">CPI(M) Kaithode</span>
        </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-red-600" />
              <span>Kaithod, Kollam, Kerala</span>
            </div>

            <p className="text-sm text-gray-600 max-w-sm">
              Committed to public service, transparent governance,
              and inclusive development, working towards a better
              future for all citizens.
            </p>
          </div>

          {/* Center Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Home
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-red-600 cursor-pointer">
                About us
              </li>
              <li className="hover:text-red-600 cursor-pointer">
                Welfare Scheme
              </li>
              <li className="hover:text-red-600 cursor-pointer">
                News & Updates
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              Follow us
            </h4>
            <div className="flex items-center gap-4">
              <Instagram className="w-5 h-5 hover:text-pink-600 cursor-pointer" />
              <Image
                src="/whatsapp.svg"
                alt="WhatsApp"
                width={20}
                height={20}
                className="cursor-pointer"
              />
              <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer" />
              <Mail className="w-5 h-5 hover:text-red-600 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-black cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Bottom Divider */}
        <div className="border-t border-gray-200 mt-12 pt-6 text-center text-sm text-gray-500">
          ©2026 CPI(M) Kaithode. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
