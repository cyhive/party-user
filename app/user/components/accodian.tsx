"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, GraduationCap, PlusSquare, Briefcase, Users, Sprout, Accessibility, Heart, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const schemes = [
  {
    id: "edu",
    title: "Educational Support",
    description: "Helping students access quality education through scholarships, learning resources, and academic assistance programs.",
    icon: <GraduationCap className="text-red-400 w-8 h-8" />,
    details: {
      purpose: "Enable access to quality learning materials and financial aid.",
      eligibility: "Students from low-income families enrolled in recognized institutions.",
      benefits: ["Tuition fee waivers", "Free textbooks", "Monthly stipends"],
      howToApply: ["Submit application via education portal", "Verify documents at local office"]
    }
  },
  {
    id: "medical",
    title: "Medical Care Aid",
    description: "Providing healthcare support through medical camps, treatment assistance, and access to essential health services.",
    icon: <PlusSquare className="text-red-400 w-8 h-8" />,
    details: {
      subTitle: "Maternal & Child Healthcare (0-5 Years)",
      purpose: "Ensure safe pregnancy, healthy childbirth, and early childhood care.",
      eligibility: "Pregnant women, Infants and children up to 5 years, Priority for low-income families",
      benefits: "Free prenatal and postnatal check-ups, Institutional delivery support, Free vaccinations and immunization drives, Nutrition supplements for mothers and children, Neonatal and pediatric healthcare access",
      howToApply: [
        "Register through local health centers or Anganwadi centers",
        "Online application via the official welfare portal"
      ]
    }
  },
  {
    id: "emp",
    title: "Employment Assistance",
    description: "Supporting job seekers with skill development, career guidance, and access to employment opportunities.",
    icon: <Briefcase className="text-red-400 w-8 h-8" />,
  },
  {
    id: "senior",
    title: "Senior Citizens",
    description: "Welfare schemes providing financial support, healthcare assistance, and social security for senior citizens.",
    icon: <Users className="text-red-400 w-8 h-8" />,
  },
  {
    id: "agri",
    title: "Agriculture",
    description: "Support initiatives for farmers and rural communities to improve agricultural productivity and rural infrastructure.",
    icon: <Sprout className="text-red-400 w-8 h-8" />,
  },
  {
    id: "disability",
    title: "Disability Care",
    description: "Assistance and services to empower persons with disabilities through inclusive programs and accessible support.",
    icon: <Accessibility className="text-red-400 w-8 h-8" />,
  },
  {
    id: "women",
    title: "Women & Child Welfare",
    description: "Programs designed to promote safety, education, health, and overall well-being of women and children.",
    icon: <Heart className="text-red-400 w-8 h-8" />,
  },
  {
    id: "housing",
    title: "Housing",
    description: "Programs aimed at providing safe housing, clean water, sanitation, and essential public infrastructure.",
    icon: <Home className="text-red-400 w-8 h-8" />,
  },
];

export default function WelfareAccordion() {
  const [openId, setOpenId] = useState<string | null>("medical"); // Defaulting medical to open as per image

  return (
    <div className="max-w-8xl mx-auto p-6 min-h-screen">
   
      <div className="space-y-4">
        {schemes.map((scheme) => (
          <div
            key={scheme.id}
            className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            {/* Header Row */}
            <div className="p-6 flex items-start justify-between gap-4">
              <div className="flex gap-6 items-start">
                <div className="bg-red-50 p-4 rounded-2xl flex-shrink-0">
                  {scheme.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{scheme.title}</h3>
                  <p className="text-gray-600 mt-1 max-w-2xl">{scheme.description}</p>
                </div>
              </div>

              <button
                onClick={() => setOpenId(openId === scheme.id ? null : scheme.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${
                  openId === scheme.id 
                  ? "bg-red-600 text-white" 
                  : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {openId === scheme.id ? "Learn Less" : "Learn More"}
                {openId === scheme.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {openId === scheme.id && scheme.details && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-8 pt-2 ml-24 border-t border-gray-50">
                    <div className="flex items-start gap-3 mb-4">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-xs font-bold text-gray-500 mt-1">1</span>
                        <h4 className="font-bold text-gray-900 text-lg">{scheme.details.subTitle}</h4>
                    </div>

                    <div className="space-y-4 text-sm leading-relaxed text-gray-700 max-w-4xl">
                        <p><span className="font-bold text-gray-900">Purpose: </span>{scheme.details.purpose}</p>
                        <p><span className="font-bold text-gray-900">Eligibility: </span>{scheme.details.eligibility}</p>
                        <p><span className="font-bold text-gray-900">Benefits Include: </span>{scheme.details.benefits}</p>
                        
                        <div className="mt-4">
                            <span className="font-bold text-gray-900 block mb-2">How to Apply:</span>
                            <ul className="list-disc ml-5 space-y-1 text-gray-500 font-medium">
                                {Array.isArray(scheme.details.howToApply) && scheme.details.howToApply.map((step, idx) => (
                                    <li key={idx}>{step}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
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