import HeroSection from "../HeroSection";
import Cards from "../Cards";
import React, { useEffect } from "react";
function Home() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeroSection></HeroSection>
      <Cards></Cards>
    </>
  );
}

export default Home;
