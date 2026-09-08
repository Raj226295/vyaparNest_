import { useEffect, useRef, useState } from 'react'
import CategoriesMegaMenu from './CategoriesMegaMenu.jsx'
import PartnerLoginModal from './PartnerLoginModal.jsx'
import './PublicHomePage.css'

const homeHash = '#top'
const categoriesHash = '#all-categories'
const aiAssistHash = '#ai-assist'
const workflowHash = '#how-it-works'
const serviceProvidersHashPrefix = '#service-providers/'
const providerProfileHashPrefix = '#provider-profile/'
const providerProfileDesignsStorageKey = 'vyaparnest-provider-profile-designs-v1'
const defaultProviderProfileCategoryTitle = 'Website Development'
const defaultProviderProfileId = 'website-development-2'
const defaultProviderProfileHash = `${providerProfileHashPrefix}Website%20Development/${defaultProviderProfileId}`

const primaryNavLinks = [
  { key: 'home', label: 'Home', href: homeHash },
  { key: 'categories', label: 'Categories', href: categoriesHash, hasChevron: true },
  { key: 'ai-assist', label: 'AI Assist', href: aiAssistHash },
  { key: 'dashboard', label: 'About Us', href: defaultProviderProfileHash },
]

const popularSearches = [
  'Website Designer',
  'GST Filing',
  'Logo Design',
  'Digital Marketing',
  'Photographer',
]

const categoryCards = [
  {
    title: 'Website Development',
    experts: '260+ Experts',
    image: '/category-icons/web.gif',
  },
  {
    title: 'Graphic & Logo Design',
    experts: '180+ Experts',
    image: '/category-icons/graphic-designer.gif',
  },
  {
    title: 'Digital Marketing',
    experts: '320+ Experts',
    image: '/category-icons/analytics.gif',
  },
  {
    title: 'GST & Tax Services',
    experts: '150+ Experts',
    image: '/category-icons/tax.gif',
  },
  {
    title: 'Home Cleaning Services',
    experts: '400+ Experts',
    image: '/category-icons/cleaning-service.gif',
  },
  {
    title: 'Education & Tutors',
    experts: '300+ Experts',
    image: '/category-icons/teacher.gif',
  },
  {
    title: 'Photography & Video',
    experts: '175+ Experts',
    image: '/category-icons/movie-camera.gif',
  },
  {
    title: 'Business Consulting',
    experts: '200+ Experts',
    image: '/category-icons/user.gif',
  },
  {
    title: 'App Development',
    experts: '210+ Experts',
    image: '/category-icons/applications.gif',
  },
  {
    title: 'Social Media Management',
    experts: '220+ Experts',
    image: '/category-icons/web-data.gif',
  },
  {
    title: 'Vector Illustration',
    experts: '145+ Experts',
    image: '/category-icons/vector.gif',
  },
  {
    title: 'Legal Services',
    experts: '130+ Experts',
    image: '/category-icons/contract.gif',
  },
  {
    title: 'Repair & Maintenance',
    experts: '280+ Experts',
    image: '/category-icons/service.gif',
  },
  {
    title: 'Logistics & Delivery',
    experts: '190+ Experts',
    image: '/category-icons/delivery-service.gif',
  },
  {
    title: 'Startup & Business Setup',
    experts: '160+ Experts',
    image: '/category-icons/mission.gif',
  },
]

const allCategoriesCards = [
  {
    title: 'Accounting',
    servicesLabel: '128+ Services',
    description: 'Bookkeeping, Audit, Financial Reporting & more',
    image: '/category-icons/tax.gif',
    heroImage: '/service-provider-heroes/accounting-services-hero-user.png',
    accentColor: '#e2aa10',
    iconSurface: 'linear-gradient(180deg, #fff5d8 0%, #fff0c9 100%)',
  },
  {
    title: 'App Development',
    servicesLabel: '156+ Services',
    description: 'Android, iOS, Flutter, React Native & more',
    image: '/category-icons/applications.gif',
    heroImage: '/web-developer.gif',
    heroImageFit: 'contain',
    accentColor: '#5fbf45',
    iconSurface: 'linear-gradient(180deg, #ebf9e4 0%, #dcf0d5 100%)',
  },
  {
    title: 'Business Consultant',
    servicesLabel: '98+ Services',
    description: 'Strategy, Plan, Growth Consulting & more',
    image: '/category-icons/user.gif',
    heroImage: '/service-provider-heroes/business-consulting-hero.png',
    accentColor: '#8a52eb',
    iconSurface: 'linear-gradient(180deg, #f3eafd 0%, #eadcff 100%)',
  },
  {
    title: 'Business Loans',
    servicesLabel: '64+ Services',
    description: 'Unsecured, Secured, Working Capital & more',
    image: '/category-icons/analytics.gif',
    heroImage: '/market-sections/guide-growth-hover.png',
    accentColor: '#ff9416',
    iconSurface: 'linear-gradient(180deg, #fff1e3 0%, #ffe4cf 100%)',
  },
  {
    title: 'Website Development',
    servicesLabel: '210+ Services',
    description: 'Business, E-commerce, CMS & Custom Websites',
    image: '/category-icons/web.gif',
    heroImage: '/market-sections/guide-website-hover.png',
    accentColor: '#4985ff',
    iconSurface: 'linear-gradient(180deg, #ecf2ff 0%, #dee8ff 100%)',
  },
  {
    title: 'Digital Marketing',
    servicesLabel: '342+ Services',
    description: 'SEO, PPC, SMM, Email Marketing & more',
    image: '/category-icons/analytics.gif',
    heroImage: '/market-sections/guide-marketing-hover.png',
    accentColor: '#ff5b73',
    iconSurface: 'linear-gradient(180deg, #fff0f2 0%, #ffe2e9 100%)',
  },
  {
    title: 'Graphic Design',
    servicesLabel: '186+ Services',
    description: 'Logo, Branding, Banner, Brochure & more',
    image: '/category-icons/graphic-designer.gif',
    heroImage: '/market-sections/guide-branding-hover.png',
    accentColor: '#e0a500',
    iconSurface: 'linear-gradient(180deg, #fff6dd 0%, #ffedc8 100%)',
  },
  {
    title: 'Video Editing',
    servicesLabel: '112+ Services',
    description: 'YouTube, Ads, Reels, Corporate Video & more',
    image: '/category-icons/movie-camera.gif',
    heroImage: '/category-icons/movie-camera.gif',
    heroImageFit: 'contain',
    accentColor: '#447eff',
    iconSurface: 'linear-gradient(180deg, #edf3ff 0%, #dfe9ff 100%)',
  },
  {
    title: 'GST & Tax Services',
    servicesLabel: '89+ Services',
    description: 'GST Registration, Filing, Return & Compliance',
    image: '/category-icons/tax.gif',
    heroImage: '/service-provider-heroes/accounting-services-hero-user.png',
    accentColor: '#5dbb45',
    iconSurface: 'linear-gradient(180deg, #eef8e7 0%, #dff0d3 100%)',
  },
  {
    title: 'CA Services',
    servicesLabel: '78+ Services',
    description: 'Income Tax, ROC, Compliance & Advisory',
    image: '/category-icons/contract.gif',
    heroImage: '/service-provider-heroes/accounting-services-hero-user.png',
    accentColor: '#8c56ea',
    iconSurface: 'linear-gradient(180deg, #f3eafb 0%, #e8ddff 100%)',
  },
  {
    title: 'Legal Consultant',
    servicesLabel: '75+ Services',
    description: 'Legal Advice, Notices, Contracts & Documentation',
    image: '/category-icons/contract.gif',
    heroImage: '/category-icons/contract.gif',
    heroImageFit: 'contain',
    accentColor: '#18a59b',
    iconSurface: 'linear-gradient(180deg, #e6f8f5 0%, #d5f0ea 100%)',
  },
  {
    title: 'Company Registration',
    servicesLabel: '92+ Services',
    description: 'Private Limited, LLP, OPC & Sole Proprietorship',
    image: '/category-icons/mission.gif',
    heroImage: '/service-provider-heroes/business-consulting-hero.png',
    accentColor: '#8c56ea',
    iconSurface: 'linear-gradient(180deg, #f1e8ff 0%, #e5dbff 100%)',
  },
  {
    title: 'Social Media Marketing',
    servicesLabel: '123+ Services',
    description: 'Content, Management, Paid Ads & Growth',
    image: '/category-icons/web-data.gif',
    heroImage: '/service-provider-heroes/automation-hero.png',
    accentColor: '#ff5c73',
    iconSurface: 'linear-gradient(180deg, #fff0f2 0%, #ffe1e8 100%)',
  },
  {
    title: 'SEO Services',
    servicesLabel: '168+ Services',
    description: 'On-Page, Off-Page, Technical SEO & Local SEO',
    image: '/category-seo.gif',
    heroImage: '/category-seo.gif',
    heroImageFit: 'contain',
    accentColor: '#457fff',
    iconSurface: 'linear-gradient(180deg, #edf3ff 0%, #dfe8ff 100%)',
  },
  {
    title: 'Content Writing',
    servicesLabel: '97+ Services',
    description: 'Website Content, Blogs, Articles & More',
    image: '/category-comments.gif',
    heroImage: '/category-comments.gif',
    heroImageFit: 'contain',
    accentColor: '#ff8c14',
    iconSurface: 'linear-gradient(180deg, #fff3e6 0%, #ffe6cf 100%)',
  },
  {
    title: 'Photography',
    servicesLabel: '84+ Services',
    description: 'Events, Products, Portraits & Brand Shoots',
    image: '/category-photo.gif',
    heroImage: '/category-photo.gif',
    heroImageFit: 'contain',
    accentColor: '#4a80ff',
    iconSurface: 'linear-gradient(180deg, #eef3ff 0%, #e0e8ff 100%)',
  },
  {
    title: 'Interior Design',
    servicesLabel: '73+ Services',
    description: 'Home, Office, Space Planning & Decor',
    image: '/category-icons/vector.gif',
    heroImage: '/market-sections/guide-branding-hover.png',
    accentColor: '#17a296',
    iconSurface: 'linear-gradient(180deg, #e8f8f5 0%, #d6efe9 100%)',
  },
  {
    title: 'Home Services',
    servicesLabel: '144+ Services',
    description: 'Cleaning, Repairs, Maintenance & Setup',
    image: '/category-icons/cleaning-service.gif',
    heroImage: '/category-icons/cleaning-service.gif',
    heroImageFit: 'contain',
    accentColor: '#5ab948',
    iconSurface: 'linear-gradient(180deg, #eef8e8 0%, #ddf0d4 100%)',
  },
  {
    title: 'AI Automation',
    servicesLabel: '69+ Services',
    description: 'Chatbots, Workflow Tools, CRM Automation & more',
    image: '/category-icons/mission.gif',
    heroImage: '/service-provider-heroes/automation-hero.png',
    accentColor: '#5468ff',
    iconSurface: 'linear-gradient(180deg, #edf0ff 0%, #e0e4ff 100%)',
  },
]

const categoriesMenuCards = allCategoriesCards.slice(0, 8)
const categoryFilterOptions = allCategoriesCards
const platformMetrics = [
  { value: '10,000+', label: 'Service Providers', icon: 'users' },
  { value: '50,000+', label: 'Requests Completed', icon: 'document' },
  { value: '4.8 / 5', label: 'Average Rating', icon: 'star' },
  { value: '25+', label: 'Cities Covered', icon: 'location' },
]

const workflowSteps = [
  {
    title: 'Search a Service',
    description: 'Find the service you need from our wide range.',
    image: '/workflow-icons/search.gif',
  },
  {
    title: 'Compare & Connect',
    description: 'Compare verified professionals, ratings, and reviews.',
    image: '/workflow-icons/comparision.gif',
  },
  {
    title: 'Send Your Request',
    description: 'Send your requirement to the right professionals.',
    image: '/workflow-icons/send.gif',
  },
  {
    title: 'Get the Work Done',
    description: 'Select the best professional and get it done.',
    image: '/workflow-icons/verified.gif',
  },
]

const featuredProviders = [
  {
    initials: 'PS',
    name: 'PixelCraft Studio',
    service: 'Website & Graphic Design',
    location: 'Purnia, Bihar',
    rating: '4.8',
    reviews: '120',
    years: '5 Years',
    projects: '220+ Projects',
    accent: 'linear-gradient(135deg, #111214 0%, #2f3238 100%)',
    profileCategory: 'Website Development',
    profileId: 'website-development-1',
  },
  {
    initials: 'TI',
    name: 'TaxExpert India',
    service: 'GST & Tax Consultant',
    location: 'Purnia, Bihar',
    rating: '4.9',
    reviews: '85',
    years: '7 Years',
    projects: '200+ Projects',
    accent: 'linear-gradient(135deg, #0c0c0f 0%, #262934 100%)',
    profileCategory: 'GST & Tax Services',
    profileId: 'gst-tax-services-1',
  },
  {
    initials: 'DG',
    name: 'DigitalGrow Agency',
    service: 'Digital Marketing',
    location: 'Purnia, Bihar',
    rating: '4.9',
    reviews: '95',
    years: '4 Years',
    projects: '150+ Projects',
    accent: 'linear-gradient(135deg, #3a1476 0%, #472f9c 100%)',
    profileCategory: 'Digital Marketing',
    profileId: 'digital-marketing-1',
  },
  {
    initials: 'HE',
    name: 'HomeFix Experts',
    service: 'Home Services',
    location: 'Purnia, Bihar',
    rating: '4.8',
    reviews: '80',
    years: '6 Years',
    projects: '300+ Projects',
    accent: 'linear-gradient(135deg, #f6b613 0%, #f6ca42 100%)',
    profileCategory: 'Home Services',
    profileId: 'home-services-1',
  },
]

const partnerBenefits = [
  {
    title: 'Reach New Customers',
    description: 'Connect with customers who are actively looking for services.',
    icon: 'users',
  },
  {
    title: 'Grow Your Business',
    description: 'Get more leads, projects, and build your brand online.',
    icon: 'briefcase',
  },
  {
    title: 'Trusted Platform',
    description: 'A secure and transparent platform you can rely on.',
    icon: 'shield',
  },
  {
    title: 'Dedicated Support',
    description: 'We are here to help you at every step of your journey.',
    icon: 'headset',
  },
]

const testimonials = [
  {
    quote:
      'I found a courier and IT service for my business within hours. Reliable and smooth experience!',
    name: 'Rahul Verma',
    role: 'Business Owner',
    stars: 5,
    avatar: '/testimonial-avatars/rahul-verma.svg',
  },
  {
    quote:
      'VyaparNest helped me connect with trusted GST consultants. The whole process was quick and easy.',
    name: 'Priya Singh',
    role: 'Entrepreneur',
    stars: 5,
    avatar: '/testimonial-avatars/priya-singh.svg',
  },
  {
    quote:
      'Got professional help and reliable service for my startup. Highly recommended!',
    name: 'Amit Verma',
    role: 'Shop Owner',
    stars: 5,
    avatar: '/testimonial-avatars/amit-verma.svg',
  },
]

const categoriesPageSize = 15

const guides = [
  {
    image: '/market-sections/guide-website.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_25_44 PM.png',
    category: 'Business Tips',
    title: 'How to Hire the Right Website Developer?',
    date: 'May 15, 2024',
    readTime: '5 min read',
  },
  {
    image: '/market-sections/guide-branding.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_04 PM.png',
    category: 'Digital Marketing',
    title: 'Branding Strategies for GST Registration',
    date: 'May 12, 2024',
    readTime: '6 min read',
  },
  {
    image: '/market-sections/guide-marketing.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_19 PM.png',
    category: 'Marketing',
    title: 'Best Digital Marketing Strategies for Small Business',
    date: 'May 8, 2024',
    readTime: '8 min read',
  },
  {
    image: '/market-sections/guide-growth.png',
    hoverImage: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_31 PM.png',
    category: 'Business Growth',
    title: 'How to Grow Larger: Growth Tips & Best Ideas',
    date: 'May 5, 2024',
    readTime: '4 min read',
  },
]

const footerGroups = [
  {
    title: 'For Customers',
    links: ['Search Services', 'Post Requirement', 'My Requests', 'Help Center', 'How It Works'],
  },
  {
    title: 'For Professionals',
    links: ['List Your Business', 'Partner Registration', 'Partner Login', 'Pricing Plans', 'Resources'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Contact Us', 'Press & Media'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms & Conditions', 'Refund Policy', 'Community Guidelines'],
  },
]

const footerSocials = [
  { label: 'Facebook', icon: 'facebook' },
  { label: 'Instagram', icon: 'instagram' },
  { label: 'YouTube', icon: 'youtube' },
]

const providerProfileStatIcons = {
  projects: '/provider-profile-icons/star.gif',
  expertise: '/provider-profile-icons/expertise.gif',
  delivery: '/provider-profile-icons/fast-delivery.gif',
  satisfaction: '/provider-profile-icons/customer-experience.gif',
}

