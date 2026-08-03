import { useEffect, useState } from 'react'
import { useDebouncedValue } from '../../../hooks/useDebouncedValue'
import { fetchMovies } from '../../../services/movies/movies.api'
import type { MoviePage } from '../../../services/movies/movies.types'
import type { MovieFilters } from '../movies.types'

const pageSize = 15
type State = { data?: MoviePage; error?: string; loading: boolean }

export function useMovies() {
  const [filters, setFilters] = useState<MovieFilters>({ year: '', winner: 'all' })
  const [page, setPage] = useState(1)
  const [state, setState] = useState<State>({ loading: true })
  const debouncedYear = useDebouncedValue(filters.year)
  useEffect(() => {
    const controller = new AbortController()
    const year = debouncedYear ? Number(debouncedYear) : undefined
    const winner = filters.winner === 'all' ? undefined : filters.winner === 'true'
    setState((current) => ({ ...current, loading: true, error: undefined }))
    fetchMovies({ page: page - 1, size: pageSize, year, winner }, controller.signal)
      .then((data) => setState({ data, loading: false }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ error: 'Não foi possível carregar os filmes.', loading: false })
      })
    return () => controller.abort()
  }, [debouncedYear, filters.winner, page])
  return {
    ...state,
    filters,
    page,
    setPage,
    setFilters: (next: MovieFilters) => {
      setPage(1)
      setFilters(next)
    },
  }
}
