type PaginationProps = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const maxVisiblePages = 5

function getVisiblePages(page: number, totalPages: number) {
  const start = Math.min(
    Math.max(1, page - Math.floor(maxVisiblePages / 2)),
    Math.max(1, totalPages - maxVisiblePages + 1),
  )
  return Array.from({ length: Math.min(maxVisiblePages, totalPages) }, (_, index) => start + index)
}

export function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null
  const visiblePages = getVisiblePages(page, totalPages)
  const controlClass = 'min-w-7 px-2 py-1 text-sm hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40'

  return (
    <nav
      aria-label="Paginação"
      className="flex flex-wrap justify-center gap-1 border border-t-0 border-slate-300 bg-slate-50 p-2"
    >
      <button
        type="button"
        aria-label="Primeira página"
        onClick={() => onChange(1)}
        disabled={page === 1}
        className={controlClass}
      >
        «
      </button>
      <button
        type="button"
        aria-label="Página anterior"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        className={controlClass}
      >
        ‹
      </button>
      {visiblePages.map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => onChange(item)}
          aria-current={item === page ? 'page' : undefined}
          className={`min-w-7 px-2 py-1 text-sm ${item === page ? 'bg-blue-600 text-white' : 'hover:bg-slate-200'}`}
          style={item === page ? undefined : { color: '#334155' }}
        >
          {item}
        </button>
      ))}
      <button
        type="button"
        aria-label="Próxima página"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        className={controlClass}
      >
        ›
      </button>
      <button
        type="button"
        aria-label="Última página"
        onClick={() => onChange(totalPages)}
        disabled={page === totalPages}
        className={controlClass}
      >
        »
      </button>
    </nav>
  )
}
