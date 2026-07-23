import { useEffect, useRef, useState } from 'react'
import CategoriesMegaMenu from './CategoriesMegaMenu.jsx'
import PartnerLoginModal from './PartnerLoginModal.jsx'
import './PublicHomePage.css'

const homeHash = '#top'
const categoriesHash = '#all-categories'
const aiAssistHash = '#ai-assist'
const workflowHash = '#how-it-works'
const providersHash = '#providers'

const primaryNavLinks = [
  { key: 'home', label: 'Home', href: homeHash },
  { key: 'categories', label: 'Categories', href: categoriesHash, hasChevron: true },
  { key: 'ai-assist', label: 'AI Assist', href: aiAssistHash },
  { key: 'dashboard', label: 'Dashboard', href: providersHash },
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
    accentColor: '#e2aa10',
    iconSurface: 'linear-gradient(180deg, #fff5d8 0%, #fff0c9 100%)',
  },
  {
    title: 'App Development',
    servicesLabel: '156+ Services',
    description: 'Android, iOS, Flutter, React Native & more',
    image: '/category-icons/applications.gif',
    accentColor: '#5fbf45',
    iconSurface: 'linear-gradient(180deg, #ebf9e4 0%, #dcf0d5 100%)',
  },
  {
    title: 'Business Consultant',
    servicesLabel: '98+ Services',
    description: 'Strategy, Plan, Growth Consulting & more',
    image: '/category-icons/user.gif',
    accentColor: '#8a52eb',
    iconSurface: 'linear-gradient(180deg, #f3eafd 0%, #eadcff 100%)',
  },
  {
    title: 'Business Loans',
    servicesLabel: '64+ Services',
    description: 'Unsecured, Secured, Working Capital & more',
    image: '/category-icons/analytics.gif',
    accentColor: '#ff9416',
    iconSurface: 'linear-gradient(180deg, #fff1e3 0%, #ffe4cf 100%)',
  },
  {
    title: 'Website Development',
    servicesLabel: '210+ Services',
    description: 'Business, E-commerce, CMS & Custom Websites',
    image: '/category-icons/web.gif',
    accentColor: '#4985ff',
    iconSurface: 'linear-gradient(180deg, #ecf2ff 0%, #dee8ff 100%)',
  },
  {
    title: 'Digital Marketing',
    servicesLabel: '342+ Services',
    description: 'SEO, PPC, SMM, Email Marketing & more',
    image: '/category-icons/analytics.gif',
    accentColor: '#ff5b73',
    iconSurface: 'linear-gradient(180deg, #fff0f2 0%, #ffe2e9 100%)',
  },
  {
    title: 'Graphic Design',
    servicesLabel: '186+ Services',
    description: 'Logo, Branding, Banner, Brochure & more',
    image: '/category-icons/graphic-designer.gif',
    accentColor: '#e0a500',
    iconSurface: 'linear-gradient(180deg, #fff6dd 0%, #ffedc8 100%)',
  },
  {
    title: 'Video Editing',
    servicesLabel: '112+ Services',
    description: 'YouTube, Ads, Reels, Corporate Video & more',
    image: '/category-icons/movie-camera.gif',
    accentColor: '#447eff',
    iconSurface: 'linear-gradient(180deg, #edf3ff 0%, #dfe9ff 100%)',
  },
  {
    title: 'GST & Tax Services',
    servicesLabel: '89+ Services',
    description: 'GST Registration, Filing, Return & Compliance',
    image: '/category-icons/tax.gif',
    accentColor: '#5dbb45',
    iconSurface: 'linear-gradient(180deg, #eef8e7 0%, #dff0d3 100%)',
  },
  {
    title: 'CA Services',
    servicesLabel: '78+ Services',
    description: 'Income Tax, ROC, Compliance & Advisory',
    image: '/category-icons/contract.gif',
    accentColor: '#8c56ea',
    iconSurface: 'linear-gradient(180deg, #f3eafb 0%, #e8ddff 100%)',
  },
  {
    title: 'Legal Consultant',
    servicesLabel: '75+ Services',
    description: 'Legal Advice, Notices, Contracts & Documentation',
    image: '/category-icons/contract.gif',
    accentColor: '#18a59b',
    iconSurface: 'linear-gradient(180deg, #e6f8f5 0%, #d5f0ea 100%)',
  },
  {
    title: 'Company Registration',
    servicesLabel: '92+ Services',
    description: 'Private Limited, LLP, OPC & Sole Proprietorship',
    image: '/category-icons/mission.gif',
    accentColor: '#8c56ea',
    iconSurface: 'linear-gradient(180deg, #f1e8ff 0%, #e5dbff 100%)',
  },
  {
    title: 'Social Media Marketing',
    servicesLabel: '123+ Services',
    description: 'Content, Management, Paid Ads & Growth',
    image: '/category-icons/web-data.gif',
    accentColor: '#ff5c73',
    iconSurface: 'linear-gradient(180deg, #fff0f2 0%, #ffe1e8 100%)',
  },
  {
    title: 'SEO Services',
    servicesLabel: '168+ Services',
    description: 'On-Page, Off-Page, Technical SEO & Local SEO',
    image: '/category-seo.gif',
    accentColor: '#457fff',
    iconSurface: 'linear-gradient(180deg, #edf3ff 0%, #dfe8ff 100%)',
  },
  {
    title: 'Content Writing',
    servicesLabel: '97+ Services',
    description: 'Website Content, Blogs, Articles & More',
    image: '/category-comments.gif',
    accentColor: '#ff8c14',
    iconSurface: 'linear-gradient(180deg, #fff3e6 0%, #ffe6cf 100%)',
  },
  {
    title: 'Photography',
    servicesLabel: '84+ Services',
    description: 'Events, Products, Portraits & Brand Shoots',
    image: '/category-photo.gif',
    accentColor: '#4a80ff',
    iconSurface: 'linear-gradient(180deg, #eef3ff 0%, #e0e8ff 100%)',
  },
  {
    title: 'Interior Design',
    servicesLabel: '73+ Services',
    description: 'Home, Office, Space Planning & Decor',
    image: '/category-icons/vector.gif',
    accentColor: '#17a296',
    iconSurface: 'linear-gradient(180deg, #e8f8f5 0%, #d6efe9 100%)',
  },
  {
    title: 'Home Services',
    servicesLabel: '144+ Services',
    description: 'Cleaning, Repairs, Maintenance & Setup',
    image: '/category-icons/cleaning-service.gif',
    accentColor: '#5ab948',
    iconSurface: 'linear-gradient(180deg, #eef8e8 0%, #ddf0d4 100%)',
  },
  {
    title: 'AI Automation',
    servicesLabel: '69+ Services',
    description: 'Chatbots, Workflow Tools, CRM Automation & more',
    image: '/category-icons/mission.gif',
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

function getActivePrimaryNavKey(currentScreen, activeHash) {
  if (currentScreen === 'ai-assist' || activeHash === aiAssistHash) {
    return 'ai-assist'
  }

  if (currentScreen === 'categories' || activeHash === categoriesHash || activeHash === '#categories') {
    return 'categories'
  }

  if (activeHash === workflowHash) {
    return 'ai-assist'
  }

  if (activeHash === providersHash) {
    return 'dashboard'
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
  const [partnerMenuOpen, setPartnerMenuOpen] = useState(false)
  const [categoriesMenuOpen, setCategoriesMenuOpen] = useState(false)
  const [categoriesPageFilterOpen, setCategoriesPageFilterOpen] = useState(false)
  const [categoriesPageSearchTerm, setCategoriesPageSearchTerm] = useState('')
  const [selectedCategoryTitle, setSelectedCategoryTitle] = useState('All Categories')
  const [aiConversations, setAiConversations] = useState(initialAiAssistConversations)
  const [selectedAiConversationId, setSelectedAiConversationId] = useState(
    initialAiAssistConversations[0].id
  )
  const [showAllAiConversations, setShowAllAiConversations] = useState(false)
  const [aiComposerText, setAiComposerText] = useState('')
  const [partnerLoginOpen, setPartnerLoginOpen] = useState(false)
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
  const isCategoriesScreen = currentScreen === 'categories'
  const isAiAssistScreen = currentScreen === 'ai-assist'
  const activePrimaryNavKey = getActivePrimaryNavKey(currentScreen, activeHash)
  const selectedCategory =
    selectedCategoryTitle === 'All Categories'
      ? null
      : categoryFilterOptions.find((category) => category.title === selectedCategoryTitle) ?? null
  const filteredCategoryOptions = categoryFilterOptions.filter((category) =>
    category.title.toLowerCase().includes(categoriesPageSearchTerm.trim().toLowerCase())
  )
  const displayedCategories = selectedCategory
    ? categoryFilterOptions.filter((category) => category.title === selectedCategory.title)
    : allCategoriesCards
  const visibleAiConversations = showAllAiConversations
    ? aiConversations
    : aiConversations.slice(0, 6)
  const selectedAiConversation =
    aiConversations.find((conversation) => conversation.id === selectedAiConversationId) ??
    aiConversations[0]
  const visibleCategoryCount = displayedCategories.length
  const categoriesPageCountLabel = `Explore ${visibleCategoryCount} trusted ${
    visibleCategoryCount === 1 ? 'service' : 'services'
  } to grow your business`

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
  }, [currentScreen])

  useEffect(() => {
    if (!isCategoriesScreen) {
      setCategoriesPageFilterOpen(false)
      setCategoriesPageSearchTerm('')
    }
  }, [isCategoriesScreen])

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
    setCategoriesPageFilterOpen(false)
    setCategoriesPageSearchTerm('')
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
    setShowAllAiConversations(false)
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
      } catch {
        // no-op fallback for unsupported clipboard cases
      }
    }
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
            <button type="button" aria-label="Like response">
              <Icon type="thumbs-up" className="vn-home-ai-message-action-icon" />
            </button>
            <button type="button" aria-label="Dislike response">
              <Icon type="thumbs-down" className="vn-home-ai-message-action-icon" />
            </button>
            <button type="button" aria-label="Copy response" onClick={() => handleCopyAiMessage(message)}>
              <Icon type="copy" className="vn-home-ai-message-action-icon" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`vn-home-shell${isCategoriesScreen ? ' is-categories-screen' : ''}${
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

            <div id="vn-home-nav-panel" className={`vn-home-nav-area${mobileNavOpen ? ' is-open' : ''}`}>
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
                        <a
                          className="vn-home-partner-menu-secondary"
                          href="#for-business"
                          onClick={() => {
                            setMobileNavOpen(false)
                            setPartnerMenuOpen(false)
                          }}
                        >
                          Learn More
                        </a>
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
          isAiAssistScreen ? ' is-ai-assist-screen' : ''
        }`}
      >
        {!isCategoriesScreen && !isAiAssistScreen ? (
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
              </div>
            </div>
          </section>
        ) : null}

        <div
          className={`vn-home-content${isCategoriesScreen ? ' is-categories-page' : ''}${
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
                  {displayedCategories.map((category) => (
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
                      onClick={() => selectCategoryFilter(category.title)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          selectCategoryFilter(category.title)
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
              </div>
            </section>
          ) : isAiAssistScreen ? (
            <section className="vn-home-section vn-home-ai-assist-page" id="ai-assist">
              <div className="vn-home-shell-inner is-fluid">
                <div className="vn-home-ai-assist-layout">
                  <aside className="vn-home-ai-sidebar">
                    <div className="vn-home-ai-sidebar-head">
                      <div>
                        <h2>Chat History</h2>
                      </div>
                      <button
                        type="button"
                        className="vn-home-ai-new-chat"
                        onClick={handleCreateAiChat}
                      >
                        <Icon type="plus" className="vn-home-ai-new-chat-icon" />
                        <span>New Chat</span>
                      </button>
                    </div>

                    <div className="vn-home-ai-history-list">
                      {visibleAiConversations.map((conversation) => {
                        const isActive = conversation.id === selectedAiConversation.id

                        return (
                          <button
                            key={conversation.id}
                            type="button"
                            className={`vn-home-ai-history-item${isActive ? ' is-active' : ''}`}
                            onClick={() => setSelectedAiConversationId(conversation.id)}
                          >
                            <span className="vn-home-ai-history-item-icon">
                              <Icon
                                type="message-circle"
                                className="vn-home-ai-history-item-icon-svg"
                              />
                            </span>
                            <span className="vn-home-ai-history-item-copy">
                              <strong>{conversation.title}</strong>
                              <small>{conversation.timeLabel}</small>
                            </span>
                            <Icon
                              type="more-vertical"
                              className="vn-home-ai-history-item-more"
                            />
                          </button>
                        )
                      })}
                    </div>

                    <div className="vn-home-ai-sidebar-actions">
                      <button
                        type="button"
                        className="vn-home-ai-history-more"
                        onClick={() => setShowAllAiConversations((open) => !open)}
                      >
                        <span>{showAllAiConversations ? 'Show Less History' : 'View More History'}</span>
                        <Icon type="chevron-down" className="vn-home-ai-history-more-icon" />
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
                  </aside>

                  <section className="vn-home-ai-chat-panel">
                    <div className="vn-home-ai-chat-hero">
                      <AiAssistMascot className="vn-home-ai-chat-mascot" />
                      <div className="vn-home-ai-chat-hero-copy">
                        <h1>
                          Hello! I'm <span>Vyapar AI</span>
                          <Icon type="spark" className="vn-home-ai-chat-hero-mark" />
                        </h1>
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
                      <article key={category.title} className="vn-home-category-card">
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
                          <span>
                            <Icon type="calendar" className="vn-home-provider-meta-icon" />
                            {provider.years}
                          </span>
                          <span>
                            <Icon type="briefcase" className="vn-home-provider-meta-icon" />
                            {provider.projects}
                          </span>
                        </div>

                        <div className="vn-home-provider-actions">
                          <a href="#top" className="vn-home-provider-link">
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

              <section className="vn-home-section" id="for-business">
                <div className="vn-home-shell-inner">
                  <div className="vn-home-promo-grid">
                    <article className="vn-home-promo-card is-dark">
                      <div className="vn-home-promo-icon">
                        <img
                          src="/promo-icons/file.gif"
                          alt=""
                          className="vn-home-promo-icon-image"
                          loading="lazy"
                        />
                      </div>
                      <div className="vn-home-promo-copy">
                        <h3>Can&apos;t Find the Right Professional?</h3>
                        <p>
                          Post your requirement and get responses from suitable verified professionals.
                        </p>
                      </div>
                      <a className="vn-home-promo-button" href="#providers">
                        Post Your Requirement
                      </a>
                    </article>

                    <article className="vn-home-promo-card is-gold">
                      <div className="vn-home-promo-icon">
                        <img
                          src="/promo-icons/briefcase.gif"
                          alt=""
                          className="vn-home-promo-icon-image"
                          loading="lazy"
                        />
                      </div>
                      <div className="vn-home-promo-copy">
                        <h3>Are You a Service Provider?</h3>
                        <p>List your business on VyaparNest and grow your business online.</p>
                      </div>
                      <button
                        type="button"
                        className="vn-home-promo-button is-dark"
                        onClick={handleOpenPartnerRegistration}
                      >
                        List Your Business
                      </button>
                    </article>
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
                          &ldquo;
                        </span>
                        <p className="vn-home-testimonial-quote">&ldquo;{testimonial.quote}&rdquo;</p>
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
                              <span key={`${testimonial.name}-star-${starIndex}`}>★</span>
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

