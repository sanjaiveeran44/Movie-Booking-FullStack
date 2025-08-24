import React from "react";
import "./HeroSection.css";
import marvelLogo from "../assets/marvel.png";
import guardiansBg from "../assets/bg.jpg";
const Hero = () => {
  return (
    <section className="hero">
      <img src={guardiansBg} alt="Guardians Background" className="hero-bg" />

      <div className="hero-content">
        <div className="logo">
          Night<span> Show</span>
        </div>
        <img src={marvelLogo} alt="Marvel Studios" className="marvel-logo" />

        <h1 className="movie-title">Guardians of the Galaxy</h1>
        <p className="movie-info">Action | Sci-Fi | 2h 0m</p>

        <p className="movie-desc">
          A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe.
        </p>

        <button className="explore-btn">Explore Movie</button>
      </div>
    </section>
  );
};

export default Hero;
