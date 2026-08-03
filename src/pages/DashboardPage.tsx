import { DashboardSummaryPanels } from '../features/dashboard/components/DashboardSummaryPanels'
import { WinnersByYearPanel } from '../features/dashboard/components/WinnersByYearPanel'
import { useDashboard } from '../features/dashboard/hooks/useDashboard'

export function DashboardPage() {
  const { data, error, loading } = useDashboard()

  if (loading) return <p role="status">Carregando dashboard...</p>
  if (error || !data) return <p role="alert">{error ?? 'Não foi possível carregar o dashboard.'}</p>

  return (
    <div className="grid w-full gap-3 lg:grid-cols-2">
      <DashboardSummaryPanels data={data} />
      <WinnersByYearPanel />
    </div>
  )
}
