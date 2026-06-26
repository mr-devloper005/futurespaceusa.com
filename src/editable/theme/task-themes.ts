import type { CSSProperties } from 'react'
import type { TaskKey } from '@/lib/site-config'

export type TaskTheme = {
  kicker: string
  note: string
  dark: boolean
  fontDisplay: string
  fontBody: string
  bg: string
  surface: string
  raised: string
  text: string
  muted: string
  line: string
  accent: string
  accentSoft: string
  onAccent: string
  glow: string
  radius: string
}

const DISPLAY = "'Instrument Serif', Georgia, serif"
const BODY = "'Manrope', system-ui, sans-serif"

const base = {
  dark: false,
  fontDisplay: DISPLAY,
  fontBody: BODY,
  bg: '#f8f1f6',
  surface: '#ffffff',
  raised: '#f4e8f1',
  text: '#15173d',
  muted: '#665a76',
  line: '#ead7e6',
  accent: '#982598',
  accentSoft: '#f7d6ea',
  onAccent: '#ffffff',
  glow: 'rgba(152,37,152,0.14)',
  radius: '1.5rem',
} satisfies Omit<TaskTheme, 'kicker' | 'note'>

export const taskThemes: Record<TaskKey, TaskTheme> = {
  article: { ...base, kicker: 'Editorial', note: 'Stories and explainers arranged like a shoppable reading floor.' },
  listing: { ...base, kicker: 'Directory', note: 'Business listings presented with quick-scan details and strong comparison cues.' },
  classified: { ...base, kicker: 'Offers', note: 'Listings with price-first emphasis and fast action rails.' },
  image: { ...base, kicker: 'Gallery', note: 'Image-led posts with a brighter discovery wall and soft merchandising cues.' },
  sbm: { ...base, kicker: 'Resources', note: 'Hand-picked links and bookmarks in compact resource cards.' },
  pdf: { ...base, kicker: 'Documents', note: 'Downloadable references framed like catalog sheets.' },
  profile: { ...base, kicker: 'People', note: 'Profiles surfaced with identity-first presentation and supporting details.' },
}

export function getTaskTheme(task: TaskKey): TaskTheme {
  return taskThemes[task] || taskThemes.article
}

export function taskThemeStyle(task: TaskKey): CSSProperties {
  const t = getTaskTheme(task)
  return {
    '--tk-bg': t.bg,
    '--tk-surface': t.surface,
    '--tk-raised': t.raised,
    '--tk-text': t.text,
    '--tk-muted': t.muted,
    '--tk-line': t.line,
    '--tk-accent': t.accent,
    '--tk-accent-soft': t.accentSoft,
    '--tk-on-accent': t.onAccent,
    '--tk-glow': t.glow,
    '--tk-radius': t.radius,
    '--slot4-accent': t.accent,
    '--slot4-accent-fill': t.accent,
    '--editable-font-display': t.fontDisplay,
    '--editable-font-body': t.fontBody,
    fontFamily: t.fontBody,
  } as CSSProperties
}
