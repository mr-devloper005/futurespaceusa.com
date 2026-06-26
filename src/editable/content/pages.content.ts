import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Business discovery, listings, and visual collections',
      description: 'Browse business listings, image-led posts, and helpful resources through a polished marketplace-style interface.',
      openGraphTitle: 'Business discovery, listings, and visual collections',
      openGraphDescription: 'Explore business-ready posts, listings, visuals, and resources in one bright discovery flow.',
      keywords: ['business listings', 'discovery platform', 'visual directory', 'resource marketplace'],
    },
    hero: {
      badge: 'Business-ready discovery',
      title: ['Find standout listings,', 'visual collections, and useful leads.'],
      description:
        'Search across listings, images, articles, and resources through a playful directory experience built for fast browsing and polished presentation.',
      primaryCta: { label: 'Browse listings', href: '/listing' },
      secondaryCta: { label: 'Explore images', href: '/image' },
      searchPlaceholder: 'Search listings, services, images, and categories',
    },
    intro: {
      badge: 'Why people browse here',
      title: 'A marketplace-style home built for quick scanning and confident discovery.',
      paragraphs: [
        'The site brings together listings, image-led updates, articles, and resources in one connected interface.',
        'Visitors can move between discovery lanes without losing context, whether they start from search, category browsing, or featured cards.',
        'The structure favors clear hierarchy, visual variety, and fast access to useful public-facing content.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first browsing for listings, visuals, and resources.',
        'Mixed card styles for stronger scanning and merchandising.',
        'Responsive layouts tuned for desktop and mobile.',
        'Public-ready copy that stays flexible across content types.',
      ],
      primaryLink: { label: 'Browse listings', href: '/listing' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start sharing',
      title: 'Bring your next listing, update, or showcase into the directory.',
      description:
        'Publish a business listing, image-led post, or resource page and keep everything discoverable through the same connected experience.',
      primaryCta: { label: 'Create a post', href: '/create' },
      secondaryCta: { label: 'Contact support', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About',
    title: 'A playful directory experience built for business discovery.',
    description: `${slot4BrandConfig.siteName} brings listings, image-led showcases, and supporting resources into one polished interface.`,
    paragraphs: [
      'The experience is designed to help visitors scan quickly, compare clearly, and move between different content types without friction.',
      'Listings, visuals, and resources remain connected so discovery feels natural whether someone starts on the homepage, a category feed, or a detail page.',
    ],
    values: [
      {
        title: 'Search-first layout',
        description: 'The interface prioritizes quick discovery, strong hierarchy, and confident scanning on every screen size.',
      },
      {
        title: 'Connected content types',
        description: 'Listings, images, articles, documents, and profiles live within one consistent browsing system.',
      },
      {
        title: 'Public-ready presentation',
        description: 'Copy and layout stay general, useful, and polished for a public-facing website.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'A cleaner support lane for questions, submissions, and publishing help.',
    description: 'Reach out about listings, publishing, discovery, or general site support and we will route your message to the right place.',
    formTitle: 'Send a message',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search listings, images, articles, and resources across the site.',
    },
    hero: {
      badge: 'Search the directory',
      title: 'Find listings, images, and resources faster.',
      description: 'Use keywords and categories to browse the latest content across every active section of the site.',
      placeholder: 'Search by keyword, title, topic, or category',
    },
    resultsTitle: 'Search results',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to create new content.',
      description: 'Sign in to open the publishing workspace and submit listings, visuals, and supporting posts.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create content for every active section.',
      description: 'Choose a content type, fill in the details, and prepare a clean post with images, summary, and supporting fields.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your workspace.',
      description: 'Login to continue browsing, managing submissions, and creating new posts from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Create access',
      title: 'Create your account and start publishing.',
      description: 'Make an account to save details, access the publishing workspace, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested profiles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit site',
    },
  },
} as const
