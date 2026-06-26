import { Ads } from '@/lib/ads'

export function EditableSidebarFloatingAd() {
  return (
    <section className="overflow-hidden rounded-[1.7rem] border border-[var(--tk-line)] bg-white shadow-[0_18px_44px_rgba(38,18,57,0.08)]">
      <div className="border-b border-[var(--tk-line)] px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">Sponsored placement</p>
        <h3 className="mt-1 text-lg font-semibold text-[var(--tk-text)]">Partner spotlight</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--tk-muted)]">A compact ad unit designed to sit naturally inside browsing pages.</p>
      </div>
      <div className="p-4">
        <div className="rounded-[1.1rem] bg-[var(--tk-raised)] p-3">
          <Ads slot="sidebar" showLabel eager className="mx-auto w-full overflow-hidden rounded-[1rem]" />
        </div>
      </div>
    </section>
  )
}
