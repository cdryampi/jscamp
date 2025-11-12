import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
} from "../../ui/pagination.jsx";
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generar array de números de página a mostrar
  const getPageNumbers = () => {
    const delta = 2; // Número de páginas a mostrar antes y después de la actual
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  const pageNumbers = getPageNumbers();

  return (
    <UIPagination className="my-8!">
      <PaginationContent className="gap-2!">
        {/* Botón Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={`cursor-pointer! gap-2! ${
              currentPage === 1 
                ? 'pointer-events-none! opacity-50!' 
                : 'hover:bg-primary/10! dark:hover:bg-primary/20!'
            }`}
          >
            <HiChevronLeft className="w-4! h-4!" />
            <span className="hidden! sm:inline!">Anterior</span>
          </PaginationPrevious>
        </PaginationItem>

        {/* Números de página */}
        {pageNumbers.map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === '...' ? (
              <PaginationEllipsis className="text-muted-foreground!" />
            ) : (
              <PaginationLink
                onClick={() => onPageChange(pageNumber)}
                isActive={currentPage === pageNumber}
                className={`cursor-pointer! min-w-9! h-9! ${
                  currentPage === pageNumber
                    ? 'bg-primary! text-primary-foreground! border-primary! hover:bg-primary/90!'
                    : 'hover:bg-primary/10! dark:hover:bg-primary/20! text-foreground!'
                }`}
              >
                {pageNumber}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Botón Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`cursor-pointer! gap-2! ${
              currentPage === totalPages 
                ? 'pointer-events-none! opacity-50!' 
                : 'hover:bg-primary/10! dark:hover:bg-primary/20!'
            }`}
          >
            <span className="hidden! sm:inline!">Siguiente</span>
            <HiChevronRight className="w-4! h-4!" />
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </UIPagination>
  );
}