import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { WinnersByYearPanel } from './WinnersByYearPanel'

const { fetchWinnersByYear } = vi.hoisted(() => ({
  fetchWinnersByYear: vi
    .fn()
    .mockResolvedValue([{ id: 1, year: 1990, title: 'Movie 43', studios: [], producers: [], winner: true }]),
}))
vi.mock('../../../services/movies/movies.api', () => ({ fetchWinnersByYear }))

describe('WinnersByYearPanel', () => {
  it('fetches winners for the entered year', async () => {
    render(<WinnersByYearPanel />)
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Search by year' }), { target: { value: '1990' } })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(await screen.findByText('Movie 43')).toBeInTheDocument()
    expect(fetchWinnersByYear).toHaveBeenCalledWith(1990)
  })

  it('shows an error when the request fails', async () => {
    fetchWinnersByYear.mockRejectedValueOnce(new Error('Network error'))
    render(<WinnersByYearPanel />)
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Search by year' }), { target: { value: '1990' } })
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(await screen.findByRole('alert')).toBeInTheDocument()
  })
})
