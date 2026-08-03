import { render, screen } from '@testing-library/react'
import { DashboardSummaryPanels } from './DashboardSummaryPanels'

describe('DashboardSummaryPanels', () => {
  it('limits studios to the first three results', () => {
    render(
      <DashboardSummaryPanels
        data={{
          years: [],
          studios: [
            { name: 'A', winCount: 4 },
            { name: 'B', winCount: 3 },
            { name: 'C', winCount: 2 },
            { name: 'D', winCount: 1 },
          ],
          min: [],
          max: [],
        }}
      />,
    )

    expect(screen.getByText('A')).toBeInTheDocument()
    expect(screen.queryByText('D')).not.toBeInTheDocument()
  })
})
