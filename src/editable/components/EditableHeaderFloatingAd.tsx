import { Ads } from '@/lib/ads'

export function EditableHeaderFloatingAd() {
  return (
    <section className="overflow-hidden rounded-[1.8rem] border border-[var(--tk-line)] bg-white shadow-[0_18px_44px_rgba(38,18,57,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--tk-line)] bg-[linear-gradient(90deg,rgba(247,214,234,0.48),rgba(255,255,255,0.96))] px-5 py-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">Sponsored placement</p>
          <h3 className="mt-1 text-lg font-semibold text-[var(--tk-text)]">Featured promotion</h3>
        </div>
        <span className="rounded-full bg-[var(--tk-accent-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--tk-accent)]">
          Partner ad
        </span>
      </div>
      <div className="p-4 sm:p-5">
        <Ads slot="header" showLabel eager className="mx-auto w-full overflow-hidden rounded-[1.1rem]" />
      </div>
    </section>
  )
}
