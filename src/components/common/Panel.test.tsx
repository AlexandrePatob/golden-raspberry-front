import { render, screen } from '@testing-library/react'
import { Panel } from './Panel'

describe('Panel', () => {
  it('renders a title and child content', () => {
    render(
      <Panel title="Movies">
        <p>Content</p>
      </Panel>,
    )

    expect(screen.getByRole('heading', { name: 'Movies' })).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })
})
