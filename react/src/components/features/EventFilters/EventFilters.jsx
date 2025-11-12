import { useState } from 'react';
import { HiSearch, HiX } from 'react-icons/hi';
import { FaPalette, FaMusic, FaTools, FaUtensils, FaGraduationCap, FaTheaterMasks, FaDrum, FaCut } from 'react-icons/fa';
import { MdLocationOn, MdMoneyOff, MdAttachMoney } from 'react-icons/md';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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

  const handleCategoriaChange = (value) => {
    setCategoria(value);
    onCategoriaChange?.(value);
  };

  const handleUbicacionChange = (value) => {
    setUbicacion(value);
    onUbicacionChange?.(value);
  };

  const handlePrecioChange = (value) => {
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

  const hasActiveFilters = busqueda || categoria !== 'todos' || ubicacion !== 'todos' || precio !== 'todos';
  const activeFiltersCount = [
    busqueda,
    categoria !== 'todos',
    ubicacion !== 'todos',
    precio !== 'todos'
  ].filter(Boolean).length;

  return (
    <div className="bg-white! dark:bg-gray-900! border! border-gray-200! dark:border-gray-800! rounded-2xl! p-6! shadow-lg! dark:shadow-2xl! transition-all! duration-200!">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4! mb-6!">
        <div className="flex items-center gap-3!">
          <h2 className="font-serif! text-2xl! font-bold! text-gray-900! dark:text-white! m-0! p-0!">
            Filtrar Eventos
          </h2>
          {activeFiltersCount > 0 && (
            <Badge variant="default" className="px-2.5! py-1! bg-primary! text-white! dark:bg-orange-500! dark:text-white!">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        
        {totalResultados > 0 && (
          <span className="text-sm! text-gray-600! dark:text-gray-400! font-medium! m-0! p-0!">
            {totalResultados} resultado{totalResultados !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <Separator className="mb-6! bg-gray-200! dark:bg-gray-800!" />

      {/* Búsqueda destacada */}
      <div className="mb-6!">
        <Label htmlFor="search" className="mb-2! block text-sm! font-medium! text-gray-700! dark:text-gray-300!">
          Buscar
        </Label>
        <div className="relative">
          <HiSearch className="absolute left-3! top-1/2 -translate-y-1/2 w-5! h-5! text-gray-400! dark:text-gray-500! pointer-events-none" />
          <Input
            id="search"
            type="text"
            placeholder="Buscar por nombre, descripción..."
            value={busqueda}
            onChange={handleSearchChange}
            className="pl-10! pr-10! bg-gray-50! dark:bg-gray-800! border-gray-200! dark:border-gray-700! text-gray-900! dark:text-white! placeholder:text-gray-400! dark:placeholder:text-gray-500! focus:ring-2! focus:ring-primary! dark:focus:ring-orange-500! focus:border-transparent!"
          />
          {busqueda && (
            <button
              onClick={() => {
                setBusqueda('');
                onSearchChange?.('');
              }}
              className="absolute right-3! top-1/2 -translate-y-1/2 text-gray-400! dark:text-gray-500! hover:text-gray-900! dark:hover:text-white! transition-colors"
              aria-label="Limpiar búsqueda"
            >
              <HiX className="w-4! h-4!" />
            </button>
          )}
        </div>
      </div>

      {/* Filtros en grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6! mb-6!">
        {/* Categoría */}
        <div className="space-y-2!">
          <Label htmlFor="categoria" className="text-sm! font-medium! text-gray-700! dark:text-gray-300!">
            Categoría
          </Label>
          <Select value={categoria} onValueChange={handleCategoriaChange}>
            <SelectTrigger id="categoria" className="w-full bg-gray-50! dark:bg-gray-800! border-gray-200! dark:border-gray-700! text-gray-900! dark:text-white! hover:bg-gray-100! dark:hover:bg-gray-700! transition-colors! pl-3!">
              <SelectValue placeholder="Seleccionar categoría" />
            </SelectTrigger>
            <SelectContent className="bg-white! dark:bg-gray-800! border-gray-200! dark:border-gray-700!">
              <SelectItem value="todos" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">Todas las categorías</SelectItem>
              <SelectItem value="cultural" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaPalette className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Cultural</span>
                </div>
              </SelectItem>
              <SelectItem value="musical" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaMusic className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Musical</span>
                </div>
              </SelectItem>
              <SelectItem value="taller" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaTools className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Taller</span>
                </div>
              </SelectItem>
              <SelectItem value="gastronomia" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaUtensils className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Gastronomía</span>
                </div>
              </SelectItem>
              <SelectItem value="conferencia" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaGraduationCap className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Conferencia</span>
                </div>
              </SelectItem>
              <SelectItem value="festival" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaTheaterMasks className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Festival</span>
                </div>
              </SelectItem>
              <SelectItem value="danza" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaDrum className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Danza</span>
                </div>
              </SelectItem>
              <SelectItem value="artesania" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <FaCut className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Artesanía</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Ubicación */}
        <div className="space-y-2!">
          <Label htmlFor="ubicacion" className="text-sm! font-medium! text-gray-700! dark:text-gray-300!">
            Ubicación
          </Label>
          <Select value={ubicacion} onValueChange={handleUbicacionChange}>
            <SelectTrigger id="ubicacion" className="w-full bg-gray-50! dark:bg-gray-800! border-gray-200! dark:border-gray-700! text-gray-900! dark:text-white! hover:bg-gray-100! dark:hover:bg-gray-700! transition-colors! pl-3!">
              <SelectValue placeholder="Seleccionar ubicación" />
            </SelectTrigger>
            <SelectContent className="bg-white! dark:bg-gray-800! border-gray-200! dark:border-gray-700!">
              <SelectItem value="todos" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">Todas las ubicaciones</SelectItem>
              <SelectItem value="Madrid" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdLocationOn className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Madrid</span>
                </div>
              </SelectItem>
              <SelectItem value="Barcelona" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdLocationOn className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Barcelona</span>
                </div>
              </SelectItem>
              <SelectItem value="Valencia" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdLocationOn className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Valencia</span>
                </div>
              </SelectItem>
              <SelectItem value="Sevilla" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdLocationOn className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Sevilla</span>
                </div>
              </SelectItem>
              <SelectItem value="Bilbao" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdLocationOn className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Bilbao</span>
                </div>
              </SelectItem>
              <SelectItem value="Granada" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdLocationOn className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>Granada</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Precio */}
        <div className="space-y-2!">
          <Label htmlFor="precio" className="text-sm! font-medium! text-gray-700! dark:text-gray-300!">
            Precio
          </Label>
          <Select value={precio} onValueChange={handlePrecioChange}>
            <SelectTrigger id="precio" className="w-full bg-gray-50! dark:bg-gray-800! border-gray-200! dark:border-gray-700! text-gray-900! dark:text-white! hover:bg-gray-100! dark:hover:bg-gray-700! transition-colors! pl-3!">
              <SelectValue placeholder="Seleccionar precio" />
            </SelectTrigger>
            <SelectContent className="bg-white! dark:bg-gray-800! border-gray-200! dark:border-gray-700!">
              <SelectItem value="todos" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">Todos los precios</SelectItem>
              <SelectItem value="gratis" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdMoneyOff className="w-5! h-5! text-green-500! dark:text-green-400!" />
                  <span>Gratis</span>
                </div>
              </SelectItem>
              <SelectItem value="pago" className="hover:bg-gray-100! dark:hover:bg-gray-700! text-gray-900! dark:text-white! pl-3!">
                <div className="flex items-center gap-2!">
                  <MdAttachMoney className="w-5! h-5! text-orange-500! dark:text-orange-400!" />
                  <span>De pago</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Botón limpiar filtros */}
      {hasActiveFilters && (
        <>
          <Separator className="mb-4! bg-gray-200! dark:bg-gray-800!" />
          <div className="flex items-center justify-between bg-gray-50! dark:bg-gray-800/50! rounded-lg! p-3! border! border-gray-200! dark:border-gray-700!">
            <span className="text-sm! text-gray-600! dark:text-gray-400! m-0! p-0!">
              {activeFiltersCount} filtro{activeFiltersCount !== 1 ? 's' : ''} activo{activeFiltersCount !== 1 ? 's' : ''}
            </span>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={limpiarFiltros}
              className="gap-2! hover:bg-gray-200! dark:hover:bg-gray-700! text-gray-700! dark:text-gray-300! hover:text-gray-900! dark:hover:text-white!"
            >
              <HiX className="w-4! h-4!" />
              Limpiar filtros
            </Button>
          </div>
        </>
      )}
    </div>
  );
};