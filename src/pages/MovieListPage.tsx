import { Pagination } from '../components/table/Pagination'
import { MoviesTable } from '../features/movies/components/MoviesTable'
import { useMovies } from '../features/movies/hooks/useMovies'

export function MovieListPage() {
  const { data, error, filters, loading, page, setFilters, setPage } = useMovies()
  const movies = data?.content ?? []

  return (
    <section className="w-full rounded border border-slate-200 bg-white p-3 shadow-sm">
      <h1 className="mb-2 text-base font-bold">List movies</h1>
      <MoviesTable movies={movies} filters={filters} onFiltersChange={setFilters} />
      {loading && (
        <p role="status" className="p-3 text-center text-slate-500">
          Carregando filmes...
        </p>
      )}
      {error && (
        <p role="alert" className="p-3 text-center text-red-700">
          {error}
        </p>
      )}
      {!loading && !error && movies.length === 0 && (
        <p className="border border-t-0 border-slate-300 p-4 text-center text-slate-500">
          Nenhum resultado encontrado.
        </p>
      )}
      <Pagination page={page} totalPages={data?.totalPages ?? 1} onChange={setPage} />
    </section>
  )
}
