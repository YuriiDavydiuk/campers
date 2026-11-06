import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { FilterFormValues } from '../../types/filters';

import Filters from './components/Filters/Filters';
import CamperCard from './components/CamperCard/CamperCard';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loading';
import NoCampersFound from './components/NoCampersFound/NoCampersFound';

import { getCampers } from '../../services/campersService';
import css from './CatalogPage.module.css';

export default function CatalogPage() {
  const [filters, setFilters] = useState<FilterFormValues>({
    location: '',
    form: '',
    engine: '',
    transmission: '',
  });

  const { data, isPending, isError, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['campers', filters],
      queryFn: ({ pageParam }) => {
        return getCampers({
          page: pageParam,
          location: filters.location.trim() || undefined,
          form: filters.form || undefined,
          engine: filters.engine || undefined,
          transmission: filters.transmission || undefined,
        });
      },
      initialPageParam: 1,

      getNextPageParam: lastPage => {
        const nextPage = lastPage.page + 1;
        return nextPage <= lastPage.totalPages ? nextPage : undefined;
      },
      select: data => {
        return {
          ...data,
          campers: data.pages.flatMap(page => page.campers),
        };
      },
    });

  const campers = data?.campers ?? [];
  const noResult = !isPending && !isError && campers.length === 0;

  const handleSubmit = (values: FilterFormValues) => {
    setFilters(values);
  };

  const handleReset = () => {
    setFilters({
      location: '',
      form: '',
      engine: '',
      transmission: '',
    });
  };

  return (
    <>
      <div className={css.catalog} aria-busy={isLoading}>
        <h1 className={css.visuallyHidden}>Camper catalog</h1>

        <Filters values={filters} onSubmit={handleSubmit} onReset={handleReset} />

        <div className={css.campersList}>
          {isError && <p role="alert">Failed to load campers.</p>}
          {noResult && <NoCampersFound onClearFilters={handleReset} />}

          {campers.map(camper => (
            <CamperCard key={camper.id} camper={camper} />
          ))}

          {hasNextPage && (
            <Button
              type="button"
              variant="secondary"
              className={css.loadMore}
              disabled={isFetchingNextPage}
              onClick={() => fetchNextPage()}
            >
              {isFetchingNextPage ? 'Loading...' : 'Load more'}
            </Button>
          )}
        </div>
      </div>

      {isLoading && <Loading />}
    </>
  );
}
