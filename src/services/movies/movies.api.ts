import { get } from '../http/apiClient'
import type { DashboardData, Movie, MoviePage } from './movies.types'

export function fetchMovies(
  filters: { page: number; size: number; year?: number; winner?: boolean },
  signal?: AbortSignal,
) {
  return get<MoviePage>('/api/movies', filters, signal)
}

export function fetchWinnersByYear(year: number, signal?: AbortSignal) {
  return get<Movie[]>('/api/movies/winnersByYear', { year }, signal)
}

export async function fetchDashboard(signal?: AbortSignal): Promise<DashboardData> {
  const [yearsResponse, studiosResponse, intervalsResponse] = await Promise.all([
    get<{ years: DashboardData['years'] }>('/api/movies/yearsWithMultipleWinners', {}, signal),
    get<{ studios: DashboardData['studios'] }>('/api/movies/studiosWithWinCount', {}, signal),
    get<Pick<DashboardData, 'min' | 'max'>>('/api/movies/maxMinWinIntervalForProducers', {}, signal),
  ])
  return {
    years: yearsResponse.years,
    studios: studiosResponse.studios,
    min: intervalsResponse.min,
    max: intervalsResponse.max,
  }
}
