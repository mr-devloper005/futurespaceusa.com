'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Globe, LogIn, Menu, Search, Sparkles, User, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({ label: task.label, href: task.route })),
    []
  )

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.94)_0%,rgba(255,255,255,0.82)_58%,rgba(255,255,255,0.18)_100%)] editable-market-glass">
      <div className="border-b border-[var(--editable-border)] bg-[linear-gradient(90deg,rgba(21,23,61,0.98),rgba(152,37,152,0.94))] text-white">
        <div className="mx-auto flex max-w-[var(--editable-container)] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
          <p className="inline-flex min-w-0 items-center gap-2 truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            {globalContent.nav.tagline}
          </p>
          <div className="hidden items-center gap-5 text-xs font-semibold text-white/78 md:flex">
            {globalContent.nav.utilityLinks.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <nav className="mx-auto max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 py-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-center">
          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] bg-[linear-gradient(135deg,var(--slot4-accent-soft),#ffffff)] text-sm font-extrabold text-[var(--slot4-accent)] shadow-[0_8px_22px_rgba(152,37,152,0.14)]">
                FS
              </span>
              <span className="min-w-0">
                <span className="editable-display block truncate text-[2rem] leading-none text-[var(--slot4-page-text)]">{SITE_CONFIG.name}</span>
                <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">
                  Business discovery
                </span>
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--editable-border)] bg-white lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          <form action="/search" className="hidden min-w-0 lg:block">
            <div className="flex items-center gap-3 rounded-[1.6rem] border border-[var(--editable-border)] bg-white p-2 shadow-[0_12px_32px_rgba(38,18,57,0.08)]">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[1.1rem] bg-[var(--slot4-warm)] px-4 py-3">
                <Search className="h-4 w-4 shrink-0 text-[var(--slot4-accent)]" />
                <input
                  name="q"
                  type="search"
                  placeholder="Search listings, images, resources"
                  className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
                />
              </div>
              <button className="inline-flex h-12 items-center rounded-[1rem] bg-[linear-gradient(90deg,#e491c9_0%,#982598_100%)] px-6 text-sm font-semibold text-white shadow-[0_10px_18px_rgba(152,37,152,0.16)]">
                Search
              </button>
            </div>
          </form>

          <div className="hidden items-center justify-end gap-3 lg:flex">
            <div className="rounded-[1rem] border border-[var(--editable-border)] bg-white px-4 py-3 text-right shadow-[0_10px_24px_rgba(38,18,57,0.05)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">Region</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
                <Globe className="h-4 w-4 text-[var(--slot4-accent)]" />
                English-INR
              </p>
            </div>
            {session ? (
              <button
                type="button"
                onClick={logout}
                className="rounded-[1rem] border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)] shadow-[0_10px_24px_rgba(38,18,57,0.05)]"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-[1rem] border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-semibold text-[var(--slot4-page-text)] shadow-[0_10px_24px_rgba(38,18,57,0.05)]"
                >
                  <User className="h-4 w-4" /> Sign in
                </Link>
                <Link href="/signup" className="rounded-[1rem] bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(21,23,61,0.18)]">
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="hidden items-center justify-between gap-6 border-t border-[var(--editable-border)] py-4 lg:flex">
          <div />
          <div className="flex items-center gap-3 text-sm text-[var(--slot4-muted-text)]">
            <span>Curated discovery</span>
            <span className="h-1 w-1 rounded-full bg-[var(--slot4-soft-muted-text)]" />
            <span>Fresh updates</span>
          </div>
        </div>

      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-5 lg:hidden">
          <form action="/search" className="flex items-center gap-3">
            <div className="flex h-12 flex-1 items-center rounded-[1rem] border border-[var(--editable-border)] bg-[var(--slot4-warm)] px-4">
              <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
              <input
                name="q"
                type="search"
                placeholder="Search listings, images, resources"
                className="min-w-0 flex-1 bg-transparent pl-3 text-sm outline-none"
              />
            </div>
            <button className="rounded-[1rem] bg-[var(--slot4-accent)] px-5 py-3 text-sm font-semibold text-white">Go</button>
          </form>
          <div className="mt-5 grid gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems].map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-[1rem] px-4 py-3 text-sm font-semibold ${
                    active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'bg-[var(--slot4-warm)] text-[var(--slot4-page-text)]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className="rounded-[1rem] bg-[var(--slot4-dark-bg)] px-4 py-3 text-left text-sm font-semibold text-white">
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-[1rem] bg-[var(--slot4-warm)] px-4 py-3 text-sm font-semibold text-[var(--slot4-page-text)]">
                  <span className="inline-flex items-center gap-2"><LogIn className="h-4 w-4" /> Login</span>
                </Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-[1rem] bg-[var(--slot4-accent)] px-4 py-3 text-sm font-semibold text-white">
                  <span className="inline-flex items-center gap-2"><UserPlus className="h-4 w-4" /> Create account</span>
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
