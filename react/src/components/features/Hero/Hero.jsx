import { Link } from 'react-router-dom';
import { HiSparkles, HiArrowRight } from 'react-icons/hi';
import { FaUsers, FaCalendarAlt, FaHeart } from 'react-icons/fa';

export const Hero = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-gradient-to-br from-beige-50 via-naranja-50 to-beige-100 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Content */}
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-terracota-500 to-naranja-500 text-white rounded-full font-semibold text-sm w-fit shadow-warm hover:-translate-y-0.5 transition-transform">
              <HiSparkles className="w-4 h-4" />
              <span>Cultura y Tradición Viva</span>
            </div>

            {/* Título */}
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              <span className="block text-foreground">Descubre Eventos</span>
              <span className="block bg-gradient-to-r from-terracota-600 via-naranja-500 to-terracota-700 bg-clip-text text-transparent">
                Culturales Indígenas
              </span>
            </h1>

            {/* Descripción */}
            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Únete a celebraciones ancestrales, talleres tradicionales y conferencias 
              que honran la rica herencia de los pueblos indígenas de América Latina.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/eventos" 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-terracota-500 to-naranja-500 text-white rounded-xl font-semibold text-lg shadow-warm-lg hover:-translate-y-1 hover:shadow-xl transition-all group"
              >
                <span>Explorar Eventos</span>
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/sobre-nosotros" 
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border-2 border-terracota-500 text-terracota-700 rounded-xl font-semibold text-lg hover:bg-terracota-50 hover:-translate-y-1 transition-all"
              >
                <span>Conoce Más</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 mt-4">
              <div className="flex items-center gap-3 group hover:-translate-y-1 transition-transform">
                <FaCalendarAlt className="w-8 h-8 text-terracota-600" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">50+</span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Eventos</span>
                </div>
              </div>

              <div className="flex items-center gap-3 group hover:-translate-y-1 transition-transform">
                <FaUsers className="w-8 h-8 text-terracota-600" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">15+</span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Comunidades</span>
                </div>
              </div>

              <div className="flex items-center gap-3 group hover:-translate-y-1 transition-transform">
                <FaHeart className="w-8 h-8 text-terracota-600" />
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-foreground">1000+</span>
                  <span className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Participantes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <div className="relative rounded-2xl overflow-hidden shadow-warm-lg hover:shadow-2xl transition-shadow">
              <img 
                src="/assets/images/hero/hero-cultura.jpg" 
                alt="Eventos culturales indígenas"
                className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-terracota-500/10 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Ola decorativa */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
};