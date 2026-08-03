import { vi } from 'vitest'
import { ApiError, get } from './apiClient'

describe('apiClient', () => {
  it('builds query params and returns JSON', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify({ id: 1 }), { status: 200 }))

    await expect(get('/api/movies', { page: 0, winner: true })).resolves.toEqual({ id: 1 })
    expect(String(fetchMock.mock.calls[0][0])).toContain('/api/movies?page=0&winner=true')
    expect(fetchMock).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ headers: { Accept: 'application/json' } }),
    )
    fetchMock.mockRestore()
  })

  it('throws ApiError for an unsuccessful response', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(new Response(null, { status: 500 }))

    await expect(get('/api/movies')).rejects.toBeInstanceOf(ApiError)
    fetchMock.mockRestore()
  })
})
