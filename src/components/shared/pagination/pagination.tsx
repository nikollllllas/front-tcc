import { usePagination } from "@mantine/hooks";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { PerPageSelect } from "./perpage-select";

type PaginationProps = {
  currentPage: number;
  perPage: number;
  total: number;
  from: number;
  to: number;
  showPerPageSelect?: boolean;
  onPageChange?: (page: number) => void;
  onPerPageChange?: (perPage: number) => void;
};

export const DOTS = "dots";

export function Pagination({
  currentPage,
  perPage,
  total,
  from,
  to,
  showPerPageSelect = true,
  onPageChange,
  onPerPageChange,
}: PaginationProps) {
  const [siblings, setSiblings] = useState(0);
  const [, setSearchParams] = useSearchParams();
  const pages = Math.ceil(total / perPage) || 1;

  const { active, setPage, range } = usePagination({
    page: currentPage,
    total: pages,
    onChange: onPageChange,
    siblings,
    boundaries: 1,
  });

  const hasPreviousPage = active > 1;
  const hasNextPage = active < pages;

  const handlePageChange = (pageNumber: number) => {
    setSearchParams((params) => {
      params.set("page", pageNumber.toString());
      return params;
    });
    setPage(pageNumber);
  };

  const handlePerPageChange = (newPerPage: number) => {
    setSearchParams((params) => {
      params.set("page", "1");
      params.set("per_page", newPerPage.toString());
      return params;
    });
    onPerPageChange?.(newPerPage);
    setPage(1);
  };

  useEffect(() => {
    const updateSiblings = () => {
      const width = window.innerWidth;
      width < 1024
        ? setSiblings(0)
        : width < 1280
          ? setSiblings(1)
          : width < 1366
            ? setSiblings(2)
            : setSiblings(3);
    };

    updateSiblings();

    window.addEventListener("resize", updateSiblings);

    return () => window.removeEventListener("resize", updateSiblings);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-between gap-2 px-3 sm:flex-row">
      <div className="inline-flex items-center gap-4">
        {showPerPageSelect && (
          <PerPageSelect
            onPerPageChange={handlePerPageChange}
            perPage={perPage}
            totalCount={total}
          />
        )}
      </div>
      <span className="flex-1 text-sm text-muted-foreground">
        Mostrando de {from ?? 0} até {to ?? 0} de {total ?? 0} registros
      </span>
      <div className="flex items-center gap-6 lg:gap-8">
        <span className="w-full text-sm text-muted-foreground">
          Página {active} de {pages}
        </span>

        <div className="mx-auto flex w-full justify-center space-x-2">
          <Button
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(active - 1)}
            disabled={!hasPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {range.map((pageNumber, index) =>
            pageNumber === DOTS ? (
              <Button
                key={`dots-${index}`}
                variant="ghost"
                className="h-8 w-8 p-0"
                disabled
              >
                ...
              </Button>
            ) : (
              <Button
                key={pageNumber}
                variant={pageNumber === active ? "default" : "secondary"}
                className="h-8 w-8 p-0"
                onClick={() => handlePageChange(pageNumber)}
              >
                <span className="sr-only">Go to page {pageNumber}</span>
                {pageNumber}
              </Button>
            ),
          )}

          <Button
            variant="secondary"
            className="h-8 w-8 p-0"
            onClick={() => handlePageChange(active + 1)}
            disabled={!hasNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
