import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import './Services.css';

const Services = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      id: 1,
      title: "Green Card Application",
      description: "Emphasizing practical learning and hands-on experience is an effective approach to education that yields...",
      image: "👩‍💼",
      icon: "👤",
      color: "#3498db"
    },
    {
      id: 2,
      title: "PTE Exam Preparation",
      description: "Emphasizing practical learning and hands-on experience is an effective approach to education that yields...",
      image: "🗺️",
      icon: "📄",
      color: "#e74c3c"
    },
    {
      id: 3,
      title: "TOEFL Exam Preparation",
      description: "Emphasizing practical learning and hands-on experience is an effective approach to education that yields...",
      image: "📱",
      icon: "📄",
      color: "#f39c12"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="services">
      <div className="container">
        <div className="services-header">
          <div className="services-badge">
            <span className="airplane-icon">✈</span>
            <span>OUR SERVICES</span>
          </div>
          <h2 className="services-title">
            Choose Your Required Services from our list
          </h2>
        </div>

        <div className="services-carousel">
          <div className="carousel-container">
            <div 
              className="carousel-track"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {services.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-image">
                    <div className="service-emoji">{service.image}</div>
                    <div className="service-icon-overlay">
                      <div className="icon-circle">
                        <span>{service.icon}</span>
                      </div>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                    <a href="#services" className="service-link">
                      VIEW MORE <FaArrowRight />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="carousel-navigation">
            <button className="nav-button prev" onClick={prevSlide}>
              ‹
            </button>
            <button className="nav-button next" onClick={nextSlide}>
              ›
            </button>
          </div>

          <div className="carousel-dots">
            {services.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
