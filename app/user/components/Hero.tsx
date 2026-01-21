"use client";

import Image from "next/image";
import FeatureCard from "./FeatureCard";

export default function Hero() {
  return (
    <main className="bg-white min-h-screen relative overflow-x-hidden">
      {/* 1. Background Layer (Flag + Fade) */}
      <div className="absolute top-0 right-0 w-full md:w-[75%] h-[600px] lg:h-[850px] z-0 pointer-events-none">
        <div className="relative w-full h-full">
          <Image
            src="/flag.png" 
            alt="Background Flag"
            fill
            className="object-cover object-right"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent" />
        </div>
      </div>

      {/* 2. Content Layer (Text + Person) */}
      {/* Increased pb-60 to pb-80 on large screens to push the "floor" down */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-48 lg:pb-80">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Text & Button */}
          {/* Added min-h to ensure text column doesn't get too short for the overlap */}
          <div className="relative z-20 flex flex-col items-start lg:min-h-[400px]">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] text-gray-900 tracking-tight">
              Working for the <br />
              Welfare of <br />
              Every Citizen
            </h1>

            <p className="mt-8 text-gray-600 max-w-md text-lg lg:text-xl leading-relaxed">
              We work at the ground level to connect citizens with welfare schemes
              that improve education, healthcare, employment, and dignity of life.
            </p>

            <div className="mt-5 mb-5 lg:mb-0">
               <button className="bg-[#e32626] hover:bg-red-700 transition-all text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-red-200 active:scale-95">
                Explore Our Scheme
              </button>
            </div>
          </div>

          {/* Right Column: Person Image */}
          <div className="relative flex justify-center lg:justify-end  items-end h-[400px] md:h-[500px] lg:h-[650px] z-10">
            <div className="relative w-full h-full max-w-[500px] ">
              <Image
                src="/person.png"
                alt="Leader"
                fill
                className="object-contain object-bottom"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cards Layer - Adjusted Overlap */}
      {/* Changed -mt-70 to a more balanced lg:-mt-60 */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 -mt-24 md:-mt-40 lg:-mt-80 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
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
          <div className="md:col-span-2 lg:col-span-1">
            <FeatureCard
              icon="🤝"
              title="Employment Assistance"
              description="Supporting job seekers with skill development, career guidance, and access to employment opportunities."
            />
          </div>
        </div>
      </section>
    </main>
  );
}