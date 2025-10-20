import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-pattern"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <div className="hero-badge">
              <span>WELCOME TO IMMIGWAY VISA AGENCY</span>
            </div>
            <h1 className="hero-title">
              <span className="title-main">Immigration & Visa Solutions</span>
              <span className="title-accent">the easy way</span>
            </h1>
            <p className="hero-description">
              We provide a complete immigration & visa services for USA Canada & Australia for travel & education.
            </p>
            <button className="hero-button">
              GET STARTED
            </button>
          </div>
          <div className="hero-image">
            <div className="hero-image-container">
              <div className="hero-person">
                <div className="person-body">
                  <div className="person-head"></div>
                  <div className="person-torso"></div>
                </div>
                <div className="person-items">
                  <div className="airplane-paper">✈</div>
                  <div className="passport">📘</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
