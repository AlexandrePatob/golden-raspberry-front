import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MoviesTable } from './MoviesTable'

describe('MoviesTable', () => {
  it('renders a movie and notifies filter changes', () => {
    const onFiltersChange = vi.fn()
    render(
      <MoviesTable
        movies={[{ id: 1, year: 1980, title: 'Xanadu', studios: [], producers: [], winner: false }]}
        filters={{ year: '', winner: 'all' }}
        onFiltersChange={onFiltersChange}
      />,
    )

    expect(screen.getByText('Xanadu')).toBeInTheDocument()
    fireEvent.change(screen.getByRole('combobox', { name: 'Filter by winner' }), { target: { value: 'true' } })
    expect(onFiltersChange).toHaveBeenCalledWith({ year: '', winner: 'true' })
  })
})
