import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('renders navigation links and identifies the active route', () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <Sidebar />
      </MemoryRouter>,
    )

    expect(screen.getByRole('link', { name: 'List' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard')
  })
})
