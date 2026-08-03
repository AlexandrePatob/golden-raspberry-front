import { useEffect, useState } from 'react'
import { fetchDashboard } from '../../../services/movies/movies.api'
import type { DashboardData } from '../../../services/movies/movies.types'

type State = { data?: DashboardData; error?: string; loading: boolean }

export function useDashboard() {
  const [state, setState] = useState<State>({ loading: true })
  useEffect(() => {
    const controller = new AbortController()
    fetchDashboard(controller.signal)
      .then((data) => setState({ data, loading: false }))
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return
        setState({ error: 'Não foi possível carregar o dashboard.', loading: false })
      })
    return () => controller.abort()
  }, [])
  return state
}
