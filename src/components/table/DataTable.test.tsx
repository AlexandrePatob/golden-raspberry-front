import { render, screen } from '@testing-library/react'
import { DataTable, type Column } from './DataTable'

type Row = { id: number; name: string }
const columns: Column<Row>[] = [{ header: 'Name', render: (row) => row.name }]

describe('DataTable', () => {
  it('renders rows and the empty state', () => {
    const { rerender } = render(
      <DataTable columns={columns} rows={[{ id: 1, name: 'Movie 43' }]} getRowKey={(row) => row.id} />,
    )
    expect(screen.getByText('Movie 43')).toBeInTheDocument()

    rerender(<DataTable columns={columns} rows={[]} getRowKey={(row) => row.id} emptyMessage="Sem filmes" />)
    expect(screen.getByText('Sem filmes')).toBeInTheDocument()
  })
})
