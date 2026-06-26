import Link from 'next/link'
import { ArrowRight, Camera, ChevronRight, MapPin, Search, Sparkles, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  const next: SitePost[] = []
  for (const post of posts) {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) continue
    seen.add(key)
    next.push(post)
  }
  return next
}

function categoryOf(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Featured'
}

function FeaturedShowcaseCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative block min-h-[360px] overflow-hidden rounded-[2rem] border border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] text-white shadow-[0_30px_80px_rgba(21,23,61,0.18)]">
      <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-75 transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(21,23,61,0.1),rgba(21,23,61,0.9))]" />
      <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-8">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/14 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/88">
          <Sparkles className="h-3.5 w-3.5" /> Featured pick
        </span>
        <h2 className="editable-display mt-5 max-w-2xl text-[2.4rem] leading-[0.95] sm:text-[3.2rem]">{post.title}</h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/78">{getEditableExcerpt(post, 170)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
          Open details <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  )
}

function CompactSearchCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="rounded-[1.5rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_10px_24px_rgba(38,18,57,0.06)] transition duration-300 hover:-translate-y-1">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Frequently searched</p>
      <h3 className="mt-2 text-xl font-semibold text-[var(--slot4-page-text)]">{categoryOf(post)}</h3>
      <div className="mt-4 overflow-hidden rounded-[1.2rem] bg-[var(--slot4-panel-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[4/3] w-full object-cover" />
      </div>
    </Link>
  )
}

function HorizontalDealCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid gap-4 rounded-[1.5rem] border border-[var(--editable-border)] bg-white p-4 shadow-[0_8px_24px_rgba(38,18,57,0.06)] sm:grid-cols-[160px_minmax(0,1fr)]">
      <div className="overflow-hidden rounded-[1.15rem] bg-[var(--slot4-panel-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-soft-muted-text)]">No. {String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 115)}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)]">View details <ChevronRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

function EditorialListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex items-start gap-4 rounded-[1.5rem] border border-[var(--editable-border)] bg-white p-5 shadow-[0_8px_24px_rgba(38,18,57,0.06)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] text-sm font-semibold text-white">
        {index + 1}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{categoryOf(post)}</p>
        <h3 className="mt-2 line-clamp-2 text-xl font-semibold leading-tight text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 100)}</p>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[1.6rem] border border-[var(--editable-border)] bg-white shadow-[0_10px_26px_rgba(38,18,57,0.07)] transition duration-300 hover:-translate-y-1.5">
      <div className="relative overflow-hidden bg-[var(--slot4-panel-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[var(--slot4-page-text)] shadow-sm">{categoryOf(post)}</span>
      </div>
      <div className="p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-[var(--slot4-page-text)] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 95)}</p>
      </div>
    </Link>
  )
}

