
import AboutUs from "./user/components/Aboutus";
import Footer from "./user/components/Footer";
import Hero from "./user/components/Hero";
import Navbar from "./user/components/Navbar";
import NewsPage from "./user/components/News";
import OurMission from "./user/components/OurMission";
import OurVision from "./user/components/OurVision";
import WhatWeHaveDone from "./user/components/WhatWeHaveDone";
import WelfarePage from "./user/welfare/page"

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
    
      <AboutUs/>
      <OurMission/>
      <OurVision />
      <WhatWeHaveDone/>
      <NewsPage/>
      <Footer/>  
      <WelfarePage/>
      
    </>
  );
}
