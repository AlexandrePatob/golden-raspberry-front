import { useState } from 'react'
import { Panel } from '../../../components/common/Panel'
import { DataTable, type Column } from '../../../components/table/DataTable'
import { fetchWinnersByYear } from '../../../services/movies/movies.api'
import type { Movie } from '../../../services/movies/movies.types'

const columns: Column<Movie>[] = [
  { header: 'Id', render: (item) => item.id },
  { header: 'Year', render: (item) => item.year },
  { header: 'Title', render: (item) => item.title },
]

export function WinnersByYearPanel() {
  const [year, setYear] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const search = async () => {
    if (!year) return
    try {
      setLoading(true)
      setError('')
      setMovies(await fetchWinnersByYear(Number(year)))
    } catch {
      setError('Não foi possível carregar os vencedores.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Panel title="List movie winners by year">
      <div className="flex gap-2">
        <input
          aria-label="Search by year"
          type="number"
          value={year}
          onChange={(event) => setYear(event.target.value)}
          placeholder="Search by year"
          className="min-w-0 flex-1 border border-slate-300 px-2 py-1.5"
        />
        <button
          type="button"
          onClick={search}
          disabled={loading}
          className="bg-blue-600 px-3 py-1.5 text-white disabled:opacity-50"
        >
          Search
        </button>
      </div>
      <div className="mt-3">
        <DataTable columns={columns} rows={movies} getRowKey={(item) => item.id} />
      </div>
      {error && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {error}
        </p>
      )}
    </Panel>
  )
}
