"use client";

import Image from "next/image";
import FeatureCard from "./FeatureCard";

export default function Hero() {
  return (
    <main className="bg-white border-b-2 border-blue-500 overflow-hidden">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-4 pb-10 grid md:grid-cols-2 gap-4 items-center">
        
        {/* Text */}
        <div className="relative z-10">
          <h1 className="mt-0 text-4xl md:text-5xl font-extrabold leading-[1.1] text-gray-900">
            <span className="block whitespace-nowrap">
              Working for the Welfare
            </span>
            <span className="block whitespace-nowrap">
              of Every Citizen
            </span>
          </h1>

          <p className="mt-8 text-gray-600 max-w-lg">
            We work at the ground level to connect citizens with welfare schemes
            that improve education, healthcare, employment, and dignity of life.
          </p>

          <button className="mt-8 bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-md font-semibold">
            Explore Our Scheme
          </button>
        </div>

        {/* Image Section */}
        <div className="relative flex justify-center items-center">
          
          {/* Flag Background */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0">
            <Image
              src="/flag.png"
              alt="Indian Flag Background"
              width={520}
              height={360}
              className="opacity-90"
              priority
            />
          </div>

          {/* Person Image */}
          <div className="relative z-10">
            <Image
              src="/person.png"
              alt="Leader"
              width={420}
              height={420}
              priority
            />
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16 grid md:grid-cols-3 gap-5 text-gray-900">
        <FeatureCard
          icon="🎓"
          title="Educational Support"
          description="Helping students access quality education through scholarships, learning resources, and academic assistance programs."
        />

        <FeatureCard
          icon="➕"
          title="Medical Care Aid"
          description="Providing healthcare support through medical camps, treatment assistance, and access to essential health services."
        />

        <FeatureCard
          icon="🤝"
          title="Employment Assistance"
          description="Supporting job seekers with skill development, career guidance, and access to employment opportunities."
        />
      </section>
    </main>
  );
}
