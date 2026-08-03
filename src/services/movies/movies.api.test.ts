import { beforeEach, vi } from 'vitest'
import { fetchDashboard, fetchMovies, fetchWinnersByYear } from './movies.api'

const { get } = vi.hoisted(() => ({ get: vi.fn() }))
vi.mock('../http/apiClient', () => ({ get }))

describe('movies API service', () => {
  beforeEach(() => get.mockReset())

  it('forwards movie filters and winner year to the HTTP client', () => {
    const signal = new AbortController().signal
    fetchMovies({ page: 0, size: 15, year: 1980, winner: true }, signal)
    fetchWinnersByYear(1990, signal)

    expect(get).toHaveBeenNthCalledWith(1, '/api/movies', { page: 0, size: 15, year: 1980, winner: true }, signal)
    expect(get).toHaveBeenNthCalledWith(2, '/api/movies/winnersByYear', { year: 1990 }, signal)
  })

  it('combines the three dashboard responses', async () => {
    get
      .mockResolvedValueOnce({ years: [{ year: 1986, winnerCount: 2 }] })
      .mockResolvedValueOnce({ studios: [{ name: 'A', winCount: 3 }] })
      .mockResolvedValueOnce({ min: [], max: [] })

    await expect(fetchDashboard()).resolves.toEqual({
      years: [{ year: 1986, winnerCount: 2 }],
      studios: [{ name: 'A', winCount: 3 }],
      min: [],
      max: [],
    })
    expect(get).toHaveBeenCalledTimes(3)
  })
})
