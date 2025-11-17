import { Link } from 'react-router-dom';
import { HiSparkles, HiArrowRight } from 'react-icons/hi';
import { FaUsers, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { HeroStat } from './HeroStat';

export const Hero = () => {
  return (
    <section className="relative py-16! sm:py-20! lg:py-28! bg-linear-to-br from-orange-50 via-orange-100 to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4! sm:px-6! lg:px-8!">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8! lg:gap-12! items-center relative z-10">
          {/* Content */}
          <div className="flex flex-col gap-6! animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Badge */}
            <Badge variant="default" className="w-fit gap-2! text-sm! font-semibold! py-2! px-4! shadow-warm">
              <HiSparkles className="w-4! h-4!" />
              Cultura y Tradición Viva
            </Badge>

            {/* Título */}
            <div className="space-y-2!">
              <h1 className="font-serif! text-4xl! sm:text-5xl! lg:text-6xl! font-bold! leading-tight! tracking-tight! m-0! p-0!">
                <span className="block text-foreground">Descubre Eventos</span>
                <span className="block bg-linear-to-r from-orange-600 via-orange-500 to-orange-700 dark:from-orange-400 dark:via-orange-300 dark:to-orange-500 bg-clip-text text-transparent">
                  Culturales Indígenas
                </span>
              </h1>
            </div>

            {/* Descripción */}
            <p className="text-base! sm:text-lg! text-muted-foreground max-w-xl! leading-relaxed! m-0! p-0!">
              Únete a celebraciones ancestrales, talleres tradicionales y conferencias 
              que honran la rica herencia de los pueblos indígenas de América Latina.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3! mt-4!">
              <Button asChild variant="default" size="lg" className="group shadow-warm-lg p-2!">
                <Link to="/eventos" className="no-underline!">
                  <span>Explorar Eventos</span>
                  <HiArrowRight className="w-5! h-5! group-hover:translate-x-1 transition-transform!" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-2! p-2!">
                <Link to="/sobre-nosotros" className="no-underline!">
                  <span>Conoce Más</span>
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3! mt-6!">
              <HeroStat 
                icon={FaCalendarAlt}
                value="50+"
                label="Eventos"
              />
              <HeroStat 
                icon={FaUsers}
                value="15+"
                label="Comunidades"
              />
              <HeroStat 
                icon={FaHeart}
                value="1000+"
                label="Participantes"
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="relative animate-in fade-in slide-in-from-right-4 duration-700 delay-200">
            <div className="relative rounded-2xl! overflow-hidden shadow-2xl! hover:shadow-warm-xl! transition-shadow! duration-300! ring-1! ring-border/50!">
              <AspectRatio ratio={4/3}>
                <img 
                  src="/assets/images/hero/hero-cultura.jpg"
                  alt="Eventos culturales indígenas"
                  className="w-full! h-full! object-cover! hover:scale-105! transition-transform! duration-700!"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
              </AspectRatio>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
