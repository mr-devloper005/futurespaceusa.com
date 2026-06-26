import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f7f0f5',
  '--slot4-page-text': '#15173d',
  '--slot4-panel-bg': '#f2e4ef',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#675d79',
  '--slot4-soft-muted-text': '#8f8297',
  '--slot4-accent': '#982598',
  '--slot4-accent-fill': '#982598',
  '--slot4-accent-soft': '#f7d6ea',
  '--slot4-on-accent': '#ffffff',
  '--slot4-dark-bg': '#15173d',
  '--slot4-dark-text': '#ffffff',
  '--slot4-media-bg': '#efe6ee',
  '--slot4-cream': '#f1e9e9',
  '--slot4-warm': '#fbf5f8',
  '--slot4-lavender': '#f6edf8',
  '--slot4-gray': '#efe6ee',
  '--slot4-body-gradient':
    'radial-gradient(circle at top left, rgba(228,145,201,0.22), transparent 30%), radial-gradient(circle at top right, rgba(152,37,152,0.16), transparent 28%), linear-gradient(180deg, #fffafc 0%, #f7f0f5 45%, #f1e9e9 100%)',
  '--editable-page-bg': '#f7f0f5',
  '--editable-page-text': '#15173d',
  '--editable-container': '1480px',
  '--editable-border': '#ead7e6',
  '--editable-nav-bg': 'rgba(255,255,255,0.94)',
  '--editable-nav-text': '#15173d',
  '--editable-nav-active': '#982598',
  '--editable-nav-active-text': '#ffffff',
  '--editable-cta-bg': '#982598',
  '--editable-cta-text': '#ffffff',
  '--editable-search-bg': '#ffffff',
  '--editable-footer-bg': '#fffafb',
  '--editable-footer-text': '#15173d',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent)]',
  onAccentText: 'text-[var(--slot4-on-accent)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[var(--editable-border)]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_14px_40px_rgba(38,18,57,0.08)]',
  shadowStrong: 'shadow-[0_28px_70px_rgba(38,18,57,0.16)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(21,23,61,0.02),rgba(21,23,61,0.78))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8',
    sectionY: 'py-12 sm:py-14 lg:py-16',
  },
  layout: {
    safeGrid: 'grid gap-6 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 xl:grid-cols-[1.08fr_0.92fr]',
    rail: 'flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[240px] shrink-0 snap-start sm:w-[270px]',
  },
  type: {
    eyebrow: 'text-[11px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]',
    heroTitle: 'text-4xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-5xl lg:text-[3.6rem]',
    sectionTitle: 'text-3xl font-semibold tracking-[-0.03em] sm:text-4xl',
    body: 'text-base leading-relaxed',
  },
  surface: {
    card: `rounded-[1.5rem] border ${editablePalette.border} ${editablePalette.surfaceBg} ${editablePalette.shadow}`,
    soft: `rounded-[1.5rem] border ${editablePalette.border} ${editablePalette.panelBg}`,
    dark: `rounded-[1.75rem] ${editablePalette.darkBg} ${editablePalette.darkText} ${editablePalette.shadowStrong}`,
  },
  button: {
    primary:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:brightness-95',
    secondary:
      'inline-flex items-center justify-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]',
    accent:
      'inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent-fill)] px-6 py-3 text-sm font-semibold text-[var(--slot4-on-accent)] transition duration-300 hover:-translate-y-0.5 hover:brightness-95',
  },
  media: {
    frame: `relative overflow-hidden rounded-[1.2rem] ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_rgba(38,18,57,0.16)]',
    fade: 'transition duration-300 hover:opacity-85',
  },
} as const

export const aiLayoutRules = [
  'Keep all UI changes inside src/editable and leave task fetching, routing, and backend logic untouched.',
  'Use a marketplace-style structure with a search-first hero, quick category lanes, mixed card sizes, and strong merchandising blocks.',
  'Preserve safe fallbacks for missing images, summaries, categories, websites, locations, and contact fields.',
  'Use postHref() and existing task routes for all post links.',
  'Prefer purposeful visual variety across cards instead of repeating one component shape everywhere.',
] as const
