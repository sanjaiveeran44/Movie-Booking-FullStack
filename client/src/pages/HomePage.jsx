import React from "react";
import "./Homepage.css";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SuggestedMovies from "../components/SuggestedMovies";
import Footer from "../components/Footer";

const Homepage = () => {
  return (
    <div className="homepage">
      <Navbar />
      <HeroSection />
      <SuggestedMovies />
      <Footer />
    </div>
  );
};

export default Homepage;
