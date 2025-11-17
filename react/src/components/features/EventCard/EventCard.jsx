import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle,
  CardDescription,
  CardImage,
  CardBadge,
  CardStat,
  CardPrice
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/utils/imageUrl';

export const EventCard = ({ evento }) => {
  const {
    id,
    titulo,
    slug,
    descripcion,
    imagen,
    fechaFormateada,
    ubicacion,
    precio,
    precioNumerico,
    tipo = [],
    visitado = false,
  } = evento;

  const categoriaPrincipal = tipo[0] || 'evento';

  // Mapeo de categorías a variantes de badge
  const badgeVariantMap = {
    cultural: 'primary',
    musical: 'warning',
    taller: 'success',
    gastronomia: 'warning',
    conferencia: 'primary',
    festival: 'warning',
    danza: 'primary',
    ceremonial: 'primary',
    artesanía: 'success',
    'gastronomía': 'warning',
    default: 'default',
  };

  const badgeVariant = badgeVariantMap[categoriaPrincipal] || badgeVariantMap.default;

  return (
    <Card hoverable className="h-full">
      {/* Imagen con overlay y badges */}
      <CardImage 
        src={getImageUrl(imagen)}
        alt={titulo}
        aspectRatio="4/3"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=600&fit=crop';
        }}
      >
        <div className="flex flex-wrap gap-2">
          <CardBadge variant={badgeVariant} className="capitalize !p-1.5">
            {categoriaPrincipal}
          </CardBadge>
          {tipo.slice(1, 2).map((tag, index) => (
            <CardBadge key={index} variant="secondary" className="capitalize !p-1.5">
              {tag}
            </CardBadge>
          ))}
        </div>
      </CardImage>

      {/* Header con título y descripción */}
      <CardHeader className="!p-5 !pb-3">
        <CardTitle className="!mb-2">
          {titulo}
        </CardTitle>
        <CardDescription className="!m-0">
          {descripcion}
        </CardDescription>
      </CardHeader>

      {/* Contenido con información del evento */}
      <CardContent className="!px-5 !py-3 !space-y-2">
        <CardStat 
          icon={FaCalendarAlt}
          value={fechaFormateada}
        />
        
        <CardStat 
          icon={FaMapMarkerAlt}
          value={ubicacion}
        />
      </CardContent>

      {/* Footer con precio y botón */}
      <CardFooter className="!p-5 !pt-4 border-t gap-3 flex-col items-stretch">
        <CardPrice 
          price={precioNumerico || precio}
          free={precio === 'Gratis'}
          className="w-full"
        />

        {visitado ? (
          <Button 
            variant="success"
            size="default"
            className="w-full"
            disabled
          >
            <FaCheckCircle className="w-4 h-4" />
            Visitado
          </Button>
        ) : (
          <Button 
            asChild
            variant="default"
            size="default"
            className="w-full"
          >
            <Link to={`/eventos/${slug || id}`} className='dark:text-white'>
              Ver detalles
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};