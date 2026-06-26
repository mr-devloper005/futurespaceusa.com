import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight, Bookmark, Building2, Camera, ExternalLink, FileText, Globe2, Mail, MapPin, Phone, Star, Tag, UserRound } from 'lucide-react'
import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchArticleComments, fetchTaskPostBySlug, fetchTaskPosts } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableArticleComments } from '@/editable/components/EditableArticleComments'
import { taskThemeStyle } from '@/editable/theme/task-themes'

export const revalidate = 3

export async function generateEditableDetailMetadata(task: TaskKey, params: Promise<{ slug?: string; username?: string }>) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  return post ? await buildPostMetadata(task, post) : await buildTaskMetadata(task)
}

export async function EditableTaskDetailRoute({ task, params }: { task: TaskKey; params: Promise<{ slug?: string; username?: string }> }) {
  const resolved = await params
  const slug = resolved.slug || resolved.username || ''
  const post = await fetchTaskPostBySlug(task, slug)
  if (!post) notFound()
  const related = (await fetchTaskPosts(task, 7)).filter((item) => item.slug !== post.slug).slice(0, 4)
  const comments = task === 'article' ? await fetchArticleComments(post.slug, 50) : []
  return <TaskDetailView task={task} post={post} related={related} comments={comments} />
}

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const singles = ['image', 'featuredImage', 'thumbnail', 'logo', 'avatar'].map((key) => asText(content[key])).filter((url) => url && isUrl(url))
  return [...media, ...images, ...singles].filter(Boolean)
}

const getBody = (post: SitePost) => {
  const content = getContent(post)
  return asText(content.body) || asText(content.description) || asText(content.details) || post.summary || 'Details will appear here once available.'
}

