import { fireEvent, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('shows five pages and navigates through controls', () => {
    const onChange = vi.fn()
    render(<Pagination page={1} totalPages={20} onChange={onChange} />)

    expect(screen.getAllByRole('button', { name: /^[1-5]$/ })).toHaveLength(5)
    expect(screen.queryByRole('button', { name: '6' })).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Primeira página' })).toBeDisabled()

    fireEvent.click(screen.getByRole('button', { name: 'Próxima página' }))
    expect(onChange).toHaveBeenCalledWith(2)
    fireEvent.click(screen.getByRole('button', { name: 'Última página' }))
    expect(onChange).toHaveBeenCalledWith(20)
  })
})
