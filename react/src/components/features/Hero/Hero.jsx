import { Link } from 'react-router-dom';
import { HiSparkles, HiArrowRight } from 'react-icons/hi';
import { FaUsers, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { HeroStat } from './HeroStat';
import './Hero.css';

const Hero = () => {
  const heroImage = `${import.meta.env.BASE_URL}assets/images/hero/hero-cultura.jpg`;

  return (
    <section 
      className="hero" 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <h1 className="hero-title">Eventos Culturales en Jujuy</h1>
        <p className="hero-subtitle">
          Descubre los mejores eventos y festivales de nuestra región
        </p>
      </div>
    </section>
  );
};

export default Hero;
