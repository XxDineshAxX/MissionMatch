import React, { useEffect } from "react";

export default function Services() {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  return <h1 className="services">MATCH</h1>;
}
