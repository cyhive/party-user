import Navbar from "././components/Navbar";
import Hero from "././components/Hero";
import OurVision from "./components/OurVision";
import Aboutus from "./components/Aboutus";
import OurMission from "./components/OurMission";
import WhatWeHaveDone from "./components/WhatWeHaveDone";
import News from "./components/News";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
    
      <Aboutus/>
      <OurMission/>
      <OurVision />
      <WhatWeHaveDone/>
      <News/>
      <Footer/>
    </>
  );
}
