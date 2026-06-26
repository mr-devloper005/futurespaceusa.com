import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Business discovery with a brighter point of view',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Playful directory for modern business discovery',
    primaryLinks: [
      { label: 'Listings', href: '/listing' },
      { label: 'Images', href: '/image' },
      { label: 'Articles', href: '/article' },
      { label: 'Contact', href: '/contact' },
    ],
    utilityLinks: ['Tax support', 'Help Center', 'Workspace', 'Sell with us'],
    marketTabs: ['Directory', 'Collections', 'Suppliers', 'Worldwide'],
  },
  footer: {
    tagline: 'Explore listings, visuals, resources, and business-ready posts',
    description:
      'A discovery-led marketplace experience for browsing business listings, image collections, guides, and supporting resources in one polished flow.',
    columns: [
      {
        title: 'About',
        links: [
          { label: 'Why choose us', href: '/about' },
          { label: 'Publishing guide', href: '/create' },
          { label: 'Contact support', href: '/contact' },
        ],
      },
      {
        title: 'Business Tools',
        links: [
          { label: 'Listings', href: '/listing' },
          { label: 'Images', href: '/image' },
          { label: 'Documents', href: '/pdf' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Help center', href: '/contact' },
          { label: 'Login', href: '/login' },
          { label: 'Sign up', href: '/signup' },
        ],
      },
    ],
    bottomNote: 'Designed for smooth browsing across public-facing business content.',
  },
  commonLabels: {
    readMore: 'Open details',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
