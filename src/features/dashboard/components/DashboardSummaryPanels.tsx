import { Panel } from '../../../components/common/Panel'
import { DataTable, type Column } from '../../../components/table/DataTable'
import type { DashboardData, ProducerInterval, Studio, YearWinner } from '../../../services/movies/movies.types'

const yearColumns: Column<YearWinner>[] = [
  { header: 'Year', render: (item) => item.year },
  { header: 'Win Count', render: (item) => item.winnerCount },
]
const studioColumns: Column<Studio>[] = [
  { header: 'Name', render: (item) => item.name },
  { header: 'Win Count', render: (item) => item.winCount },
]
const intervalColumns: Column<ProducerInterval>[] = [
  { header: 'Producer', render: (item) => item.producer },
  { header: 'Interval', render: (item) => item.interval },
  { header: 'Previous Year', render: (item) => item.previousWin },
  { header: 'Following Year', render: (item) => item.followingWin },
]

export function DashboardSummaryPanels({ data }: { data: DashboardData }) {
  return (
    <>
      <Panel title="List years with multiple winners">
        <DataTable columns={yearColumns} rows={data.years} getRowKey={(item) => item.year} />
      </Panel>
      <Panel title="Top 3 studios with winners">
        <DataTable columns={studioColumns} rows={data.studios.slice(0, 3)} getRowKey={(item) => item.name} />
      </Panel>
      <Panel title="Producers with longest and shortest interval between wins">
        <h3 className="mb-1 text-lg">Maximum</h3>
        <DataTable
          columns={intervalColumns}
          rows={data.max}
          getRowKey={(item) => `${item.producer}-${item.previousWin}`}
        />
        <h3 className="mb-1 mt-3 text-lg">Minimum</h3>
        <DataTable
          columns={intervalColumns}
          rows={data.min}
          getRowKey={(item) => `${item.producer}-${item.previousWin}`}
        />
      </Panel>
    </>
  )
}