function dataPool(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dataPool(posts, timeSections)
  const featured = pool[0]
  const compactCards = pool.slice(1, 4)
  const sideCards = pool.slice(4, 10)

  return (
    <section className="overflow-hidden">
      <div className="editable-market-grid border-b border-[var(--editable-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(247,240,245,0.98))]">
        <div className={`${container} py-10 sm:py-14`}>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold text-[var(--slot4-muted-text)]">{pagesContent.home.hero.badge}</p>
            <form action="/search" className="mx-auto mt-10 max-w-5xl rounded-[1.8rem] border border-[var(--slot4-accent)]/50 bg-white p-4 shadow-[0_26px_60px_rgba(38,18,57,0.12)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex min-h-[90px] flex-1 flex-col justify-center rounded-[1.3rem] border border-[var(--editable-border)] bg-[var(--slot4-warm)] px-5">
                  <input
                    name="q"
                    placeholder={pagesContent.home.hero.searchPlaceholder}
                    className="bg-transparent text-lg font-medium text-[var(--slot4-page-text)] outline-none placeholder:text-[var(--slot4-soft-muted-text)]"
                  />
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">
                    <Camera className="h-4 w-4 text-[var(--slot4-accent)]" /> Image Search
                  </span>
                </div>
                <button className="inline-flex h-[58px] items-center justify-center rounded-full bg-[linear-gradient(90deg,#e491c9_0%,#982598_100%)] px-10 text-lg font-semibold text-white shadow-[0_14px_24px_rgba(152,37,152,0.18)]">
                  <Search className="mr-2 h-5 w-5" /> Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-b border-[var(--editable-border)] bg-white">
        <div className={`${container} flex flex-wrap items-center justify-between gap-4 py-6`}>
          <h2 className="text-[1.9rem] font-semibold text-[var(--slot4-page-text)]">Welcome to {SITE_CONFIG.name}</h2>
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold text-[var(--slot4-page-text)]">
            <span className="inline-flex items-center gap-2"><Star className="h-4 w-4 text-[var(--slot4-accent)]" /> Request for quotation</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-[var(--slot4-accent)]" /> Top ranking</span>
            <span className="inline-flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--slot4-accent)]" /> Fast customization</span>
          </div>
        </div>
      </div>

      <div className={`${container} py-8 sm:py-10`}>
        <div className="grid gap-6">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            {featured ? <FeaturedShowcaseCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} /> : null}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {compactCards.map((post) => (
                <CompactSearchCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {sideCards.slice(0, 3).map((post, index) => (
              <HorizontalDealCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const railPosts = dataPool(posts, timeSections).slice(0, 8)
  if (!railPosts.length) return null

  return (
    <section className="bg-[var(--slot4-warm)]">
      <div className={`${container} py-12`}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Recommended for your business</p>
            <h2 className="mt-2 text-[2rem] font-semibold text-[var(--slot4-page-text)]">Quick picks worth opening next</h2>
          </div>
          <Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)] md:inline-flex">
            View full directory <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {railPosts.map((post) => (
            <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dataPool(posts, timeSections)
  const editorial = pool.slice(0, 4)
  const mosaic = pool.slice(4, 8)
  if (!editorial.length) return null

  return (
    <section className="bg-white">
      <div className={`${container} py-12`}>
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Spotlight lane</p>
            <h2 className="mt-2 text-[2rem] font-semibold text-[var(--slot4-page-text)]">Popular search themes and standout posts</h2>
            <div className="mt-6 grid gap-4">
              {editorial.map((post, index) => (
                <EditorialListCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-[1.8rem] border border-[var(--editable-border)] bg-[linear-gradient(135deg,#dceeff_0%,#bfdcf8_100%)] p-6 shadow-[0_18px_44px_rgba(38,18,57,0.08)]">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="max-w-xs text-[2.2rem] font-extrabold leading-[0.95] tracking-[-0.03em] text-[#17305c]">Discover new business-ready updates</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-[#31507d]">Fresh visuals, useful listings, and updated categories arrive throughout the site.</p>
                </div>
                <span className="rounded-full bg-[#17305c] px-4 py-2 text-sm font-semibold text-white">View more</span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {mosaic.map((post) => (
                  <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className="overflow-hidden rounded-[1.4rem] bg-white/70 p-3">
                    <img src={getEditablePostImage(post)} alt={post.title} className="aspect-[4/3] w-full rounded-[1rem] object-cover" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections =
    timeSections.length > 0
      ? timeSections
      : ([
          { key: 'spotlight', posts: posts.slice(0, 4), href: primaryRoute },
          { key: 'browse', posts: posts.slice(4, 8), href: primaryRoute },
          { key: 'index', posts: posts.slice(8, 12), href: primaryRoute },
        ] as Pick<HomeTimeSection, 'key' | 'posts' | 'href'>[])

  const visible = sections.filter((section) => section.posts.length)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, index) => (
        <section key={section.key} className={index % 2 === 0 ? 'bg-[var(--slot4-warm)]' : 'bg-white'}>
          <div className={`${container} py-12`}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">
                  {section.key === 'spotlight' ? 'Fresh this week' : section.key === 'browse' ? 'Trending now' : 'Archive highlights'}
                </p>
                <h2 className="mt-2 text-[2rem] font-semibold text-[var(--slot4-page-text)]">
                  {section.key === 'spotlight' ? 'New arrivals' : section.key === 'browse' ? 'Popular picks' : 'More to explore'}
                </h2>
              </div>
              <Link href={section.href || primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-accent)]">
                See all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {section.posts.slice(0, 8).map((post) => (
                <ImageFirstCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[linear-gradient(135deg,#15173d_0%,#982598_100%)]">
      <div className={`${container} py-16 text-center text-white sm:py-20`}>
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">{pagesContent.home.cta.badge}</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-[2.6rem] font-semibold leading-[0.96] sm:text-[3.4rem]">{pagesContent.home.cta.title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/78">{pagesContent.home.cta.description}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href={pagesContent.home.cta.primaryCta.href} className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-[var(--slot4-accent)]">
            {pagesContent.home.cta.primaryCta.label}
          </Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white">
            {pagesContent.home.cta.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  )
}
