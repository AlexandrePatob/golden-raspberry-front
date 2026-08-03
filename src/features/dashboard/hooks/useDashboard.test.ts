import { renderHook, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { useDashboard } from './useDashboard'

const { fetchDashboard } = vi.hoisted(() => ({
  fetchDashboard: vi.fn().mockResolvedValue({ years: [], studios: [], min: [], max: [] }),
}))
vi.mock('../../../services/movies/movies.api', () => ({ fetchDashboard }))

describe('useDashboard', () => {
  it('loads dashboard data', async () => {
    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toEqual({ years: [], studios: [], min: [], max: [] })
  })

  it('exposes an error when loading fails', async () => {
    fetchDashboard.mockRejectedValueOnce(new Error('Network error'))
    const { result } = renderHook(() => useDashboard())
    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.error).toBeTruthy()
  })
})
