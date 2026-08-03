import type { PropsWithChildren } from 'react'

export function Panel({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <section className="rounded border border-slate-200 bg-white p-3 shadow-sm">
      <h2 className="mb-2 text-base font-bold">{title}</h2>
      {children}
    </section>
  )
}
