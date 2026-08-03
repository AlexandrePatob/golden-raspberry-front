import type { ReactNode } from 'react'

export type Column<T> = {
  header: string
  render: (row: T) => ReactNode
  className?: string
}

type DataTableProps<T> = {
  columns: Column<T>[]
  rows: T[]
  getRowKey: (row: T) => string | number
  emptyMessage?: string
}

export function DataTable<T>({
  columns,
  rows,
  getRowKey,
  emptyMessage = 'Nenhum resultado encontrado.',
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-fixed border-collapse text-left text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            {columns.map((column) => (
              <th
                key={column.header}
                className={`border border-slate-300 px-2 py-2 font-semibold ${column.className ?? ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="even:bg-slate-50">
              {columns.map((column) => (
                <td key={column.header} className={`border border-slate-300 px-2 py-1.5 ${column.className ?? ''}`}>
                  {column.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length === 0 && (
        <p className="border border-t-0 border-slate-300 px-3 py-5 text-center text-slate-500">{emptyMessage}</p>
      )}
    </div>
  )
}
