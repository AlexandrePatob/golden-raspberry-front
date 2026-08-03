import type { Movie } from '../../../services/movies/movies.types'
import type { MovieFilters } from '../movies.types'

type MoviesTableProps = { movies: Movie[]; filters: MovieFilters; onFiltersChange: (filters: MovieFilters) => void }

export function MoviesTable({ movies, filters, onFiltersChange }: MoviesTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="w-1/4 border border-slate-300 px-2 py-2 text-center">ID</th>
            <th className="w-1/4 border border-slate-300 px-2 py-2 text-center">
              <label className="block">
                Year
                <input
                  aria-label="Filter by year"
                  value={filters.year}
                  onChange={(event) => onFiltersChange({ ...filters, year: event.target.value })}
                  placeholder="Filter by year"
                  className="mt-1 w-full border border-slate-300 px-2 py-1"
                />
              </label>
            </th>
            <th className="w-1/4 border border-slate-300 px-2 py-2 text-center">Title</th>
            <th className="w-1/4 border border-slate-300 px-2 py-2 text-center">
              <label className="block">
                Winner?
                <select
                  aria-label="Filter by winner"
                  value={filters.winner}
                  onChange={(event) => onFiltersChange({ ...filters, winner: event.target.value })}
                  className="mt-1 w-full border border-slate-300 px-2 py-1"
                >
                  <option value="all">Yes/No</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </label>
            </th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.id} className="even:bg-slate-50">
              <td className="border border-slate-300 px-2 py-1.5">{movie.id}</td>
              <td className="border border-slate-300 px-2 py-1.5">{movie.year}</td>
              <td className="border border-slate-300 px-2 py-1.5">{movie.title}</td>
              <td className="border border-slate-300 px-2 py-1.5">{movie.winner ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