const serviceProviderPriceBuckets = [
  { key: 'under-2000', label: 'Under ₹2,000', min: 0, max: 1999 },
  { key: '2000-5000', label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
  { key: '5000-10000', label: '₹5,000 - ₹10,000', min: 5001, max: 10000 },
  { key: 'above-10000', label: 'Above ₹10,000', min: 10001, max: Infinity },
]

const initialAiAssistConversations = [
  {
    id: 'gst-registration',
    title: 'GST registration process',
    timeLabel: 'Today, 10:30 AM',
    messages: [
      {
        id: 'gst-user-1',
        role: 'user',
        text: 'How to register a private limited company?',
        time: '10:30 AM',
      },
      {
        id: 'gst-assistant-1',
        role: 'assistant',
        type: 'list',
        intro: 'To register a Private Limited Company in India, follow these main steps:',
        items: [
          'Obtain Digital Signature Certificate (DSC)',
          'Apply for Director Identification Number (DIN)',
          'Name Approval via RUN (Reserve Unique Name)',
          'File Incorporation Application (SPICe+ Form)',
          'Get Certificate of Incorporation',
        ],
        outro: 'Would you like a detailed step-by-step guide for any of these steps?',
      },
      {
        id: 'gst-user-2',
        role: 'user',
        text: 'Yes, please provide step-by-step guide.',
        time: '10:31 AM',
      },
      {
        id: 'gst-assistant-2',
        role: 'assistant',
        type: 'text',
        text:
          'Sure. Start with DSC for all directors, then apply for DIN, reserve your company name, complete SPICe+ incorporation filing, and finally get your PAN, TAN, and incorporation certificate. If you want, I can also tell you which VyaparNest category is best for registration support.',
      },
    ],
  },
  {
    id: 'logo-brand',
    title: 'I need a logo for my brand',
    timeLabel: 'Today, 09:15 AM',
    messages: [
      {
        id: 'logo-user-1',
        role: 'user',
        text: 'I need a premium logo for my new GST consultancy brand.',
        time: '09:15 AM',
      },
      {
        id: 'logo-assistant-1',
        role: 'assistant',
        type: 'text',
        text: 'I can help you with logo ideas, brand colors, typography suggestions, and also recommend verified logo designers near your city.',
      },
    ],
  },
  {
    id: 'private-limited',
    title: 'How to start a private limited...',
    timeLabel: 'Yesterday, 04:20 PM',
    messages: [
      {
        id: 'private-user-1',
        role: 'user',
        text: 'How do I start a private limited business in Bihar?',
        time: '04:20 PM',
      },
      {
        id: 'private-assistant-1',
        role: 'assistant',
        type: 'text',
        text: 'Start with name reservation, DSC, DIN, incorporation filing, and bank account setup. I can also connect you with CA and compliance professionals for complete registration support.',
      },
    ],
  },
  {
    id: 'income-tax',
    title: 'Income tax filing for business',
    timeLabel: 'Yesterday, 11:45 AM',
    messages: [
      {
        id: 'tax-user-1',
        role: 'user',
        text: 'What documents do I need for business income tax filing?',
        time: '11:45 AM',
      },
      {
        id: 'tax-assistant-1',
        role: 'assistant',
        type: 'text',
        text: 'You usually need PAN, bank statements, purchase and sales invoices, expense records, GST reports if applicable, and previous return details.',
      },
    ],
  },
  {
    id: 'digital-marketing',
    title: 'Digital marketing services',
    timeLabel: '21 May 2025, 03:30 PM',
    messages: [
      {
        id: 'dm-user-1',
        role: 'user',
        text: 'Which digital marketing service is best for lead generation?',
        time: '03:30 PM',
      },
      {
        id: 'dm-assistant-1',
        role: 'assistant',
        type: 'text',
        text: 'For lead generation, paid ads, landing page optimization, local SEO, and WhatsApp funnel automation usually work best together.',
      },
    ],
  },
  {
    id: 'ca-near-me',
    title: 'CA near me',
    timeLabel: '20 May 2025, 10:10 AM',
    messages: [
      {
        id: 'ca-user-1',
        role: 'user',
        text: 'Can you suggest verified CA services near Purnia, Bihar?',
        time: '10:10 AM',
      },
      {
        id: 'ca-assistant-1',
        role: 'assistant',
        type: 'text',
        text: 'Yes. I can shortlist verified CA professionals for GST filing, ROC compliance, income tax, and company registration based on your business type.',
      },
    ],
  },
  {
    id: 'loan-eligibility',
    title: 'Business loan eligibility',
    timeLabel: '19 May 2025, 05:00 PM',
    messages: [
      {
        id: 'loan-user-1',
        role: 'user',
        text: 'How do I check business loan eligibility for my startup?',
        time: '05:00 PM',
      },
      {
        id: 'loan-assistant-1',
        role: 'assistant',
        type: 'text',
        text: 'Lenders usually check your business age, turnover, banking history, credit score, GST returns, and filed ITRs. I can help you prepare the checklist.',
      },
    ],
  },
]

const aiAssistCategoryAliases = {
  accounting: 'Accounting',
  app: 'App Development',
  application: 'App Development',
  business: 'Business Consultant',
  consultant: 'Business Consultant',
  loan: 'Business Loans',
  loans: 'Business Loans',
  website: 'Website Development',
  web: 'Website Development',
  digital: 'Digital Marketing',
  marketing: 'Digital Marketing',
  graphic: 'Graphic Design',
  logo: 'Graphic Design',
  video: 'Video Editing',
  gst: 'GST & Tax Services',
  tax: 'GST & Tax Services',
  ca: 'CA Services',
  legal: 'Legal Consultant',
  company: 'Company Registration',
  registration: 'Company Registration',
  social: 'Social Media Marketing',
  seo: 'SEO Services',
  content: 'Content Writing',
  photography: 'Photography',
  photographer: 'Photography',
  interior: 'Interior Design',
  home: 'Home Services',
  cleaning: 'Home Services',
  ai: 'AI Automation',
  automation: 'AI Automation',
}

function normalizeAiText(value) {
  return value.toLowerCase().replace(/[^a-z0-9&+\s]/g, ' ').replace(/\s+/g, ' ').trim()
}

function getCurrentTimeLabel() {
  return new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function getCurrentDateLabel() {
  return `Today, ${getCurrentTimeLabel()}`
}

function getConversationPreviewTitle(prompt) {
  const trimmedPrompt = prompt.trim()

  if (trimmedPrompt.length <= 30) {
    return trimmedPrompt
  }

  return `${trimmedPrompt.slice(0, 27).trim()}...`
}

function findRelevantCategory(prompt) {
  const normalizedPrompt = normalizeAiText(prompt)

  for (const category of allCategoriesCards) {
    if (normalizedPrompt.includes(normalizeAiText(category.title))) {
      return category
    }
  }

  for (const [alias, categoryTitle] of Object.entries(aiAssistCategoryAliases)) {
    if (normalizedPrompt.includes(alias)) {
      return allCategoriesCards.find((category) => category.title === categoryTitle) ?? null
    }
  }

  return null
}

function generateAiAssistResponse(prompt) {
  const normalizedPrompt = normalizeAiText(prompt)
  const matchedCategory = findRelevantCategory(prompt)
  const topCategories = allCategoriesCards.slice(0, 6).map((category) => category.title)
  const providerNames = featuredProviders.map((provider) => provider.name)

  if (!normalizedPrompt) {
    return {
      role: 'assistant',
      type: 'text',
      text: 'Please type your website or service-related question, and I will help you with VyaparNest.',
    }
  }

  if (
    normalizedPrompt.includes('hello') ||
    normalizedPrompt.includes('hi') ||
    normalizedPrompt.includes('hey')
  ) {
    return {
      role: 'assistant',
      type: 'text',
      text:
        'Hello! I am Vyapar AI.\n\nI can help you explore services on VyaparNest, explain categories, guide partner registration, suggest professionals, and answer website-related questions.',
    }
  }

  if (
    normalizedPrompt.includes('what can you do') ||
    normalizedPrompt.includes('who are you') ||
    normalizedPrompt.includes('website related')
  ) {
    return {
      role: 'assistant',
      type: 'list',
      intro: 'I can help you with these VyaparNest website tasks:',
      items: [
        'Find the right service category for your requirement',
        'Explain how partner registration and login works',
        'Suggest featured professionals and popular services',
        'Guide you on posting requirements and using the platform',
        'Answer page, section, category, and workflow-related questions',
      ],
      outro: 'Ask me anything about services, categories, partner onboarding, dashboard, or website usage.',
    }
  }

  if (
    normalizedPrompt.includes('partner') ||
    normalizedPrompt.includes('list my business') ||
    normalizedPrompt.includes('become a partner')
  ) {
    return {
      role: 'assistant',
      type: 'list',
      intro: 'To join VyaparNest as a partner, follow this flow on the website:',
      items: [
        'Click "Partner with us" from the top navigation',
        'Open the registration wizard and enter your basic details',
        'Add business information, services, and service area',
        'Upload documents for verification',
        'Complete payment to activate your partner account',
      ],
      outro: 'After activation, you can manage your profile, leads, and visibility from the partner flow.',
    }
  }

  if (
    normalizedPrompt.includes('login') ||
    normalizedPrompt.includes('sign in') ||
    normalizedPrompt.includes('partner login')
  ) {
    return {
      role: 'assistant',
      type: 'text',
      text:
        'You can use the Login button in the navbar to access your account.\n\nFor partner access, open the partner login flow and continue with your mobile number and OTP verification.',
    }
  }

  if (
    normalizedPrompt.includes('how it works') ||
    normalizedPrompt.includes('process') ||
    normalizedPrompt.includes('workflow') ||
    normalizedPrompt.includes('post requirement')
  ) {
    return {
      role: 'assistant',
      type: 'list',
      intro: 'VyaparNest website works in 4 simple steps:',
      items: workflowSteps.map((step) => `${step.title} - ${step.description}`),
      outro: 'You can start from the homepage search bar, category section, or AI Assist to move faster.',
    }
  }

  if (
    normalizedPrompt.includes('category') ||
    normalizedPrompt.includes('categories') ||
    normalizedPrompt.includes('services available') ||
    normalizedPrompt.includes('what services')
  ) {
    return {
      role: 'assistant',
      type: 'list',
      intro: 'VyaparNest currently highlights these popular service categories:',
      items: topCategories,
      outro: `You can also open the All Categories page to explore ${allCategoriesCards.length} service groups like GST, websites, digital marketing, photography, business consulting, and more.`,
    }
  }

  if (matchedCategory) {
    return {
      role: 'assistant',
      type: 'text',
      text: `${matchedCategory.title} is available on VyaparNest.\n\nServices: ${matchedCategory.servicesLabel}\nWhat it covers: ${matchedCategory.description}\n\nIf you want, I can also suggest whether this category is better for your requirement or recommend nearby professionals.`,
    }
  }

  if (
    normalizedPrompt.includes('professional') ||
    normalizedPrompt.includes('provider') ||
    normalizedPrompt.includes('expert') ||
    normalizedPrompt.includes('recommend')
  ) {
    return {
      role: 'assistant',
      type: 'text',
      text: `VyaparNest already showcases featured professionals like ${providerNames.join(', ')}.\n\nYou can compare service type, city, ratings, experience, and project count before sending a request.`,
    }
  }

  if (
    normalizedPrompt.includes('search') ||
    normalizedPrompt.includes('find service') ||
    normalizedPrompt.includes('near me')
  ) {
    return {
      role: 'assistant',
      type: 'text',
      text:
        'Use the top search bar to search services and keep the location set to Purnia, Bihar for local discovery.\n\nYou can also open categories and choose the closest matching service card for faster results.',
    }
  }

  if (
    normalizedPrompt.includes('dashboard') ||
    normalizedPrompt.includes('manage profile') ||
    normalizedPrompt.includes('profile')
  ) {
    return {
      role: 'assistant',
      type: 'text',
      text:
        'The Dashboard area is meant for managing your account activity, requests, and business visibility.\n\nFor partners, it connects with registration, leads, and profile progress sections.',
    }
  }

  if (
    normalizedPrompt.includes('support') ||
    normalizedPrompt.includes('help') ||
    normalizedPrompt.includes('contact')
  ) {
    return {
      role: 'assistant',
      type: 'text',
      text: `You can use sections like ${footerGroups[0].links.join(', ')} and ${footerGroups[2].links.join(', ')} from the footer for support and company information.\n\nIf you tell me your issue, I can guide you to the right page or category.`,
    }
  }

  return {
    role: 'assistant',
    type: 'text',
    text:
      'I can answer VyaparNest website-related questions about categories, partner onboarding, login, featured professionals, search, dashboard, and service discovery.\n\nTry asking something like "Which category is best for GST filing?", "How do I become a partner?", or "How does this website work?"',
  }
}

function ArrowButtonGif({ className = '' }) {
  return <img src="/fast-forward.gif" alt="" className={className} aria-hidden="true" />
}

function AiAssistMascot({ className = '' }) {
  return (
    <div className={`vn-home-ai-mascot ${className}`} aria-hidden="true">
      <span className="vn-home-ai-mascot-spark is-left">
        <Icon type="spark" className="vn-home-ai-mascot-spark-icon" />
      </span>
      <span className="vn-home-ai-mascot-spark is-right">
        <Icon type="spark" className="vn-home-ai-mascot-spark-icon" />
      </span>
      <img
        src="/vyaparnest-ai-assist-robot-user.png"
        alt=""
        className="vn-home-ai-mascot-image"
      />
    </div>
  )
}

function normalizeHash(hash) {
  if (!hash || hash === '#') {
    return homeHash
  }

  return hash
}

function getServiceProvidersHash(categoryTitle) {
  return `${serviceProvidersHashPrefix}${encodeURIComponent(categoryTitle)}`
}

function getCategoryFromServiceProvidersHash(hash) {
  if (!hash || !hash.startsWith(serviceProvidersHashPrefix)) {
    return null
  }

  const categoryTitle = decodeURIComponent(hash.slice(serviceProvidersHashPrefix.length))

  return (
    allCategoriesCards.find((category) => category.title === categoryTitle) ??
    allCategoriesCards.find(
      (category) => normalizeAiText(category.title) === normalizeAiText(categoryTitle)
    ) ??
    null
  )
}

function getServicePageTitle(category) {
  if (!category) {
    return 'Service Providers'
  }

  return /services$/i.test(category.title) ? category.title : `${category.title} Services`
}

function getCategoryServiceTypes(category) {
  if (!category) {
    return []
  }

  const cleanedDescription = category.description
    .replace(/\s*&\s*more/gi, '')
    .replace(/\s*and more/gi, '')

  const derivedTypes = cleanedDescription
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)

  if (derivedTypes.length >= 4) {
    return derivedTypes
  }

  return [...derivedTypes, 'Consultation', 'Compliance', 'Support'].filter(
    (value, index, items) => items.indexOf(value) === index
  )
}

function getProviderInitials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function getProviderBrandMark(name) {
  const firstWord = name.trim().split(/\s+/)[0] ?? 'V'
  return firstWord.slice(0, 1).toUpperCase()
}

function formatProviderPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function buildServiceProvidersForCategory(category) {
  if (!category) {
    return []
  }

  const serviceTypes = getCategoryServiceTypes(category)
  const serviceBase = category.title
  const presetProvidersByCategory = {
    Accounting: [
      { name: 'RK Accounting Solutions', location: 'Delhi, India', rating: 4.8, reviews: 124, years: 5, price: 2499 },
      { name: 'FinEdge Financials', location: 'Mumbai, India', rating: 4.7, reviews: 98, years: 7, price: 3499 },
      { name: 'Accounts Care India', location: 'Bangalore, India', rating: 4.6, reviews: 86, years: 10, price: 2999 },
      { name: 'TaxPro Advisors', location: 'Pune, India', rating: 4.5, reviews: 72, years: 6, price: 2000 },
      { name: 'SmartBooks Accounting', location: 'Hyderabad, India', rating: 4.4, reviews: 61, years: 4, price: 1999 },
      { name: 'LedgerLine Experts', location: 'Chennai, India', rating: 4.8, reviews: 118, years: 9, price: 3200 },
      { name: 'BluePeak Accountants', location: 'Kolkata, India', rating: 4.6, reviews: 77, years: 8, price: 2800 },
      { name: 'Numeric Nest Advisors', location: 'Purnia, Bihar', rating: 4.7, reviews: 69, years: 5, price: 2200 },
      { name: 'Prime Ledger Associates', location: 'Patna, Bihar', rating: 4.5, reviews: 58, years: 4, price: 1800 },
      {
        name: 'AuditBridge Partners',
        location: 'Noida, India',
        rating: 4.8,
        reviews: 104,
        years: 10,
        price: 4200,
        brandMark: 'A',
        serviceTags: ['Consultation', 'Compliance', 'Support'],
        responseRate: 95,
        completedProjects: 250,
        responseTime: 'Within 1 hour',
        serviceMode: 'Online',
        onTimeDelivery: 97,
        clientSatisfaction: 98,
        languages: ['English', 'Hindi'],
        description:
          'AuditBridge Partners delivers accounting and audit services, taxation advisory, and compliance solutions to help businesses stay accurate and compliant.',
        trustNote: 'Trusted partner for accurate accounting and compliance support.',
        aboutDescription:
          'AuditBridge Partners focuses on providing reliable and transparent accounting, audit, tax, and compliance services. Our team ensures accuracy, timely delivery, and complete confidentiality.',
        reviewDistributionCounts: [72, 24, 6, 1, 1],
        reviewTestimonials: [
          {
            name: 'Rahul Sharma',
            role: 'Verified Client',
            avatar: '/testimonial-avatars/rahul-verma.svg',
            rating: 5,
            text: 'Excellent service and timely delivery. Highly professional team and great support throughout the process.',
          },
          {
            name: 'Priya Malhotra',
            role: 'Verified Client',
            avatar: '/testimonial-avatars/priya-singh.svg',
            rating: 5,
            text: 'Very smooth accounting support with clear communication and accurate compliance handling from start to finish.',
          },
          {
            name: 'Arjun Mehta',
            role: 'Verified Client',
            avatar: '/testimonial-avatars/amit-verma.svg',
            rating: 4,
            text: 'Dependable team, good turnaround time, and strong guidance for filings and reporting.',
          },
        ],
      },
      { name: 'BalancePro Consultants', location: 'Gurgaon, India', rating: 4.6, reviews: 81, years: 6, price: 2750 },
      { name: 'Accura Tax & Books', location: 'Ahmedabad, India', rating: 4.7, reviews: 88, years: 7, price: 3100 },
      { name: 'ProfitLine Financials', location: 'Jaipur, India', rating: 4.5, reviews: 64, years: 5, price: 2400 },
    ],
    'Website Development': [
      { name: 'PixelCraft Studio', location: 'Purnia, Bihar', rating: 4.8, reviews: 120, years: 5, price: 2200 },
      { name: 'Smart Website Development', location: 'Pune, India', rating: 4.9, reviews: 146, years: 9, price: 4200 },
      { name: 'WebCraft Solutions', location: 'Patna, Bihar', rating: 4.8, reviews: 112, years: 7, price: 2800 },
      { name: 'LaunchGrid Labs', location: 'Delhi, India', rating: 4.7, reviews: 94, years: 6, price: 3200 },
      { name: 'NextFrame Digital', location: 'Bangalore, India', rating: 4.6, reviews: 73, years: 4, price: 2500 },
      { name: 'SiteForge Experts', location: 'Noida, India', rating: 4.8, reviews: 101, years: 8, price: 3600 },
      { name: 'BrandNest Web', location: 'Hyderabad, India', rating: 4.7, reviews: 88, years: 6, price: 2950 },
      { name: 'ElevatePixel Studio', location: 'Jaipur, India', rating: 4.6, reviews: 69, years: 5, price: 2400 },
    ],
    'GST & Tax Services': [
      { name: 'TaxExpert India', location: 'Purnia, Bihar', rating: 4.9, reviews: 85, years: 7, price: 3100 },
      { name: 'GST Shield Advisors', location: 'Delhi, India', rating: 4.8, reviews: 118, years: 9, price: 4200 },
      { name: 'ReturnRight CA Hub', location: 'Patna, Bihar', rating: 4.7, reviews: 76, years: 6, price: 2600 },
      { name: 'ComplyEase Financials', location: 'Mumbai, India', rating: 4.6, reviews: 71, years: 5, price: 2450 },
      { name: 'LedgerTax Partners', location: 'Noida, India', rating: 4.8, reviews: 102, years: 8, price: 3550 },
      { name: 'Accura GST Support', location: 'Ahmedabad, India', rating: 4.7, reviews: 80, years: 6, price: 2850 },
    ],
    'Digital Marketing': [
      { name: 'DigitalGrow Agency', location: 'Purnia, Bihar', rating: 4.9, reviews: 95, years: 4, price: 2900 },
      { name: 'RankSprint Media', location: 'Delhi, India', rating: 4.8, reviews: 122, years: 8, price: 4100 },
      { name: 'GrowthLab Campaigns', location: 'Bangalore, India', rating: 4.7, reviews: 89, years: 6, price: 3400 },
      { name: 'BlueOrbit Performance', location: 'Mumbai, India', rating: 4.6, reviews: 74, years: 5, price: 2750 },
      { name: 'LeadFrame Digital', location: 'Hyderabad, India', rating: 4.8, reviews: 107, years: 7, price: 3650 },
      { name: 'SocialDrive Studio', location: 'Pune, India', rating: 4.7, reviews: 83, years: 6, price: 3250 },
    ],
    'Home Services': [
      { name: 'HomeFix Experts', location: 'Purnia, Bihar', rating: 4.8, reviews: 80, years: 6, price: 2200 },
      { name: 'CleanCare Home Pros', location: 'Patna, Bihar', rating: 4.7, reviews: 67, years: 5, price: 1800 },
      { name: 'SparkNest Services', location: 'Delhi, India', rating: 4.6, reviews: 72, years: 4, price: 2100 },
      { name: 'UrbanRepair Team', location: 'Noida, India', rating: 4.8, reviews: 98, years: 8, price: 2600 },
      { name: 'QuickHelp Homes', location: 'Bangalore, India', rating: 4.7, reviews: 79, years: 5, price: 2350 },
      { name: 'SafeHands Home Support', location: 'Hyderabad, India', rating: 4.8, reviews: 104, years: 7, price: 2950 },
    ],
  }
  const presetProviders = presetProvidersByCategory[category.title] ?? null

  const genericNames = [
    `${serviceBase} Experts`,
    `Prime ${serviceBase}`,
    `${serviceBase} Hub`,
    `${serviceBase} Studio`,
    `${serviceBase} Partners`,
    `Smart ${serviceBase}`,
    `${serviceBase} Advisors`,
    `${serviceBase} Solutions`,
    `${serviceBase} Works`,
    `Trusted ${serviceBase}`,
    `${serviceBase} Edge`,
    `${serviceBase} Circle`,
    `${serviceBase} Connect`,
  ]
  const genericLocations = [
    'Purnia, Bihar',
    'Patna, Bihar',
    'Delhi, India',
    'Mumbai, India',
    'Bangalore, India',
    'Pune, India',
    'Hyderabad, India',
    'Noida, India',
    'Kolkata, India',
    'Ahmedabad, India',
    'Chennai, India',
    'Jaipur, India',
    'Gurgaon, India',
  ]
  const genericRatings = [4.8, 4.7, 4.6, 4.5, 4.4, 4.9, 4.7, 4.6, 4.5, 4.8, 4.6, 4.7, 4.5]
  const genericReviews = [126, 91, 83, 74, 62, 138, 95, 79, 68, 121, 84, 97, 73]
  const genericYears = [6, 8, 5, 4, 3, 9, 7, 5, 4, 10, 6, 7, 5]
  const genericPrices = [2499, 3499, 2999, 2200, 1999, 4200, 3150, 2600, 1800, 5100, 2750, 3300, 2300]
  const genericAccents = [
    'linear-gradient(135deg, #112e66 0%, #254f9b 100%)',
    'linear-gradient(135deg, #10141f 0%, #28354d 100%)',
    'linear-gradient(135deg, #3f165e 0%, #7750c9 100%)',
    'linear-gradient(135deg, #0b3f39 0%, #0f7e72 100%)',
    'linear-gradient(135deg, #4d3209 0%, #da9a19 100%)',
  ]
  const genericResponseRates = [95, 94, 97, 93, 96, 98, 95, 92, 94, 97, 95, 96, 93]
  const genericCompletedProjects = [250, 194, 178, 161, 149, 308, 226, 172, 143, 336, 208, 231, 166]
  const genericResponseTimes = [
    'Within 1 hour',
    'Within 2 hours',
    'Same day',
    'Within 3 hours',
    'Within 4 hours',
  ]
  const genericServiceModes = ['Online', 'Online / On-site', 'Remote-first', 'On-site Available']
  const genericDeliveryRates = [98, 97, 96, 95, 99, 98, 97, 96]
  const genericSatisfactionRates = [99, 98, 97, 96, 99, 98, 97, 98]
  const genericLanguageSets = [
    ['English', 'Hindi'],
    ['English', 'Hindi', 'Bengali'],
    ['English', 'Hindi', 'Marathi'],
    ['English', 'Hindi', 'Urdu'],
  ]

  const sourceProviders = presetProviders ?? genericNames.map((name, index) => ({
    name,
    location: genericLocations[index % genericLocations.length],
    rating: genericRatings[index % genericRatings.length],
    reviews: genericReviews[index % genericReviews.length],
    years: genericYears[index % genericYears.length],
    price: genericPrices[index % genericPrices.length],
  }))

  return sourceProviders.map((provider, index) => ({
    id: `${normalizeAiText(category.title).replace(/\s+/g, '-')}-${index + 1}`,
    name: provider.name,
    initials: getProviderInitials(provider.name),
    brandMark: provider.brandMark ?? getProviderBrandMark(provider.name),
    verified: true,
    location: provider.location,
    rating: provider.rating,
    reviews: provider.reviews,
    years: provider.years,
    price: provider.price,
    accent: genericAccents[index % genericAccents.length],
    serviceTags:
      provider.serviceTags ??
      [
        serviceTypes[index % serviceTypes.length],
        serviceTypes[(index + 1) % serviceTypes.length],
        serviceTypes[(index + 2) % serviceTypes.length],
      ].filter((value, tagIndex, items) => items.indexOf(value) === tagIndex),
    responseRate: provider.responseRate ?? genericResponseRates[index % genericResponseRates.length],
    completedProjects:
      provider.completedProjects ?? genericCompletedProjects[index % genericCompletedProjects.length],
    responseTime: provider.responseTime ?? genericResponseTimes[index % genericResponseTimes.length],
    serviceMode: provider.serviceMode ?? genericServiceModes[index % genericServiceModes.length],
    onTimeDelivery:
      provider.onTimeDelivery ?? genericDeliveryRates[index % genericDeliveryRates.length],
    clientSatisfaction:
      provider.clientSatisfaction ?? genericSatisfactionRates[index % genericSatisfactionRates.length],
    languages: provider.languages ?? genericLanguageSets[index % genericLanguageSets.length],
    description:
      provider.description ??
      `${provider.name} delivers ${category.title.toLowerCase()} solutions for startups, local businesses, and scaling brands with transparent communication and dependable execution.`,
    trustNote:
      provider.trustNote ??
      `Trusted ${category.title.toLowerCase()} partner focused on consistent quality, transparent execution, and reliable delivery.`,
    aboutDescription:
      provider.aboutDescription ??
      `${provider.name} focuses on providing reliable and transparent ${category.title.toLowerCase()} services with premium communication, timely delivery, and dependable support.`,
    reviewDistributionCounts: provider.reviewDistributionCounts ?? null,
    reviewTestimonials: provider.reviewTestimonials ?? null,
  }))
}

function getProviderProfileHash(categoryTitle, providerId = '') {
  const encodedCategory = encodeURIComponent(categoryTitle)
  const encodedProviderId = encodeURIComponent(providerId)
  return `${providerProfileHashPrefix}${encodedCategory}${encodedProviderId ? `/${encodedProviderId}` : ''}`
}

function getProviderProfileRoute(hash) {
  if (!hash || !hash.startsWith(providerProfileHashPrefix)) {
    return null
  }

  const [categorySegment = '', providerSegment = ''] = hash
    .slice(providerProfileHashPrefix.length)
    .split('/')

  return {
    categoryTitle: categorySegment
      ? decodeURIComponent(categorySegment)
      : defaultProviderProfileCategoryTitle,
    providerId: providerSegment ? decodeURIComponent(providerSegment) : defaultProviderProfileId,
  }
}

function getCategoryByTitle(categoryTitle) {
  return (
    allCategoriesCards.find((category) => category.title === categoryTitle) ??
    allCategoriesCards.find(
      (category) => normalizeAiText(category.title) === normalizeAiText(categoryTitle)
    ) ??
    allCategoriesCards.find((category) => category.title === defaultProviderProfileCategoryTitle) ??
    allCategoriesCards[0]
  )
}

function buildProviderServices(provider, category) {
  const serviceTemplatesByCategory = {
    Accounting: [
      {
        name: 'Bookkeeping',
        offset: 0,
        deliveryTime: '5 - 7 Days',
        shortDescription: 'Daily and monthly bookkeeping to keep your records accurate and organized.',
      },
      {
        name: 'Audit',
        offset: 2300,
        deliveryTime: '7 - 10 Days',
        shortDescription: 'Statutory audit, internal audit, and compliance audit for businesses.',
      },
      {
        name: 'Income Tax Reporting',
        offset: -700,
        deliveryTime: '3 - 5 Days',
        shortDescription: 'ITR filing for individuals and businesses with expert support.',
      },
      {
        name: 'GST Compliance',
        offset: 1300,
        deliveryTime: '5 - 7 Days',
        shortDescription: 'GST registration, return filing, and compliance management.',
      },
    ],
    'Website Development': [
      {
        name: 'Business Website',
        offset: 0,
        deliveryTime: '7 - 10 Days',
        shortDescription: 'Premium website design and development for trust, leads, and performance.',
      },
      {
        name: 'E-commerce Website',
        offset: 2400,
        deliveryTime: '10 - 15 Days',
        shortDescription: 'Storefront setup with product flows, catalog pages, and checkout journey support.',
      },
      {
        name: 'Website Maintenance',
        offset: -300,
        deliveryTime: 'Ongoing Support',
        shortDescription: 'Reliable updates, fixes, and ongoing improvements for active business websites.',
      },
      {
        name: 'Landing Page',
        offset: -1000,
        deliveryTime: '3 - 5 Days',
        shortDescription: 'Campaign-ready landing pages focused on speed, clarity, and conversions.',
      },
    ],
    'Digital Marketing': [
      {
        name: 'SEO Strategy',
        offset: 0,
        deliveryTime: '5 - 7 Days',
        shortDescription: 'Search-focused planning to improve visibility, rankings, and inbound lead quality.',
      },
      {
        name: 'Performance Ads',
        offset: 1600,
        deliveryTime: '7 - 10 Days',
        shortDescription: 'Campaign setup and optimization for paid traffic, leads, and measurable growth.',
      },
      {
        name: 'Social Media Management',
        offset: 900,
        deliveryTime: 'Ongoing Support',
        shortDescription: 'Content calendars, posting support, and brand-led social growth management.',
      },
      {
        name: 'Email Campaigns',
        offset: -350,
        deliveryTime: '3 - 5 Days',
        shortDescription: 'Targeted email campaign planning, creative structure, and audience engagement.',
      },
    ],
  }
  const defaultTemplates = getCategoryServiceTypes(category)
    .slice(0, 4)
    .map((serviceName, index) => ({
      name: serviceName,
      offset: index * 650,
      deliveryTime: ['5 - 7 Days', '7 - 10 Days', '10 - 14 Days', '3 - 5 Days'][index % 4],
      shortDescription: `Dedicated ${serviceName.toLowerCase()} support tailored for ${category.title.toLowerCase()} clients who want clear delivery, premium execution, and fast communication.`,
    }))
  const templates = serviceTemplatesByCategory[category.title] ?? defaultTemplates

  return templates.map((service, index) => ({
    id: `${provider.id}-service-${index + 1}`,
    name: service.name,
    startingPrice: Math.max(1200, provider.price + service.offset),
    deliveryTime: service.deliveryTime,
    shortDescription: service.shortDescription,
  }))
}

function buildProviderProjects(provider, category) {
  const projectTemplatesByCategory = {
    Accounting: [
      {
        title: 'Annual Audit Report',
        category: 'Audit',
        short_description: 'Detailed audit reporting and compliance-ready financial review support.',
        full_description:
          'Delivered an annual audit review package with reporting summaries, compliance observations, and financial documentation support for accurate business reporting.',
        thumbnail: '/service-provider-heroes/accounting-services-hero-user.png',
        gallery_images: [
          '/service-provider-heroes/accounting-services-hero-user.png',
          '/market-sections/guide-growth.png',
          '/market-sections/guide-website.png',
        ],
        technologies: ['Audit Review', 'Compliance Checks', 'Financial Reporting'],
        services_provided: ['Annual Audit', 'Report Structuring', 'Compliance Guidance'],
      },
      {
        title: 'Tax Planning for Business',
        category: 'Taxation',
        short_description: 'Business tax planning workflow with structured filing preparation.',
        full_description:
          'Prepared a business-focused tax planning structure covering timelines, filing support, deduction review, and documentation alignment for smoother compliance.',
        thumbnail: '/market-sections/guide-growth-hover.png',
        gallery_images: [
          '/market-sections/guide-growth-hover.png',
          '/service-provider-heroes/accounting-services-hero-user.png',
          '/market-sections/guide-growth.png',
        ],
        technologies: ['Tax Planning', 'Filing Support', 'Documentation'],
        services_provided: ['Tax Planning', 'Return Preparation', 'Business Advisory'],
      },
      {
        title: 'GST Compliance Support',
        category: 'Compliance',
        short_description: 'GST registration, filing, and monthly compliance assistance for businesses.',
        full_description:
          'Handled GST compliance planning and routine filing support with documentation checks, advisory touchpoints, and structured monthly updates.',
        thumbnail: '/market-sections/guide-branding-hover.png',
        gallery_images: [
          '/market-sections/guide-branding-hover.png',
          '/service-provider-heroes/accounting-services-hero-user.png',
          '/market-sections/guide-branding.png',
        ],
        technologies: ['GST Filing', 'Compliance Review', 'Advisory'],
        services_provided: ['GST Registration', 'Return Filing', 'Compliance Tracking'],
      },
      {
        title: 'Bookkeeping Management',
        category: 'Accounting',
        short_description: 'Clean bookkeeping operations with reconciled records and monthly summaries.',
        full_description:
          'Managed bookkeeping workflows with recurring entries, reconciliations, summary reporting, and record organization to keep the business finance-ready.',
        thumbnail: '/market-sections/guide-website-hover.png',
        gallery_images: [
          '/market-sections/guide-website-hover.png',
          '/service-provider-heroes/accounting-services-hero-user.png',
          '/market-sections/guide-website.png',
        ],
        technologies: ['Bookkeeping', 'Reconciliation', 'Monthly Summaries'],
        services_provided: ['Daily Bookkeeping', 'Monthly Closures', 'Ledger Support'],
      },
    ],
    'Website Development': [
      {
        title: 'Smart Business Website',
        category: 'Business Website',
        short_description: 'Premium multi-page website focused on trust, conversions, and mobile performance.',
        full_description:
          'Designed and developed a premium business website with fast loading performance, lead capture flows, FAQ sections, and SEO-ready service pages for a growing company.',
        thumbnail: '/market-sections/guide-website-hover.png',
        gallery_images: [
          '/market-sections/guide-website-hover.png',
          '/market-sections/guide-website.png',
          '/vyaparnest-website-banner.png',
        ],
        technologies: ['React', 'Responsive UI', 'SEO Setup'],
        services_provided: ['UI Design', 'Frontend Development', 'Website Launch'],
      },
      {
        title: 'Conversion Landing Page',
        category: 'Landing Page',
        short_description: 'High-converting landing page for paid campaigns and lead generation.',
        full_description:
          'Built a focused landing page with offer sections, sticky calls-to-action, testimonial blocks, and analytics event tracking for performance campaigns.',
        thumbnail: '/market-sections/guide-growth-hover.png',
        gallery_images: [
          '/market-sections/guide-growth-hover.png',
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_31 PM.png',
          '/market-sections/guide-growth.png',
        ],
        technologies: ['Landing Page UX', 'Analytics', 'Lead Forms'],
        services_provided: ['Landing Page Design', 'Copy Layout', 'Conversion Tracking'],
      },
      {
        title: 'E-commerce Storefront',
        category: 'E-commerce',
        short_description: 'Clean storefront for product discovery, checkout, and trust-building.',
        full_description:
          'Delivered a responsive e-commerce storefront with polished product sections, offer banners, checkout flows, and support for catalog-driven navigation.',
        thumbnail: '/market-sections/guide-branding-hover.png',
        gallery_images: [
          '/market-sections/guide-branding-hover.png',
          '/market-sections/guide-branding.png',
          '/web-developer.gif',
        ],
        technologies: ['Storefront UI', 'Product UX', 'Checkout Journey'],
        services_provided: ['Design System', 'Store Layout', 'Responsive Build'],
      },
      {
        title: 'Portfolio Experience',
        category: 'Portfolio',
        short_description: 'Minimal portfolio for personal branding and premium presentation.',
        full_description:
          'Created a portfolio website with animated sections, image galleries, trust indicators, and inquiry actions for a creative professional.',
        thumbnail: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_04 PM.png',
        gallery_images: [
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_04 PM.png',
          '/market-sections/guide-branding.png',
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_25_44 PM.png',
        ],
        technologies: ['Portfolio UX', 'Motion', 'Responsive Layout'],
        services_provided: ['Creative Direction', 'Portfolio Build', 'Performance Tuning'],
      },
      {
        title: 'Knowledge Blog Platform',
        category: 'Blog',
        short_description: 'Editorial blog layout with article templates and search-friendly structure.',
        full_description:
          'Set up a scalable content section with topic pages, article cards, author blocks, and call-to-action components for inbound discovery.',
        thumbnail: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_25_44 PM.png',
        gallery_images: [
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_25_44 PM.png',
          '/market-sections/guide-website.png',
          '/market-sections/guide-growth.png',
        ],
        technologies: ['Content Architecture', 'Editorial UI', 'SEO Content'],
        services_provided: ['Blog Design', 'Content Layouts', 'Internal Linking'],
      },
    ],
    'Digital Marketing': [
      {
        title: 'Performance Campaign Dashboard',
        category: 'Marketing Dashboard',
        short_description: 'Multi-channel growth dashboard for campaign visibility and ROI tracking.',
        full_description:
          'Structured a campaign performance dashboard with SEO, email, paid ads, and audience metrics to guide faster growth decisions.',
        thumbnail: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_19 PM.png',
        gallery_images: [
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_19 PM.png',
          '/market-sections/guide-marketing-hover.png',
          '/market-sections/guide-marketing.png',
        ],
        technologies: ['SEO', 'Paid Media', 'Analytics'],
        services_provided: ['Campaign Planning', 'Dashboard Reporting', 'Conversion Review'],
      },
      {
        title: 'Brand Strategy Sprint',
        category: 'Graphic Design',
        short_description: 'Brand-led campaign direction for premium positioning.',
        full_description:
          'Defined messaging direction, creative system, campaign visuals, and reporting touchpoints for a business growth sprint.',
        thumbnail: '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_04 PM.png',
        gallery_images: [
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_04 PM.png',
          '/market-sections/guide-branding-hover.png',
          '/market-sections/guide-branding.png',
        ],
        technologies: ['Brand Strategy', 'Creative Planning', 'Campaign Assets'],
        services_provided: ['Strategy', 'Creative Direction', 'Campaign Rollout'],
      },
      {
        title: 'Lead Funnel Landing Experience',
        category: 'Landing Page',
        short_description: 'Optimized funnel page for qualified lead generation.',
        full_description:
          'Created a premium lead funnel experience with segmented copy, conversion blocks, and follow-up journey touchpoints.',
        thumbnail: '/market-sections/guide-growth-hover.png',
        gallery_images: [
          '/market-sections/guide-growth-hover.png',
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_31 PM.png',
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_25_44 PM.png',
        ],
        technologies: ['Funnel UX', 'Paid Ads', 'Remarketing'],
        services_provided: ['Landing Page Strategy', 'Copy Structure', 'Tracking Setup'],
      },
    ],
    default: [
      {
        title: 'Premium Service Experience',
        category: 'Business Website',
        short_description: 'Responsive service showcase with premium visual presentation.',
        full_description:
          'Crafted a polished service experience that highlights offerings, builds trust, and supports smooth inquiry generation across desktop and mobile.',
        thumbnail: category.heroImage ?? category.image ?? '/market-sections/guide-website.png',
        gallery_images: [
          category.heroImage ?? category.image ?? '/market-sections/guide-website.png',
          '/market-sections/guide-growth.png',
          '/market-sections/guide-branding.png',
        ],
        technologies: ['Responsive Design', 'Content Strategy', 'Lead Experience'],
        services_provided: ['Consultation', 'Design', 'Launch Support'],
      },
      {
        title: 'Client Conversion Microsite',
        category: 'Landing Page',
        short_description: 'Compact microsite built for focused campaign responses.',
        full_description:
          'Developed a lightweight conversion experience with clear messaging, trust-building content, and prominent request actions.',
        thumbnail: '/market-sections/guide-growth-hover.png',
        gallery_images: [
          '/market-sections/guide-growth-hover.png',
          '/market-sections/guide-growth.png',
          category.heroImage ?? category.image ?? '/market-sections/guide-branding.png',
        ],
        technologies: ['UX Writing', 'Conversion Layouts', 'Responsive Delivery'],
        services_provided: ['Microsite Design', 'CTA Planning', 'Responsive QA'],
      },
      {
        title: 'Premium Visual Refresh',
        category: 'Graphic Design',
        short_description: 'Visual redesign package for stronger first impressions.',
        full_description:
          'Refreshed the presentation style, messaging hierarchy, and supporting visuals to make the service offering easier to trust and faster to understand.',
        thumbnail: '/market-sections/guide-branding-hover.png',
        gallery_images: [
          '/market-sections/guide-branding-hover.png',
          '/market-sections/guide-branding.png',
          '/guide-hover-images/ChatGPT Image Jul 22, 2026, 11_26_04 PM.png',
        ],
        technologies: ['Visual Direction', 'Design Polish', 'Presentation Assets'],
        services_provided: ['Creative Review', 'Interface Polish', 'Brand Alignment'],
      },
    ],
  }

  const templates = projectTemplatesByCategory[category.title] ?? projectTemplatesByCategory.default

  return templates.map((project, index) => ({
    id: `${provider.id}-project-${index + 1}`,
    provider_id: provider.id,
    title: project.title,
    category: project.category,
    short_description: project.short_description,
    full_description: project.full_description,
    thumbnail: project.thumbnail,
    gallery_images: project.gallery_images,
    technologies: project.technologies,
    services_provided: project.services_provided,
    project_url: '',
    completion_date: ['June 2026', 'May 2026', 'April 2026', 'March 2026', 'February 2026'][index % 5],
    status: index < Math.min(4, templates.length) ? 'active' : 'draft',
    created_at: ['2026-06-18', '2026-05-24', '2026-04-12', '2026-03-20', '2026-02-16'][index % 5],
  }))
}

function buildProviderReviewDistribution(provider) {
  if (Array.isArray(provider.reviewDistributionCounts) && provider.reviewDistributionCounts.length === 5) {
    const total = provider.reviewDistributionCounts.reduce((sum, count) => sum + count, 0)
    const labels = ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star']

    return labels.map((label, index) => ({
      label,
      count: provider.reviewDistributionCounts[index],
      percentage:
        total > 0 ? Math.max(2, Math.round((provider.reviewDistributionCounts[index] / total) * 100)) : 0,
    }))
  }

  const total = provider.reviews
  const weights = provider.rating >= 4.8 ? [0.7, 0.19, 0.07, 0.03, 0.01] : [0.62, 0.23, 0.09, 0.04, 0.02]
  const labels = ['5 Star', '4 Star', '3 Star', '2 Star', '1 Star']
  const counts = weights.map((weight) => Math.max(0, Math.round(total * weight)))
  const difference = total - counts.reduce((sum, count) => sum + count, 0)

  if (difference !== 0) {
    counts[0] += difference
  }

  return labels.map((label, index) => ({
    label,
    count: counts[index],
    percentage: total > 0 ? Math.max(2, Math.round((counts[index] / total) * 100)) : 0,
  }))
}

function buildProviderReviews(provider) {
  if (Array.isArray(provider.reviewTestimonials) && provider.reviewTestimonials.length > 0) {
    return provider.reviewTestimonials.map((review, index) => ({
      id: `${provider.id}-review-${index + 1}`,
      name: review.name,
      role: review.role,
      avatar: review.avatar,
      rating: review.rating,
      text: review.text,
    }))
  }

  const reviewAuthors = [
    { name: 'Rahul Sharma', role: 'Verified Purchase', avatar: '/testimonial-avatars/rahul-verma.svg' },
    { name: 'Priya Singh', role: 'Startup Founder', avatar: '/testimonial-avatars/priya-singh.svg' },
    { name: 'Amit Verma', role: 'Business Owner', avatar: '/testimonial-avatars/amit-verma.svg' },
  ]
  const reviewRatings = [5, 5, Math.max(4, Math.round(provider.rating))]
  const reviewTexts = [
    `${provider.name} delivered exactly what was promised. The team was responsive, structured, and easy to work with throughout the project.`,
    `Great communication, premium execution, and smooth delivery. I appreciated the clarity on timelines and the overall quality of the service.`,
    `Very professional experience from discovery to delivery. The final output felt polished and aligned with our business goals.`,
  ]

  return reviewAuthors.map((author, index) => ({
    id: `${provider.id}-review-${index + 1}`,
    name: author.name,
    role: author.role,
    avatar: author.avatar,
    rating: reviewRatings[index],
    text: reviewTexts[index],
  }))
}

function getProviderServiceIconType(serviceName, categoryTitle) {
  const normalizedServiceName = normalizeAiText(serviceName)

  if (
    normalizedServiceName.includes('bookkeeping') ||
    normalizedServiceName.includes('report') ||
    normalizedServiceName.includes('content') ||
    normalizedServiceName.includes('blog')
  ) {
    return 'document'
  }

  if (
    normalizedServiceName.includes('audit') ||
    normalizedServiceName.includes('consult') ||
    normalizedServiceName.includes('strategy')
  ) {
    return 'users'
  }

  if (
    normalizedServiceName.includes('tax') ||
    normalizedServiceName.includes('gst') ||
    normalizedServiceName.includes('compliance')
  ) {
    return 'calendar'
  }

  if (
    normalizedServiceName.includes('website') ||
    normalizedServiceName.includes('landing') ||
    normalizedServiceName.includes('seo')
  ) {
    return 'laptop'
  }

  if (
    normalizedServiceName.includes('campaign') ||
    normalizedServiceName.includes('marketing') ||
    normalizedServiceName.includes('social')
  ) {
    return 'compare'
  }

  if (normalizedServiceName.includes('support') || normalizedServiceName.includes('chat')) {
    return 'message-circle'
  }

  if (
    normalizeAiText(categoryTitle).includes('website') ||
    normalizeAiText(categoryTitle).includes('marketing')
  ) {
    return 'laptop'
  }

  return 'briefcase'
}

function getActivePrimaryNavKey(currentScreen, activeHash) {
  if (currentScreen === 'ai-assist' || activeHash === aiAssistHash) {
    return 'ai-assist'
  }

  if (activeHash.startsWith(providerProfileHashPrefix)) {
    return 'dashboard'
  }

  if (
    currentScreen === 'categories' ||
    currentScreen === 'service-providers' ||
    activeHash === categoriesHash ||
    activeHash === '#categories' ||
    activeHash.startsWith(serviceProvidersHashPrefix)
  ) {
    return 'categories'
  }

  if (activeHash === workflowHash) {
    return 'ai-assist'
  }

  return 'home'
}

function Icon({ type, className = '' }) {
  const sharedProps = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (type) {
    case 'menu':
      return (
        <svg {...sharedProps}>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg {...sharedProps}>
          <path d="m6 6 12 12" />
          <path d="M18 6 6 18" />
        </svg>
      )
    case 'search':
      return (
        <svg {...sharedProps}>
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.2-4.2" />
        </svg>
      )
    case 'location':
      return (
        <svg {...sharedProps}>
          <path d="M12 20s6-5 6-10a6 6 0 1 0-12 0c0 5 6 10 6 10Z" />
          <circle cx="12" cy="10" r="2.2" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 7 5 5-5 5" />
        </svg>
      )
    case 'chevron-down':
      return (
        <svg {...sharedProps}>
          <path d="m6.5 9.5 5.5 5 5.5-5" />
        </svg>
      )
    case 'plus':
      return (
        <svg {...sharedProps}>
          <path d="M12 5.2v13.6" />
          <path d="M5.2 12h13.6" />
        </svg>
      )
    case 'message-circle':
      return (
        <svg {...sharedProps}>
          <path d="M7.2 17.8 4.8 19l.6-2.7a7.1 7.1 0 1 1 1.8 1.5Z" />
        </svg>
      )
    case 'more-vertical':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
          <circle cx="12" cy="17.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'users':
      return (
        <svg {...sharedProps}>
          <circle cx="9" cy="9" r="2.6" />
          <circle cx="16.6" cy="10.4" r="2.1" />
          <path d="M4.8 18.2a4.8 4.8 0 0 1 8.4-2.8" />
          <path d="M14.3 18.2a4.1 4.1 0 0 1 5-3.6" />
        </svg>
      )
    case 'laptop':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="5" width="16" height="10.5" rx="2.3" />
          <path d="M2.8 18.3h18.4" />
        </svg>
      )
    case 'palette':
      return (
        <svg {...sharedProps}>
          <path d="M12 4.5c-4.8 0-8.5 3.1-8.5 7.1 0 2.6 1.9 4.4 4.5 4.4h1.2c.9 0 1.5.5 1.5 1.4 0 1.2 1 2 2.2 2 4.5 0 8.1-3.4 8.1-7.7 0-4-3.8-7.2-9-7.2Z" />
          <circle cx="8.1" cy="11.1" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="11.8" cy="8.4" r="0.8" fill="currentColor" stroke="none" />
          <circle cx="15.4" cy="9.2" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.8 13.4 8l4.2 1.4-4.2 1.4-1.4 4.2-1.4-4.2-4.2-1.4L10.6 8 12 3.8Z" />
          <path d="m18.8 13.8.6 1.7 1.8.6-1.8.6-.6 1.8-.6-1.8-1.8-.6 1.8-.6.6-1.7Z" />
        </svg>
      )
    case 'document':
      return (
        <svg {...sharedProps}>
          <path d="M8 4.8h6.1L18 8.7V19a2 2 0 0 1-2 2H8A2 2 0 0 1 6 19V6.8a2 2 0 0 1 2-2Z" />
          <path d="M14.1 4.8v3.9H18" />
          <path d="M9.2 11h5.8" />
          <path d="M9.2 14.4h5.8" />
        </svg>
      )
    case 'home':
      return (
        <svg {...sharedProps}>
          <path d="M4.8 18.5 12 6l7.2 12.5" />
          <path d="M8.2 18.5v-5.2h7.6v5.2" />
        </svg>
      )
    case 'drawer-home':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="m3.3 11.1 8-7.1a1 1 0 0 1 1.4 0l8 7.1v8.1a1.7 1.7 0 0 1-1.7 1.7h-4.2v-6.1H9.2v6.1H5a1.7 1.7 0 0 1-1.7-1.7v-8.1Z" />
        </svg>
      )
    case 'drawer-categories':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="4" width="6.5" height="6.5" rx="1.2" />
          <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.2" />
          <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.2" />
          <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.2" />
        </svg>
      )
    case 'drawer-ai':
      return (
        <svg {...sharedProps}>
          <path d="M10.6 3.5 12.5 9l5.5 1.9-5.5 1.9-1.9 5.5-1.9-5.5-5.5-1.9L8.7 9l1.9-5.5Z" />
          <path d="m18.4 15.1.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
        </svg>
      )
    case 'drawer-about':
      return (
        <svg {...sharedProps}>
          <circle cx="9.1" cy="9" r="2.8" />
          <circle cx="16.7" cy="10.1" r="2.2" />
          <path d="M4.3 19.2a5.1 5.1 0 0 1 9.6-2.4" />
          <path d="M14.4 18.8a4.3 4.3 0 0 1 5.4-3.8" />
        </svg>
      )
    case 'graduation':
      return (
        <svg {...sharedProps}>
          <path d="m3.8 9.8 8.2-4.3 8.2 4.3-8.2 4.3-8.2-4.3Z" />
          <path d="M7 12.4V16c0 1.8 2.2 3.2 5 3.2s5-1.4 5-3.2v-3.6" />
          <path d="M20.2 10.8v4.7" />
        </svg>
      )
    case 'calendar':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="5.8" width="16" height="14.2" rx="2.4" />
          <path d="M4 10.2h16" />
          <path d="M8 4v3.2" />
          <path d="M16 4v3.2" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="7.2" width="16" height="11" rx="2.4" />
          <path d="M9 7.2V5.8A1.8 1.8 0 0 1 10.8 4h2.4A1.8 1.8 0 0 1 15 5.8v1.4" />
          <path d="M4 12h16" />
        </svg>
      )
    case 'compare':
      return (
        <svg {...sharedProps}>
          <path d="M7 18V8" />
          <path d="M12 18V4" />
          <path d="M17 18v-6" />
        </svg>
      )
    case 'send':
      return (
        <svg {...sharedProps}>
          <path d="m4.5 11.6 14.8-6.2-3.4 13.2-4.1-4.1-4.7-2.9Z" />
          <path d="m11.8 14.5 2.2-2.2" />
        </svg>
      )
    case 'paperclip':
      return (
        <svg {...sharedProps}>
          <path d="m9.4 12.5 5.4-5.4a2.8 2.8 0 1 1 4 4l-7.2 7.3a4.4 4.4 0 1 1-6.2-6.3l7.1-7" />
        </svg>
      )
    case 'thumbs-up':
      return (
        <svg {...sharedProps}>
          <path d="M8.2 10.6V19H5.4a1.4 1.4 0 0 1-1.4-1.4v-5.6a1.4 1.4 0 0 1 1.4-1.4h2.8Z" />
          <path d="M8.2 18.8h6.1a2 2 0 0 0 1.9-1.4l1.3-4.1a2 2 0 0 0-1.9-2.6h-3.5l.4-2.2a2.3 2.3 0 0 0-4.3-1.5l-2 3.6" />
        </svg>
      )
    case 'thumbs-down':
      return (
        <svg {...sharedProps}>
          <path d="M8.2 13.4V5H5.4A1.4 1.4 0 0 0 4 6.4V12a1.4 1.4 0 0 0 1.4 1.4h2.8Z" />
          <path d="M8.2 5.2h6.1a2 2 0 0 1 1.9 1.4l1.3 4.1a2 2 0 0 1-1.9 2.6h-3.5l.4 2.2a2.3 2.3 0 0 1-4.3 1.5l-2-3.6" />
        </svg>
      )
    case 'copy':
      return (
        <svg {...sharedProps}>
          <rect x="9" y="9" width="9" height="10" rx="2" />
          <path d="M7 15H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" />
        </svg>
      )
    case 'double-check':
      return (
        <svg {...sharedProps}>
          <path d="m5 13.2 2.5 2.5 4.6-4.8" />
          <path d="m10.1 13.2 2.5 2.5 6.4-6.8" />
        </svg>
      )
    case 'trash':
      return (
        <svg {...sharedProps}>
          <path d="M4.8 7.2h14.4" />
          <path d="M9.3 7.2V5.7A1.7 1.7 0 0 1 11 4h2a1.7 1.7 0 0 1 1.7 1.7v1.5" />
          <path d="m7.2 7.2.7 11a1.8 1.8 0 0 0 1.8 1.7h4.6a1.8 1.8 0 0 0 1.8-1.7l.7-11" />
          <path d="M10 10.8v5.1" />
          <path d="M14 10.8v5.1" />
        </svg>
      )
    case 'check-circle':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.4" />
          <path d="m8.5 12.2 2.2 2.3 4.8-5" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.8 6.2 6.2v4.1c0 4.2 2.5 7.8 5.8 9.2 3.3-1.4 5.8-5 5.8-9.2V6.2L12 3.8Z" />
          <path d="m9.5 11.9 1.8 1.8 3.3-3.6" />
        </svg>
      )
    case 'headset':
      return (
        <svg {...sharedProps}>
          <path d="M5 13a7 7 0 0 1 14 0" />
          <rect x="4.3" y="12.4" width="3.4" height="5.6" rx="1.5" />
          <rect x="16.3" y="12.4" width="3.4" height="5.6" rx="1.5" />
          <path d="M16.3 18a2.1 2.1 0 0 1-2.1 2.1H12" />
        </svg>
      )
    case 'star':
      return (
        <svg {...sharedProps}>
          <path d="m12 4.6 2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 4.6Z" />
        </svg>
      )
    case 'quote':
      return (
        <svg {...sharedProps}>
          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2H4C2.75 3 2 3.75 2 5v6c0 1.25.75 2 2 2h1c0 3-1 4-3 5" />
          <path d="M14 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v6c0 1.25.75 2 2 2h1c0 3-1 4-3 5" />
        </svg>
      )
    case 'play':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m10 8.8 5 3.2-5 3.2Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'facebook':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M13.8 20v-6.2h2.4l.4-2.8h-2.8V9.2c0-.8.2-1.4 1.5-1.4H17V5.3c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 4v1.8H8.6v2.8h2.3V20h2.9Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...sharedProps}>
          <rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.3" />
          <circle cx="12" cy="12" r="3.7" />
          <circle cx="17.2" cy="6.9" r="0.8" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="6.4" cy="7.2" r="1.8" />
          <path d="M4.9 10.1h2.9V19H4.9v-8.9Zm4.8 0h2.8v1.2h.1c.4-.8 1.4-1.6 3-1.6 3.2 0 3.8 2.1 3.8 4.9V19h-3v-3.8c0-.9 0-2.1-1.3-2.1s-1.5 1-1.5 2V19H9.7v-8.9Z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...sharedProps}>
          <rect x="3.7" y="6.7" width="16.6" height="10.6" rx="3.2" />
          <path d="m10.3 9.6 5.2 2.4-5.2 2.4V9.6Z" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'check':
      return (
        <svg {...sharedProps}>
          <path d="m6.8 12.2 3.2 3.1 7.2-7.3" />
        </svg>
      )
    case 'grid-dots':
      return (
        <svg {...sharedProps}>
          <circle cx="7" cy="7" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="12" cy="7" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="17" cy="7" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="7" cy="12" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="17" cy="12" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="7" cy="17" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none" />
          <circle cx="17" cy="17" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      )
    default:
      return null
  }
}

