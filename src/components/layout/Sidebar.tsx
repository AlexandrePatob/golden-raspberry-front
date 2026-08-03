import { NavLink } from 'react-router-dom'

const items = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/movies', label: 'List' },
]

export function Sidebar() {
  return (
    <nav aria-label="Navegação principal" className="w-52 shrink-0 bg-slate-100 p-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `block w-full rounded px-2 py-1 text-left text-sm ${isActive ? 'bg-white font-medium text-blue-700' : 'text-slate-600 hover:bg-slate-200'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
