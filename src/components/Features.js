import React from 'react';
import { FaCheck } from 'react-icons/fa';
import './Features.css';

const Features = () => {
  const features = [
    {
      icon: <FaCheck />,
      title: "Quality Visa Services",
      description: "Immigway Visa Consultancy was created to provide uniquely designed premium services in the world of education and migration."
    },
    {
      icon: <FaCheck />,
      title: "Professional & Expert Team",
      description: "Immigway Visa Consultancy was created to provide uniquely designed premium services in the world of education and migration."
    },
    {
      icon: <FaCheck />,
      title: "100% Satisfaction Guaranteed",
      description: "Immigway Visa Consultancy was created to provide uniquely designed premium services in the world of education and migration."
    }
  ];

  return (
    <section className="features">
      <div className="features-background">
        <div className="world-map-pattern"></div>
      </div>
      <div className="container">
        <div className="features-header">
          <div className="features-badge">
            <span className="airplane-icon">✈</span>
            <span>OUR FEATURES</span>
          </div>
          <h2 className="features-title">
            Committed to provide you the best services
          </h2>
        </div>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="features-cta">
          <button className="cta-button">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
