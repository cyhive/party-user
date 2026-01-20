import Image from "next/image";
import FeatureCard from "../components/FeatureCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Feature cards data
const featureCardsData = [
  {
    icon: "🎓",
    title: "Educational Support",
    description:
      "Helping students access quality education through scholarships, learning resources, and academic assistance programs.",
    buttonText: "Learn More",
  },
  {
    icon: "🏥",
    title: "Medical Care Aid",
    description:
      "Providing healthcare support through medical camps, treatment assistance, and access to essential health services.",
    buttonText: "Learn More",
  },
  {
    icon: "💼",
    title: "Employment Assistance",
    description:
      "Supporting job seekers with skill development, career guidance, and access to employment opportunities.",
    buttonText: "Learn More",
  },
  {
    icon: "👩‍👧",
    title: "Women & Child Welfare",
    description:
      "Programs designed to promote safety, education, health, and overall well-being of women and children.",
    buttonText: "Learn More",
  },
  {
    icon: "👴",
    title: "Senior Citizens",
    description:
      "Welfare schemes providing financial support, healthcare assistance, and social security for senior citizens.",
    buttonText: "Learn More",
  },
  {
    icon: "🌾",
    title: "Agriculture",
    description:
      "Support initiatives for farmers and rural communities to improve agricultural productivity and rural infrastructure.",
    buttonText: "Learn More",
  },
  {
    icon: "🏠",
    title: "Housing",
    description:
      "Programs aimed at providing safe housing, clean water, sanitation, and essential public infrastructure.",
    buttonText: "Learn More",
  },
  {
    icon: "♿",
    title: "Disability Care",
    description: "Assistants persons disabilities accessible support services.",
    buttonText: "Learn More",
  },
];

export default function WelfarePage() {
  return (
    <div className="w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div>
            <h1 className="font-['Inter'] font-extrabold text-[64px] leading-none tracking-normal text-gray-900">
              Welfare Schemes <br /> for Public Well-Being
            </h1>
            <p className="mt-6 max-w-lg font-normal text-[16px] md:text-[20px] leading-[1.4] md:leading-none tracking-normal text-gray-600">
              Discover government and party-led welfare initiatives designed to
              support education, healthcare, livelihoods, and social security for
              eligible citizens.
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <Image
              src="/image 11.png"
              alt="Welfare Schemes"
              width={500}
              height={400}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="w-full bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-left mb-10">
            Welfare Schemes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-900 ">
            {featureCardsData.map((card, index) => (
              <FeatureCard
                key={index}
                icon={card.icon}
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us Section */}

      <section className="relative w-full h-150 flex justify-center items-center bg-white">
        {/* Background border-like image (inside only) */}
        <div className="relative border-0 border-red-600 rounded-xl w-[75%] h-[75%] overflow-hidden">
          <Image
            src="/Crowd.png" // Replace with your border background image
            alt="Contact Border Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Centered Card */}
        <div className="absolute z-10 flex justify-center items-center w-full px-4">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl w-full flex flex-col md:flex-row text-left border border-gray-200">

            {/* Left Column (Text + Input/Button) */}
            <div className="md:w-3/4 pr-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact us!</h2>
              <p className="text-gray-600 mb-6">
                We are here to listen and assist. Reach out to us for support, information, or to share your concerns, and our team will respond at the earliest.
              </p>

              <div className="flex flex-col gap-4 text-gray-900">
                <input
                  type="text"
                  placeholder="Email address / Mobile number"
                  className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 w-full"
                />
                <button className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-red-700 transition self-start">
                  Verify
                </button>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="md:w-1/4 flex justify-center items-center mt-6 md:mt-0">
              <Image
                src="/vision-fist.png"
                alt="Contact Illustration"
                width={200}
                height={200}
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
}
