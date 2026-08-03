import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import { useMovies } from './useMovies'

const { fetchMovies } = vi.hoisted(() => ({
  fetchMovies: vi.fn().mockResolvedValue({ content: [], totalPages: 1, totalElements: 0, number: 0 }),
}))
vi.mock('../../../services/movies/movies.api', () => ({ fetchMovies }))

describe('useMovies', () => {
  afterEach(() => vi.useRealTimers())

  it('loads the first page with fifteen items', async () => {
    const { result } = renderHook(() => useMovies())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(fetchMovies).toHaveBeenCalledWith(
      { page: 0, size: 15, year: undefined, winner: undefined },
      expect.any(AbortSignal),
    )
  })

  it('applies filters after the debounce and resets the page', async () => {
    const { result } = renderHook(() => useMovies())

    act(() => result.current.setPage(2))
    act(() => result.current.setFilters({ year: '1981', winner: 'true' }))
    expect(result.current.page).toBe(1)

    await waitFor(() =>
      expect(fetchMovies).toHaveBeenLastCalledWith(
        { page: 0, size: 15, year: 1981, winner: true },
        expect.any(AbortSignal),
      ),
    )
  })

  it('exposes an error when loading movies fails', async () => {
    fetchMovies.mockRejectedValueOnce(new Error('Network error'))
    const { result } = renderHook(() => useMovies())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBeTruthy()
  })
})