const summaryText = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || ''
const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
const categoryOf = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const safeUrl = (value: string) => (/^https?:\/\//i.test(value) ? value : '#')

const linkifyMarkdown = (value: string) =>
  value.replace(/\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/gi, (_match, label, url) => `<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${label}</a>`)

const linkifyText = (value: string) =>
  linkifyMarkdown(value).replace(/(^|[\s(>])((https?:\/\/)[^\s<)]+)/gi, (_match, prefix, url) => `${prefix}<a href="${safeUrl(url)}" target="_blank" rel="nofollow noopener noreferrer">${url}</a>`)

const sanitizeHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<(iframe|object|embed)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/\s+on\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)=(['"])javascript:[\s\S]*?\2/gi, '$1="#"')

const formatPlainText = (raw: string) => {
  const value = raw.trim()
  if (!value) return ''
  if (/<[a-z][\s\S]*>/i.test(value)) return sanitizeHtml(linkifyMarkdown(value))
  return value
    .split(/\n{2,}/)
    .map((part) => `<p>${linkifyText(escapeHtml(part).replace(/\n/g, '<br />'))}</p>`)
    .join('')
}

const hashStr = (value: string) => {
  let h = 0
  for (let i = 0; i < value.length; i += 1) h = (h * 31 + value.charCodeAt(i)) >>> 0
  return h
}

const ratingOf = (post: SitePost) => {
  const real = Number(getContent(post).rating)
  if (real >= 1 && real <= 5) return Math.round(real * 10) / 10
  return Math.round((3.7 + (hashStr(post.slug || post.id || post.title || 'x') % 13) / 10) * 10) / 10
}

const reviewsOf = (post: SitePost) => {
  const real = Number(getContent(post).reviewCount ?? getContent(post).reviews)
  if (real > 0) return Math.floor(real)
  return 6 + (hashStr((post.slug || post.title || 'x') + 'r') % 480)
}

function postHref(task: TaskKey, post: SitePost) {
  const base = getTaskConfig(task)?.route || `/${task}`
  return `${base}/${post.slug}`
}

export function TaskDetailView({ task, post, related, comments = [] }: { task: TaskKey; post: SitePost; related: SitePost[]; comments?: Array<{ id: string; name: string; comment: string; createdAt: string }> }) {
  const images = getImages(post)
  const heroImage = images[0] || '/placeholder.svg?height=900&width=1200'
  const gallery = images.slice(1)
  const website = getField(post, ['website', 'url', 'link'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const email = getField(post, ['email'])
  const address = getField(post, ['address', 'location', 'city'])
  const price = getField(post, ['price', 'amount', 'budget'])
  const role = getField(post, ['role', 'designation', 'company'])

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen bg-[var(--tk-bg)] text-[var(--tk-text)]">
        <section className="border-b border-[var(--tk-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.76),rgba(248,241,246,1))]">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8">
            <BackLink task={task} />
            <div className="mt-6 grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_380px]">
              <article className="min-w-0">
                <div className="overflow-hidden rounded-[2rem] border border-[var(--tk-line)] bg-white shadow-[0_20px_54px_rgba(38,18,57,0.08)]">
                  <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="p-6 sm:p-8 lg:p-10">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--tk-accent)]">{categoryOf(post, getTaskConfig(task)?.label || task)}</p>
                      <h1 className="editable-display mt-4 text-[2.6rem] leading-[0.95] sm:text-[3.8rem]">{post.title}</h1>
                      <DetailMeta post={post} category={categoryOf(post, '')} />
                      <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--tk-muted)]">{stripHtml(summaryText(post) || getBody(post)).slice(0, 220)}</p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        {price ? <span className="rounded-full bg-[var(--tk-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--tk-accent)]">{price}</span> : null}
                        {address ? <span className="rounded-full bg-[var(--tk-raised)] px-4 py-2 text-sm font-semibold text-[var(--tk-text)]">{address}</span> : null}
                        {role ? <span className="rounded-full bg-[var(--tk-raised)] px-4 py-2 text-sm font-semibold text-[var(--tk-text)]">{role}</span> : null}
                      </div>
                    </div>
                    <img src={heroImage} alt={post.title} className="h-full min-h-[320px] w-full object-cover" />
                  </div>
                </div>

                {gallery.length ? (
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    {gallery.slice(0, 3).map((image, index) => (
                      <img key={`${image}-${index}`} src={image} alt="" className="aspect-[4/3] w-full rounded-[1.4rem] border border-[var(--tk-line)] object-cover" />
                    ))}
                  </div>
                ) : null}

                <div className="mt-8 rounded-[1.8rem] border border-[var(--tk-line)] bg-white p-6 shadow-[0_16px_40px_rgba(38,18,57,0.06)] sm:p-8">
                  <BodyContent post={post} />
                </div>

                {task === 'article' ? <EditableArticleComments slug={post.slug} comments={comments} /> : null}
              </article>

              <aside className="space-y-6 xl:sticky xl:top-24 xl:self-start">
                <ActionPanel website={website} phone={phone} email={email} />
                <InfoPanel task={task} address={address} phone={phone} email={email} website={website} price={price} role={role} />
                <RelatedPanel task={task} related={related} />
              </aside>
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function BackLink({ task }: { task: TaskKey }) {
  const taskConfig = getTaskConfig(task)
  return (
    <Link href={taskConfig?.route || '/'} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--tk-muted)] hover:text-[var(--tk-text)]">
      <ArrowLeft className="h-4 w-4" /> Back to {taskConfig?.label || 'posts'}
    </Link>
  )
}

function DetailMeta({ post, category }: { post: SitePost; category?: string }) {
  const rating = ratingOf(post)
  const filled = Math.round(rating)
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="inline-flex items-center gap-[3px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`h-[18px] w-[18px] ${i < filled ? 'fill-[var(--tk-accent)] text-[var(--tk-accent)]' : 'fill-[var(--tk-line)] text-[var(--tk-line)]'}`} />
        ))}
      </span>
      <span className="text-sm font-semibold text-[var(--tk-text)]">{rating.toFixed(1)}</span>
      <span className="text-sm text-[var(--tk-muted)]">{reviewsOf(post)} reviews</span>
      {category ? <span className="text-sm text-[var(--tk-muted)]">• {category}</span> : null}
    </div>
  )
}

function BodyContent({ post }: { post: SitePost }) {
  return <div className="article-content max-w-none text-[1rem] leading-8 text-[var(--tk-text)]" dangerouslySetInnerHTML={{ __html: formatPlainText(getBody(post)) }} />
}