function PublicHomePage({
  onOpenPartnerRegistration,
  onOpenPartnerLogin,
  partnerLoginRequestId,
  currentScreen = 'home',
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [mobileSearchTerm, setMobileSearchTerm] = useState('')
  const [partnerMenuOpen, setPartnerMenuOpen] = useState(false)
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false)
  const [categoriesPageFilterOpen, setCategoriesPageFilterOpen] = useState(false)
  const [categoriesPageSearchTerm, setCategoriesPageSearchTerm] = useState('')
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState('All Categories')
  const [visibleCategoriesLimit, setVisibleCategoriesLimit] = useState(categoriesPageSize)
  const [aiConversations, setAiConversations] = useState(initialAiAssistConversations)
  const [selectedAiConversationId, setSelectedAiConversationId] = useState(
    initialAiAssistConversations[0].id
  )
  const [aiComposerText, setAiComposerText] = useState('')
  const [aiMessageFeedback, setAiMessageFeedback] = useState({})
  const [copiedAiMessageId, setCopiedAiMessageId] = useState(null)
  const [partnerLoginOpen, setPartnerLoginOpen] = useState(false)
  const [providerSortOption, setProviderSortOption] = useState('popularity')
  const [providerLocationSearch, setProviderLocationSearch] = useState('')
  const [providerMinPrice, setProviderMinPrice] = useState('')
  const [providerMaxPrice, setProviderMaxPrice] = useState('')
  const [selectedProviderServiceTypes, setSelectedProviderServiceTypes] = useState([])
  const [selectedProviderPriceBuckets, setSelectedProviderPriceBuckets] = useState([])
  const [providerResultsPage, setProviderResultsPage] = useState(1)
  const [selectedProfileServiceId, setSelectedProfileServiceId] = useState(null)
  const [selectedServiceDetailId, setSelectedServiceDetailId] = useState(null)
  const [selectedPortfolioCategoryFilter, setSelectedPortfolioCategoryFilter] = useState('All')
  const [selectedPortfolioProject, setSelectedPortfolioProject] = useState(null)
  const [selectedProviderReviewIndex, setSelectedProviderReviewIndex] = useState(0)
  const [activeHash, setActiveHash] = useState(() =>
    typeof window === 'undefined' ? homeHash : normalizeHash(window.location.hash)
  )
  const partnerMenuRef = useRef(null)
  const categoriesNavRef = useRef(null)
  const categoriesMenuRef = useRef(null)
  const categoriesPageFilterRef = useRef(null)
  const categoriesPageSectionRef = useRef(null)
  const categoriesPageCardRefs = useRef(new Map())
  const aiThreadRef = useRef(null)
  const aiReplyTimeoutsRef = useRef([])
  const aiCopyResetTimeoutRef = useRef(null)
  const providerPortfolioSectionRef = useRef(null)
  const providerContactCardRef = useRef(null)
  const isCategoriesScreen = currentScreen === 'categories'
  const isServiceProvidersScreen = currentScreen === 'service-providers'
  const isProviderProfileScreen = activeHash.startsWith(providerProfileHashPrefix)
  const isAiAssistScreen = currentScreen === 'ai-assist'
  const activePrimaryNavKey = getActivePrimaryNavKey(currentScreen, activeHash)
  const providerProfileRoute = getProviderProfileRoute(activeHash)
  const selectedCategory =
    selectedCategoryTitle === 'All Categories'
      ? null
      : categoryFilterOptions.find((category) => category.title === selectedCategoryTitle) ?? null
  const filteredCategoryOptions = categoryFilterOptions.filter((category) =>
    category.title.toLowerCase().includes(categoriesPageSearchTerm.trim().toLowerCase())
  )
  const mobileSearchResults = allCategoriesCards.filter((category) =>
    category.title.toLowerCase().includes(mobileSearchTerm.trim().toLowerCase())
  )
  const displayedCategories = selectedCategory
    ? categoryFilterOptions.filter((category) => category.title === selectedCategory.title)
    : allCategoriesCards
  const visibleCategories = displayedCategories.slice(0, visibleCategoriesLimit)
  const hasMoreCategories = visibleCategories.length < displayedCategories.length
  const selectedServiceCategory = getCategoryFromServiceProvidersHash(activeHash) ?? allCategoriesCards[0]
  const serviceProviderTypes = getCategoryServiceTypes(selectedServiceCategory)
  const serviceProviderEntries = buildServiceProvidersForCategory(selectedServiceCategory)
  const selectedAiConversation =
    aiConversations.find((conversation) => conversation.id === selectedAiConversationId) ??
    aiConversations[0]
  const visibleCategoryCount = displayedCategories.length
  const categoriesPageCountLabel = `Explore ${visibleCategoryCount} trusted ${
    visibleCategoryCount === 1 ? 'service' : 'services'
  } to grow your business`
  const providerProfileCategory = getCategoryByTitle(
    providerProfileRoute?.categoryTitle ?? defaultProviderProfileCategoryTitle
  )
  const providerProfileEntries = buildServiceProvidersForCategory(providerProfileCategory)
  const activeProviderProfile = isProviderProfileScreen
    ? providerProfileEntries.find((provider) => provider.id === providerProfileRoute?.providerId) ??
      providerProfileEntries.find((provider) => provider.id === defaultProviderProfileId) ??
      providerProfileEntries[0] ??
      null
    : null
  let managedProviderProfileDesign = null
  if (activeProviderProfile && typeof window !== 'undefined') {
    try {
      const savedDesigns = JSON.parse(window.localStorage.getItem(providerProfileDesignsStorageKey) || '{}')
      managedProviderProfileDesign = Object.values(savedDesigns).find(
        (design) => design?.providerName === activeProviderProfile.name || design?.businessName === activeProviderProfile.name
      ) || null
    } catch {
      managedProviderProfileDesign = null
    }
  }
  const providerProfileServices = activeProviderProfile
    ? buildProviderServices(activeProviderProfile, providerProfileCategory)
    : []
  const activeProviderService =
    providerProfileServices.find((service) => service.id === selectedProfileServiceId) ??
    providerProfileServices[0] ??
    null
  const selectedServiceDetail =
    providerProfileServices.find((service) => service.id === selectedServiceDetailId) ?? null
  const providerProjects = activeProviderProfile
    ? buildProviderProjects(activeProviderProfile, providerProfileCategory).filter(
        (project) => project.status === 'active'
      )
    : []
  const providerPortfolioFilters = Array.from(new Set(providerProjects.map((project) => project.category)))
  const visibleProviderProjects =
    selectedPortfolioCategoryFilter === 'All'
      ? providerProjects
      : providerProjects.filter((project) => project.category === selectedPortfolioCategoryFilter)
  const providerReviewDistribution = activeProviderProfile
    ? buildProviderReviewDistribution(activeProviderProfile)
    : []
  const providerReviews = activeProviderProfile ? buildProviderReviews(activeProviderProfile) : []
  const activeProviderReview =
    providerReviews[selectedProviderReviewIndex] ?? providerReviews[0] ?? null
  const filteredServiceProviders = serviceProviderEntries
    .filter((provider) => {
      if (
        selectedProviderServiceTypes.length > 0 &&
        !selectedProviderServiceTypes.some((serviceType) => provider.serviceTags.includes(serviceType))
      ) {
        return false
      }

      if (
        providerLocationSearch.trim() &&
        !provider.location.toLowerCase().includes(providerLocationSearch.trim().toLowerCase())
      ) {
        return false
      }

      if (selectedProviderPriceBuckets.length > 0) {
        const matchesBucket = selectedProviderPriceBuckets.some((bucketKey) => {
          const bucket = serviceProviderPriceBuckets.find((item) => item.key === bucketKey)
          return bucket ? provider.price >= bucket.min && provider.price <= bucket.max : false
        })

        if (!matchesBucket) {
          return false
        }
      }

      if (providerMinPrice && provider.price < Number(providerMinPrice)) {
        return false
      }

      if (providerMaxPrice && provider.price > Number(providerMaxPrice)) {
        return false
      }

      return true
    })
    .sort((leftProvider, rightProvider) => {
      switch (providerSortOption) {
        case 'rating':
          return rightProvider.rating - leftProvider.rating
        case 'price-low':
          return leftProvider.price - rightProvider.price
        case 'price-high':
          return rightProvider.price - leftProvider.price
        case 'experience':
          return rightProvider.years - leftProvider.years
        case 'popularity':
        default:
          return rightProvider.reviews - leftProvider.reviews
      }
    })
  const totalProviderPages = Math.max(1, Math.ceil(filteredServiceProviders.length / 5))
  const safeProviderResultsPage = Math.min(providerResultsPage, totalProviderPages)
  const paginatedServiceProviders = filteredServiceProviders.slice(
    (safeProviderResultsPage - 1) * 5,
    safeProviderResultsPage * 5
  )
  const visibleProviderPageNumbers = Array.from({ length: totalProviderPages }, (_, index) => index + 1).slice(
    0,
    5
  )
  const showingProvidersFrom = filteredServiceProviders.length === 0 ? 0 : (safeProviderResultsPage - 1) * 5 + 1
  const showingProvidersTo = Math.min(safeProviderResultsPage * 5, filteredServiceProviders.length)
  const serviceProviderAvailabilityLabel = selectedServiceCategory.servicesLabel.replace(
    /\bServices\b/i,
    'Service Providers Available'
  )
  const serviceProviderTotalLabel = selectedServiceCategory.servicesLabel.replace(/\bServices\b/i, 'Providers')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const syncHash = () => {
      setActiveHash(normalizeHash(window.location.hash))
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  useEffect(() => {
    if (partnerLoginRequestId > 0) {
      setPartnerLoginOpen(true)
      setMobileNavOpen(false)
      setPartnerMenuOpen(false)
      setCategoriesMenuOpen(false)
    }
  }, [partnerLoginRequestId])

  useEffect(() => {
    setCategoriesMenuOpen(false)
    setMobileSearchOpen(false)
    setMobileSearchTerm('')
  }, [currentScreen])

  useEffect(() => {
    if (!mobileNavOpen || typeof document === 'undefined') {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileNavOpen])

  useEffect(() => {
    if (!isCategoriesScreen) {
      setCategoriesPageFilterOpen(false)
      setCategoriesPageSearchTerm('')
    }
  }, [isCategoriesScreen])

  useEffect(() => {
    setProviderLocationSearch('')
    setProviderMinPrice('')
    setProviderMaxPrice('')
    setSelectedProviderServiceTypes([])
    setSelectedProviderPriceBuckets([])
    setProviderSortOption('popularity')
    setProviderResultsPage(1)
  }, [selectedServiceCategory.title])

  useEffect(() => {
    if (providerResultsPage > totalProviderPages) {
      setProviderResultsPage(totalProviderPages)
    }
  }, [providerResultsPage, totalProviderPages])

  useEffect(() => {
    if (!activeProviderProfile) {
      setSelectedProfileServiceId(null)
      setSelectedServiceDetailId(null)
      setSelectedPortfolioCategoryFilter('All')
      setSelectedPortfolioProject(null)
      setSelectedProviderReviewIndex(0)
      return
    }

    setSelectedProfileServiceId(providerProfileServices[0]?.id ?? null)
    setSelectedServiceDetailId(null)
    setSelectedPortfolioCategoryFilter('All')
    setSelectedPortfolioProject(null)
    setSelectedProviderReviewIndex(0)
  }, [activeProviderProfile?.id, providerProfileCategory.title])

  useEffect(() => {
    if ((!selectedPortfolioProject && !selectedServiceDetail) || typeof window === 'undefined') {
      return undefined
    }

    const previousOverflow = document.body.style.overflow

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedPortfolioProject(null)
        setSelectedServiceDetailId(null)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
    }
  }, [selectedPortfolioProject, selectedServiceDetail])

  useEffect(() => {
    if (selectedProviderReviewIndex < providerReviews.length) {
      return
    }

    setSelectedProviderReviewIndex(0)
  }, [providerReviews.length, selectedProviderReviewIndex])

  useEffect(() => {
    if (!partnerLoginOpen) {
      return undefined
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPartnerLoginOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [partnerLoginOpen])

  useEffect(() => {
    if (!partnerMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (partnerMenuRef.current && !partnerMenuRef.current.contains(event.target)) {
        setPartnerMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPartnerMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [partnerMenuOpen])

  useEffect(() => {
    if (!categoriesMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (categoriesNavRef.current && !categoriesNavRef.current.contains(event.target)) {
        setCategoriesMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCategoriesMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [categoriesMenuOpen])

  useEffect(() => {
    if (!categoriesPageFilterOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (categoriesPageFilterRef.current && !categoriesPageFilterRef.current.contains(event.target)) {
        setCategoriesPageFilterOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCategoriesPageFilterOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [categoriesPageFilterOpen])

  useEffect(() => {
    if (!isProviderProfileScreen || typeof window === 'undefined') {
      return
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [isProviderProfileScreen, activeProviderProfile?.id])

  useEffect(() => {
    if (!isAiAssistScreen) {
      return undefined
    }

    const syncOverflow = () => {
      document.body.style.overflow = window.innerWidth > 1200 ? 'hidden' : ''
      document.body.style.background = '#ffffff'
    }

    syncOverflow()
    window.addEventListener('resize', syncOverflow)

    return () => {
      document.body.style.overflow = ''
      document.body.style.background = ''
      window.removeEventListener('resize', syncOverflow)
    }
  }, [isAiAssistScreen])

  useEffect(() => {
    if (!selectedAiConversation || !aiThreadRef.current) {
      return
    }

    aiThreadRef.current.scrollTop = aiThreadRef.current.scrollHeight
  }, [selectedAiConversation])

  useEffect(
    () => () => {
      aiReplyTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
      aiReplyTimeoutsRef.current = []
      if (aiCopyResetTimeoutRef.current) {
        window.clearTimeout(aiCopyResetTimeoutRef.current)
      }
    },
    []
  )

  const closePartnerLogin = () => {
    setPartnerLoginOpen(false)

    if (typeof window !== 'undefined' && window.location.hash === '#partner-login') {
      const nextUrl = `${window.location.pathname}${window.location.search}#top`
      window.history.replaceState(null, '', nextUrl)
    }
  }

  const handleOpenPartnerRegistration = () => {
    setPartnerLoginOpen(false)
    setMobileNavOpen(false)
    setPartnerMenuOpen(false)
    setCategoriesMenuOpen(false)
    onOpenPartnerRegistration()
  }

  const handleOpenPartnerLogin = () => {
    setMobileNavOpen(false)
    setPartnerMenuOpen(false)
    setCategoriesMenuOpen(false)
    onOpenPartnerLogin()
  }

  const openPartnerMenu = () => {
    setCategoriesMenuOpen(false)
    setPartnerMenuOpen(true)
  }

  const closePartnerMenu = () => {
    setPartnerMenuOpen(false)
  }

  const openCategoriesMenu = () => {
    setPartnerMenuOpen(false)
    setCategoriesMenuOpen(true)
  }

  const closeCategoriesMenu = () => {
    setCategoriesMenuOpen(false)
  }

  const handleCategoriesBlur = (event) => {
    if (categoriesNavRef.current && categoriesNavRef.current.contains(event.relatedTarget)) {
      return
    }

    setCategoriesMenuOpen(false)
  }

  const handlePrimaryNavSelect = () => {
    setMobileNavOpen(false)
    setPartnerMenuOpen(false)
    setCategoriesMenuOpen(false)
    setCategoriesPageFilterOpen(false)
  }

  const renderCategoryVisual = (category, imageClassName, iconClassName) => {
    if (category.image) {
      return <img src={category.image} alt="" className={imageClassName} loading="lazy" />
    }

    return <Icon type={category.icon ?? 'grid-dots'} className={iconClassName} />
  }

  const toggleCategoriesPageFilter = () => {
    setCategoriesPageFilterOpen((open) => !open)
  }

  const selectCategoryFilter = (categoryTitle) => {
    setSelectedCategoryTitle(categoryTitle)
    setVisibleCategoriesLimit(categoriesPageSize)
    setCategoriesPageFilterOpen(false)
    setCategoriesPageSearchTerm('')
  }

  const openServiceProvidersPage = (categoryTitle) => {
    const nextHash = getServiceProvidersHash(categoryTitle)
    handlePrimaryNavSelect()

    if (typeof window !== 'undefined') {
      window.location.hash = nextHash
    }
  }

  const handleBackToCategories = () => {
    handlePrimaryNavSelect()

    if (typeof window !== 'undefined') {
      window.location.hash = categoriesHash
    }
  }

  const toggleProviderServiceType = (serviceType) => {
    setSelectedProviderServiceTypes((currentServiceTypes) =>
      currentServiceTypes.includes(serviceType)
        ? currentServiceTypes.filter((item) => item !== serviceType)
        : [...currentServiceTypes, serviceType]
    )
    setProviderResultsPage(1)
  }

  const toggleProviderPriceBucket = (bucketKey) => {
    setSelectedProviderPriceBuckets((currentBuckets) =>
      currentBuckets.includes(bucketKey)
        ? currentBuckets.filter((item) => item !== bucketKey)
        : [...currentBuckets, bucketKey]
    )
    setProviderResultsPage(1)
  }

  const openProviderProfile = (provider, category = selectedServiceCategory) => {
    handlePrimaryNavSelect()

    if (typeof window !== 'undefined') {
      window.location.hash = getProviderProfileHash(category.title, provider.id)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }

  const handleBackToProviders = () => {
    handlePrimaryNavSelect()

    if (typeof window !== 'undefined') {
      window.location.hash = getServiceProvidersHash(providerProfileCategory.title)
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    }
  }

  const handleViewProviderPortfolio = () => {
    providerPortfolioSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleSelectProfileService = (serviceId) => {
    setSelectedProfileServiceId(serviceId)
    setSelectedServiceDetailId(serviceId)
  }

  const handleProviderQuoteRequest = () => {
    handleOpenPartnerLogin()
  }

  const handleProviderContactRequest = () => {
    handleOpenPartnerLogin()
  }

  const handleProviderChatNow = () => {
    handleOpenPartnerLogin()
  }

  const closeSelectedPortfolioProject = () => {
    setSelectedPortfolioProject(null)
  }

  const closeSelectedServiceDetail = () => {
    setSelectedServiceDetailId(null)
  }

  const handleCreateAiChat = () => {
    const nextConversationId = `ai-chat-${Date.now()}`
    const nextConversation = {
      id: nextConversationId,
      title: 'New Chat',
      timeLabel: getCurrentDateLabel(),
      messages: [
        {
          id: `${nextConversationId}-assistant-welcome`,
          role: 'assistant',
          type: 'text',
          text:
            'Welcome to Vyapar AI.\n\nAsk me anything about VyaparNest services, categories, partner registration, login, or how to use the website.',
        },
      ],
    }

    setAiConversations((currentConversations) => [nextConversation, ...currentConversations])
    setSelectedAiConversationId(nextConversationId)
    setAiComposerText('')
  }

  const handleDeleteAiConversation = () => {
    setAiConversations((currentConversations) => {
      if (currentConversations.length <= 1) {
        const replacementConversation = {
          id: `ai-chat-${Date.now()}`,
          title: 'New Chat',
          timeLabel: getCurrentDateLabel(),
          messages: [
            {
              id: `ai-chat-${Date.now()}-assistant-reset`,
              role: 'assistant',
              type: 'text',
              text: 'Chat history cleared. Ask me anything about the VyaparNest website.',
            },
          ],
        }

        setSelectedAiConversationId(replacementConversation.id)
        return [replacementConversation]
      }

      const remainingConversations = currentConversations.filter(
        (conversation) => conversation.id !== selectedAiConversationId
      )

      if (remainingConversations.length > 0) {
        setSelectedAiConversationId(remainingConversations[0].id)
      }

      return remainingConversations
    })
  }

  const handleAiComposerSubmit = (event) => {
    event.preventDefault()
    const trimmedMessage = aiComposerText.trim()

    if (!trimmedMessage) {
      return
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmedMessage,
      time: getCurrentTimeLabel(),
    }
    const typingMessage = {
      id: `typing-${Date.now()}`,
      role: 'assistant',
      type: 'typing',
    }
    const assistantMessage = {
      id: `assistant-${Date.now()}`,
      ...generateAiAssistResponse(trimmedMessage),
    }
    const targetConversationId = selectedAiConversationId

    setAiConversations((currentConversations) =>
      currentConversations.map((conversation) => {
        if (conversation.id !== targetConversationId) {
          return conversation
        }

        const isFreshConversation =
          conversation.title === 'New Chat' ||
          conversation.messages.every((message) => message.role !== 'user')

        return {
          ...conversation,
          title: isFreshConversation ? getConversationPreviewTitle(trimmedMessage) : conversation.title,
          timeLabel: getCurrentDateLabel(),
          messages: [...conversation.messages, userMessage, typingMessage],
        }
      })
    )
    setAiComposerText('')

    const timeoutId = window.setTimeout(() => {
      setAiConversations((currentConversations) =>
        currentConversations.map((conversation) => {
          if (conversation.id !== targetConversationId) {
            return conversation
          }

          return {
            ...conversation,
            messages: conversation.messages.map((message) =>
              message.id === typingMessage.id ? assistantMessage : message
            ),
          }
        })
      )

      aiReplyTimeoutsRef.current = aiReplyTimeoutsRef.current.filter((id) => id !== timeoutId)
    }, 1000)

    aiReplyTimeoutsRef.current.push(timeoutId)
  }

  const handleCopyAiMessage = async (message) => {
    const copyText =
      message.type === 'list'
        ? `${message.intro}\n${message.items.map((item, index) => `${index + 1}. ${item}`).join('\n')}\n${message.outro}`
        : message.text

    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(copyText)
        setCopiedAiMessageId(message.id)
        if (aiCopyResetTimeoutRef.current) {
          window.clearTimeout(aiCopyResetTimeoutRef.current)
        }
        aiCopyResetTimeoutRef.current = window.setTimeout(() => {
          setCopiedAiMessageId(null)
          aiCopyResetTimeoutRef.current = null
        }, 1500)
      } catch {
        // no-op fallback for unsupported clipboard cases
      }
    }
  }

  const handleAiMessageReaction = (messageId, reaction) => {
    setAiMessageFeedback((currentFeedback) => {
      const currentReaction = currentFeedback[messageId] ?? null

      if (currentReaction === reaction) {
        const nextFeedback = { ...currentFeedback }
        delete nextFeedback[messageId]
        return nextFeedback
      }

      return {
        ...currentFeedback,
        [messageId]: reaction,
      }
    })
  }

  const renderAiConversationMessage = (message) => {
    if (message.type === 'typing') {
      return (
        <div key={message.id} className="vn-home-ai-message-row is-assistant is-typing">
          <span className="vn-home-ai-avatar is-small">AI</span>
          <div className="vn-home-ai-typing-bubble" aria-label="Vyapar AI is typing">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )
    }

    if (message.role === 'user') {
      return (
        <div key={message.id} className="vn-home-ai-message-row is-user">
          <div className="vn-home-ai-message-bubble is-user">
            <p>{message.text}</p>
            <div className="vn-home-ai-message-meta">
              <span>{message.time}</span>
              <Icon type="double-check" className="vn-home-ai-message-status" />
            </div>
          </div>
        </div>
      )
    }

    const currentReaction = aiMessageFeedback[message.id] ?? null
    const isCopied = copiedAiMessageId === message.id

    return (
      <div key={message.id} className="vn-home-ai-message-row is-assistant">
        <span className="vn-home-ai-avatar">AI</span>
        <div className="vn-home-ai-message-stack">
          <div className="vn-home-ai-message-bubble is-assistant">
            {message.type === 'list' ? (
              <>
                <p>{message.intro}</p>
                <ol className="vn-home-ai-message-list">
                  {message.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
                <p className="vn-home-ai-message-outro">{message.outro}</p>
              </>
            ) : (
              <p>{message.text}</p>
            )}
          </div>

          <div className="vn-home-ai-message-actions">
            <button
              type="button"
              className={currentReaction === 'like' ? 'is-liked' : ''}
              aria-label={currentReaction === 'like' ? 'Remove like' : 'Like response'}
              aria-pressed={currentReaction === 'like'}
              onClick={() => handleAiMessageReaction(message.id, 'like')}
            >
              <Icon type="thumbs-up" className="vn-home-ai-message-action-icon" />
            </button>
            <button
              type="button"
              className={currentReaction === 'dislike' ? 'is-disliked' : ''}
              aria-label={currentReaction === 'dislike' ? 'Remove dislike' : 'Dislike response'}
              aria-pressed={currentReaction === 'dislike'}
              onClick={() => handleAiMessageReaction(message.id, 'dislike')}
            >
              <Icon type="thumbs-down" className="vn-home-ai-message-action-icon" />
            </button>
            <button
              type="button"
              className={isCopied ? 'is-copied' : ''}
              aria-label={isCopied ? 'Response copied' : 'Copy response'}
              onClick={() => handleCopyAiMessage(message)}
            >
              <Icon type="copy" className="vn-home-ai-message-action-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`vn-home-shell${mobileNavOpen ? ' is-mobile-menu-open' : ''}${isCategoriesScreen ? ' is-categories-screen' : ''}${
        isServiceProvidersScreen ? ' is-service-providers-screen' : ''
      }${
        isProviderProfileScreen ? ' is-provider-profile-screen' : ''
      }${
        isAiAssistScreen ? ' is-ai-assist-screen' : ''
      }`}
      id="top"
    >
      <div className="vn-home-glow vn-home-glow-left" aria-hidden="true"></div>
      <div className="vn-home-glow vn-home-glow-right" aria-hidden="true"></div>

      <header className="vn-home-header">
        <div className="vn-home-shell-inner is-fluid">
          <div className="vn-home-header-bar">
            <a className="vn-home-brand" href="#top" onClick={handlePrimaryNavSelect}>
              <img src="/vyaparnest-home-logo-reference.jpeg" alt="VyaparNest" />
            </a>

            <button type="button" className="vn-home-mobile-location-button">
              <Icon type="location" />
              <span>Purnia, Bihar</span>
              <Icon type="chevron-down" />
            </button>

            <button
              type="button"
              className="vn-home-menu-toggle"
              aria-expanded={mobileNavOpen}
              aria-controls="vn-home-nav-panel"
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <span>{mobileNavOpen ? 'Close' : 'Menu'}</span>
              <Icon type={mobileNavOpen ? 'close' : 'menu'} className="vn-home-menu-toggle-icon" />
            </button>

            <button type="button" className="vn-home-notification-button" aria-label="Notifications">
              <img src="/mobile-nav-icons/notification.png" alt="" />
              <span aria-hidden="true"></span>
            </button>

            <div id="vn-home-nav-panel" className={`vn-home-nav-area${mobileNavOpen ? ' is-open' : ''}`}>
              <div className="vn-home-mobile-drawer" aria-label="Mobile menu">
                <div className="vn-home-mobile-drawer-head">
                  <button type="button" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
                    <Icon type="close" />
                  </button>
                  <img src="/vyaparnest-home-logo-reference.jpeg" alt="VyaparNest" />
                </div>

                <nav className="vn-home-mobile-drawer-links" aria-label="Mobile primary navigation">
                  {[
                    { label: 'Home', href: homeHash, icon: 'drawer-home' },
                    { label: 'Categories', href: categoriesHash, icon: 'drawer-categories' },
                    { label: 'AI Assist', href: aiAssistHash, icon: 'drawer-ai' },
                    { label: 'About Us', href: defaultProviderProfileHash, icon: 'drawer-about' },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className={link.label === 'Home' && currentScreen === 'home' ? 'is-active' : ''}
                      onClick={handlePrimaryNavSelect}
                    >
                      <Icon type={link.icon} />
                      <span>{link.label}</span>
                      <Icon type="arrow-right" />
                    </a>
                  ))}
                </nav>

                <form
                  className="vn-home-mobile-drawer-search"
                  onSubmit={(event) => {
                    event.preventDefault()
                    setMobileNavOpen(false)
                    setMobileSearchOpen(true)
                  }}
                >
                  <Icon type="search" />
                  <input type="search" placeholder="Search services..." aria-label="Search services" />
                  <button type="submit" aria-label="Search services">
                    <Icon type="search" />
                  </button>
                </form>

                <button type="button" className="vn-home-mobile-drawer-partner" onClick={handleOpenPartnerRegistration}>
                  <Icon type="users" />
                  <span>Partner with us</span>
                  <Icon type="arrow-right" />
                </button>

                <button type="button" className="vn-home-mobile-drawer-login" onClick={handleOpenPartnerLogin}>
                  <Icon type="users" />
                  <span>Login</span>
                  <Icon type="arrow-right" />
                </button>

                <div className="vn-home-mobile-drawer-socials">
                  {footerSocials.map((social) => (
                    <a key={social.label} href="#top" aria-label={social.label}>
                      <Icon type={social.icon} />
                    </a>
                  ))}
                </div>
                <div className="vn-home-mobile-drawer-footer">
                  <div>
                    <a href="#top">Privacy Policy</a>
                    <i></i>
                    <a href="#top">Terms &amp; Conditions</a>
                    <i></i>
                    <a href="#top">Help &amp; Support</a>
                  </div>
                  <p>© 2026 VyaparNest. All rights reserved.</p>
                </div>
              </div>

              <div className="vn-home-nav-primary">
                <nav className="vn-home-nav-links" aria-label="Primary">
                  {primaryNavLinks.map((link) => {
                    const isActive = activePrimaryNavKey === link.key

                    if (link.key === 'categories') {
                      return (
                        <div
                          key={link.key}
                          ref={categoriesNavRef}
                          className={`vn-home-categories-nav-wrap${categoriesMenuOpen ? ' is-open' : ''}`}
                          onMouseEnter={openCategoriesMenu}
                          onMouseLeave={closeCategoriesMenu}
                          onFocus={openCategoriesMenu}
                          onBlur={handleCategoriesBlur}
                        >
                          <a
                            id="categories-nav-trigger"
                            href={link.href}
                            className={isActive ? 'is-active' : ''}
                            aria-current={isActive ? 'page' : undefined}
                            aria-haspopup="true"
                            aria-expanded={categoriesMenuOpen}
                            onClick={handlePrimaryNavSelect}
                          >
                            {link.label}
                            <Icon type="chevron-down" className="vn-home-nav-link-chevron" />
                          </a>

                          <CategoriesMegaMenu
                            categories={categoriesMenuCards}
                            isOpen={categoriesMenuOpen}
                            menuRef={categoriesMenuRef}
                            onMouseEnter={openCategoriesMenu}
                            onMouseLeave={closeCategoriesMenu}
                            onFocus={openCategoriesMenu}
                            onBlur={handleCategoriesBlur}
                            onCategorySelect={handlePrimaryNavSelect}
                            renderCategoryIcon={(category) =>
                              renderCategoryVisual(
                                category,
                                'categories-menu-item-image',
                                'categories-menu-item-icon-svg'
                              )
                            }
                            getCategoryHref={() => categoriesHash}
                            allCategoriesHref={categoriesHash}
                          />
                        </div>
                      )
                    }

                    return (
                      <a
                        key={link.key}
                        href={link.href}
                        className={isActive ? 'is-active' : ''}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={handlePrimaryNavSelect}
                      >
                        {link.label}
                        {link.hasChevron ? (
                          <Icon type="chevron-down" className="vn-home-nav-link-chevron" />
                        ) : null}
                      </a>
                    )
                  })}
                </nav>
              </div>

              <div className="vn-home-nav-secondary">
                <button type="button" className="vn-home-location-pill">
                  <Icon type="location" className="vn-home-location-pill-icon" />
                  <span>Purnia, Bihar</span>
                  <Icon type="chevron-down" className="vn-home-location-pill-chevron" />
                </button>

                <form className="vn-home-nav-search" onSubmit={(event) => event.preventDefault()}>
                  <Icon type="search" className="vn-home-nav-search-icon" />
                  <input type="search" placeholder="Search services..." aria-label="Search services" />
                  <button type="submit" aria-label="Search services">
                    <Icon type="search" className="vn-home-nav-search-submit-icon" />
                  </button>
                </form>

                <div className="vn-home-nav-buttons">
                  <div
                    className="vn-home-partner-wrap"
                    ref={partnerMenuRef}
                    onMouseEnter={openPartnerMenu}
                    onMouseLeave={closePartnerMenu}
                  >
                    <button
                      type="button"
                      className="vn-home-partner-button"
                      aria-expanded={partnerMenuOpen}
                      onFocus={openPartnerMenu}
                      onClick={() => setPartnerMenuOpen((open) => !open)}
                    >
                      <Icon type="users" className="vn-home-partner-button-icon" />
                      <span>Partner with us</span>
                    </button>

                    <aside className={`vn-home-partner-menu${partnerMenuOpen ? ' is-open' : ''}`}>
                      <button
                        type="button"
                        className="vn-home-partner-close"
                        aria-label="Close partner panel"
                        onClick={() => setPartnerMenuOpen(false)}
                      >
                        <Icon type="close" className="vn-home-partner-close-icon" />
                      </button>

                      <div className="vn-home-partner-menu-scroll">
                        <div className="vn-home-partner-menu-head">
                          <span className="vn-home-partner-menu-icon">
                            <Icon type="users" className="vn-home-partner-menu-icon-svg" />
                          </span>
                          <div>
                            <h3>
                              Partner With <span>VyaparNest</span>
                            </h3>
                            <p>
                              Grow your business, reach new customers, and discover better opportunities
                              with VyaparNest.
                            </p>
                          </div>
                        </div>

                        <div className="vn-home-partner-menu-list">
                          {partnerBenefits.map((benefit) => (
                            <article key={benefit.title} className="vn-home-partner-benefit">
                              <span className="vn-home-partner-benefit-icon">
                                <Icon type={benefit.icon} className="vn-home-partner-benefit-icon-svg" />
                              </span>
                              <div>
                                <strong>{benefit.title}</strong>
                                <p>{benefit.description}</p>
                              </div>
                            </article>
                          ))}
                        </div>

                        <div className="vn-home-partner-menu-actions">
                          <button
                            type="button"
                            className="vn-home-partner-menu-primary"
                            onClick={handleOpenPartnerRegistration}
                          >
                            Become a Partner
                            <ArrowButtonGif className="vn-home-partner-menu-primary-icon" />
                          </button>
                          <button
                            type="button"
                            className="vn-home-partner-menu-secondary"
                            onClick={() => {
                              setMobileNavOpen(false)
                              setPartnerMenuOpen(false)
                              handleOpenPartnerRegistration()
                            }}
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </aside>
                  </div>

                  <button type="button" className="vn-home-login-button" onClick={handleOpenPartnerLogin}>
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main
        className={`vn-home-main${isCategoriesScreen ? ' is-categories-screen' : ''}${
          isServiceProvidersScreen ? ' is-service-providers-screen' : ''
        }${
          isProviderProfileScreen ? ' is-provider-profile-screen' : ''
        }${
          isAiAssistScreen ? ' is-ai-assist-screen' : ''
        }`}
      >
        {!isCategoriesScreen && !isServiceProvidersScreen && !isProviderProfileScreen && !isAiAssistScreen ? (
          <section className="vn-home-hero">
            <div className="vn-home-shell-inner is-fluid">
              <div className="vn-home-hero-banner">
                <video
                  className="vn-home-hero-video"
                  src="/vyaparnest-homepage-banner-reference.mp4"
                  poster="/vyaparnest-home-banner.jpg"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="vn-home-hero-video-overlay"></div>
                <div className="vn-home-mobile-hero-copy">
                  <h1>
                    Find Trusted
                    <br />
                    Professionals.
                    <br />
                    <b>Grow Your Business.</b>
                  </h1>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <div
          className={`vn-home-content${isCategoriesScreen ? ' is-categories-page' : ''}${
            isServiceProvidersScreen ? ' is-service-providers-page' : ''
          }${
            isProviderProfileScreen ? ' is-provider-profile-page' : ''
          }${
            isAiAssistScreen ? ' is-ai-assist-page' : ''
          }`}
        >
          {isCategoriesScreen ? (
            <section className="vn-home-section vn-home-categories-page" id="all-categories">
              <div className="vn-home-shell-inner" ref={categoriesPageSectionRef}>
                <div className="vn-home-categories-page-head">
                  <div className="vn-home-categories-page-title">
                    <h1>
                      All <span>Categories</span>
                      <Icon type="spark" className="vn-home-categories-page-title-mark" />
                    </h1>
                    <p>{categoriesPageCountLabel}</p>
                  </div>

                  <div
                    className={`vn-home-categories-page-filter-wrap${categoriesPageFilterOpen ? ' is-open' : ''}`}
                    ref={categoriesPageFilterRef}
                  >
                    <button
                      type="button"
                      className="vn-home-categories-page-filter"
                      aria-expanded={categoriesPageFilterOpen}
                      aria-haspopup="dialog"
                      onClick={toggleCategoriesPageFilter}
                    >
                      <span className="vn-home-categories-page-filter-value">
                        <span className="vn-home-categories-page-filter-value-icon">
                          {renderCategoryVisual(
                            selectedCategory ?? { icon: 'grid-dots' },
                            'vn-home-categories-page-filter-image',
                            'vn-home-categories-page-filter-svg'
                          )}
                        </span>
                        <span>{selectedCategoryTitle}</span>
                      </span>
                      <Icon type="chevron-down" className="vn-home-categories-page-filter-icon" />
                    </button>

                    <div
                      className={`vn-home-categories-page-dropdown${categoriesPageFilterOpen ? ' is-open' : ''}`}
                      role="dialog"
                      aria-label="Select category"
                      aria-hidden={!categoriesPageFilterOpen}
                    >
                      <div className="vn-home-categories-page-dropdown-search">
                        <Icon type="search" className="vn-home-categories-page-dropdown-search-icon" />
                        <input
                          type="search"
                          value={categoriesPageSearchTerm}
                          onChange={(event) => setCategoriesPageSearchTerm(event.target.value)}
                          placeholder="Search category..."
                          aria-label="Search category"
                        />
                      </div>

                      <button
                        type="button"
                        className={`vn-home-categories-page-dropdown-option is-featured${
                          selectedCategoryTitle === 'All Categories' ? ' is-selected' : ''
                        }`}
                        onClick={() => selectCategoryFilter('All Categories')}
                      >
                        <span className="vn-home-categories-page-dropdown-option-copy">
                          <span className="vn-home-categories-page-dropdown-option-icon">
                            <Icon type="grid-dots" className="vn-home-categories-page-dropdown-option-svg" />
                          </span>
                          <span>All Categories</span>
                        </span>
                        {selectedCategoryTitle === 'All Categories' ? (
                          <Icon type="check" className="vn-home-categories-page-dropdown-check" />
                        ) : null}
                      </button>

                      <div className="vn-home-categories-page-dropdown-list">
                        {filteredCategoryOptions.length > 0 ? (
                          filteredCategoryOptions.map((category) => (
                            <button
                              type="button"
                              key={category.title}
                              className={`vn-home-categories-page-dropdown-option${
                                selectedCategoryTitle === category.title ? ' is-selected' : ''
                              }`}
                              onClick={() => selectCategoryFilter(category.title)}
                            >
                              <span className="vn-home-categories-page-dropdown-option-copy">
                                <span className="vn-home-categories-page-dropdown-option-icon">
                                  {renderCategoryVisual(
                                    category,
                                    'vn-home-categories-page-dropdown-option-image',
                                    'vn-home-categories-page-dropdown-option-svg'
                                  )}
                                </span>
                                <span>{category.title}</span>
                              </span>
                              {selectedCategoryTitle === category.title ? (
                                <Icon type="check" className="vn-home-categories-page-dropdown-check" />
                              ) : null}
                            </button>
                          ))
                        ) : (
                          <div className="vn-home-categories-page-dropdown-empty">
                            No matching categories found.
                          </div>
                        )}
                      </div>

                      <button
                        type="button"
                        className="vn-home-categories-page-dropdown-footer"
                        onClick={() => selectCategoryFilter('All Categories')}
                      >
                        <span className="vn-home-categories-page-dropdown-footer-copy">
                          <Icon type="grid-dots" className="vn-home-categories-page-dropdown-footer-icon" />
                          <span>View All Categories</span>
                        </span>
                        <ArrowButtonGif className="vn-home-categories-page-dropdown-footer-arrow" />
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className={`vn-home-categories-page-grid${
                    selectedCategory ? ' is-filtered' : ''
                  }`}
                >
                  {visibleCategories.map((category) => (
                    <article
                      key={category.title}
                      ref={(node) => {
                        if (node) {
                          categoriesPageCardRefs.current.set(category.title, node)
                        } else {
                          categoriesPageCardRefs.current.delete(category.title)
                        }
                      }}
                      className={`vn-home-categories-page-card${
                        selectedCategoryTitle === category.title ? ' is-selected' : ''
                      }`}
                      style={{
                        '--vn-category-accent': category.accentColor ?? '#d4af37',
                        '--vn-category-icon-surface':
                          category.iconSurface ?? 'linear-gradient(180deg, #fbf8f1, #f4efe4)',
                      }}
                      role="button"
                      tabIndex={0}
                      onClick={() => openServiceProvidersPage(category.title)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          openServiceProvidersPage(category.title)
                        }
                      }}
                    >
                      <span className="vn-home-categories-page-icon">
                        {renderCategoryVisual(
                          category,
                          'vn-home-categories-page-icon-image',
                          'vn-home-categories-page-icon-svg'
                        )}
                      </span>

                      <div className="vn-home-categories-page-card-copy">
                        <h3>{category.title}</h3>
                        <p>{category.description}</p>
                      </div>

                      <div className="vn-home-categories-page-card-footer">
                        <span className="vn-home-categories-page-card-services">
                          {category.servicesLabel}
                        </span>
                        <span className="vn-home-categories-page-card-arrow">
                          <ArrowButtonGif className="vn-home-categories-page-card-arrow-icon" />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {hasMoreCategories ? (
                  <div className="vn-home-categories-page-more">
                    <button
                      type="button"
                      className="vn-home-categories-page-more-button"
                      onClick={() =>
                        setVisibleCategoriesLimit((currentLimit) =>
                          Math.min(currentLimit + categoriesPageSize, displayedCategories.length)
                        )
                      }
                    >
                      View More
                      <Icon type="chevron-down" className="vn-home-categories-page-more-icon" />
                    </button>
                  </div>
                ) : null}
              </div>
            </section>
          ) : isServiceProvidersScreen ? (
            <section className="vn-home-section vn-home-service-providers-page" id="service-providers">
              <div className="vn-home-shell-inner">
                <div className="vn-home-service-providers-hero">
                  <div className="vn-home-service-providers-hero-copy">
                    <span className="vn-home-service-providers-hero-icon">
                      {renderCategoryVisual(
                        selectedServiceCategory,
                        'vn-home-service-providers-hero-icon-image',
                        'vn-home-service-providers-hero-icon-svg'
                      )}
                    </span>
                    <div className="vn-home-service-providers-hero-copy-body">
                      <button
                        type="button"
                        className="vn-home-service-providers-back"
                        onClick={handleBackToCategories}
                      >
                        <Icon type="arrow-right" className="vn-home-service-providers-back-icon" />
                        <span>Back to Categories</span>
                      </button>
                      <h1>{getServicePageTitle(selectedServiceCategory)}</h1>
                      <p>{selectedServiceCategory.description}</p>
                      <strong>{serviceProviderAvailabilityLabel}</strong>
                    </div>
                  </div>

                  <div className="vn-home-service-providers-hero-visual" aria-hidden="true">
                    <div className="vn-home-service-providers-hero-visual-frame">
                      {selectedServiceCategory.heroImage || selectedServiceCategory.image ? (
                        <img
                          src={selectedServiceCategory.heroImage ?? selectedServiceCategory.image}
                          alt=""
                          className={`vn-home-service-providers-hero-visual-image${
                            selectedServiceCategory.heroImageFit === 'contain' ? ' is-contained' : ''
                          }`}
                        />
                      ) : (
                        <Icon type="briefcase" className="vn-home-service-providers-hero-visual-svg" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="vn-home-service-providers-layout">
                  <aside className="vn-home-service-providers-filters">
                    <div className="vn-home-service-providers-filters-head">
                      <h2>Filter Providers</h2>
                      <Icon type="compare" className="vn-home-service-providers-filters-head-icon" />
                    </div>

                    <div className="vn-home-service-providers-filter-group">
                      <h3>Service Type</h3>
                      <div className="vn-home-service-providers-filter-list">
                        {serviceProviderTypes.map((serviceType) => (
                          <label key={serviceType} className="vn-home-service-providers-filter-check">
                            <input
                              type="checkbox"
                              checked={selectedProviderServiceTypes.includes(serviceType)}
                              onChange={() => toggleProviderServiceType(serviceType)}
                            />
                            <span>{serviceType}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="vn-home-service-providers-filter-group">
                      <h3>Provider Location</h3>
                      <div className="vn-home-service-providers-location-search">
                        <input
                          type="search"
                          value={providerLocationSearch}
                          onChange={(event) => {
                            setProviderLocationSearch(event.target.value)
                            setProviderResultsPage(1)
                          }}
                          placeholder="Search location..."
                          aria-label="Search provider location"
                        />
                        <Icon type="search" className="vn-home-service-providers-location-search-icon" />
                      </div>
                    </div>

                    <div className="vn-home-service-providers-filter-group">
                      <h3>Price Range</h3>
                      <div className="vn-home-service-providers-filter-list">
                        {serviceProviderPriceBuckets.map((bucket) => (
                          <label key={bucket.key} className="vn-home-service-providers-filter-check">
                            <input
                              type="checkbox"
                              checked={selectedProviderPriceBuckets.includes(bucket.key)}
                              onChange={() => toggleProviderPriceBucket(bucket.key)}
                            />
                            <span>{bucket.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="vn-home-service-providers-price-inputs">
                      <input
                        type="number"
                        value={providerMinPrice}
                        onChange={(event) => {
                          setProviderMinPrice(event.target.value)
                          setProviderResultsPage(1)
                        }}
                        placeholder="Min"
                        aria-label="Minimum price"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        value={providerMaxPrice}
                        onChange={(event) => {
                          setProviderMaxPrice(event.target.value)
                          setProviderResultsPage(1)
                        }}
                        placeholder="Max"
                        aria-label="Maximum price"
                      />
                    </div>

                    <button
                      type="button"
                      className="vn-home-service-providers-apply"
                      onClick={() => setProviderResultsPage(1)}
                    >
                      Apply Filters
                    </button>
                  </aside>

                  <div className="vn-home-service-providers-results">
                    <div className="vn-home-service-providers-toolbar">
                      <p>
                        Showing {showingProvidersFrom} - {showingProvidersTo} of {serviceProviderTotalLabel}
                      </p>

                      <label className="vn-home-service-providers-sort">
                        <span>Sort by:</span>
                        <select
                          value={providerSortOption}
                          onChange={(event) => {
                            setProviderSortOption(event.target.value)
                            setProviderResultsPage(1)
                          }}
                        >
                          <option value="popularity">Popularity</option>
                          <option value="rating">Top Rated</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="experience">Experience</option>
                        </select>
                      </label>
                    </div>

                    <div className="vn-home-service-providers-results-list">
                      {paginatedServiceProviders.map((provider) => (
                        <article key={provider.id} className="vn-home-service-provider-card">
                          <div className="vn-home-service-provider-card-main">
                            <span
                              className="vn-home-service-provider-card-avatar"
                              style={{ background: provider.accent }}
                            >
                              {provider.initials}
                            </span>

                            <div className="vn-home-service-provider-card-copy">
                              <div className="vn-home-service-provider-card-title">
                                <h3>{provider.name}</h3>
                                {provider.verified ? <span>Verified</span> : null}
                              </div>
                              <p>{provider.serviceTags.join(' • ')}</p>
                              <small>
                                <span>{provider.location}</span>
                                <span>•</span>
                                <span>{provider.years}+ Years Experience</span>
                              </small>
                            </div>
                          </div>

                          <div className="vn-home-service-provider-card-side">
                            <div className="vn-home-service-provider-card-rating">
                              <span>{provider.rating.toFixed(1)}</span>
                              <small>({provider.reviews})</small>
                            </div>
                            <p>Starting from</p>
                            <strong>{formatProviderPrice(provider.price)}</strong>
                          </div>

                          <button
                            type="button"
                            className="vn-home-service-provider-card-button"
                            onClick={() => openProviderProfile(provider, selectedServiceCategory)}
                          >
                            View Profile
                          </button>
                        </article>
                      ))}

                      {paginatedServiceProviders.length === 0 ? (
                        <div className="vn-home-service-providers-empty">
                          No providers found. Try changing filters or choose another category.
                        </div>
                      ) : null}
                    </div>

                    <div className="vn-home-service-providers-pagination">
                      <button
                        type="button"
                        onClick={() => setProviderResultsPage((page) => Math.max(1, page - 1))}
                        disabled={safeProviderResultsPage === 1}
                      >
                        Previous
                      </button>

                      <div className="vn-home-service-providers-pagination-pages">
                        {visibleProviderPageNumbers.map((pageNumber) => (
                          <button
                            type="button"
                            key={pageNumber}
                            className={safeProviderResultsPage === pageNumber ? 'is-active' : ''}
                            onClick={() => setProviderResultsPage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setProviderResultsPage((page) => Math.min(totalProviderPages, page + 1))
                        }
                        disabled={safeProviderResultsPage === totalProviderPages}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : isProviderProfileScreen && activeProviderProfile ? (
            <section
              className={`vn-home-section vn-home-provider-page${managedProviderProfileDesign ? ` is-admin-designed is-${managedProviderProfileDesign.template?.toLowerCase() || 'modern'}` : ''}`}
              id="provider-profile"
              style={managedProviderProfileDesign ? {
                '--provider-admin-primary': managedProviderProfileDesign.primaryColor,
                '--provider-admin-accent': managedProviderProfileDesign.accentColor,
                '--provider-admin-background': managedProviderProfileDesign.backgroundColor,
                '--provider-admin-text': managedProviderProfileDesign.textColor,
                '--provider-admin-radius': `${managedProviderProfileDesign.cardRadius ?? 16}px`,
              } : undefined}
            >
              <div className="vn-home-shell-inner">
                <div className="vn-home-provider-page-topbar">
                  <button
                    type="button"
                    className="vn-home-provider-page-back"
                    onClick={handleBackToProviders}
                  >
                    <Icon type="arrow-right" className="vn-home-provider-page-back-icon" />
                    <span>Back to Providers</span>
                  </button>
                </div>

                <div className="vn-home-provider-page-hero">
                  <div className="vn-home-provider-page-hero-main">
                    <span
                      className="vn-home-provider-page-logo-shell"
                      style={{ background: providerProfileCategory.iconSurface }}
                    >
                      <span className="vn-home-provider-page-logo-mark">
                        {activeProviderProfile.brandMark}
                      </span>
                    </span>

                    <div className="vn-home-provider-page-hero-copy">
                      <div className="vn-home-provider-page-title-row">
                        <div className="vn-home-provider-page-title-block">
                          <h1>{managedProviderProfileDesign?.businessName || activeProviderProfile.name}</h1>
                          {activeProviderProfile.verified ? (
                            <span className="vn-home-provider-page-verified">Verified</span>
                          ) : null}
                        </div>
                      </div>

                      <div className="vn-home-provider-page-tags">
                        {activeProviderProfile.serviceTags.map((serviceTag) => (
                          <span key={serviceTag}>{serviceTag}</span>
                        ))}
                      </div>

                      <p className="vn-home-provider-page-summary">{managedProviderProfileDesign?.tagline || activeProviderProfile.description}</p>

                      <div className="vn-home-provider-page-provider-count">
                        <Icon type="users" className="vn-home-provider-page-metric-icon" />
                        <strong>
                          {providerProfileCategory.servicesLabel.replace(
                            /\bServices\b/i,
                            'Service Providers Available'
                          )}
                        </strong>
                      </div>

                      <div className="vn-home-provider-page-metrics">
                        <span>
                          <Icon type="location" className="vn-home-provider-page-metric-icon" />
                          {activeProviderProfile.location}
                        </span>
                        <span>
                          <Icon type="calendar" className="vn-home-provider-page-metric-icon" />
                          {activeProviderProfile.years}+ Years Experience
                        </span>
                        <span>
                          <Icon type="calendar" className="vn-home-provider-page-metric-icon" />
                          On-Time Delivery
                        </span>
                      </div>

                      <div className="vn-home-provider-page-stats-grid">
                        <article className="vn-home-provider-page-stat">
                          <span className="vn-home-provider-page-stat-icon-shell">
                            <img
                              src={providerProfileStatIcons.projects}
                              alt=""
                              className="vn-home-provider-page-stat-icon-image"
                              loading="lazy"
                            />
                          </span>
                          <div>
                            <strong>{activeProviderProfile.rating.toFixed(1)}</strong>
                            <span>({activeProviderProfile.reviews} Reviews)</span>
                          </div>
                        </article>
                        <article className="vn-home-provider-page-stat">
                          <span className="vn-home-provider-page-stat-icon-shell">
                            <img
                              src={providerProfileStatIcons.expertise}
                              alt=""
                              className="vn-home-provider-page-stat-icon-image"
                              loading="lazy"
                            />
                          </span>
                          <div>
                            <strong>{activeProviderProfile.completedProjects}+</strong>
                            <span>Projects Completed</span>
                          </div>
                        </article>
                        <article className="vn-home-provider-page-stat">
                          <span className="vn-home-provider-page-stat-icon-shell">
                            <img
                              src={providerProfileStatIcons.delivery}
                              alt=""
                              className="vn-home-provider-page-stat-icon-image"
                              loading="lazy"
                            />
                          </span>
                          <div>
                            <strong>{activeProviderProfile.onTimeDelivery}%</strong>
                            <span>On-Time Delivery</span>
                          </div>
                        </article>
                        <article className="vn-home-provider-page-stat">
                          <span className="vn-home-provider-page-stat-icon-shell">
                            <img
                              src={providerProfileStatIcons.satisfaction}
                              alt=""
                              className="vn-home-provider-page-stat-icon-image"
                              loading="lazy"
                            />
                          </span>
                          <div>
                            <strong>{activeProviderProfile.clientSatisfaction}%</strong>
                            <span>Client Satisfaction</span>
                          </div>
                        </article>
                      </div>

                      <div className="vn-home-provider-page-actions" style={managedProviderProfileDesign?.showContact === false ? { display: 'none' } : undefined}>
                        <button
                          type="button"
                          className="vn-home-provider-page-primary"
                          onClick={handleProviderQuoteRequest}
                        >
                          {managedProviderProfileDesign?.ctaLabel || 'Request Quote'}
                        </button>
                        <button
                          type="button"
                          className="vn-home-provider-page-secondary"
                          onClick={handleProviderChatNow}
                        >
                          Chat Now
                        </button>
                      </div>
                    </div>
                  </div>

                  <aside className="vn-home-provider-page-sidecard" aria-label="Provider highlight">
                    <span className="vn-home-provider-page-sidecard-icon">
                      <Icon type="briefcase" className="vn-home-provider-page-logo-svg" />
                    </span>
                    <p>{activeProviderProfile.trustNote}</p>
                  </aside>
                </div>

                <div className="vn-home-provider-page-main">
                  <section
                    className="vn-home-provider-panel"
                    style={managedProviderProfileDesign?.showAbout === false ? { display: 'none' } : undefined}
                  >
                    <div className="vn-home-provider-panel-head">
                      <div>
                        <h2>About Provider</h2>
                        <p>{managedProviderProfileDesign?.bio || activeProviderProfile.aboutDescription}</p>
                      </div>
                    </div>

                    <div className="vn-home-provider-about-grid">
                      <article className="vn-home-provider-about-card">
                        <span className="vn-home-provider-about-card-icon">
                          <img
                            src={providerProfileStatIcons.projects}
                            alt=""
                            className="vn-home-provider-about-card-icon-image"
                            loading="lazy"
                          />
                        </span>
                        <strong>{activeProviderProfile.completedProjects}+</strong>
                        <span>Projects Completed</span>
                      </article>
                      <article className="vn-home-provider-about-card">
                        <span className="vn-home-provider-about-card-icon">
                          <img
                            src={providerProfileStatIcons.expertise}
                            alt=""
                            className="vn-home-provider-about-card-icon-image"
                            loading="lazy"
                          />
                        </span>
                        <strong>{activeProviderProfile.years}+ Years</strong>
                        <span>Experience</span>
                      </article>
                      <article className="vn-home-provider-about-card">
                        <span className="vn-home-provider-about-card-icon">
                          <img
                            src={providerProfileStatIcons.delivery}
                            alt=""
                            className="vn-home-provider-about-card-icon-image"
                            loading="lazy"
                          />
                        </span>
                        <strong>{activeProviderProfile.onTimeDelivery}%</strong>
                        <span>On-Time Delivery</span>
                      </article>
                      <article className="vn-home-provider-about-card">
                        <span className="vn-home-provider-about-card-icon">
                          <img
                            src={providerProfileStatIcons.satisfaction}
                            alt=""
                            className="vn-home-provider-about-card-icon-image"
                            loading="lazy"
                          />
                        </span>
                        <strong>{activeProviderProfile.clientSatisfaction}%</strong>
                        <span>Client Satisfaction</span>
                      </article>
                    </div>
                  </section>

                  <section
                    className="vn-home-provider-panel"
                    style={managedProviderProfileDesign?.showServices === false ? { display: 'none' } : undefined}
                  >
                    <div className="vn-home-provider-panel-head">
                      <div>
                        <h2>Services Offered</h2>
                        <p>Explore the core services available from this provider.</p>
                      </div>
                    </div>

                    <div className="vn-home-provider-services-grid">
                      {providerProfileServices.map((service) => (
                        <article
                          key={service.id}
                          className={`vn-home-provider-service-card${
                            activeProviderService?.id === service.id ? ' is-active' : ''
                          }`}
                        >
                          <div className="vn-home-provider-service-card-head">
                            <span className="vn-home-provider-service-card-icon">
                              <Icon
                                type={getProviderServiceIconType(service.name, providerProfileCategory.title)}
                                className="vn-home-provider-page-logo-svg"
                              />
                            </span>
                            <div>
                              <h3>{service.name}</h3>
                              <p>{service.shortDescription}</p>
                            </div>
                          </div>

                          <div className="vn-home-provider-service-card-meta">
                            <span>{service.deliveryTime}</span>
                            <span>{activeProviderProfile.serviceMode}</span>
                          </div>

                          <div className="vn-home-provider-service-card-price">
                            <span>Starting from</span>
                            <strong>{formatProviderPrice(service.startingPrice)}</strong>
                          </div>

                          <button
                            type="button"
                            className="vn-home-provider-service-card-button"
                            onClick={() => handleSelectProfileService(service.id)}
                          >
                            View Details
                          </button>
                        </article>
                      ))}
                    </div>
                  </section>

                  <section className="vn-home-provider-panel" ref={providerPortfolioSectionRef} style={managedProviderProfileDesign?.showPortfolio === false ? { display: 'none' } : undefined}>
                    <div className="vn-home-provider-panel-head is-spaced">
                      <div>
                        <h2>Our Portfolio</h2>
                        <p>Only active projects uploaded under this provider are shown here.</p>
                      </div>

                      {providerPortfolioFilters.length > 1 ? (
                        <div className="vn-home-provider-portfolio-filters">
                          <button
                            type="button"
                            className={selectedPortfolioCategoryFilter === 'All' ? 'is-active' : ''}
                            onClick={() => setSelectedPortfolioCategoryFilter('All')}
                          >
                            All
                          </button>
                          {providerPortfolioFilters.map((portfolioCategory) => (
                            <button
                              type="button"
                              key={portfolioCategory}
                              className={
                                selectedPortfolioCategoryFilter === portfolioCategory
                                  ? 'is-active'
                                  : ''
                              }
                              onClick={() => setSelectedPortfolioCategoryFilter(portfolioCategory)}
                            >
                              {portfolioCategory}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    {providerProjects.length > 0 ? (
                      <div className="vn-home-provider-portfolio-grid">
                        {visibleProviderProjects.map((project) => (
                          <article key={project.id} className="vn-home-provider-portfolio-card">
                            <button
                              type="button"
                              className="vn-home-provider-portfolio-card-thumb"
                              onClick={() => setSelectedPortfolioProject(project)}
                            >
                              <img src={project.thumbnail} alt={project.title} loading="lazy" />
                            </button>

                            <div className="vn-home-provider-portfolio-card-body">
                              <h3>{project.title}</h3>
                              <span className="vn-home-provider-portfolio-card-category">
                                {project.category}
                              </span>
                              <button
                                type="button"
                                className="vn-home-provider-portfolio-card-button"
                                onClick={() => setSelectedPortfolioProject(project)}
                              >
                                View Project
                              </button>
                            </div>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="vn-home-provider-empty-state">
                        No portfolio projects added yet.
                      </div>
                    )}
                  </section>

                  <section
                    className="vn-home-provider-panel"
                    style={managedProviderProfileDesign?.showReviews === false ? { display: 'none' } : undefined}
                  >
                    <div className="vn-home-provider-panel-head">
                      <div>
                        <h2>Client Reviews</h2>
                        <p>Average rating, rating distribution, and recent customer feedback.</p>
                      </div>
                    </div>

                    <div className="vn-home-provider-reviews-layout">
                      <div className="vn-home-provider-review-summary-card">
                        <strong>{activeProviderProfile.rating.toFixed(1)}</strong>
                        <span>out of 5</span>
                        <div className="vn-home-provider-review-stars">
                          {'★'.repeat(5)}
                        </div>
                        <small>Based on {activeProviderProfile.reviews} reviews</small>

                        <div className="vn-home-provider-review-distribution">
                          {providerReviewDistribution.map((item) => (
                            <div key={item.label} className="vn-home-provider-review-distribution-row">
                              <span>{item.label}</span>
                              <div>
                                <i style={{ width: `${item.percentage}%` }}></i>
                              </div>
                              <strong>{item.count}</strong>
                            </div>
                          ))}
                        </div>
                      </div>

                      {activeProviderReview ? (
                        <article className="vn-home-provider-review-card is-spotlight">
                          <div className="vn-home-provider-review-card-head">
                            <img src={activeProviderReview.avatar} alt={activeProviderReview.name} loading="lazy" />
                            <div className="vn-home-provider-review-user">
                              <div className="vn-home-provider-review-user-top">
                                <h3>{activeProviderReview.name}</h3>
                                <span className="vn-home-provider-review-badge">
                                  {activeProviderReview.role}
                                </span>
                              </div>
                              <div className="vn-home-provider-review-stars is-inline">
                                {'★'.repeat(activeProviderReview.rating)}
                              </div>
                            </div>
                          </div>
                          <p>{activeProviderReview.text}</p>

                          {providerReviews.length > 1 ? (
                            <div className="vn-home-provider-review-dots" role="tablist" aria-label="Reviews">
                              {providerReviews.map((review, index) => (
                                <button
                                  type="button"
                                  key={review.id}
                                  className={index === selectedProviderReviewIndex ? 'is-active' : ''}
                                  aria-label={`Show review ${index + 1}`}
                                  aria-pressed={index === selectedProviderReviewIndex}
                                  onClick={() => setSelectedProviderReviewIndex(index)}
                                />
                              ))}
                            </div>
                          ) : null}
                        </article>
                      ) : null}
                    </div>
                  </section>
                </div>

                <div className="vn-home-provider-mobile-bar">
                  <div>
                    <span>Starting from</span>
                    <strong>
                      {formatProviderPrice(activeProviderService?.startingPrice ?? activeProviderProfile.price)}
                    </strong>
                  </div>
                  <button type="button" onClick={handleProviderQuoteRequest}>
                    Send Request
                  </button>
                </div>

                {selectedServiceDetail ? (
                  <div
                    className="vn-home-provider-project-modal-backdrop"
                    role="presentation"
                    onClick={closeSelectedServiceDetail}
                  >
                    <div
                      className="vn-home-provider-service-modal"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="provider-service-title"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="vn-home-provider-project-modal-close"
                        aria-label="Close service details"
                        onClick={closeSelectedServiceDetail}
                      >
                        <Icon type="close" className="vn-home-provider-project-modal-close-icon" />
                      </button>

                      <div className="vn-home-provider-service-modal-head">
                        <span className="vn-home-provider-service-card-icon is-large">
                          <Icon
                            type={getProviderServiceIconType(
                              selectedServiceDetail.name,
                              providerProfileCategory.title
                            )}
                            className="vn-home-provider-page-logo-svg"
                          />
                        </span>
                        <div>
                          <h2 id="provider-service-title">{selectedServiceDetail.name}</h2>
                          <p>{selectedServiceDetail.shortDescription}</p>
                        </div>
                      </div>

                      <div className="vn-home-provider-service-modal-grid">
                        <article>
                          <span>Starting price</span>
                          <strong>{formatProviderPrice(selectedServiceDetail.startingPrice)}</strong>
                        </article>
                        <article>
                          <span>Delivery time</span>
                          <strong>{selectedServiceDetail.deliveryTime}</strong>
                        </article>
                        <article>
                          <span>Service mode</span>
                          <strong>{activeProviderProfile.serviceMode}</strong>
                        </article>
                        <article>
                          <span>Response time</span>
                          <strong>{activeProviderProfile.responseTime}</strong>
                        </article>
                      </div>

                      <div className="vn-home-provider-service-modal-points">
                        <h3>What you can expect</h3>
                        <ul>
                          <li>Direct coordination with {activeProviderProfile.name}</li>
                          <li>Transparent scope confirmation before starting</li>
                          <li>Delivery aligned with the selected service timeline</li>
                          <li>Support in {activeProviderProfile.languages.join(', ')}</li>
                        </ul>
                      </div>

                      <div className="vn-home-provider-service-modal-actions">
                        <button
                          type="button"
                          className="vn-home-provider-page-primary"
                          onClick={() => {
                            closeSelectedServiceDetail()
                            handleProviderQuoteRequest()
                          }}
                        >
                          Request Quote
                        </button>
                        <button
                          type="button"
                          className="vn-home-provider-page-secondary"
                          onClick={() => {
                            closeSelectedServiceDetail()
                            handleProviderContactRequest()
                          }}
                        >
                          Contact Provider
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {selectedPortfolioProject ? (
                  <div
                    className="vn-home-provider-project-modal-backdrop"
                    role="presentation"
                    onClick={closeSelectedPortfolioProject}
                  >
                    <div
                      className="vn-home-provider-project-modal"
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="provider-project-title"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <button
                        type="button"
                        className="vn-home-provider-project-modal-close"
                        aria-label="Close project details"
                        onClick={closeSelectedPortfolioProject}
                      >
                        <Icon type="close" className="vn-home-provider-project-modal-close-icon" />
                      </button>

                      <div className="vn-home-provider-project-modal-media">
                        <img
                          src={selectedPortfolioProject.thumbnail}
                          alt={selectedPortfolioProject.title}
                        />
                      </div>

                      <div className="vn-home-provider-project-modal-copy">
                        <div className="vn-home-provider-project-modal-title">
                          <div>
                            <span>{selectedPortfolioProject.category}</span>
                            <h2 id="provider-project-title">{selectedPortfolioProject.title}</h2>
                          </div>
                          <strong>{selectedPortfolioProject.completion_date}</strong>
                        </div>

                        <p>{selectedPortfolioProject.full_description}</p>

                        <div className="vn-home-provider-project-modal-grid">
                          <article>
                            <h3>Services Provided</h3>
                            <div className="vn-home-provider-project-modal-tags">
                              {selectedPortfolioProject.services_provided.map((item) => (
                                <span key={item}>{item}</span>
                              ))}
                            </div>
                          </article>
                          <article>
                            <h3>Technologies Used</h3>
                            <div className="vn-home-provider-project-modal-tags">
                              {selectedPortfolioProject.technologies.map((item) => (
                                <span key={item}>{item}</span>
                              ))}
                            </div>
                          </article>
                        </div>

                        <div className="vn-home-provider-project-modal-gallery">
                          {selectedPortfolioProject.gallery_images.map((imagePath) => (
                            <div
                              key={`${selectedPortfolioProject.id}-${imagePath}`}
                              className="vn-home-provider-project-modal-gallery-item"
                            >
                              <img src={imagePath} alt={selectedPortfolioProject.title} loading="lazy" />
                            </div>
                          ))}
                        </div>

                        {selectedPortfolioProject.project_url ? (
                          <a
                            href={selectedPortfolioProject.project_url}
                            target="_blank"
                            rel="noreferrer"
                            className="vn-home-provider-project-modal-link"
                          >
                            View Live Project
                            <Icon type="arrow-right" className="vn-home-provider-project-modal-link-icon" />
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </section>
          ) : isAiAssistScreen ? (
            <section className="vn-home-section vn-home-ai-assist-page" id="ai-assist">
              <div className="vn-home-shell-inner is-fluid">
                <div className="vn-home-ai-assist-layout">
                  <section className="vn-home-ai-chat-panel is-full-width">
                    <div className="vn-home-ai-chat-hero">
                      <AiAssistMascot className="vn-home-ai-chat-mascot" />
                      <div className="vn-home-ai-chat-hero-copy">
                        <div className="vn-home-ai-chat-hero-top">
                          <h1>
                            Hello! I'm <span>Vyapar AI</span>
                            <Icon type="spark" className="vn-home-ai-chat-hero-mark" />
                          </h1>
                          <div className="vn-home-ai-chat-hero-actions">
                            <button
                              type="button"
                              className="vn-home-ai-new-chat"
                              onClick={handleCreateAiChat}
                            >
                              <Icon type="plus" className="vn-home-ai-new-chat-icon" />
                              <span>New Chat</span>
                            </button>
                            <button
                              type="button"
                              className="vn-home-ai-history-delete"
                              aria-label="Delete chat history"
                              onClick={handleDeleteAiConversation}
                            >
                              <Icon type="trash" className="vn-home-ai-history-delete-icon" />
                            </button>
                          </div>
                        </div>
                        <p>
                          Your smart business assistant to find services, get guidance and grow your
                          business.
                        </p>
                      </div>
                    </div>

                    <div className="vn-home-ai-chat-thread" ref={aiThreadRef}>
                      {selectedAiConversation.messages.map((message) =>
                        renderAiConversationMessage(message)
                      )}
                    </div>

                    <form className="vn-home-ai-composer" onSubmit={handleAiComposerSubmit}>
                      <input
                        type="text"
                        value={aiComposerText}
                        onChange={(event) => setAiComposerText(event.target.value)}
                        placeholder="Type your message here..."
                        aria-label="Type your message"
                      />
                      <button
                        type="button"
                        className="vn-home-ai-composer-attach"
                        aria-label="Attach file"
                      >
                        <Icon type="paperclip" className="vn-home-ai-composer-attach-icon" />
                      </button>
                      <button type="submit" className="vn-home-ai-composer-send" aria-label="Send message">
                        <Icon type="send" className="vn-home-ai-composer-send-icon" />
                      </button>
                    </form>

                    <p className="vn-home-ai-disclaimer">
                      <Icon type="shield" className="vn-home-ai-disclaimer-icon" />
                      <span>Vyapar AI can make mistakes. Please verify important information.</span>
                    </p>
                  </section>
                </div>
              </div>
            </section>
          ) : (
            <>
              <section className="vn-home-section vn-home-categories-section" id="categories">
                <div className="vn-home-shell-inner">
                  <div className="vn-home-section-head">
                    <div>
                      <h2>Explore Popular Categories</h2>
                    </div>
                    <a href={categoriesHash} className="vn-home-section-link">
                      View All Categories
                      <ArrowButtonGif className="vn-home-section-link-icon" />
                    </a>
                  </div>

                  <div className="vn-home-category-grid">
                    {categoryCards.map((category) => (
                      <article
                        key={category.title}
                        className="vn-home-category-card"
                        role="button"
                        tabIndex={0}
                        onClick={() => openServiceProvidersPage(category.title)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            openServiceProvidersPage(category.title)
                          }
                        }}
                      >
                        <span className="vn-home-category-icon">
                          {category.image ? (
                            <img
                              src={category.image}
                              alt=""
                              className="vn-home-category-icon-image"
                              loading="lazy"
                            />
                          ) : (
                            <Icon type={category.icon} className="vn-home-category-icon-svg" />
                          )}
                        </span>
                        <h3>{category.title}</h3>
                        <p>{category.experts}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="vn-home-section">
                <div className="vn-home-shell-inner">
                  <div className="vn-home-metrics-strip">
                    {platformMetrics.map((metric) => (
                      <article key={metric.label} className="vn-home-metric-card">
                        <span className="vn-home-metric-icon">
                          <Icon type={metric.icon} className="vn-home-metric-icon-svg" />
                        </span>
                        <div>
                          <strong>{metric.value}</strong>
                          <p>{metric.label}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="vn-home-section vn-home-workflow-section" id="how-it-works">
                <div className="vn-home-shell-inner">
                  <div className="vn-home-section-head is-centered vn-home-workflow-head">
                    <div>
                      <h2>
                        How <span>VyaparNest</span> Works?
                      </h2>
                    </div>
                  </div>

                  <div className="vn-home-workflow-grid">
                    {workflowSteps.map((step, index) => (
                      <div key={step.title} className="vn-home-workflow-step">
                        <article className="vn-home-workflow-card">
                          <span className="vn-home-workflow-icon">
                            {step.image ? (
                              <img
                                src={step.image}
                                alt=""
                                className="vn-home-workflow-icon-image"
                                loading="lazy"
                              />
                            ) : (
                              <Icon type={step.icon} className="vn-home-workflow-icon-svg" />
                            )}
                          </span>
                          <div className="vn-home-workflow-copy">
                            <span className="vn-home-workflow-index">{String(index + 1).padStart(2, '0')}</span>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                          </div>
                        </article>
                        {index < workflowSteps.length - 1 ? (
                          <span className="vn-home-workflow-arrow" aria-hidden="true">
                            <span className="vn-home-workflow-arrow-line"></span>
                            <Icon type="arrow-right" className="vn-home-workflow-arrow-icon" />
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="vn-home-section" id="providers">
                <div className="vn-home-shell-inner">
                  <div className="vn-home-section-head">
                    <div>
                      <h2>Recommended Professionals</h2>
                    </div>
                    <a href="#top" className="vn-home-section-link">
                      View All
                      <ArrowButtonGif className="vn-home-section-link-icon" />
                    </a>
                  </div>

                  <div className="vn-home-provider-grid">
                    {featuredProviders.map((provider) => (
                      <article
                        key={provider.name}
                        className="vn-home-provider-card"
                        style={{ '--provider-accent': provider.accent }}
                      >
                        <div className="vn-home-provider-head">
                          <span className="vn-home-provider-avatar">{provider.initials}</span>
                          <div>
                            <h3>{provider.name}</h3>
                            <p>{provider.service}</p>
                          </div>
                        </div>

                        <div className="vn-home-provider-location">
                          <Icon type="location" className="vn-home-provider-location-icon" />
                          <span>{provider.location}</span>
                        </div>

                        <div className="vn-home-provider-badges">
                          <span className="vn-home-provider-verified">
                            <Icon type="shield" className="vn-home-provider-verified-icon" />
                            Verified
                          </span>
                          <span className="vn-home-provider-rating">
                            <Icon type="star" className="vn-home-provider-meta-icon" />
                            {provider.rating} ({provider.reviews})
                          </span>
                        </div>

                        <div className="vn-home-provider-stats">
                          <div className="vn-home-provider-stat">
                            <Icon type="calendar" className="vn-home-provider-meta-icon" />
                            <span>
                              <strong>{provider.years}</strong>
                              <small>Experience</small>
                            </span>
                          </div>
                          <div className="vn-home-provider-stat">
                            <Icon type="briefcase" className="vn-home-provider-meta-icon" />
                            <span>
                              <strong>{provider.projects.replace(' Projects', '')}</strong>
                              <small>Projects</small>
                            </span>
                          </div>
                        </div>

                        <div className="vn-home-provider-actions">
                          <a
                            href={getProviderProfileHash(provider.profileCategory, provider.profileId)}
                            className="vn-home-provider-link"
                            onClick={handlePrimaryNavSelect}
                          >
                            View Profile
                          </a>
                          <button type="button" className="vn-home-provider-button" onClick={handleOpenPartnerLogin}>
                            Send Request
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              <section className="vn-home-section vn-home-testimonials-section" id="testimonials">
                <div className="vn-home-shell-inner">
                  <div className="vn-home-section-head is-centered">
                    <div>
                      <h2>What Our Customers Say</h2>
                    </div>
                  </div>

                  <div className="vn-home-testimonial-grid">
                    {testimonials.map((testimonial) => (
                      <article key={testimonial.name} className="vn-home-testimonial-card">
                        <span className="vn-home-testimonial-quote-mark" aria-hidden="true">
                          <Icon type="quote" className="vn-home-testimonial-quote-icon" />
                        </span>
                        <p className="vn-home-testimonial-quote">{testimonial.quote}</p>
                        <div className="vn-home-testimonial-foot">
                          <div className="vn-home-testimonial-person">
                            <div className="vn-home-testimonial-avatar">
                              {testimonial.avatar ? (
                                <img src={testimonial.avatar} alt={testimonial.name} loading="lazy" />
                              ) : (
                                testimonial.name
                                  .split(' ')
                                  .map((part) => part[0])
                                  .join('')
                                  .slice(0, 2)
                              )}
                            </div>
                            <div>
                              <strong>{testimonial.name}</strong>
                              <span>{testimonial.role}</span>
                            </div>
                          </div>
                          <div
                            className="vn-home-testimonial-stars"
                            aria-label={`${testimonial.stars} star rating`}
                          >
                            {Array.from({ length: testimonial.stars }).map((_, starIndex) => (
                              <Icon
                                key={`${testimonial.name}-star-${starIndex}`}
                                type="star"
                                className="vn-home-testimonial-star-icon"
                              />
                            ))}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="vn-home-testimonial-dots" aria-hidden="true">
                    <span className="is-active"></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </section>

              <section className="vn-home-section vn-home-guides-section" id="articles">
                <div className="vn-home-shell-inner">
                  <div className="vn-home-section-head">
                    <div>
                      <h2>Latest Business Guides</h2>
                    </div>
                    <a href="#top" className="vn-home-section-link">
                      View all Articles
                      <ArrowButtonGif className="vn-home-section-link-icon" />
                    </a>
                  </div>

                  <div className="vn-home-guide-grid">
                    {guides.map((guide) => (
                      <article key={guide.title} className="vn-home-guide-card">
                        <div className="vn-home-guide-media">
                          <img
                            src={guide.image}
                            alt={guide.title}
                            className="vn-home-guide-media-image is-default"
                          />
                          {guide.hoverImage ? (
                            <img
                              src={guide.hoverImage}
                              alt=""
                              aria-hidden="true"
                              className="vn-home-guide-media-image is-hover"
                              loading="lazy"
                            />
                          ) : null}
                        </div>
                        <div className="vn-home-guide-copy">
                          <span>{guide.category}</span>
                          <h3>{guide.title}</h3>
                          <p>
                            <span>{guide.date}</span>
                            <strong>•</strong>
                            <span>{guide.readTime}</span>
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      <footer className="vn-home-footer">
        <div className="vn-home-shell-inner">
          <div className="vn-home-footer-main">
            <div className="vn-home-footer-brand">
              <a className="vn-home-footer-brand-lockup" href="#top" aria-label="VyaparNest home">
                <img
                  src="/vyaparnest-footer-brand-lockup-user.png"
                  alt="VyaparNest"
                  className="vn-home-footer-brand-logo"
                />
              </a>
              <div className="vn-home-footer-socials">
                {footerSocials.map((social) => (
                  <a key={social.label} href="#top" aria-label={social.label} title={social.label}>
                    <Icon type={social.icon} className="vn-home-footer-social-icon" />
                  </a>
                ))}
              </div>
            </div>

            {footerGroups.map((group) => (
              <div key={group.title} className="vn-home-footer-column">
                <h3>{group.title}</h3>
                {group.links.map((link) => (
                  <a key={link} href="#top">
                    {link}
                  </a>
                ))}
              </div>
            ))}

            <div className="vn-home-footer-newsletter">
              <h3>Newsletter</h3>
              <p>Subscribe for get updates and offers in your inbox.</p>
              <form onSubmit={(event) => event.preventDefault()}>
                <input type="email" placeholder="Enter your email" aria-label="Enter your email" />
                <button type="submit" aria-label="Subscribe">
                  <Icon type="send" className="vn-home-footer-newsletter-icon" />
                </button>
              </form>
            </div>
          </div>

          <div className="vn-home-footer-bottom">
            <p>© 2026 VyaparNest. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {mobileSearchOpen ? (
        <div className="vn-home-mobile-search-sheet" role="dialog" aria-modal="true" aria-label="Search services">
          <div className="vn-home-mobile-search-sheet-head">
            <strong>Search Services</strong>
            <button type="button" aria-label="Close search" onClick={() => setMobileSearchOpen(false)}>
              <Icon type="close" />
            </button>
          </div>
          <label className="vn-home-mobile-search-field">
            <Icon type="search" />
            <input
              autoFocus
              type="search"
              value={mobileSearchTerm}
              onChange={(event) => setMobileSearchTerm(event.target.value)}
              placeholder="Search a service or category"
              aria-label="Search a service or category"
            />
          </label>
          <div className="vn-home-mobile-search-results">
            {mobileSearchResults.slice(0, 6).map((category) => (
              <button
                type="button"
                key={category.title}
                onClick={() => {
                  setMobileSearchOpen(false)
                  openServiceProvidersPage(category.title)
                }}
              >
                {renderCategoryVisual(category, 'vn-home-mobile-search-result-image', 'vn-home-mobile-search-result-icon')}
                <span>
                  <strong>{category.title}</strong>
                  <small>{category.experts}</small>
                </span>
                <Icon type="arrow-right" />
              </button>
            ))}
            {mobileSearchTerm && mobileSearchResults.length === 0 ? <p>No matching services found.</p> : null}
          </div>
        </div>
      ) : null}

      {!isProviderProfileScreen && !isAiAssistScreen ? (
        <nav className="vn-home-mobile-bottom-nav" aria-label="Mobile navigation">
          <a href="#top" className={currentScreen === 'home' ? 'is-active' : ''}>
            <img src="/mobile-nav-icons/home.png" alt="" />
            <span>Home</span>
          </a>
          <a href={categoriesHash} className={isCategoriesScreen ? 'is-active' : ''}>
            <img src="/mobile-nav-icons/categories.png" alt="" />
            <span>Categories</span>
          </a>
          <button type="button" className={mobileSearchOpen ? 'is-active' : ''} onClick={() => setMobileSearchOpen(true)}>
            <img src="/mobile-nav-icons/search.png" alt="" />
            <span>Search</span>
          </button>
          <button type="button" onClick={handleOpenPartnerLogin}>
            <img src="/mobile-nav-icons/messages.png" alt="" />
            <span>Messages</span>
          </button>
          <button type="button" onClick={handleOpenPartnerLogin}>
            <img src="/mobile-nav-icons/profile.png" alt="" />
            <span>Profile</span>
          </button>
        </nav>
      ) : null}

      <PartnerLoginModal
        isOpen={partnerLoginOpen}
        modalRef={null}
        onClose={closePartnerLogin}
        onCreateAccount={handleOpenPartnerRegistration}
      />
    </div>
  )
}

export default PublicHomePage

