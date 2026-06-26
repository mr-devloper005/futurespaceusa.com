'use client'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-[var(--editable-border)] bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[var(--slot4-accent-soft)]">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
              </span>
              <span className="editable-display text-[2rem] leading-none text-[var(--slot4-accent)]">{SITE_CONFIG.name}</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--editable-border)] pt-8">
          <p className="text-sm text-[var(--slot4-muted-text)]">{globalContent.footer.bottomNote}</p>
        </div>
      </div>
      <div className="border-t border-[var(--editable-border)] px-4 py-4 text-center text-xs text-[var(--slot4-muted-text)]">
        © {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