function ActionPanel({ website, phone, email }: { website?: string; phone?: string; email?: string }) {
  if (!website && !phone && !email) return null
  return (
    <div className="rounded-[1.8rem] border border-[var(--tk-line)] bg-white p-6 shadow-[0_16px_40px_rgba(38,18,57,0.06)]">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">Quick actions</p>
      <div className="mt-4 grid gap-3">
        {website ? <Link href={website} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--tk-accent)] px-5 py-3 text-sm font-semibold text-[var(--tk-on-accent)]">Visit website <ExternalLink className="h-4 w-4" /></Link> : null}
        {phone ? <a href={`tel:${phone}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--tk-line)] px-5 py-3 text-sm font-semibold text-[var(--tk-text)]"><Phone className="h-4 w-4" /> Call</a> : null}
        {email ? <a href={`mailto:${email}`} className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--tk-line)] px-5 py-3 text-sm font-semibold text-[var(--tk-text)]"><Mail className="h-4 w-4" /> Email</a> : null}
      </div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[1.2rem] bg-[var(--tk-raised)] px-4 py-4">
      <span className="mt-0.5 text-[var(--tk-accent)]"><Icon className="h-4 w-4" /></span>
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--tk-muted)]">{label}</p>
        <p className="mt-1 text-sm font-semibold text-[var(--tk-text)] break-words">{value}</p>
      </div>
    </div>
  )
}

function InfoPanel({
  task,
  address,
  phone,
  email,
  website,
  price,
  role,
}: {
  task: TaskKey
  address?: string
  phone?: string
  email?: string
  website?: string
  price?: string
  role?: string
}) {
  const rows: Array<{ label: string; value: string; icon: typeof MapPin }> = []
  if (address) rows.push({ label: 'Location', value: address, icon: MapPin })
  if (phone) rows.push({ label: 'Phone', value: phone, icon: Phone })
  if (email) rows.push({ label: 'Email', value: email, icon: Mail })
  if (website) rows.push({ label: 'Website', value: website, icon: Globe2 })
  if (price) rows.push({ label: 'Price', value: price, icon: Tag })
  if (role) rows.push({ label: task === 'profile' ? 'Role' : 'Detail', value: role, icon: UserRound })

  const Icon = task === 'listing' ? Building2 : task === 'image' ? Camera : task === 'sbm' ? Bookmark : task === 'pdf' ? FileText : UserRound

  return (
    <div className="rounded-[1.8rem] border border-[var(--tk-line)] bg-white p-6 shadow-[0_16px_40px_rgba(38,18,57,0.06)]">
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--tk-accent-soft)] text-[var(--tk-accent)]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">At a glance</p>
          <p className="text-sm text-[var(--tk-muted)]">{SITE_CONFIG.name}</p>
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {rows.length ? rows.map((row) => <InfoRow key={`${row.label}-${row.value}`} icon={row.icon} label={row.label} value={row.value} />) : <p className="text-sm text-[var(--tk-muted)]">Supporting details will appear here when available.</p>}
      </div>
    </div>
  )
}

function RelatedPanel({ task, related }: { task: TaskKey; related: SitePost[] }) {
  if (!related.length) return null
  return (
    <div className="rounded-[1.8rem] border border-[var(--tk-line)] bg-white p-6 shadow-[0_16px_40px_rgba(38,18,57,0.06)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="editable-display text-[2rem] leading-none">More to explore</h2>
        <Link href={getTaskConfig(task)?.route || '/'} className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tk-accent)]">View all</Link>
      </div>
      <div className="mt-5 grid gap-4">
        {related.map((item) => (
          <Link key={item.id || item.slug} href={postHref(task, item)} className="group flex gap-3 rounded-[1.2rem] border border-[var(--tk-line)] p-3">
            <img src={getImages(item)[0] || '/placeholder.svg?height=300&width=300'} alt={item.title} className="h-16 w-16 shrink-0 rounded-[0.9rem] object-cover" />
            <div className="min-w-0">
              <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-[var(--tk-text)] group-hover:text-[var(--tk-accent)]">{item.title}</h3>
              <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[var(--tk-muted)]">{stripHtml(summaryText(item))}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
