import Link from 'next/link'
import { ArrowUpRight, ChevronDown, FileText, Globe, MapPin, Phone, Search, Star, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableHeaderFloatingAd } from '@/editable/components/EditableHeaderFloatingAd'
import { EditableSidebarFloatingAd } from '@/editable/components/EditableSidebarFloatingAd'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getTaskTheme, taskThemeStyle } from '@/editable/theme/task-themes'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => (post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {})
const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)
const placeholder = '/placeholder.svg?height=900&width=1200'

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail) || asText(content.logo)
  return [...media, ...images, ...(image && isUrl(image) ? [image] : [])].filter(Boolean)
}

const getImage = (post: SitePost) => getImages(post)[0] || placeholder
const getSummary = (post: SitePost) => {
  const content = getContent(post)
  const raw = post.summary || asText(content.description) || asText(content.excerpt) || asText(content.body)
  return raw.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}
const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
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

function RatingLine({ post }: { post: SitePost }) {
  const rating = ratingOf(post)
  const filled = Math.round(rating)
  return (
    <div className="mt-2 flex items-center gap-2">
      <span className="inline-flex items-center gap-[3px]">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} className={`h-4 w-4 ${i < filled ? 'fill-[var(--tk-accent)] text-[var(--tk-accent)]' : 'fill-[var(--tk-line)] text-[var(--tk-line)]'}`} />
        ))}
      </span>
      <span className="text-sm font-semibold text-[var(--tk-text)]">{rating.toFixed(1)}</span>
    </div>
  )
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const theme = getTaskTheme(task)
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const categoryLabel = category === 'all' ? 'All categories' : CATEGORY_OPTIONS.find((item) => item.slug === category)?.name || category
  const heroPosts = posts.slice(0, 6)

  return (
    <EditableSiteShell>
      <main style={taskThemeStyle(task)} className="min-h-screen bg-[var(--tk-bg)] text-[var(--tk-text)]">
        <section className="border-b border-[var(--tk-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(248,241,246,1))]">
          <div className="mx-auto max-w-[var(--editable-container)] px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 xl:grid-cols-[1.15fr_0.85fr]">
              <div>
                <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[var(--tk-accent)]">
                  <span>{theme.kicker}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--tk-accent)] opacity-50" />
                  <span className="text-[var(--tk-muted)]">{label}</span>
                </div>
                <h1 className="editable-display mt-4 text-[2.8rem] leading-[0.95] sm:text-[4rem]">{voice?.headline || `Browse ${label}`}</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--tk-muted)]">{voice?.description || theme.note}</p>
                <form action={basePath} className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <div className="relative">
                    <select
                      name="category"
                      defaultValue={category}
                      className="h-12 appearance-none rounded-full border border-[var(--tk-line)] bg-white pl-5 pr-11 text-sm font-semibold text-[var(--tk-text)] outline-none"
                      aria-label={voice?.filterLabel || 'Filter category'}
                    >
                      <option value="all">All categories</option>
                      {CATEGORY_OPTIONS.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--tk-muted)]" />
                  </div>
                  <button className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--tk-accent)] px-6 text-sm font-semibold text-[var(--tk-on-accent)]">Apply</button>
                </form>
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-[var(--tk-muted)]">
                  <span>{posts.length} results on this page</span>
                  <span>•</span>
                  <span>{categoryLabel}</span>
                </div>
              </div>
              <div className="rounded-[1.8rem] border border-[var(--tk-line)] bg-white p-5 shadow-[0_18px_48px_rgba(38,18,57,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tk-accent)]">Quick categories</p>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {CATEGORY_OPTIONS.slice(0, 6).map((item) => (
                    <Link key={item.slug} href={pageHref(basePath, item.slug, 1)} className="rounded-[1.2rem] bg-[var(--tk-raised)] px-4 py-4 text-sm font-semibold text-[var(--tk-text)] hover:text-[var(--tk-accent)]">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="min-w-0">
              {heroPosts.length ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {heroPosts.map((post, index) => <ArchiveHeroCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
                </div>
              ) : null}

              <div className="mt-8">
                <EditableHeaderFloatingAd />
              </div>

              <div className="mt-8">
                {posts.length ? (
                  <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {posts.map((post, index) => <ArchiveProductCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
                  </div>
                ) : (
                  <div className="rounded-[1.8rem] border border-dashed border-[var(--tk-line)] bg-white px-8 py-16 text-center">
                    <Search className="mx-auto h-8 w-8 text-[var(--tk-muted)]" />
                    <h2 className="editable-display mt-5 text-3xl">Nothing here yet</h2>
                    <p className="mt-3 text-sm text-[var(--tk-muted)]">Try another category, or check back after new posts are published.</p>
                  </div>
                )}
              </div>

              {posts.length ? (
                <nav className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
                  {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="rounded-full border border-[var(--tk-line)] bg-white px-5 py-2.5 font-semibold text-[var(--tk-text)]">Previous</Link> : null}
                  <span className="rounded-full bg-[var(--tk-raised)] px-5 py-2.5 font-semibold text-[var(--tk-muted)]">Page {page} of {pagination.totalPages || 1}</span>
                  {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="rounded-full border border-[var(--tk-line)] bg-white px-5 py-2.5 font-semibold text-[var(--tk-text)]">Next</Link> : null}
                </nav>
              ) : null}
            </div>

            <aside className="xl:sticky xl:top-24 xl:self-start">
              <EditableSidebarFloatingAd />
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function postDetailHref(task: TaskKey, basePath: string, post: SitePost) {
  return post.slug ? `${basePath}/${post.slug}` : buildPostUrl(task, post.slug)
}

function ArchiveHeroCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = postDetailHref(task, basePath, post)
  if (index === 0) {
    return (
      <Link href={href} className="group md:col-span-2 xl:col-span-2 overflow-hidden rounded-[1.8rem] border border-[var(--tk-line)] bg-[var(--tk-text)] text-white shadow-[0_24px_58px_rgba(38,18,57,0.12)]">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">Featured lane</p>
            <h2 className="editable-display mt-4 text-[2.4rem] leading-[0.96]">{post.title}</h2>
            <p className="mt-4 line-clamp-3 text-sm leading-7 text-white/72">{getSummary(post)}</p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--tk-text)]">Open details <ArrowUpRight className="h-4 w-4" /></span>
          </div>
          <img src={getImage(post)} alt={post.title} className="h-full w-full object-cover" />
        </div>
      </Link>
    )
  }
  return (
    <Link href={href} className="overflow-hidden rounded-[1.6rem] border border-[var(--tk-line)] bg-white p-4 shadow-[0_12px_28px_rgba(38,18,57,0.06)]">
      <img src={getImage(post)} alt={post.title} className="aspect-[4/3] w-full rounded-[1.2rem] object-cover" />
      <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-tight text-[var(--tk-text)]">{post.title}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-[var(--tk-muted)]">{getSummary(post)}</p>
    </Link>
  )
}

function ArchiveProductCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = postDetailHref(task, basePath, post)
  const image = getImage(post)
  const summary = getSummary(post)
  const location = getField(post, ['location', 'address', 'city'])
  const phone = getField(post, ['phone', 'telephone', 'mobile'])
  const website = getField(post, ['website', 'url', 'link'])
  const price = getField(post, ['price', 'amount', 'budget'])

  if (task === 'image') {
    return (
      <Link href={href} className="group overflow-hidden rounded-[1.6rem] border border-[var(--tk-line)] bg-white shadow-[0_12px_28px_rgba(38,18,57,0.06)]">
        <img src={image} alt={post.title} className={`w-full object-cover ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'}`} />
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight text-[var(--tk-text)]">{post.title}</h3>
        </div>
      </Link>
    )
  }

  if (task === 'listing') {
    return (
      <Link href={href} className="group rounded-[1.6rem] border border-[var(--tk-line)] bg-white p-4 shadow-[0_12px_28px_rgba(38,18,57,0.06)]">
        <div className="overflow-hidden rounded-[1.2rem] bg-[var(--tk-raised)]">
          <img src={image} alt={post.title} className="aspect-[4/3] w-full object-cover" />
        </div>
        <h3 className="mt-4 line-clamp-2 text-lg font-semibold leading-tight text-[var(--tk-text)]">{post.title}</h3>
        <RatingLine post={post} />
        <p className="mt-2 line-clamp-2 text-sm text-[var(--tk-muted)]">{summary}</p>
        <div className="mt-3 grid gap-2 text-xs text-[var(--tk-muted)]">
          {location ? <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-[var(--tk-accent)]" /> {location}</span> : null}
          {phone ? <span className="inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-[var(--tk-accent)]" /> {phone}</span> : null}
          {website ? <span className="inline-flex items-center gap-1.5"><Globe className="h-3.5 w-3.5 text-[var(--tk-accent)]" /> Website</span> : null}
        </div>
      </Link>
    )
  }

  if (task === 'profile') {
    return (
      <Link href={href} className="group rounded-[1.6rem] border border-[var(--tk-line)] bg-white p-5 text-center shadow-[0_12px_28px_rgba(38,18,57,0.06)]">
        <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-[var(--tk-raised)]">
          {image ? <img src={image} alt={post.title} className="h-full w-full object-cover" /> : <UserRound className="h-8 w-8 text-[var(--tk-muted)]" />}
        </div>
        <h3 className="mt-4 line-clamp-2 text-lg font-semibold text-[var(--tk-text)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-[var(--tk-muted)]">{summary}</p>
      </Link>
    )
  }

  return (
    <Link href={href} className="group rounded-[1.6rem] border border-[var(--tk-line)] bg-white p-4 shadow-[0_12px_28px_rgba(38,18,57,0.06)]">
      <div className="overflow-hidden rounded-[1.2rem] bg-[var(--tk-raised)]">
        <img src={image} alt={post.title} className="aspect-[4/3] w-full object-cover" />
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tk-accent)]">{getCategory(post, 'Featured')}</p>
      <h3 className="mt-2 line-clamp-2 text-lg font-semibold leading-tight text-[var(--tk-text)]">{post.title}</h3>
      {price ? <p className="mt-3 text-[1.6rem] font-extrabold text-[var(--tk-text)]">{price}</p> : <RatingLine post={post} />}
      <p className="mt-2 line-clamp-2 text-sm text-[var(--tk-muted)]">{summary}</p>
      {task === 'classified' && location ? <p className="mt-3 text-xs text-[var(--tk-muted)]">{location}</p> : null}
      {task === 'sbm' && website ? <p className="mt-3 text-xs font-semibold text-[var(--tk-accent)]">Saved resource</p> : null}
      {task === 'pdf' ? <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--tk-accent)]"><FileText className="h-3.5 w-3.5" /> Document</p> : null}
      {task === 'article' && !price ? <p className="mt-3 text-xs text-[var(--tk-muted)]">Read {String(index + 1).padStart(2, '0')}</p> : null}
      {task === 'classified' && !price ? <p className="mt-3 text-xs font-semibold text-[var(--tk-accent)]">Open offer</p> : null}
    </Link>
  )
}
