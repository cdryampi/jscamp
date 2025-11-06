import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const EventFilters = ({ 
  onSearchChange,
  onCategoriaChange,
  onUbicacionChange,
  onPrecioChange,
  totalResultados = 0
}) => {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('todos');
  const [ubicacion, setUbicacion] = useState('todos');
  const [precio, setPrecio] = useState('todos');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setBusqueda(value);
    onSearchChange?.(value);
  };

  const handleCategoriaChange = (e) => {
    const value = e.target.value;
    setCategoria(value);
    onCategoriaChange?.(value);
  };

  const handleUbicacionChange = (e) => {
    const value = e.target.value;
    setUbicacion(value);
    onUbicacionChange?.(value);
  };

  const handlePrecioChange = (e) => {
    const value = e.target.value;
    setPrecio(value);
    onPrecioChange?.(value);
  };

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoria('todos');
    setUbicacion('todos');
    setPrecio('todos');
    onSearchChange?.('');
    onCategoriaChange?.('todos');
    onUbicacionChange?.('todos');
    onPrecioChange?.('todos');
  };

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-warm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-bold text-foreground">Filtrar Eventos</h2>
        {totalResultados > 0 && (
          <span className="text-sm text-muted-foreground">
            {totalResultados} resultado{totalResultados !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Búsqueda */}
        <div className="relative">
          <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar eventos..."
            value={busqueda}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>

        {/* Categoría */}
        <select
          value={categoria}
          onChange={handleCategoriaChange}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="todos">Todas las categorías</option>
          <option value="cultural">Cultural</option>
          <option value="musical">Musical</option>
          <option value="taller">Taller</option>
          <option value="gastronomia">Gastronomía</option>
          <option value="conferencia">Conferencia</option>
        </select>

        {/* Ubicación */}
        <select
          value={ubicacion}
          onChange={handleUbicacionChange}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="todos">Todas las ubicaciones</option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Valencia">Valencia</option>
          <option value="Sevilla">Sevilla</option>
        </select>

        {/* Precio */}
        <select
          value={precio}
          onChange={handlePrecioChange}
          className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="todos">Todos los precios</option>
          <option value="gratis">Gratis</option>
          <option value="pago">De pago</option>
        </select>
      </div>

      {(busqueda || categoria !== 'todos' || ubicacion !== 'todos' || precio !== 'todos') && (
        <div className="mt-4 flex justify-end">
          <Button 
            variant="ghost" 
            onClick={limpiarFiltros}
            className="text-terracota-600 hover:text-terracota-700 hover:bg-terracota-50"
          >
            Limpiar filtros
          </Button>
        </div>
      )}
    </div>
  );
};