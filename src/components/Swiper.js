import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.css';

const SwiperComponent = () => {
  const slides = [
    {
      id: 1,
      image: '/images/slider_1.png',
      title: 'Services d\'Immigration',
      description: 'Obtenez votre visa rapidement avec nos experts en immigration. Consultation gratuite disponible.',
      buttonText: 'Prendre Rendez-vous',
      buttonLink: '/appointment'
    },
    {
      id: 2,
      image: '/images/Family_sponsorship.png',
      title: 'Parrainage Familial',
      description: 'Réunissez votre famille au Canada. Nos conseillers vous accompagnent dans tout le processus.',
      buttonText: 'En Savoir Plus',
      buttonLink: '/services/family-sponsorship'
    },
    {
      id: 3,
      image: '/images/consultin_image.webp',
      title: 'Express Entry',
      description: 'Programme d\'immigration économique le plus rapide. Évaluez vos chances avec notre calculateur CRS.',
      buttonText: 'Calculer CRS',
      buttonLink: '/crs-calculator'
    },
    {
      id: 4,
      image: '/images/Family_sponsorship.png',
      title: 'Études au Canada',
      description: 'Poursuivez vos études dans les meilleures universités canadiennes. Aide complète pour les démarches.',
      buttonText: 'Nos Services',
      buttonLink: '/services/university-admission'
    }
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop={true}
      className="my-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide
          key={slide.id}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100vh',
          }}
        >
          <div className="slide-overlay">
            <h3 className="slide-title">{slide.title}</h3>
            <p className="slide-description">{slide.description}</p>
            <a href={slide.buttonLink} className="slide-button">
              {slide.buttonText}
            </a>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComponent;
