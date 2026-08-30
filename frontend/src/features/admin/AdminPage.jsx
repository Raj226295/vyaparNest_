import { useEffect, useMemo, useState } from 'react'
import {
  adminActivityFeed,
  adminDashboardHash,
  adminLoginHash,
  adminNavigationGroups,
  adminOverviewStats,
  adminProfileCard,
  adminRevenueSeries,
  adminRoutePrefix,
  aiAssistantCards,
  bannerRows,
  blogRows,
  categoryRows,
  couponRows,
  faqRows,
  homepageSectionRows,
  notificationTemplates,
  paymentRows,
  permissionMatrix,
  portfolioRows,
  projectRows,
  providerRows,
  requestRows,
  reviewRows,
  roleRows,
  securityBackups,
  serviceRows,
  settingsCards,
  supportTicketRows,
  userRows,
  withdrawalRows,
  activityLogRows,
} from './adminData.js'
import './AdminPage.css'

const authStorageKey = 'vyaparnest-admin-auth'
const authUserStorageKey = 'vyaparnest-admin-user'
const themeStorageKey = 'vyaparnest-admin-theme'
const sidebarStorageKey = 'vyaparnest-admin-sidebar-collapsed'
const marketplaceServicesStorageKey = 'vyaparnest-marketplace-services-v1'

const readStoredMarketplaceServices = (fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const saved = JSON.parse(window.localStorage.getItem(marketplaceServicesStorageKey) || 'null')
    return Array.isArray(saved) && saved.length ? saved : fallback
  } catch {
    return fallback
  }
}

const createServiceImagePreview = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onerror = reject
  reader.onload = () => {
    const image = new Image()
    image.onerror = reject
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const targetRatio = 16 / 9
      const sourceRatio = image.width / image.height
      let sourceX = 0
      let sourceY = 0
      let sourceWidth = image.width
      let sourceHeight = image.height
      if (sourceRatio > targetRatio) {
        sourceWidth = image.height * targetRatio
        sourceX = (image.width - sourceWidth) / 2
      } else {
        sourceHeight = image.width / targetRatio
        sourceY = (image.height - sourceHeight) / 2
      }
      canvas.width = 960
      canvas.height = 540
      canvas.getContext('2d').drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, 960, 540)
      resolve(canvas.toDataURL('image/jpeg', 0.82))
    }
    image.src = reader.result
  }
  reader.readAsDataURL(file)
})
const rowsPerPage = 5

const managementSectionConfigs = {
  users: {
    title: 'Users',
    description: 'Manage customers, internal admins, account status, and spend visibility from one place.',
    primaryAction: 'Add User',
    rows: userRows,
    columns: [
      { key: 'id', label: 'User ID' },
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
      { key: 'city', label: 'City' },
      { key: 'status', label: 'Status' },
      { key: 'spend', label: 'Spend' },
      { key: 'joined', label: 'Joined' },
    ],
  },
  providers: {
    title: 'Service Providers',
    description: 'Approve, verify, suspend, block, and monitor provider performance, earnings, documents, and requests.',
    primaryAction: 'Open Approval Queue',
    rows: providerRows,
    columns: [
      { key: 'id', label: 'Provider ID' },
      { key: 'name', label: 'Provider Name' },
      { key: 'category', label: 'Category' },
      { key: 'city', label: 'City' },
      { key: 'status', label: 'Status' },
      { key: 'verified', label: 'Verification' },
      { key: 'earnings', label: 'Earnings' },
      { key: 'rating', label: 'Rating' },
      { key: 'requests', label: 'Requests' },
    ],
  },
  categories: {
    title: 'Categories',
    description: 'Add, edit, order, enable, disable, and manage category visuals, images, and subcategories.',
    primaryAction: 'Add Category',
    rows: categoryRows,
    columns: [
      { key: 'id', label: 'Category ID' },
      { key: 'name', label: 'Category' },
      { key: 'services', label: 'Services' },
      { key: 'status', label: 'Status' },
      { key: 'order', label: 'Display Order' },
      { key: 'subcategories', label: 'Subcategories' },
      { key: 'icon', label: 'Icon Asset' },
      { key: 'image', label: 'Banner Asset' },
    ],
  },
  services: {
    title: 'Services',
    description: 'Control service cards, pricing, descriptions, category mapping, feature flags, and visibility.',
    primaryAction: 'Add Service',
    rows: serviceRows,
    columns: [
      { key: 'id', label: 'Service ID' },
      { key: 'title', label: 'Service Name' },
      { key: 'category', label: 'Category' },
      { key: 'provider', label: 'Provider' },
      { key: 'price', label: 'Price' },
      { key: 'status', label: 'Status' },
      { key: 'mode', label: 'Mode' },
      { key: 'featured', label: 'Featured' },
    ],
  },
  portfolio: {
    title: 'Portfolio Management',
    description: 'Review uploaded projects, approve or reject work, update images, feature projects, and control visibility.',
    primaryAction: 'Review Pending Portfolio',
    rows: portfolioRows,
    columns: [
      { key: 'id', label: 'Project ID' },
      { key: 'provider', label: 'Provider' },
      { key: 'title', label: 'Project Title' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status' },
      { key: 'featured', label: 'Featured' },
      { key: 'updated', label: 'Updated' },
    ],
  },
  requests: {
    title: 'Service Requests',
    description: 'View incoming customer requests, assign providers, inspect attachments, and manage request timelines.',
    primaryAction: 'Assign Provider',
    rows: requestRows,
    columns: [
      { key: 'id', label: 'Request ID' },
      { key: 'customer', label: 'Customer' },
      { key: 'provider', label: 'Assigned Provider' },
      { key: 'service', label: 'Service' },
      { key: 'status', label: 'Status' },
      { key: 'priority', label: 'Priority' },
      { key: 'budget', label: 'Budget' },
      { key: 'attachment', label: 'Attachment' },
    ],
  },
  projects: {
    title: 'Orders / Projects',
    description: 'Track live projects, progress, deadlines, order value, and completion status across the platform.',
    primaryAction: 'Open Active Projects',
    rows: projectRows,
    columns: [
      { key: 'id', label: 'Project ID' },
      { key: 'title', label: 'Project' },
      { key: 'customer', label: 'Customer' },
      { key: 'provider', label: 'Provider' },
      { key: 'status', label: 'Status' },
      { key: 'progress', label: 'Progress' },
      { key: 'deadline', label: 'Deadline' },
      { key: 'value', label: 'Value' },
    ],
  },
  payments: {
    title: 'Payments',
    description: 'Monitor customer payments, provider payouts, commission, refunds, wallet flow, and payment gateway status.',
    primaryAction: 'Export Payment Report',
    rows: paymentRows,
    columns: [
      { key: 'id', label: 'Payment ID' },
      { key: 'customer', label: 'Customer' },
      { key: 'provider', label: 'Provider' },
      { key: 'amount', label: 'Amount' },
      { key: 'commission', label: 'Commission' },
      { key: 'method', label: 'Method' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Date' },
    ],
  },
  withdrawals: {
    title: 'Withdrawals',
    description: 'Handle provider withdrawal requests, approvals, processing state, and bank payout records.',
    primaryAction: 'Process Withdrawals',
    rows: withdrawalRows,
    columns: [
      { key: 'id', label: 'Withdrawal ID' },
      { key: 'provider', label: 'Provider' },
      { key: 'amount', label: 'Amount' },
      { key: 'bank', label: 'Bank' },
      { key: 'status', label: 'Status' },
      { key: 'requestedOn', label: 'Requested On' },
    ],
  },
  reviews: {
    title: 'Reviews & Ratings',
    description: 'Approve, delete, reply, flag abuse, and analyze review quality and rating distribution.',
    primaryAction: 'Moderate Reviews',
    rows: reviewRows,
    columns: [
      { key: 'id', label: 'Review ID' },
      { key: 'customer', label: 'Customer' },
      { key: 'provider', label: 'Provider' },
      { key: 'rating', label: 'Rating' },
      { key: 'status', label: 'Status' },
      { key: 'reply', label: 'Reply Status' },
      { key: 'reported', label: 'Reported' },
      { key: 'excerpt', label: 'Review Excerpt' },
    ],
  },
  banners: {
    title: 'Banners',
    description: 'Manage homepage, category, service, offer, and promotional banners with preview and scheduling controls.',
    primaryAction: 'Upload New Banner',
    rows: bannerRows,
    columns: [
      { key: 'id', label: 'Banner ID' },
      { key: 'type', label: 'Banner Type' },
      { key: 'title', label: 'Title' },
      { key: 'status', label: 'Status' },
      { key: 'schedule', label: 'Schedule' },
      { key: 'cta', label: 'CTA' },
    ],
  },
  homepage: {
    title: 'Homepage Sections',
    description: 'Edit hero banner, categories, providers, testimonials, FAQ, blogs, footer, and every homepage module.',
    primaryAction: 'Edit Homepage',
    rows: homepageSectionRows,
    columns: [
      { key: 'id', label: 'Section ID' },
      { key: 'section', label: 'Section Name' },
      { key: 'status', label: 'Status' },
      { key: 'updated', label: 'Last Updated' },
    ],
  },
  coupons: {
    title: 'Coupons & Offers',
    description: 'Create, edit, expire, or target discount campaigns by provider, category, or user segment.',
    primaryAction: 'Create Coupon',
    rows: couponRows,
    columns: [
      { key: 'id', label: 'Coupon ID' },
      { key: 'code', label: 'Code' },
      { key: 'type', label: 'Type' },
      { key: 'value', label: 'Value' },
      { key: 'usage', label: 'Usage' },
      { key: 'expiry', label: 'Expiry' },
      { key: 'scope', label: 'Scope' },
      { key: 'status', label: 'Status' },
    ],
  },
  blog: {
    title: 'Blog Management',
    description: 'Control blog drafts, publishing flow, article status, and content scheduling across the website.',
    primaryAction: 'Create Blog Post',
    rows: blogRows,
    columns: [
      { key: 'id', label: 'Blog ID' },
      { key: 'title', label: 'Title' },
      { key: 'author', label: 'Author' },
      { key: 'status', label: 'Status' },
      { key: 'date', label: 'Date' },
    ],
  },
  faqs: {
    title: 'FAQs',
    description: 'Update frequently asked questions, categories, publishing state, and help-center coverage.',
    primaryAction: 'Add FAQ',
    rows: faqRows,
    columns: [
      { key: 'id', label: 'FAQ ID' },
      { key: 'question', label: 'Question' },
      { key: 'category', label: 'Category' },
      { key: 'status', label: 'Status' },
    ],
  },
  support: {
    title: 'Support Tickets',
    description: 'Monitor escalations, assignees, priority, status, and customer issue resolution from one desk.',
    primaryAction: 'Open Ticket Queue',
    rows: supportTicketRows,
    columns: [
      { key: 'id', label: 'Ticket ID' },
      { key: 'customer', label: 'Customer' },
      { key: 'topic', label: 'Topic' },
      { key: 'priority', label: 'Priority' },
      { key: 'status', label: 'Status' },
      { key: 'assignee', label: 'Assignee' },
    ],
  },
  activity: {
    title: 'Activity Logs',
    description: 'Inspect admin actions, moderation changes, payout events, and content updates across all modules.',
    primaryAction: 'Export Logs',
    rows: activityLogRows,
    columns: [
      { key: 'id', label: 'Log ID' },
      { key: 'actor', label: 'Actor' },
      { key: 'action', label: 'Action' },
      { key: 'module', label: 'Module' },
      { key: 'time', label: 'Time' },
    ],
  },
}

function cleanText(value) {
  if (value === null || value === undefined || value === '') {
    return '-'
  }

  return String(value)
    .replaceAll('â‚¹', 'Rs ')
    .replaceAll('Â·', '·')
}

function getAdminHashState(hash) {
  if (hash === adminLoginHash) {
    return { isLogin: true, section: 'dashboard' }
  }

  if (hash === adminDashboardHash) {
    return { isLogin: false, section: 'dashboard' }
  }

  if (hash.startsWith(adminRoutePrefix)) {
    const nextSection = hash.slice(adminRoutePrefix.length).trim() || 'dashboard'
    return { isLogin: false, section: nextSection }
  }

  return { isLogin: false, section: 'dashboard' }
}

function AdminIcon({ type, className = '' }) {
  const classes = ['vn-admin-icon', className].filter(Boolean).join(' ')

  switch (type) {
    case 'dashboard':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="8" height="8" rx="2" />
          <rect x="13" y="3" width="8" height="5" rx="2" />
          <rect x="13" y="10" width="8" height="11" rx="2" />
          <rect x="3" y="13" width="8" height="8" rx="2" />
        </svg>
      )
    case 'users':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M16.5 18.5a4.5 4.5 0 0 0-9 0" />
          <circle cx="12" cy="8.5" r="3.5" />
          <path d="M21 17a3.5 3.5 0 0 0-2.7-3.4" />
          <path d="M18 5.2a3 3 0 0 1 0 5.6" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="7" width="18" height="12" rx="2.5" />
          <path d="M9 7V5.6A1.6 1.6 0 0 1 10.6 4h2.8A1.6 1.6 0 0 1 15 5.6V7" />
          <path d="M3 11.5h18" />
        </svg>
      )
    case 'grid':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="4" width="6" height="6" rx="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" />
          <rect x="14" y="14" width="6" height="6" rx="1.5" />
        </svg>
      )
    case 'layers':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 4 8 4-8 4-8-4 8-4Z" />
          <path d="m4 12 8 4 8-4" />
          <path d="m4 16 8 4 8-4" />
        </svg>
      )
    case 'gallery':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <circle cx="9" cy="10" r="1.7" />
          <path d="m7 17 4.5-4 2.7 2.4 2.8-3.1L20 17" />
        </svg>
      )
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="6" y="5" width="12" height="16" rx="2.5" />
          <rect x="9" y="3" width="6" height="4" rx="1.5" />
          <path d="M9 11h6M9 15h6" />
        </svg>
      )
    case 'kanban':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="5" width="5" height="14" rx="1.7" />
          <rect x="10" y="5" width="5" height="8" rx="1.7" />
          <rect x="16" y="5" width="4" height="11" rx="1.7" />
        </svg>
      )
    case 'wallet':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6H19a1.5 1.5 0 0 1 1.5 1.5V17A2 2 0 0 1 18.5 19h-12A2.5 2.5 0 0 1 4 16.5v-8Z" />
          <path d="M4 9h16.5" />
          <path d="M15.5 13h2" />
        </svg>
      )
    case 'bank':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m3 9 9-5 9 5" />
          <path d="M4.5 10.5h15" />
          <path d="M6 10.5v7M10 10.5v7M14 10.5v7M18 10.5v7" />
          <path d="M3 19.5h18" />
        </svg>
      )
    case 'star':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="currentColor">
          <path d="m12 3.6 2.55 5.17 5.7.83-4.12 4.02.97 5.68L12 16.62 6.9 19.3l.97-5.68L3.75 9.6l5.7-.83L12 3.6Z" />
        </svg>
      )
    case 'image':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="5" width="18" height="14" rx="2.5" />
          <circle cx="9" cy="10" r="1.6" />
          <path d="m7 17 3.4-3.4 2.8 2.3 3.2-4 3.6 5.1" />
        </svg>
      )
    case 'home':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m4 11 8-6 8 6" />
          <path d="M6 10.5V19h12v-8.5" />
          <path d="M10 19v-5h4v5" />
        </svg>
      )
    case 'bell':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 4.5a4 4 0 0 0-4 4V11c0 .8-.2 1.6-.7 2.3L6 15.5h12l-1.3-2.2A4.5 4.5 0 0 1 16 11V8.5a4 4 0 0 0-4-4Z" />
          <path d="M10 18a2 2 0 0 0 4 0" />
        </svg>
      )
    case 'chart':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 19h16" />
          <path d="M7 16V9" />
          <path d="M12 16V5" />
          <path d="M17 16v-4" />
        </svg>
      )
    case 'document':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M7 3.8h7.5L19 8.3V20H7a2 2 0 0 1-2-2V5.8a2 2 0 0 1 2-2Z" />
          <path d="M14.5 3.8V8.5H19" />
          <path d="M9 12h6M9 16h6" />
        </svg>
      )
    case 'faq':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8.5" />
          <path d="M9.9 9.3A2.5 2.5 0 0 1 14.8 10c0 1.7-2.1 2.2-2.6 3.4" />
          <circle cx="12" cy="16.8" r=".8" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'support':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M5 12a7 7 0 0 1 14 0" />
          <rect x="4" y="12" width="4" height="6" rx="1.5" />
          <rect x="16" y="12" width="4" height="6" rx="1.5" />
          <path d="M12 19v1.2a1.8 1.8 0 0 1-1.8 1.8H9" />
        </svg>
      )
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="currentColor">
          <path d="m12 2 1.9 5.1L19 9l-5.1 1.9L12 16l-1.9-5.1L5 9l5.1-1.9L12 2Z" />
          <path d="m18 14 .9 2.2 2.1.8-2.1.8L18 20l-.8-2.2-2.2-.8 2.2-.8L18 14Z" />
        </svg>
      )
    case 'settings':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="3.2" />
          <path d="m19.4 15.1 1.2 2.1-2.1 2.1-2.1-1.2a8.5 8.5 0 0 1-2 .8L14 21h-4l-.4-2.1a8.5 8.5 0 0 1-2-.8l-2.1 1.2-2.1-2.1 1.2-2.1a8.5 8.5 0 0 1-.8-2L3 12l.8-1.1a8.5 8.5 0 0 1 .8-2L3.4 6.8l2.1-2.1 2.1 1.2a8.5 8.5 0 0 1 2-.8L10 3h4l.4 2.1a8.5 8.5 0 0 1 2 .8l2.1-1.2 2.1 2.1-1.2 2.1a8.5 8.5 0 0 1 .8 2L21 12l-.8 1.1a8.5 8.5 0 0 1-.8 2Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3.5 19 6v5.3c0 4.2-2.7 8.1-7 9.2-4.3-1.1-7-5-7-9.2V6l7-2.5Z" />
          <path d="m9.5 12.2 1.7 1.7 3.5-3.7" />
        </svg>
      )
    case 'history':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3.5 12A8.5 8.5 0 1 0 6 6.1" />
          <path d="M3.5 4.5v4h4" />
          <path d="M12 8v4l2.8 1.6" />
        </svg>
      )
    case 'lock':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="5" y="11" width="14" height="9" rx="2.2" />
          <path d="M8 11V8.6A4 4 0 0 1 12 4.5a4 4 0 0 1 4 4.1V11" />
        </svg>
      )
    case 'profile':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="8.2" r="3.2" />
          <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
        </svg>
      )
    case 'logout':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M9 6.5H6A2.5 2.5 0 0 0 3.5 9v6A2.5 2.5 0 0 0 6 17.5h3" />
          <path d="m13 16.5 4.5-4.5L13 7.5" />
          <path d="M8.5 12h9" />
        </svg>
      )
    case 'search':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="11" cy="11" r="5.8" />
          <path d="m19 19-3.5-3.5" />
        </svg>
      )
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.7 4.7l1.6 1.6M17.7 17.7l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.7 19.3l1.6-1.6M17.7 6.3l1.6-1.6" />
        </svg>
      )
    case 'moon':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="currentColor">
          <path d="M16.8 14.7A6.8 6.8 0 0 1 9.3 7.2a7.8 7.8 0 1 0 7.5 7.5Z" />
        </svg>
      )
    case 'menu':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      )
    case 'close':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m6 6 12 12M18 6 6 18" />
        </svg>
      )
    case 'upload':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 16V6" />
          <path d="m8.5 9.5 3.5-3.5 3.5 3.5" />
          <path d="M4 17.5v1A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5v-1" />
        </svg>
      )
    case 'check':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m5 12.5 4.2 4.2L19 7" />
        </svg>
      )
    case 'warning':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m12 4 8 14H4L12 4Z" />
          <path d="M12 9v4.2" />
          <circle cx="12" cy="16.6" r=".8" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'phone':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="7" y="3.5" width="10" height="17" rx="2.2" />
          <path d="M11 17.2h2" />
        </svg>
      )
    case 'email':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3.5" y="5.5" width="17" height="13" rx="2.2" />
          <path d="m4.5 7 7.5 5.5L19.5 7" />
        </svg>
      )
    case 'otp':
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="4" y="6" width="16" height="12" rx="2.2" />
          <path d="M7 10h2M11 10h2M15 10h2M7 14h6" />
        </svg>
      )
    case 'google':
      return <span className={classes}>G</span>
    case 'facebook':
      return <span className={classes}>f</span>
    default:
      return (
        <svg viewBox="0 0 24 24" className={classes} fill="none" stroke="currentColor" strokeWidth="1.8">
          <circle cx="12" cy="12" r="8.5" />
        </svg>
      )
  }
}

function StatusBadge({ value }) {
  const normalizedValue = cleanText(value)
  const tone =
    /active|approved|verified|healthy|published|ready|settled|enabled|resolved/i.test(normalizedValue)
      ? 'success'
      : /pending|processing|draft|review|assigned|in progress|scheduled/i.test(normalizedValue)
        ? 'warning'
        : /blocked|rejected|reported|suspended|cancelled|expired|needs review|fraud/i.test(normalizedValue)
          ? 'danger'
          : 'neutral'

  return <span className={`vn-admin-status-badge is-${tone}`}>{normalizedValue}</span>
}

const dashboardSparkPaths = {
  totalProviders: 'M2 28 L10 31 L18 27 L26 32 L34 30 L42 22 L50 27 L58 19 L66 29 L74 35 L82 28 L90 31 L98 27 L106 26 L114 18 L122 22 L130 17 L138 20 L146 16 L154 19 L162 11',
  pendingApprovals: 'M2 25 L10 21 L18 30 L26 32 L34 24 L42 27 L50 19 L58 24 L66 17 L74 12 L82 8 L90 15 L98 18 L106 28 L114 31 L122 24 L130 20 L138 26 L146 17 L154 21 L162 12',
  totalClients: 'M2 30 L10 22 L18 27 L26 33 L34 29 L42 20 L50 26 L58 19 L66 25 L74 22 L82 18 L90 12 L98 8 L106 13 L114 17 L122 24 L130 28 L138 23 L146 20 L154 24 L162 15',
  totalBookings: 'M2 25 L10 29 L18 34 L26 31 L34 22 L42 28 L50 31 L58 34 L66 28 L74 23 L82 19 L90 9 L98 17 L106 15 L114 25 L122 31 L130 27 L138 18 L146 21 L154 12 L162 16',
  revenue: 'M2 22 L10 18 L18 24 L26 28 L34 21 L42 18 L50 25 L58 23 L66 29 L74 25 L82 30 L90 33 L98 29 L106 35 L114 28 L122 24 L130 18 L138 15 L146 20 L154 25 L162 19',
}

const dashboardStatIcons = {
  totalProviders: 'users',
  pendingApprovals: 'history',
  totalClients: 'profile',
  totalBookings: 'clipboard',
  revenue: 'wallet',
}

const approvalRows = [
  { id: 1, initials: 'RS', name: 'Rohit Sharma', email: 'rohit@example.com', category: 'Web Development', experience: '4+ Years', location: 'Jaipur, Rajasthan', time: '10:30 AM', tone: 'violet' },
  { id: 2, initials: 'PP', name: 'Priya Patel', email: 'priya@example.com', category: 'Graphic Design', experience: '2+ Years', location: 'Ahmedabad, Gujarat', time: '09:15 AM', tone: 'orange' },
  { id: 3, initials: 'AV', name: 'Amit Verma', email: 'amit@example.com', category: 'Digital Marketing', experience: '3+ Years', location: 'Lucknow, Uttar Pradesh', time: '08:50 AM', tone: 'green' },
  { id: 4, initials: 'NG', name: 'Neha Gupta', email: 'neha@example.com', category: 'Content Writing', experience: '1+ Year', location: 'Delhi, India', time: '08:10 AM', tone: 'blue' },
  { id: 5, initials: 'VS', name: 'Vikram Singh', email: 'vikram@example.com', category: 'SEO Specialist', experience: '5+ Years', location: 'Bhopal, Madhya Pradesh', time: '07:45 AM', tone: 'pink' },
]

const userDashboardRows = [
  { id: 'U-1201', initials: 'RK', name: 'Rahul Kumar', role: 'Customer', email: 'rahul@example.com', phone: '+91 98765 43210', status: 'Active', joined: 'Jul 24, 2026', spend: '₹18,400', bookings: 12, tone: 'blue' },
  { id: 'U-1202', initials: 'PS', name: 'Priya Singh', role: 'Customer', email: 'priya@example.com', phone: '+91 91234 56789', status: 'Active', joined: 'Jul 24, 2026', spend: '₹24,900', bookings: 18, tone: 'pink' },
  { id: 'U-1203', initials: 'FM', name: 'Finance Manager', role: 'Finance Manager', email: 'finance@vyaparnest.com', phone: '+91 90000 11111', status: 'Active', joined: 'Jul 22, 2026', spend: '-', bookings: 0, tone: 'violet' },
  { id: 'U-1204', initials: 'NV', name: 'Nitesh Verma', role: 'Customer', email: 'nitesh@example.com', phone: '+91 99887 66554', status: 'Suspended', joined: 'Jul 21, 2026', spend: '₹6,700', bookings: 4, tone: 'orange' },
  { id: 'U-1205', initials: 'SD', name: 'Shweta Das', role: 'Customer', email: 'shweta@example.com', phone: '+91 78787 87878', status: 'Active', joined: 'Jul 20, 2026', spend: '₹12,300', bookings: 9, tone: 'green' },
  { id: 'U-1206', initials: 'AP', name: 'Amit Patel', role: 'Customer', email: 'amit@example.com', phone: '+91 76666 55433', status: 'Active', joined: 'Jul 19, 2026', spend: '₹9,850', bookings: 7, tone: 'blue' },
]

const providerDashboardRows = [
  { id:'SP1001', initials:'RS', name:'Rohit Sharma', rating:'4.8', service:'Web Development', category:'Development', email:'rohit@example.com', phone:'+91 98765 43210', location:'Jaipur, Rajasthan', joined:'May 31, 2026', status:'Approved', earnings:'₹1,45,230', tone:'violet' },
  { id:'SP1002', initials:'PP', name:'Priya Patel', rating:'4.7', service:'Graphic Design', category:'Design', email:'priya@example.com', phone:'+91 91234 56789', location:'Ahmedabad, Gujarat', joined:'May 29, 2026', status:'Pending', earnings:'₹64,500', tone:'orange' },
  { id:'SP1003', initials:'AV', name:'Amit Verma', rating:'4.6', service:'Digital Marketing', category:'Marketing', email:'amit@example.com', phone:'+91 90000 11111', location:'Lucknow, Uttar Pradesh', joined:'May 28, 2026', status:'Approved', earnings:'₹98,760', tone:'green' },
  { id:'SP1004', initials:'NG', name:'Neha Gupta', rating:'4.9', service:'Content Writing', category:'Writing', email:'neha@example.com', phone:'+91 99887 66554', location:'Delhi, India', joined:'May 27, 2026', status:'Approved', earnings:'₹72,300', tone:'blue' },
  { id:'SP1005', initials:'VS', name:'Vikram Singh', rating:'4.5', service:'SEO Services', category:'Marketing', email:'vikram@example.com', phone:'+91 76666 55433', location:'Bhopal, Madhya Pradesh', joined:'May 26, 2026', status:'Rejected', earnings:'₹0', tone:'pink' },
  { id:'SP1006', initials:'PM', name:'Pooja Mehta', rating:'4.8', service:'UI/UX Design', category:'Design', email:'pooja@example.com', phone:'+91 95555 12345', location:'Mumbai, Maharashtra', joined:'May 25, 2026', status:'Approved', earnings:'₹1,12,450', tone:'cyan' },
  { id:'SP1007', initials:'AN', name:'Arjun Nair', rating:'4.4', service:'Video Editing', category:'Multimedia', email:'arjun@example.com', phone:'+91 88888 99887', location:'Kochi, Kerala', joined:'May 24, 2026', status:'Pending', earnings:'₹45,600', tone:'violet' },
  { id:'SP1008', initials:'SR', name:'Sneha Reddy', rating:'4.6', service:'Social Media Mgmt', category:'Marketing', email:'sneha@example.com', phone:'+91 77777 22111', location:'Hyderabad, Telangana', joined:'May 23, 2026', status:'Suspended', earnings:'₹0', tone:'green' },
]

const serviceDashboardRows = [
  { id:'S-801', title:'Website Design & Development', provider:'Rohit Sharma', initials:'RS', category:'Web Development', price:'₹5,000 - ₹20,000', unit:'project', rating:'4.8', reviews:120, status:'Active', image:'/market-sections/guide-website.png', tone:'violet' },
  { id:'S-802', title:'Logo Design', provider:'Priya Patel', initials:'PP', category:'Graphic Design', price:'₹1,000 - ₹5,000', unit:'project', rating:'4.7', reviews:98, status:'Active', image:'/market-sections/guide-branding.png', tone:'orange' },
  { id:'S-803', title:'Social Media Marketing', provider:'Amit Verma', initials:'AV', category:'Digital Marketing', price:'₹3,000 - ₹15,000', unit:'month', rating:'4.6', reviews:87, status:'Active', image:'/market-sections/guide-marketing.png', tone:'green' },
  { id:'S-804', title:'Content Writing', provider:'Neha Gupta', initials:'NG', category:'Content Writing', price:'₹500 - ₹2,000', unit:'article', rating:'4.9', reviews:64, status:'Pending', image:'/service-thumbnails/content-writing.png?v=2', tone:'blue' },
  { id:'S-805', title:'Video Editing', provider:'Vikram Singh', initials:'VS', category:'Video & Animation', price:'₹2,000 - ₹10,000', unit:'project', rating:'4.5', reviews:52, status:'Active', image:'/service-thumbnails/video-editing.png?v=2', tone:'violet' },
  { id:'S-806', title:'Mobile App Development', provider:'Pooja Mehta', initials:'PM', category:'Mobile App', price:'₹10,000 - ₹50,000', unit:'project', rating:'4.8', reviews:76, status:'Active', image:'/service-thumbnails/mobile-app-development.png?v=2', tone:'pink' },
  { id:'S-807', title:'SEO Optimization', provider:'Arjun Nair', initials:'AN', category:'SEO', price:'₹3,000 - ₹12,000', unit:'month', rating:'4.4', reviews:48, status:'Active', image:'/service-thumbnails/seo-optimization.png?v=2', tone:'cyan' },
  { id:'S-808', title:'Translation Services', provider:'Sneha Reddy', initials:'SR', category:'Content Writing', price:'₹500 - ₹2,000', unit:'page', rating:'4.6', reviews:36, status:'Suspended', image:'/service-thumbnails/translation-services.png?v=2', tone:'blue' },
]

function DashboardSparkline({ id }) {
  return (
    <svg className="vn-dash-sparkline" viewBox="0 0 164 40" preserveAspectRatio="none" aria-hidden="true">
      <path className="vn-dash-spark-area" d={`${dashboardSparkPaths[id]} L162 40 L2 40 Z`} />
      <path className="vn-dash-spark-line" d={dashboardSparkPaths[id]} />
    </svg>
  )
}

function DashboardLineChart() {
  return (
    <svg className="vn-dash-line-chart" viewBox="0 0 560 145" preserveAspectRatio="none" aria-label="Monthly bookings trend">
      {[20, 50, 80, 110].map((y) => <line key={y} x1="34" x2="550" y1={y} y2={y} />)}
      <path className="vn-dash-chart-area" d="M35 128 L64 74 L94 82 L124 52 L154 86 L184 102 L214 68 L244 32 L274 56 L304 65 L334 20 L364 61 L394 66 L424 29 L454 69 L484 92 L514 48 L546 96 L546 140 L35 140 Z" />
      <path className="vn-dash-chart-path" d="M35 128 L64 74 L94 82 L124 52 L154 86 L184 102 L214 68 L244 32 L274 56 L304 65 L334 20 L364 61 L394 66 L424 29 L454 69 L484 92 L514 48 L546 96" />
      {[35,64,94,124,154,184,214,244,274,304,334,364,394,424,454,484,514,546].map((x, index) => <circle key={x} cx={x} cy={[128,74,82,52,86,102,68,32,56,65,20,61,66,29,69,92,48,96][index]} r="3" />)}
    </svg>
  )
}

function AdminPage() {
  const [hashState, setHashState] = useState(() =>
    getAdminHashState(typeof window === 'undefined' ? adminDashboardHash : window.location.hash)
  )
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem(authStorageKey) === 'true'
  })
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem(themeStorageKey) === 'dark'
  })
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false
    }

    return window.localStorage.getItem(sidebarStorageKey) === 'true'
  })
  const [expandedDashboardCard, setExpandedDashboardCard] = useState(null)
  const [selectedUser, setSelectedUser] = useState(userDashboardRows[0])
  const [userTab, setUserTab] = useState('All')
  const [usersData, setUsersData] = useState(userDashboardRows)
  const [userRoleFilter, setUserRoleFilter] = useState('All Roles')
  const [selectedUserIds, setSelectedUserIds] = useState([])
  const [usersPage, setUsersPage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10)
  const [userDialog, setUserDialog] = useState(null)
  const [providersData, setProvidersData] = useState(providerDashboardRows)
  const [providerTab, setProviderTab] = useState('All')
  const [providerCategory, setProviderCategory] = useState('All Categories')
  const [providerService, setProviderService] = useState('All Services')
  const [providerLocation, setProviderLocation] = useState('All Locations')
  const [selectedProviderIds, setSelectedProviderIds] = useState([])
  const [providerPage, setProviderPage] = useState(1)
  const [providerDialog, setProviderDialog] = useState(null)
  const [categoriesData, setCategoriesData] = useState(categoryRows)
  const [categoryStatus, setCategoryStatus] = useState('All')
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([])
  const [categoryDialog, setCategoryDialog] = useState(null)
  const [servicesData, setServicesData] = useState(() => readStoredMarketplaceServices(serviceDashboardRows))
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState('All')
  const [serviceStatusFilter, setServiceStatusFilter] = useState('All')
  const [serviceProviderFilter, setServiceProviderFilter] = useState('All')
  const [servicePage, setServicePage] = useState(1)
  const [serviceDialog, setServiceDialog] = useState(null)
  const [serviceImagePreview, setServiceImagePreview] = useState('')
  const [sectionBusy, setSectionBusy] = useState(false)
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [loginStep, setLoginStep] = useState('phone')
  const [loginBusy, setLoginBusy] = useState(false)
  const [loginError, setLoginError] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState([])
  const [toast, setToast] = useState(null)
  const [confirmState, setConfirmState] = useState(null)
  const [bannerPreview, setBannerPreview] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [notificationAudience, setNotificationAudience] = useState('All Users')
  const [notificationChannel, setNotificationChannel] = useState('Push + Email')

  const navItems = useMemo(
    () => adminNavigationGroups.flatMap((group) => group.items.map((item) => item.id)).filter((itemId) => itemId !== 'logout'),
    []
  )

  const activeSection = navItems.includes(hashState.section) ? hashState.section : 'dashboard'
  const activeConfig = managementSectionConfigs[activeSection] ?? null
  const activeRows = activeConfig?.rows ?? []

  const activeStatusOptions = useMemo(() => {
    const options = Array.from(
      new Set(
        activeRows
          .map((row) => row.status)
          .filter(Boolean)
          .map((value) => cleanText(value))
      )
    )

    return ['All', ...options]
  }, [activeRows])

  const filteredRows = useMemo(() => {
    if (!activeRows.length) {
      return []
    }

    return activeRows.filter((row) => {
      const matchesSearch =
        searchQuery.trim().length === 0 ||
        Object.values(row).some((value) =>
          cleanText(value).toLowerCase().includes(searchQuery.trim().toLowerCase())
        )

      const matchesStatus =
        statusFilter === 'All' ||
        cleanText(row.status).toLowerCase() === statusFilter.toLowerCase()

      return matchesSearch && matchesStatus
    })
  }, [activeRows, searchQuery, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / rowsPerPage))
  const paginatedRows = filteredRows.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

  const topProvider = useMemo(
    () =>
      [...providerRows].sort((firstRow, secondRow) => Number(secondRow.requests) - Number(firstRow.requests))[0],
    []
  )

  const topCategory = useMemo(
    () =>
      [...categoryRows].sort((firstRow, secondRow) => Number(secondRow.services) - Number(firstRow.services))[0],
    []
  )

  const isAllPageRowsSelected =
    paginatedRows.length > 0 && paginatedRows.every((row) => selectedRows.includes(row.id))

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const syncHash = () => {
      setHashState(getAdminHashState(window.location.hash))
    }

    syncHash()
    window.addEventListener('hashchange', syncHash)

    return () => window.removeEventListener('hashchange', syncHash)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(themeStorageKey, isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(sidebarStorageKey, String(sidebarCollapsed))
    }
  }, [sidebarCollapsed])

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      window.localStorage.setItem(marketplaceServicesStorageKey, JSON.stringify(servicesData))
    } catch {
      pushToast('Service saved, but the selected image is too large for browser storage.', 'warning')
    }
  }, [servicesData])

  useEffect(() => {
    if (!expandedDashboardCard || typeof window === 'undefined') {
      return undefined
    }

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setExpandedDashboardCard(null)
      }
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [expandedDashboardCard])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    if (!isAuthenticated && !hashState.isLogin) {
      window.location.hash = adminLoginHash
    }

    if (isAuthenticated && hashState.isLogin) {
      window.location.hash = adminDashboardHash
    }
  }, [hashState.isLogin, isAuthenticated])

  useEffect(() => {
    setCurrentPage(1)
    setSelectedRows([])
    setStatusFilter('All')
    setSearchQuery('')
    setMobileMenuOpen(false)
    setSectionBusy(true)

    const timerId = window.setTimeout(() => setSectionBusy(false), 420)

    return () => window.clearTimeout(timerId)
  }, [activeSection])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timerId = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timerId)
  }, [toast])

  const pushToast = (message, tone = 'success') => {
    setToast({ id: Date.now(), message, tone })
  }

  const openAdminSection = (sectionId) => {
    if (typeof window === 'undefined') {
      return
    }

    if (sectionId === 'dashboard') {
      window.location.hash = adminDashboardHash
      return
    }

    window.location.hash = `${adminRoutePrefix}${sectionId}`
  }

  const requestConfirmation = (title, description, confirmLabel, onConfirm, tone = 'danger') => {
    setConfirmState({
      title,
      description,
      confirmLabel,
      tone,
      onConfirm,
    })
  }

  const completeLogin = (sourceLabel) => {
    if (typeof window === 'undefined') {
      return
    }

    window.localStorage.setItem(authStorageKey, 'true')
    window.localStorage.setItem(
      authUserStorageKey,
      JSON.stringify({
        name: 'Raj Singh',
        role: 'Super Admin',
        source: sourceLabel,
        phone,
      })
    )

    setIsAuthenticated(true)
    pushToast(`Admin login successful via ${sourceLabel}.`)
    window.location.hash = adminDashboardHash
  }

  const handleSendOtp = () => {
    if (phone.replace(/\D/g, '').length !== 10) {
      setLoginError('Please enter a valid 10-digit mobile number.')
      return
    }

    setLoginBusy(true)
    setLoginError('')

    window.setTimeout(() => {
      setLoginBusy(false)
      setLoginStep('otp')
      pushToast('OTP sent to admin mobile number.')
    }, 1000)
  }

  const handleVerifyOtp = () => {
    if (otp.trim() !== '123456') {
      setLoginError('Use demo OTP 123456 for the current frontend admin login.')
      return
    }

    setLoginBusy(true)
    setLoginError('')

    window.setTimeout(() => {
      setLoginBusy(false)
      completeLogin('Mobile OTP')
    }, 1000)
  }

  const handleSocialLogin = (providerLabel) => {
    setLoginBusy(true)
    setLoginError('')

    window.setTimeout(() => {
      setLoginBusy(false)
      completeLogin(providerLabel)
    }, 1000)
  }

  const handleCredentialLogin = (event) => {
    event.preventDefault()
    setLoginError('')

    if (adminEmail.trim().toLowerCase() !== 'rvardhan692@rku.ac.in' || adminPassword !== 'rvardhan692') {
      setLoginError('Incorrect admin email or password.')
      return
    }

    setLoginBusy(true)
    window.setTimeout(() => {
      setLoginBusy(false)
      completeLogin('Email & Password')
    }, 550)
  }

  const handleLogout = () => {
    requestConfirmation(
      'Log out from admin panel?',
      'This will close the current admin session on this browser.',
      'Logout',
      () => {
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(authStorageKey)
          window.localStorage.removeItem(authUserStorageKey)
          window.location.hash = adminLoginHash
        }

        setIsAuthenticated(false)
        setPhone('')
        setOtp('')
        setLoginStep('phone')
        pushToast('Admin logged out successfully.', 'warning')
      }
    )
  }

  const handleRowAction = (sectionId, actionLabel, row) => {
    const destructiveAction = /delete|reject|block|suspend|refund/i.test(actionLabel)
    const nextAction = () => {
      if (actionLabel === 'View Portfolio') {
        openAdminSection('portfolio')
        pushToast(`Opened ${cleanText(row.name)} portfolio.`)
        return
      }

      if (actionLabel === 'Assign Provider') {
        openAdminSection('providers')
        pushToast(`Provider assignment opened for ${cleanText(row.id)}.`)
        return
      }

      pushToast(`${actionLabel} completed for ${cleanText(row.id)}.`)
    }

    if (destructiveAction) {
      requestConfirmation(
        `${actionLabel} this item?`,
        `${actionLabel} will be applied to ${cleanText(row.id)} in the ${sectionId} module.`,
        actionLabel,
        nextAction
      )
      return
    }

    nextAction()
  }

  const handleBulkAction = (actionLabel) => {
    if (selectedRows.length === 0) {
      pushToast('Select at least one row first.', 'warning')
      return
    }

    const completeBulkAction = () => {
      pushToast(`${actionLabel} applied to ${selectedRows.length} selected items.`)
      setSelectedRows([])
    }

    if (/delete|reject|block|suspend/i.test(actionLabel)) {
      requestConfirmation(
        `${actionLabel} selected items?`,
        `${selectedRows.length} selected rows will be affected in the ${activeSection} section.`,
        actionLabel,
        completeBulkAction
      )
      return
    }

    completeBulkAction()
  }

  const toggleRowSelection = (rowId) => {
    setSelectedRows((previousRows) =>
      previousRows.includes(rowId)
        ? previousRows.filter((selectedRowId) => selectedRowId !== rowId)
        : [...previousRows, rowId]
    )
  }

  const toggleSelectAllVisible = () => {
    if (isAllPageRowsSelected) {
      setSelectedRows((previousRows) =>
        previousRows.filter((rowId) => !paginatedRows.some((row) => row.id === rowId))
      )
      return
    }

    setSelectedRows((previousRows) => {
      const nextRows = [...previousRows]

      paginatedRows.forEach((row) => {
        if (!nextRows.includes(row.id)) {
          nextRows.push(row.id)
        }
      })

      return nextRows
    })
  }

  const handleBannerUpload = (file) => {
    if (!file) {
      return
    }

    const nextPreviewUrl = URL.createObjectURL(file)
    setBannerPreview((previousUrl) => {
      if (previousUrl) {
        URL.revokeObjectURL(previousUrl)
      }

      return nextPreviewUrl
    })

    pushToast(`${file.name} ready for preview.`)
  }

  const getRowActions = (sectionId, row) => {
    switch (sectionId) {
      case 'providers':
        return [
          { label: 'View Portfolio' },
          { label: /pending/i.test(row.status) ? 'Approve' : 'Suspend' },
          { label: 'Delete' },
        ]
      case 'categories':
        return [{ label: 'Edit' }, { label: /enabled/i.test(row.status) ? 'Disable' : 'Enable' }, { label: 'Delete' }]
      case 'services':
        return [{ label: 'Edit' }, { label: row.featured ? 'Hide' : 'Feature' }, { label: 'Duplicate' }]
      case 'portfolio':
        return [{ label: 'Edit' }, { label: /approved/i.test(row.status) ? 'Hide' : 'Approve' }, { label: 'Delete' }]
      case 'requests':
        return [{ label: 'View Timeline' }, { label: 'Assign Provider' }, { label: 'Reject' }]
      case 'projects':
        return [{ label: 'View Details' }, { label: 'Update Status' }, { label: 'Archive' }]
      case 'payments':
        return [{ label: 'View Invoice' }, { label: 'Settle' }, { label: 'Refund' }]
      case 'withdrawals':
        return [{ label: 'Approve' }, { label: 'Processing' }, { label: 'Reject' }]
      case 'reviews':
        return [{ label: 'Reply' }, { label: 'Approve' }, { label: 'Delete' }]
      case 'banners':
        return [{ label: 'Preview Banner' }, { label: 'Schedule' }, { label: 'Replace' }]
      case 'homepage':
        return [{ label: 'Edit Section' }, { label: 'Preview' }, { label: 'Save Layout' }]
      case 'coupons':
        return [{ label: 'Edit' }, { label: 'Duplicate' }, { label: 'Expire' }]
      case 'blog':
        return [{ label: 'Edit' }, { label: 'Preview' }, { label: 'Publish' }]
      case 'faqs':
        return [{ label: 'Edit' }, { label: 'Publish' }, { label: 'Delete' }]
      case 'support':
        return [{ label: 'Open Ticket' }, { label: 'Assign' }, { label: 'Resolve' }]
      case 'users':
        return [{ label: 'Edit' }, { label: 'Reset Password' }, { label: 'Block' }]
      case 'activity':
        return [{ label: 'Inspect' }, { label: 'Export' }]
      default:
        return [{ label: 'View' }, { label: 'Edit' }]
    }
  }

  const renderCellValue = (columnKey, rowValue) => {
    if (columnKey === 'status' || columnKey === 'verified' || columnKey === 'reply') {
      return <StatusBadge value={rowValue} />
    }

    if (columnKey === 'featured' || columnKey === 'reported') {
      return <StatusBadge value={rowValue ? 'Yes' : 'No'} />
    }

    if (columnKey === 'rating') {
      return (
        <span className="vn-admin-rating-cell">
          <AdminIcon type="star" className="vn-admin-rating-icon" />
          <strong>{cleanText(rowValue)}</strong>
        </span>
      )
    }

    if (columnKey === 'progress') {
      return (
        <div className="vn-admin-progress-cell">
          <div className="vn-admin-progress-track">
            <span style={{ width: `${Math.max(8, Number(rowValue))}%` }}></span>
          </div>
          <strong>{cleanText(rowValue)}%</strong>
        </div>
      )
    }

    return cleanText(rowValue)
  }

  const renderSkeleton = () => (
    <div className="vn-admin-skeleton-grid">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={`skeleton-${index}`} className="vn-admin-skeleton-card">
          <span className="vn-admin-skeleton-line is-short"></span>
          <span className="vn-admin-skeleton-line"></span>
          <span className="vn-admin-skeleton-line"></span>
        </div>
      ))}
    </div>
  )

  const renderManagementTable = () => {
    if (!activeConfig) {
      return null
    }

    return (
      <section className="vn-admin-panel">
        <div className="vn-admin-panel-head">
          <div>
            <h2>{activeConfig.title}</h2>
            <p>{activeConfig.description}</p>
          </div>
          <div className="vn-admin-panel-actions">
            <button type="button" className="vn-admin-button is-secondary" onClick={() => handleBulkAction('Export Selected')}>
              Export
            </button>
            <button
              type="button"
              className="vn-admin-button is-primary"
              onClick={() => pushToast(`${activeConfig.primaryAction} opened.`)}
            >
              {activeConfig.primaryAction}
            </button>
          </div>
        </div>

        <div className="vn-admin-toolbar">
          <label className="vn-admin-search-input">
            <AdminIcon type="search" className="vn-admin-search-input-icon" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder={`Search ${activeConfig.title.toLowerCase()}...`}
            />
          </label>

          {activeStatusOptions.length > 1 ? (
            <label className="vn-admin-filter-select">
              <span>Status</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                {activeStatusOptions.map((statusOption) => (
                  <option key={statusOption} value={statusOption}>
                    {statusOption}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>

        <div className="vn-admin-bulkbar">
          <span>
            {filteredRows.length} items
            {selectedRows.length ? ` · ${selectedRows.length} selected` : ''}
          </span>
          <div className="vn-admin-bulkbar-actions">
            <button type="button" onClick={() => handleBulkAction('Approve')}>
              Approve
            </button>
            <button type="button" onClick={() => handleBulkAction('Archive')}>
              Archive
            </button>
            <button type="button" className="is-danger" onClick={() => handleBulkAction('Delete')}>
              Delete
            </button>
          </div>
        </div>

        <div className="vn-admin-table-wrap">
          <table className="vn-admin-table">
            <thead>
              <tr>
                <th className="is-check">
                  <input
                    type="checkbox"
                    checked={isAllPageRowsSelected}
                    onChange={toggleSelectAllVisible}
                    aria-label="Select visible rows"
                  />
                </th>
                {activeConfig.columns.map((column) => (
                  <th key={column.key}>{column.label}</th>
                ))}
                <th className="is-actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length ? (
                paginatedRows.map((row) => (
                  <tr key={row.id}>
                    <td className="is-check">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row.id)}
                        onChange={() => toggleRowSelection(row.id)}
                        aria-label={`Select ${cleanText(row.id)}`}
                      />
                    </td>
                    {activeConfig.columns.map((column) => (
                      <td key={`${row.id}-${column.key}`}>{renderCellValue(column.key, row[column.key])}</td>
                    ))}
                    <td className="is-actions">
                      <div className="vn-admin-row-actions">
                        {getRowActions(activeSection, row).map((action) => (
                          <button
                            key={`${row.id}-${action.label}`}
                            type="button"
                            className={/delete|reject|block|refund/i.test(action.label) ? 'is-danger' : ''}
                            onClick={() => handleRowAction(activeSection, action.label, row)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={activeConfig.columns.length + 2}>
                    <div className="vn-admin-empty-state">
                      <AdminIcon type="search" className="vn-admin-empty-state-icon" />
                      <h3>No matching records found</h3>
                      <p>Try changing search text or status filter for this admin section.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="vn-admin-pagination">
          <button type="button" onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button type="button" onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>
            Next
          </button>
        </div>
      </section>
    )
  }

  const renderDashboard = () => (
    <div className="vn-admin-dashboard">
      {expandedDashboardCard ? (
        <button
          type="button"
          className="vn-dash-card-backdrop"
          aria-label="Close expanded dashboard card"
          onClick={() => setExpandedDashboardCard(null)}
        />
      ) : null}
      <section className="vn-dash-welcome">
        <div>
          <span className="vn-dash-eyebrow">ADMIN CONTROL CENTER</span>
          <h2>Dashboard Overview</h2>
          <p>Welcome back, {adminProfileCard.name.split(' ')[0]}! Here’s what’s happening across your platform today.</p>
        </div>
        <button type="button" className="vn-dash-date-button">
          <AdminIcon type="clipboard" />
          <span>01 May, 2026 - 31 May, 2026</span>
          <span className="vn-dash-chevron">⌄</span>
        </button>
      </section>

      <section className="vn-admin-overview-grid">
        {adminOverviewStats.map((stat) => (
          <article
            key={stat.id}
            className={`vn-admin-overview-card vn-dash-expandable is-${stat.tone}${expandedDashboardCard === stat.id ? ' is-card-expanded' : ''}`}
            onClick={() => setExpandedDashboardCard(stat.id)}
            onKeyDown={(event) => event.key === 'Enter' && setExpandedDashboardCard(stat.id)}
            role="button"
            tabIndex={0}
            aria-label={`Expand ${stat.label} card`}
          >
            {expandedDashboardCard === stat.id ? <button type="button" className="vn-dash-card-close" aria-label="Close expanded card" onClick={(event) => { event.stopPropagation(); setExpandedDashboardCard(null) }}>×</button> : null}
            <div className="vn-dash-stat-top">
              <span className={`vn-dash-stat-icon is-${stat.id}`}><AdminIcon type={dashboardStatIcons[stat.id]} /></span>
              <div>
                <span className="vn-admin-overview-kicker">{stat.label}</span>
                <strong>{cleanText(stat.value)}</strong>
                <p className={stat.id === 'pendingApprovals' ? 'is-warning' : ''}>↑ {cleanText(stat.delta).replace('+', '')}</p>
              </div>
            </div>
            <DashboardSparkline id={stat.id} />
          </article>
        ))}
      </section>

      <section className="vn-dash-middle-grid">
        <article className={`vn-admin-panel vn-dash-approvals vn-dash-expandable${expandedDashboardCard === 'approvals' ? ' is-card-expanded' : ''}`} onClick={(event) => !event.target.closest('button') && setExpandedDashboardCard('approvals')}>
          <button type="button" className="vn-dash-panel-expand" onClick={() => setExpandedDashboardCard('approvals')} aria-label="Expand provider approvals">↗</button>
          {expandedDashboardCard === 'approvals' ? <button type="button" className="vn-dash-card-close" aria-label="Close expanded card" onClick={() => setExpandedDashboardCard(null)}>×</button> : null}
          <div className="vn-admin-panel-head">
            <div>
              <h2>Service Provider Approvals</h2>
              <p>Review and manage new service provider applications.</p>
            </div>
            <button type="button" className="vn-admin-button is-secondary" onClick={() => openAdminSection('providers')}>View All (24)</button>
          </div>
          <div className="vn-dash-tabs">
            <button className="is-active" type="button">Pending (24)</button>
            <button type="button">Approved (1,102)</button>
            <button type="button">Rejected (122)</button>
          </div>
          <div className="vn-dash-approval-table-wrap">
            <table className="vn-dash-approval-table">
              <thead><tr><th>Provider</th><th>Service Category</th><th>Experience</th><th>Location</th><th>Applied On</th><th>Actions</th></tr></thead>
              <tbody>
                {approvalRows.map((provider) => (
                  <tr key={provider.id}>
                    <td><div className="vn-dash-provider"><span className={`is-${provider.tone}`}>{provider.initials}</span><div><strong>{provider.name}</strong><small>{provider.email}</small></div></div></td>
                    <td><span className={`vn-dash-category is-${provider.tone}`}>{provider.category}</span></td>
                    <td><strong>{provider.experience}</strong></td>
                    <td><span className="vn-dash-location">⌖</span> {provider.location}</td>
                    <td><strong>31 May, 2026</strong><small>{provider.time}</small></td>
                    <td><div className="vn-dash-actions"><button onClick={() => pushToast(`${provider.name} approved`, 'success')}>✓ Approve</button><button className="is-reject" onClick={() => pushToast(`${provider.name} moved to review`, 'warning')}>× Reject</button><button className="is-view" onClick={() => openAdminSection('providers')}>View</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="vn-dash-table-footer"><span>Showing 1 to 5 of 24 results</span><div><button>‹</button><button className="is-active">1</button><button>2</button><button>3</button><button>…</button><button>5</button><button>›</button></div></div>
        </article>

        <aside className="vn-dash-side-stack">
          <article className={`vn-admin-panel vn-dash-summary vn-dash-expandable${expandedDashboardCard === 'summary' ? ' is-card-expanded' : ''}`} onClick={() => setExpandedDashboardCard('summary')}>
            {expandedDashboardCard === 'summary' ? <button type="button" className="vn-dash-card-close" aria-label="Close expanded card" onClick={(event) => { event.stopPropagation(); setExpandedDashboardCard(null) }}>×</button> : null}
            <div className="vn-admin-panel-head"><h2>Platform Summary</h2></div>
            {[
              ['users', 'Active Providers', '1,102'], ['profile', 'Active Clients', '4,892'], ['layers', 'Total Services', '2,345'], ['clipboard', 'Total Bookings', '8,945'], ['wallet', 'Total Revenue', '₹12,45,890'],
            ].map(([icon, label, value]) => <div className="vn-dash-summary-row" key={label}><span><AdminIcon type={icon} />{label}</span><strong>{value}</strong></div>)}
          </article>
          <article className={`vn-admin-panel vn-dash-activity vn-dash-expandable${expandedDashboardCard === 'activity' ? ' is-card-expanded' : ''}`} onClick={(event) => !event.target.closest('button') && setExpandedDashboardCard('activity')}>
            <button type="button" className="vn-dash-panel-expand" onClick={() => setExpandedDashboardCard('activity')} aria-label="Expand recent activity">↗</button>
            {expandedDashboardCard === 'activity' ? <button type="button" className="vn-dash-card-close" aria-label="Close expanded card" onClick={() => setExpandedDashboardCard(null)}>×</button> : null}
            <div className="vn-admin-panel-head"><h2>Recent Activity</h2><button type="button" onClick={() => openAdminSection('activity')}>View All</button></div>
            {adminActivityFeed.map((item, index) => (
              <div className={`vn-dash-activity-row is-${item.tone}`} key={item.id}>
                <span><AdminIcon type={['profile','clipboard','wallet','check','star'][index]} /></span>
                <div><strong>{item.title}</strong><small>{item.meta}</small></div><time>{item.time}</time>
              </div>
            ))}
          </article>
        </aside>
      </section>

      <section className="vn-dash-bottom-grid">
        <article className={`vn-admin-panel vn-dash-bookings vn-dash-expandable${expandedDashboardCard === 'bookings' ? ' is-card-expanded' : ''}`} onClick={(event) => !event.target.closest('button') && setExpandedDashboardCard('bookings')}>
          <button type="button" className="vn-dash-panel-expand" onClick={() => setExpandedDashboardCard('bookings')} aria-label="Expand bookings overview">↗</button>
          {expandedDashboardCard === 'bookings' ? <button type="button" className="vn-dash-card-close" aria-label="Close expanded card" onClick={() => setExpandedDashboardCard(null)}>×</button> : null}
          <div className="vn-admin-panel-head"><h2>Bookings Overview</h2><button className="vn-dash-select" type="button">This Month ⌄</button></div>
          <div className="vn-dash-chart-shell">
            <div className="vn-dash-y-labels"><span>1000</span><span>750</span><span>500</span><span>250</span><span>0</span></div>
            <DashboardLineChart />
          </div>
          <div className="vn-dash-x-labels"><span>01 May</span><span>06 May</span><span>11 May</span><span>16 May</span><span>21 May</span><span>26 May</span><span>31 May</span></div>
          <div className="vn-dash-metrics"><div><small>Total Bookings</small><strong>8,945</strong><em>↑ 15.3%</em></div><div><small>Completed</small><strong>7,842</strong><em>↑ 12.5%</em></div><div><small>Cancelled</small><strong>1,103</strong><em className="is-down">↓ 5.2%</em></div><div><small>Pending</small><strong>312</strong><em className="is-warn">↑ 3.1%</em></div></div>
        </article>

        <article className={`vn-admin-panel vn-dash-revenue vn-dash-expandable${expandedDashboardCard === 'revenueOverview' ? ' is-card-expanded' : ''}`} onClick={(event) => !event.target.closest('button') && setExpandedDashboardCard('revenueOverview')}>
          <button type="button" className="vn-dash-panel-expand" onClick={() => setExpandedDashboardCard('revenueOverview')} aria-label="Expand revenue overview">↗</button>
          {expandedDashboardCard === 'revenueOverview' ? <button type="button" className="vn-dash-card-close" aria-label="Close expanded card" onClick={() => setExpandedDashboardCard(null)}>×</button> : null}
          <div className="vn-admin-panel-head"><div><h2>Revenue Overview</h2><p>Total Revenue</p><strong className="vn-dash-revenue-total">₹12,45,890</strong> <em>↑ 16.5%</em></div><button className="vn-dash-select" type="button">This Month ⌄</button></div>
          <div className="vn-dash-bars">{[35,62,31,80,48,58,27,72,33,76,91,39,55,83,46,69,57,66].map((height, index) => <span key={index} style={{height: `${height}%`}} />)}</div>
          <div className="vn-dash-revenue-metrics"><div><small>This Month</small><strong>₹12,45,890</strong></div><div><small>Last Month</small><strong>₹10,70,230</strong></div><div><small>Total Payouts</small><strong>₹9,85,450</strong></div><div><small>Pending Payouts</small><strong>₹1,60,440</strong></div></div>
        </article>

        <article className={`vn-admin-panel vn-dash-services vn-dash-expandable${expandedDashboardCard === 'servicesOverview' ? ' is-card-expanded' : ''}`} onClick={(event) => !event.target.closest('button') && setExpandedDashboardCard('servicesOverview')}>
          <button type="button" className="vn-dash-panel-expand" onClick={() => setExpandedDashboardCard('servicesOverview')} aria-label="Expand top services">↗</button>
          {expandedDashboardCard === 'servicesOverview' ? <button type="button" className="vn-dash-card-close" aria-label="Close expanded card" onClick={() => setExpandedDashboardCard(null)}>×</button> : null}
          <div className="vn-admin-panel-head"><h2>Top Services</h2><button className="vn-dash-select" type="button">This Month ⌄</button></div>
          <div className="vn-dash-services-head"><span>Service</span><span>Bookings</span><span>Revenue</span></div>
          {[
            ['layers','Web Development','1,234','₹4,25,890'], ['chart','Digital Marketing','1,012','₹3,12,450'], ['gallery','Graphic Design','890','₹2,10,300'], ['document','Content Writing','654','₹1,45,680'], ['search','SEO Services','512','₹1,01,570'],
          ].map(([icon, name, bookings, revenue]) => <div className="vn-dash-service-row" key={name}><span><i><AdminIcon type={icon} /></i>{name}</span><strong>{bookings}</strong><strong>{revenue}</strong></div>)}
          <button className="vn-dash-report-link" type="button" onClick={() => openAdminSection('analytics')}>View All Services Report →</button>
        </article>
      </section>
    </div>
  )

  const renderUsersSection = () => {
    const filteredUsers = usersData.filter((user) => {
      const matchesTab = userTab === 'All' || user.status === userTab
      const matchesRole = userRoleFilter === 'All Roles' || user.role === userRoleFilter
      const query = searchQuery.trim().toLowerCase()
      const matchesQuery = !query || [user.name, user.id, user.email, user.phone, user.role].some((value) => value.toLowerCase().includes(query))
      return matchesTab && matchesRole && matchesQuery
    })
    const visibleUsers = filteredUsers.slice(0, usersPerPage)
    const totalUserPages = 781
    const allVisibleSelected = visibleUsers.length > 0 && visibleUsers.every((user) => selectedUserIds.includes(user.id))

    const toggleAllUsers = () => {
      const visibleIds = visibleUsers.map((user) => user.id)
      setSelectedUserIds((current) => allVisibleSelected ? current.filter((id) => !visibleIds.includes(id)) : [...new Set([...current, ...visibleIds])])
    }

    const exportUsers = () => {
      const rows = filteredUsers.map(({ id, name, role, email, phone, status, joined, spend }) => [id, name, role, email, phone, status, joined, spend])
      const csv = [['User ID', 'Name', 'Role', 'Email', 'Phone', 'Status', 'Joined', 'Spend'], ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
      const link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
      link.download = 'vyaparnest-users.csv'
      link.click()
      URL.revokeObjectURL(link.href)
      pushToast(`${rows.length} users exported successfully.`)
    }

    const updateUserStatus = (user, status) => {
      setUsersData((current) => current.map((item) => item.id === user.id ? { ...item, status } : item))
      setSelectedUser((current) => current?.id === user.id ? { ...current, status } : current)
      pushToast(`${user.name} is now ${status.toLowerCase()}.`, status === 'Blocked' ? 'warning' : 'success')
    }

    const userStats = [
      ['users', 'Total Users', '6,245', '↑ 12.5% this month', 'violet'],
      ['profile', 'Active Users', '5,214', '↑ 10.3% this month', 'green'],
      ['spark', 'New Users', '243', '↑ 8.1% this month', 'orange'],
      ['lock', 'Blocked Users', '58', '↓ 2.3% this month', 'pink'],
    ]

    return (
      <div className="vn-users-page">
        <header className="vn-users-title"><div><h2>Users</h2><p>Manage all platform users, view their details, status and activity.</p></div><button type="button" className="vn-users-add" onClick={() => setUserDialog({ type: 'add' })}>＋ Add User</button></header>
        <section className="vn-users-stat-grid">
          {userStats.map(([icon, label, value, delta, tone]) => <article key={label}><i className={`is-${tone}`}><AdminIcon type={icon} /></i><div><span>{label}</span><strong>{value}</strong><small className={tone === 'pink' ? 'is-down' : ''}>{delta}</small></div></article>)}
        </section>
        <section className="vn-users-layout">
          <main className="vn-users-table-card">
            <div className="vn-users-toolbar">
              <label><AdminIcon type="search" /><input type="search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search users..." /></label>
              <select aria-label="Filter by role" value={userRoleFilter} onChange={(event) => { setUserRoleFilter(event.target.value); setUsersPage(1) }}><option>All Roles</option><option>Customer</option><option>Finance Manager</option></select>
              <select aria-label="Filter by status" value={userTab} onChange={(event) => setUserTab(event.target.value)}><option value="All">All Status</option><option>Active</option><option>Suspended</option><option>Blocked</option></select>
              <button type="button" onClick={() => { setSearchQuery(''); setUserRoleFilter('All Roles'); setUserTab('All'); setUsersPage(1); pushToast('User filters reset.') }}>☷ Reset</button><button type="button" onClick={exportUsers}>⇧ Export</button>
            </div>
            <div className="vn-users-tabs">{[['All','6,245'],['Active','5,214'],['Suspended','973'],['Blocked','58']].map(([tab,count]) => <button type="button" className={userTab === tab ? 'is-active' : ''} onClick={() => setUserTab(tab)} key={tab}>{tab} Users ({count})</button>)}</div>
            <div className="vn-users-table-wrap"><table className="vn-users-table"><thead><tr><th><input type="checkbox" checked={allVisibleSelected} onChange={toggleAllUsers} aria-label="Select all users" /></th><th>User</th><th>Role</th><th>Email</th><th>Phone</th><th>Status</th><th>Joined On</th><th>Spend</th><th>Actions</th></tr></thead><tbody>
              {visibleUsers.map((user) => <tr key={user.id} className={selectedUser?.id === user.id ? 'is-selected' : ''} onClick={() => setSelectedUser(user)}><td><input type="checkbox" checked={selectedUserIds.includes(user.id)} onChange={() => setSelectedUserIds((current) => current.includes(user.id) ? current.filter((id) => id !== user.id) : [...current, user.id])} aria-label={`Select ${user.name}`} onClick={(event) => event.stopPropagation()} /></td><td><div className="vn-users-person"><i className={`is-${user.tone}`}>{user.initials}</i><div><strong>{user.name}</strong><small>{user.id}</small></div></div></td><td><span className={`vn-users-role is-${user.role.toLowerCase().replaceAll(' ','-')}`}>{user.role}</span></td><td>{user.email}</td><td>{user.phone}</td><td><StatusBadge value={user.status} /></td><td>{user.joined}</td><td><strong>{user.spend}</strong></td><td><div className="vn-users-row-actions"><button type="button" onClick={(event) => { event.stopPropagation(); setSelectedUser(user) }} aria-label={`View ${user.name}`}>◉</button><button type="button" onClick={(event) => { event.stopPropagation(); setSelectedUser(user); setUserDialog({ type: 'actions', user }) }} aria-label={`More actions for ${user.name}`}>⋮</button></div></td></tr>)}
              {!visibleUsers.length ? <tr><td colSpan="9" className="vn-users-empty">No matching users found.</td></tr> : null}
            </tbody></table></div>
            <footer className="vn-users-pagination"><span>Page {usersPage} · Showing {visibleUsers.length} users</span><div><button disabled={usersPage === 1} onClick={() => setUsersPage((page) => Math.max(1, page - 1))}>‹</button>{[1,2,3].map((page) => <button key={page} className={usersPage === page ? 'is-active' : ''} onClick={() => setUsersPage(page)}>{page}</button>)}<button disabled>…</button><button className={usersPage === totalUserPages ? 'is-active' : ''} onClick={() => setUsersPage(totalUserPages)}>{totalUserPages}</button><button disabled={usersPage === totalUserPages} onClick={() => setUsersPage((page) => Math.min(totalUserPages, page + 1))}>›</button></div><select aria-label="Rows per page" value={usersPerPage} onChange={(event) => setUsersPerPage(Number(event.target.value))}><option value="10">10 / page</option><option value="25">25 / page</option><option value="50">50 / page</option></select></footer>
          </main>
          <aside className="vn-user-details">
            <header><h3>User Details</h3><button type="button" onClick={() => setSelectedUser(null)}>×</button></header>
            {selectedUser ? <><div className="vn-user-details-profile"><i className={`is-${selectedUser.tone}`}>{selectedUser.initials}</i><div><strong>{selectedUser.name}</strong><small>{selectedUser.id}</small></div><StatusBadge value={selectedUser.status} /></div>
            <dl><dt>Role</dt><dd>{selectedUser.role}</dd><dt>Email</dt><dd>{selectedUser.email}</dd><dt>Phone</dt><dd>{selectedUser.phone}</dd><dt>Joined On</dt><dd>{selectedUser.joined}</dd><dt>Last Active</dt><dd>Today, 11:20 AM</dd><dt>Total Bookings</dt><dd>{selectedUser.bookings}</dd><dt>Total Spent</dt><dd>{selectedUser.spend}</dd><dt>Account Status</dt><dd><StatusBadge value={selectedUser.status} /></dd></dl>
            <section><h4>Quick Actions</h4><div className="vn-user-quick-actions"><button onClick={() => setUserDialog({ type: 'profile', user: selectedUser })}>♙ View Profile</button><button className="is-danger" onClick={() => updateUserStatus(selectedUser, selectedUser.status === 'Blocked' ? 'Active' : 'Blocked')}>⊘ {selectedUser.status === 'Blocked' ? 'Unblock User' : 'Block User'}</button><button className="is-warning" onClick={() => setUserDialog({ type: 'reset', user: selectedUser })}>⌁ Reset Password</button><button onClick={() => setUserDialog({ type: 'message', user: selectedUser })}>▣ Send Message</button><button onClick={() => setUserDialog({ type: 'login', user: selectedUser })}>⌂ Login As User</button></div></section>
            <section className="vn-user-recent"><h4>Recent Activity</h4>{[['clipboard','New booking created','2h ago'],['profile','Profile updated','5h ago'],['wallet','Payment of ₹4,500','Jul 24, 2026'],['star','Review submitted','Jul 23, 2026']].map(([icon,label,time]) => <div key={label}><i><AdminIcon type={icon} /></i><span><strong>{label}</strong><small>{time}</small></span></div>)}</section></> : <div className="vn-user-details-empty"><AdminIcon type="users" /><strong>Select a user</strong><p>Choose any row to view full details.</p></div>}
          </aside>
        </section>
        {userDialog ? <div className="vn-users-dialog-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setUserDialog(null)}><div className="vn-users-dialog">
          <header><div><h3>{userDialog.type === 'add' ? 'Add New User' : userDialog.type === 'message' ? 'Send Message' : userDialog.type === 'reset' ? 'Reset Password' : userDialog.type === 'login' ? 'Login As User' : userDialog.type === 'actions' ? 'User Actions' : 'User Profile'}</h3><p>{userDialog.user ? `${userDialog.user.name} · ${userDialog.user.id}` : 'Create a new VyaparNest account'}</p></div><button type="button" onClick={() => setUserDialog(null)}>×</button></header>
          {userDialog.type === 'add' ? <form onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const name = form.get('name').trim(); const newUser = { id: `U-${1200 + usersData.length + 1}`, initials: name.split(' ').map((part) => part[0]).join('').slice(0,2).toUpperCase(), name, role: form.get('role'), email: form.get('email'), phone: form.get('phone'), status: 'Active', joined: 'Today', spend: '₹0', bookings: 0, tone: 'violet' }; setUsersData((current) => [newUser, ...current]); setSelectedUser(newUser); setUserDialog(null); pushToast(`${name} added successfully.`) }}><div className="vn-users-dialog-grid"><label>Full Name<input name="name" required placeholder="Enter full name" /></label><label>Email<input name="email" type="email" required placeholder="name@example.com" /></label><label>Phone<input name="phone" required placeholder="+91 98765 43210" /></label><label>Role<select name="role"><option>Customer</option><option>Finance Manager</option></select></label></div><footer><button type="button" onClick={() => setUserDialog(null)}>Cancel</button><button className="is-primary" type="submit">Add User</button></footer></form> : null}
          {userDialog.type === 'message' ? <form onSubmit={(event) => { event.preventDefault(); setUserDialog(null); pushToast(`Message sent to ${userDialog.user.name}.`) }}><label className="vn-users-dialog-message">Message<textarea required placeholder="Write your message..." /></label><footer><button type="button" onClick={() => setUserDialog(null)}>Cancel</button><button className="is-primary" type="submit">Send Message</button></footer></form> : null}
          {['reset','login'].includes(userDialog.type) ? <div className="vn-users-dialog-confirm"><AdminIcon type={userDialog.type === 'reset' ? 'lock' : 'profile'} /><p>{userDialog.type === 'reset' ? `Send a secure password reset link to ${userDialog.user.email}?` : `Open a safe preview of the platform as ${userDialog.user.name}?`}</p><footer><button type="button" onClick={() => setUserDialog(null)}>Cancel</button><button className="is-primary" type="button" onClick={() => { const label = userDialog.type === 'reset' ? 'Password reset link sent' : 'User login preview opened'; setUserDialog(null); pushToast(`${label} for ${userDialog.user.name}.`) }}>Continue</button></footer></div> : null}
          {userDialog.type === 'profile' ? <div className="vn-users-profile-preview"><i className={`is-${userDialog.user.tone}`}>{userDialog.user.initials}</i><h4>{userDialog.user.name}</h4><span>{userDialog.user.role}</span><dl><dt>Email</dt><dd>{userDialog.user.email}</dd><dt>Phone</dt><dd>{userDialog.user.phone}</dd><dt>Bookings</dt><dd>{userDialog.user.bookings}</dd><dt>Total Spent</dt><dd>{userDialog.user.spend}</dd></dl><button type="button" onClick={() => setUserDialog(null)}>Done</button></div> : null}
          {userDialog.type === 'actions' ? <div className="vn-users-action-menu"><button onClick={() => setUserDialog({ type: 'profile', user: userDialog.user })}>View full profile</button><button onClick={() => setUserDialog({ type: 'message', user: userDialog.user })}>Send message</button><button onClick={() => { updateUserStatus(userDialog.user, userDialog.user.status === 'Blocked' ? 'Active' : 'Blocked'); setUserDialog(null) }}>{userDialog.user.status === 'Blocked' ? 'Unblock account' : 'Block account'}</button></div> : null}
        </div></div> : null}
      </div>
    )
  }

  const renderProvidersSection = () => {
    const filteredProviders = providersData.filter((provider) => {
      const query = searchQuery.trim().toLowerCase()
      return (providerTab === 'All' || provider.status === providerTab) &&
        (providerCategory === 'All Categories' || provider.category === providerCategory) &&
        (providerService === 'All Services' || provider.service === providerService) &&
        (providerLocation === 'All Locations' || provider.location.includes(providerLocation)) &&
        (!query || [provider.name, provider.id, provider.email, provider.phone, provider.service].some((value) => value.toLowerCase().includes(query)))
    })
    const allSelected = filteredProviders.length > 0 && filteredProviders.every((provider) => selectedProviderIds.includes(provider.id))
    const setProviderStatus = (provider, status) => { setProvidersData((current) => current.map((item) => item.id === provider.id ? { ...item, status } : item)); setProviderDialog(null); pushToast(`${provider.name} marked ${status}.`, status === 'Rejected' || status === 'Suspended' ? 'warning' : 'success') }
    const exportProviders = () => { const rows = filteredProviders.map((provider) => [provider.id,provider.name,provider.service,provider.email,provider.phone,provider.location,provider.status,provider.earnings]); const csv = [['ID','Provider','Service','Email','Phone','Location','Status','Earnings'],...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"','""')}"`).join(',')).join('\n'); const link=document.createElement('a'); link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); link.download='vyaparnest-providers.csv'; link.click(); URL.revokeObjectURL(link.href); pushToast(`${rows.length} providers exported.`) }
    const stats = [['users','Total Providers','1,248','↑ 12.6% this month','violet'],['history','Pending Approval','24','↑ 6 this week','orange'],['shield','Approved Providers','1,102','↑ 10.3% this month','green'],['warning','Rejected Providers','122','↓ 2.1% this month','red'],['lock','Suspended Providers','22','↓ 1 this week','purple']]
    return <div className="vn-providers-page">
      <header className="vn-providers-title"><div><h2>Service Providers</h2><p>Manage and monitor all service providers on the platform.</p></div><div><button onClick={exportProviders}>⇩ Export</button><button className="is-primary" onClick={() => setProviderDialog({type:'add'})}>＋ Add Provider</button></div></header>
      <section className="vn-provider-stat-grid">{stats.map(([icon,label,value,delta,tone]) => <article key={label}><i className={`is-${tone}`}><AdminIcon type={icon}/></i><div><span>{label}</span><strong>{value}</strong><small className={tone === 'red' || tone === 'purple' ? 'is-down' : ''}>{delta}</small></div></article>)}</section>
      <section className="vn-provider-layout"><main className="vn-provider-table-card">
        <div className="vn-provider-tabs">{[['All','1,248'],['Pending','24'],['Approved','1,102'],['Rejected','122'],['Suspended','22']].map(([tab,count]) => <button key={tab} className={providerTab===tab?'is-active':''} onClick={() => {setProviderTab(tab);setProviderPage(1)}}>{tab} Providers ({count})</button>)}</div>
        <div className="vn-provider-toolbar"><label><AdminIcon type="search"/><input value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Search providers..."/></label><select value={providerCategory} onChange={(event)=>setProviderCategory(event.target.value)}><option>All Categories</option>{[...new Set(providersData.map((item)=>item.category))].map((value)=><option key={value}>{value}</option>)}</select><select value={providerService} onChange={(event)=>setProviderService(event.target.value)}><option>All Services</option>{[...new Set(providersData.map((item)=>item.service))].map((value)=><option key={value}>{value}</option>)}</select><select value={providerTab} onChange={(event)=>setProviderTab(event.target.value)}><option value="All">All Status</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Suspended</option></select><button onClick={()=>pushToast(`${filteredProviders.length} matching providers found.`)}>☷ Filter</button></div>
        <div className="vn-provider-table-wrap"><table className="vn-provider-table"><thead><tr><th><input type="checkbox" checked={allSelected} onChange={()=>setSelectedProviderIds(allSelected?[]:filteredProviders.map((item)=>item.id))}/></th><th>Provider</th><th>Service & Category</th><th>Contact</th><th>Location</th><th>Joined On</th><th>Status</th><th>Earnings</th><th>Actions</th></tr></thead><tbody>{filteredProviders.map((provider)=><tr key={provider.id}><td><input type="checkbox" checked={selectedProviderIds.includes(provider.id)} onChange={()=>setSelectedProviderIds((current)=>current.includes(provider.id)?current.filter((id)=>id!==provider.id):[...current,provider.id])}/></td><td><div className="vn-provider-person"><i className={`is-${provider.tone}`}>{provider.initials}</i><div><strong>{provider.name}</strong><small>★ {provider.rating}　ID: {provider.id}</small></div></div></td><td><span className={`vn-provider-service is-${provider.tone}`}>{provider.service}</span><small>{provider.category}</small></td><td><span>{provider.email}</span><small>{provider.phone}</small></td><td>⌖ {provider.location}</td><td>{provider.joined}</td><td><StatusBadge value={provider.status}/></td><td><strong>{provider.earnings}</strong></td><td><div className="vn-provider-actions"><button onClick={()=>setProviderDialog({type:'view',provider})} aria-label={`View ${provider.name}`}>◉</button><button onClick={()=>setProviderDialog({type:'actions',provider})} aria-label={`Actions for ${provider.name}`}>⋮</button></div></td></tr>)}</tbody></table></div>
        <footer className="vn-provider-pagination"><span>Page {providerPage} · Showing {filteredProviders.length} providers</span><div><button disabled={providerPage===1} onClick={()=>setProviderPage((page)=>Math.max(1,page-1))}>‹</button>{[1,2,3].map((page)=><button key={page} className={providerPage===page?'is-active':''} onClick={()=>setProviderPage(page)}>{page}</button>)}<button disabled>…</button><button onClick={()=>setProviderPage(156)}>156</button><button disabled={providerPage===156} onClick={()=>setProviderPage((page)=>Math.min(156,page+1))}>›</button></div><select><option>10 / page</option><option>25 / page</option><option>50 / page</option></select></footer>
      </main><aside className="vn-provider-side"><section className="vn-provider-filters"><header><h3>Filter By</h3><button onClick={()=>{setProviderTab('All');setProviderCategory('All Categories');setProviderService('All Services');setProviderLocation('All Locations');setSearchQuery('')}}>Reset</button></header><label>Status<select value={providerTab} onChange={(event)=>setProviderTab(event.target.value)}><option value="All">All Status</option><option>Pending</option><option>Approved</option><option>Rejected</option><option>Suspended</option></select></label><label>Category<select value={providerCategory} onChange={(event)=>setProviderCategory(event.target.value)}><option>All Categories</option>{[...new Set(providersData.map((item)=>item.category))].map((value)=><option key={value}>{value}</option>)}</select></label><label>Service<select value={providerService} onChange={(event)=>setProviderService(event.target.value)}><option>All Services</option>{[...new Set(providersData.map((item)=>item.service))].map((value)=><option key={value}>{value}</option>)}</select></label><label>Location<select value={providerLocation} onChange={(event)=>setProviderLocation(event.target.value)}><option>All Locations</option><option>Delhi</option><option>Mumbai</option><option>Jaipur</option><option>Hyderabad</option></select></label><button className="is-apply" onClick={()=>pushToast(`${filteredProviders.length} providers match these filters.`)}>Apply Filters</button></section>
      <section className="vn-provider-status-card"><h3>Providers by Status</h3><div className="vn-provider-donut"><span><strong>1,248</strong>Total</span></div><ul><li><i className="is-green"/>Approved <strong>1,102</strong></li><li><i className="is-orange"/>Pending <strong>24</strong></li><li><i className="is-red"/>Rejected <strong>122</strong></li><li><i className="is-purple"/>Suspended <strong>22</strong></li></ul></section><section className="vn-provider-top"><header><h3>Top Categories</h3><button onClick={()=>{setProviderCategory('All Categories');pushToast('All provider categories are visible.')}}>View All</button></header>{[['layers','Web Development','320'],['chart','Digital Marketing','285'],['gallery','Graphic Design','210'],['document','Content Writing','165'],['search','SEO Services','120']].map(([icon,label,count])=><button key={label} onClick={()=>{setProviderService(label);pushToast(`${label} providers loaded.`)}}><i><AdminIcon type={icon}/></i><span>{label}</span><strong>{count}</strong></button>)}</section></aside></section>
      {providerDialog?<div className="vn-provider-dialog-backdrop" onMouseDown={(event)=>event.target===event.currentTarget&&setProviderDialog(null)}><div className="vn-provider-dialog"><header><div><h3>{providerDialog.type==='add'?'Add Service Provider':providerDialog.type==='view'?'Provider Details':'Provider Actions'}</h3><p>{providerDialog.provider?`${providerDialog.provider.name} · ${providerDialog.provider.id}`:'Create a new provider profile'}</p></div><button onClick={()=>setProviderDialog(null)}>×</button></header>{providerDialog.type==='add'?<form onSubmit={(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);const name=form.get('name').trim();const item={id:`SP${1000+providersData.length+1}`,initials:name.split(' ').map((part)=>part[0]).join('').slice(0,2).toUpperCase(),name,rating:'New',service:form.get('service'),category:form.get('category'),email:form.get('email'),phone:form.get('phone'),location:form.get('location'),joined:'Today',status:'Pending',earnings:'₹0',tone:'violet'};setProvidersData((current)=>[item,...current]);setProviderDialog(null);pushToast(`${name} added for approval.`)}}><div className="vn-provider-dialog-grid"><label>Provider Name<input name="name" required/></label><label>Email<input name="email" type="email" required/></label><label>Phone<input name="phone" required/></label><label>Service<input name="service" required/></label><label>Category<select name="category"><option>Development</option><option>Design</option><option>Marketing</option><option>Writing</option></select></label><label>Location<input name="location" required/></label></div><footer><button type="button" onClick={()=>setProviderDialog(null)}>Cancel</button><button className="is-primary">Add Provider</button></footer></form>:null}{providerDialog.type==='view'?<div className="vn-provider-profile"><i>{providerDialog.provider.initials}</i><h4>{providerDialog.provider.name}</h4><span>{providerDialog.provider.service}</span><dl><dt>Email</dt><dd>{providerDialog.provider.email}</dd><dt>Phone</dt><dd>{providerDialog.provider.phone}</dd><dt>Location</dt><dd>{providerDialog.provider.location}</dd><dt>Earnings</dt><dd>{providerDialog.provider.earnings}</dd><dt>Status</dt><dd><StatusBadge value={providerDialog.provider.status}/></dd></dl><button onClick={()=>setProviderDialog(null)}>Done</button></div>:null}{providerDialog.type==='actions'?<div className="vn-provider-action-menu"><button onClick={()=>setProviderDialog({type:'view',provider:providerDialog.provider})}>View full profile</button><button onClick={()=>setProviderStatus(providerDialog.provider,'Approved')}>Approve provider</button><button onClick={()=>setProviderStatus(providerDialog.provider,'Suspended')}>Suspend provider</button><button className="is-danger" onClick={()=>setProviderStatus(providerDialog.provider,'Rejected')}>Reject provider</button></div>:null}</div></div>:null}
    </div>
  }

  const renderCategoriesSection = () => {
    const query = searchQuery.trim().toLowerCase()
    const filteredCategories = categoriesData.filter((category) => (categoryStatus === 'All' || category.status === categoryStatus) && (!query || [category.id,category.name,category.icon,category.image].some((value)=>String(value).toLowerCase().includes(query))))
    const allSelected = filteredCategories.length > 0 && filteredCategories.every((category)=>selectedCategoryIds.includes(category.id))
    const saveStatus = (category,status) => { setCategoriesData((current)=>current.map((item)=>item.id===category.id?{...item,status}:item)); setCategoryDialog(null); pushToast(`${category.name} ${status.toLowerCase()}.`,status==='Disabled'?'warning':'success') }
    const removeCategory = (category) => { setCategoriesData((current)=>current.filter((item)=>item.id!==category.id)); setCategoryDialog(null); pushToast(`${category.name} removed.`,'warning') }
    const exportCategories = () => { const rows=filteredCategories.map((category)=>[category.id,category.name,category.services,category.subcategories,category.status,category.order]);const csv=[['ID','Category','Services','Subcategories','Status','Order'],...rows].map((row)=>row.map((cell)=>`"${cell}"`).join(',')).join('\n');const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));link.download='vyaparnest-categories.csv';link.click();URL.revokeObjectURL(link.href);pushToast(`${rows.length} categories exported.`) }
    const totalServices=categoriesData.reduce((sum,item)=>sum+Number(item.services),0)
    return <div className="vn-categories-page">
      <header className="vn-categories-title"><div><h2>Categories</h2><p>Manage service categories, subcategories, visibility and display order.</p></div><div><button onClick={exportCategories}>⇩ Export</button><button className="is-primary" onClick={()=>setCategoryDialog({type:'add'})}>＋ Add Category</button></div></header>
      <section className="vn-category-stat-grid">{[['grid','Total Categories',String(categoriesData.length),'All marketplace categories','violet'],['layers','Total Services',String(totalServices),'Across all categories','blue'],['check','Active Categories',String(categoriesData.filter((item)=>item.status==='Enabled').length),'Visible on website','green'],['lock','Disabled Categories',String(categoriesData.filter((item)=>item.status==='Disabled').length),'Currently hidden','orange']].map(([icon,label,value,note,tone])=><article key={label}><i className={`is-${tone}`}><AdminIcon type={icon}/></i><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></article>)}</section>
      <section className="vn-category-layout"><main className="vn-category-table-card"><div className="vn-category-tabs">{[['All','All Categories'],['Enabled','Active'],['Disabled','Disabled']].map(([value,label])=><button key={value} className={categoryStatus===value?'is-active':''} onClick={()=>setCategoryStatus(value)}>{label} ({value==='All'?categoriesData.length:categoriesData.filter((item)=>item.status===value).length})</button>)}</div><div className="vn-category-toolbar"><label><AdminIcon type="search"/><input value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Search categories..."/></label><select value={categoryStatus} onChange={(event)=>setCategoryStatus(event.target.value)}><option value="All">All Status</option><option>Enabled</option><option>Disabled</option></select><select><option>Display Order</option><option>Most Services</option><option>Fewest Services</option></select><button onClick={()=>{setSearchQuery('');setCategoryStatus('All');pushToast('Category filters reset.')}}>☷ Reset</button></div>
      <div className="vn-category-table-wrap"><table className="vn-category-table"><thead><tr><th><input type="checkbox" checked={allSelected} onChange={()=>setSelectedCategoryIds(allSelected?[]:filteredCategories.map((item)=>item.id))}/></th><th>Category</th><th>Icon & Banner</th><th>Services</th><th>Subcategories</th><th>Display Order</th><th>Status</th><th>Updated</th><th>Actions</th></tr></thead><tbody>{filteredCategories.map((category,index)=><tr key={category.id}><td><input type="checkbox" checked={selectedCategoryIds.includes(category.id)} onChange={()=>setSelectedCategoryIds((current)=>current.includes(category.id)?current.filter((id)=>id!==category.id):[...current,category.id])}/></td><td><div className="vn-category-name"><i><AdminIcon type={['grid','briefcase','chart','home','spark'][index%5]}/></i><div><strong>{category.name}</strong><small>{category.id}</small></div></div></td><td><span className="vn-category-asset">◫ {category.icon}</span><small>{category.image}</small></td><td><strong>{category.services}</strong></td><td>{category.subcategories}</td><td><span className="vn-category-order">{category.order}</span></td><td><StatusBadge value={category.status}/></td><td>Today, 10:{20+index} AM</td><td><div className="vn-category-actions"><button onClick={()=>setCategoryDialog({type:'view',category})} aria-label={`View ${category.name}`}>◉</button><button onClick={()=>setCategoryDialog({type:'edit',category})} aria-label={`Edit ${category.name}`}>✎</button><button onClick={()=>setCategoryDialog({type:'actions',category})} aria-label={`Actions for ${category.name}`}>⋮</button></div></td></tr>)}</tbody></table></div><footer className="vn-category-footer"><span>Showing {filteredCategories.length} of {categoriesData.length} categories</span><div><button disabled>‹</button><button className="is-active">1</button><button disabled>›</button></div></footer></main>
      <aside className="vn-category-side"><section><header><h3>Category Health</h3><button onClick={()=>pushToast('Category analytics refreshed.')}>Refresh</button></header><div className="vn-category-donut"><span><strong>{Math.round(categoriesData.filter((item)=>item.status==='Enabled').length/categoriesData.length*100)}%</strong>Active</span></div><dl><dt><i className="is-green"/>Enabled</dt><dd>{categoriesData.filter((item)=>item.status==='Enabled').length}</dd><dt><i className="is-orange"/>Disabled</dt><dd>{categoriesData.filter((item)=>item.status==='Disabled').length}</dd></dl></section><section className="vn-category-ranking"><header><h3>Top Categories</h3><button onClick={()=>setCategoryStatus('All')}>View All</button></header>{[...categoriesData].sort((a,b)=>b.services-a.services).slice(0,5).map((category,index)=><button key={category.id} onClick={()=>{setSearchQuery(category.name);pushToast(`${category.name} selected.`)}}><span><i>{index+1}</i>{category.name}</span><strong>{category.services}</strong></button>)}</section><section className="vn-category-tip"><AdminIcon type="spark"/><div><strong>Keep categories focused</strong><p>Clear names and icons help users discover services faster.</p></div></section></aside></section>
      {categoryDialog?<div className="vn-category-dialog-backdrop" onMouseDown={(event)=>event.target===event.currentTarget&&setCategoryDialog(null)}><div className="vn-category-dialog"><header><div><h3>{categoryDialog.type==='add'?'Add Category':categoryDialog.type==='edit'?'Edit Category':categoryDialog.type==='view'?'Category Details':'Category Actions'}</h3><p>{categoryDialog.category?categoryDialog.category.name:'Create a new marketplace category'}</p></div><button onClick={()=>setCategoryDialog(null)}>×</button></header>{['add','edit'].includes(categoryDialog.type)?<form onSubmit={(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);const name=form.get('name').trim();if(categoryDialog.type==='edit'){setCategoriesData((current)=>current.map((item)=>item.id===categoryDialog.category.id?{...item,name,status:form.get('status'),order:Number(form.get('order'))}:item));pushToast(`${name} updated.`)}else{setCategoriesData((current)=>[...current,{id:`C-${String(current.length+1).padStart(2,'0')}`,name,icon:'category.svg',image:'category-banner.png',services:0,status:form.get('status'),order:Number(form.get('order')),subcategories:0}]);pushToast(`${name} added.`)}setCategoryDialog(null)}}><div className="vn-category-dialog-grid"><label>Category Name<input name="name" required defaultValue={categoryDialog.category?.name||''}/></label><label>Status<select name="status" defaultValue={categoryDialog.category?.status||'Enabled'}><option>Enabled</option><option>Disabled</option></select></label><label>Display Order<input name="order" type="number" min="1" required defaultValue={categoryDialog.category?.order||categoriesData.length+1}/></label><label>Icon Asset<input name="icon" defaultValue={categoryDialog.category?.icon||'category.svg'}/></label></div><footer><button type="button" onClick={()=>setCategoryDialog(null)}>Cancel</button><button className="is-primary">{categoryDialog.type==='edit'?'Save Changes':'Add Category'}</button></footer></form>:null}{categoryDialog.type==='view'?<div className="vn-category-profile"><i><AdminIcon type="grid"/></i><h4>{categoryDialog.category.name}</h4><StatusBadge value={categoryDialog.category.status}/><dl><dt>Services</dt><dd>{categoryDialog.category.services}</dd><dt>Subcategories</dt><dd>{categoryDialog.category.subcategories}</dd><dt>Display Order</dt><dd>{categoryDialog.category.order}</dd><dt>Icon</dt><dd>{categoryDialog.category.icon}</dd></dl><button onClick={()=>setCategoryDialog(null)}>Done</button></div>:null}{categoryDialog.type==='actions'?<div className="vn-category-action-menu"><button onClick={()=>setCategoryDialog({type:'view',category:categoryDialog.category})}>View category</button><button onClick={()=>setCategoryDialog({type:'edit',category:categoryDialog.category})}>Edit category</button><button onClick={()=>saveStatus(categoryDialog.category,categoryDialog.category.status==='Enabled'?'Disabled':'Enabled')}>{categoryDialog.category.status==='Enabled'?'Disable':'Enable'} category</button><button className="is-danger" onClick={()=>removeCategory(categoryDialog.category)}>Delete category</button></div>:null}</div></div>:null}
    </div>
  }

  const renderServicesSection = () => {
    const query=searchQuery.trim().toLowerCase(); const filtered=servicesData.filter((service)=>(serviceCategoryFilter==='All'||service.category===serviceCategoryFilter)&&(serviceStatusFilter==='All'||service.status===serviceStatusFilter)&&(serviceProviderFilter==='All'||service.provider===serviceProviderFilter)&&(!query||[service.title,service.provider,service.category].some((value)=>value.toLowerCase().includes(query))))
    const updateService=(service,status)=>{setServicesData((current)=>current.map((item)=>item.id===service.id?{...item,status}:item));setServiceDialog(null);pushToast(`${service.title} marked ${status}.`,status==='Active'?'success':'warning')}
    const removeService=(service)=>{setServicesData((current)=>current.filter((item)=>item.id!==service.id));setServiceDialog(null);pushToast(`${service.title} deleted.`,'warning')}
    const exportServices=()=>{const rows=filtered.map((item)=>[item.id,item.title,item.provider,item.category,item.price,item.status]);const csv=[['ID','Service','Provider','Category','Price','Status'],...rows].map((row)=>row.map((cell)=>`"${cell}"`).join(',')).join('\n');const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));link.download='vyaparnest-services.csv';link.click();URL.revokeObjectURL(link.href);pushToast(`${rows.length} services exported.`)}
    const categories=[...new Set(servicesData.map((item)=>item.category))]
    return <div className="vn-services-page"><header className="vn-services-title"><div><span><AdminIcon type="grid"/></span><div><h2>Services</h2><p>Manage and organize all services offered on the platform.</p></div></div><div><button onClick={exportServices}>⇩ Export</button><button className="is-primary" onClick={()=>{setServiceImagePreview('');setServiceDialog({type:'add'})}}>＋ Add Service</button></div></header>
    <section className="vn-service-stat-grid">{[['layers','Total Services','124','↑ 12.5% from last month','violet'],['shield','Active Services','98','↑ 10.2% from last month','green'],['history','Pending Approval','18','↑ 6.3% from last month','orange'],['lock','Blocked Services','8','↓ 2.1% from last month','red']].map(([icon,label,value,delta,tone])=><article key={label}><i className={`is-${tone}`}><AdminIcon type={icon}/></i><div><span>{label}</span><strong>{value}</strong><small className={tone==='red'?'is-down':''}>{delta}</small></div></article>)}</section>
    <section className="vn-services-card-shell"><div className="vn-services-filters"><label><AdminIcon type="search"/><input value={searchQuery} onChange={(event)=>setSearchQuery(event.target.value)} placeholder="Search services by name, provider or category..."/></label><select value={serviceCategoryFilter} onChange={(event)=>setServiceCategoryFilter(event.target.value)}><option value="All">All Categories</option>{categories.map((value)=><option key={value}>{value}</option>)}</select><select value={serviceStatusFilter} onChange={(event)=>setServiceStatusFilter(event.target.value)}><option value="All">All Status</option><option>Active</option><option>Pending</option><option>Suspended</option></select><select value={serviceProviderFilter} onChange={(event)=>setServiceProviderFilter(event.target.value)}><option value="All">All Providers</option>{[...new Set(servicesData.map((item)=>item.provider))].map((value)=><option key={value}>{value}</option>)}</select><button onClick={()=>{setSearchQuery('');setServiceCategoryFilter('All');setServiceStatusFilter('All');setServiceProviderFilter('All');pushToast('Service filters reset.')}}>↻ Reset</button></div>
    <div className="vn-service-category-tabs"><button className={serviceCategoryFilter==='All'?'is-active':''} onClick={()=>setServiceCategoryFilter('All')}>All (124)</button>{categories.map((value)=><button className={serviceCategoryFilter===value?'is-active':''} onClick={()=>setServiceCategoryFilter(value)} key={value}>{value} ({servicesData.filter((item)=>item.category===value).length})</button>)}</div>
    <div className="vn-service-grid">{filtered.map((service)=><article key={service.id}><div className="vn-service-image"><img src={service.image} alt={service.title}/><button onClick={()=>setServiceDialog({type:'actions',service})}>⋮</button></div><h3>{service.title}</h3><div className="vn-service-provider"><i className={`is-${service.tone}`}>{service.initials}</i><span>{service.provider}</span><b>Top Rated</b></div><span className={`vn-service-category is-${service.tone}`}>{service.category}</span><p>★ {service.rating} <small>({service.reviews} reviews)</small></p><div className="vn-service-price"><strong>{service.price}</strong><small>/ {service.unit}</small><StatusBadge value={service.status}/></div><footer><button onClick={()=>setServiceDialog({type:'view',service})}>◉ View</button><button onClick={()=>{setServiceImagePreview(service.image);setServiceDialog({type:'edit',service})}}>✎ Edit</button><button onClick={()=>setServiceDialog({type:'actions',service})}>⋯</button></footer></article>)}</div>
    <footer className="vn-services-pagination"><span>Page {servicePage} · Showing {filtered.length} services</span><div><button disabled={servicePage===1} onClick={()=>setServicePage((page)=>Math.max(1,page-1))}>‹</button>{[1,2,3,4,5].map((page)=><button className={servicePage===page?'is-active':''} onClick={()=>setServicePage(page)} key={page}>{page}</button>)}<button disabled>…</button><button onClick={()=>setServicePage(16)}>16</button><button disabled={servicePage===16} onClick={()=>setServicePage((page)=>Math.min(16,page+1))}>›</button></div><select><option>8 / page</option><option>16 / page</option><option>24 / page</option></select></footer></section>
    {serviceDialog?<div className="vn-service-dialog-backdrop" onMouseDown={(event)=>event.target===event.currentTarget&&setServiceDialog(null)}><div className={`vn-service-dialog${['add','edit'].includes(serviceDialog.type)?' is-detailed':''}`}><header><div><h3>{serviceDialog.type==='add'?'Add Service':serviceDialog.type==='edit'?'Edit Service':serviceDialog.type==='view'?'Service Details':'Service Actions'}</h3><p>{serviceDialog.service?.title||'Create a complete marketplace listing visible to customers'}</p></div><button onClick={()=>setServiceDialog(null)}>×</button></header>{['add','edit'].includes(serviceDialog.type)?<form onSubmit={(event)=>{event.preventDefault();const form=new FormData(event.currentTarget);const title=form.get('title').trim();const provider=form.get('provider').trim();const nextService={title,provider,initials:provider.split(' ').map((part)=>part[0]).join('').slice(0,2).toUpperCase(),category:form.get('category'),price:form.get('price').trim(),unit:form.get('unit'),status:form.get('status'),description:form.get('description').trim(),delivery:form.get('delivery').trim(),features:form.get('features').split(',').map((item)=>item.trim()).filter(Boolean),image:serviceImagePreview||serviceDialog.service?.image||'/market-sections/guide-website.png'};if(serviceDialog.type==='edit'){setServicesData((current)=>current.map((item)=>item.id===serviceDialog.service.id?{...item,...nextService}:item));pushToast(`${title} updated and synced to the user panel.`)}else{setServicesData((current)=>[{id:`S-${Date.now()}`,rating:'New',reviews:0,tone:'violet',...nextService},...current]);pushToast(`${title} added and synced to the user panel.`)}setServiceImagePreview('');setServiceDialog(null)}}><div className="vn-service-form-body"><section className="vn-service-upload-panel"><label className="vn-service-upload"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={async(event)=>{const file=event.target.files?.[0];if(!file)return;if(file.size>8*1024*1024){pushToast('Please select an image smaller than 8 MB.','warning');event.target.value='';return}try{setServiceImagePreview(await createServiceImagePreview(file))}catch{pushToast('This image could not be processed.','warning')}}}/>{serviceImagePreview?<img src={serviceImagePreview} alt="Service preview"/>:<span><AdminIcon type="gallery"/><strong>Upload service image</strong><small>PNG, JPG or WebP · recommended 16:9 · max 8 MB</small></span>}</label>{serviceImagePreview?<button className="vn-service-remove-image" type="button" onClick={()=>setServiceImagePreview('')}>Remove image</button>:null}<p>A clear, high-quality cover image improves customer discovery.</p></section><section className="vn-service-fields"><div className="vn-service-dialog-grid"><label>Service Name<input name="title" required placeholder="e.g. E-commerce Website Development" defaultValue={serviceDialog.service?.title||''}/></label><label>Provider / Business<input name="provider" required placeholder="Provider name" defaultValue={serviceDialog.service?.provider||''}/></label><label>Category<select name="category" defaultValue={serviceDialog.service?.category||categories[0]}>{categories.map((value)=><option key={value}>{value}</option>)}</select></label><label>Price Range<input name="price" required placeholder="₹1,000 - ₹5,000" defaultValue={serviceDialog.service?.price||'₹1,000 - ₹5,000'}/></label><label>Billing Unit<select name="unit" defaultValue={serviceDialog.service?.unit||'project'}><option value="project">Per project</option><option value="hour">Per hour</option><option value="month">Per month</option><option value="article">Per article</option><option value="page">Per page</option><option value="session">Per session</option></select></label><label>Status<select name="status" defaultValue={serviceDialog.service?.status||'Active'}><option>Active</option><option>Pending</option><option>Suspended</option></select></label><label className="is-wide">Short Description<textarea name="description" rows="3" required placeholder="Explain what customers will receive and why this service is useful." defaultValue={serviceDialog.service?.description||''}/></label><label>Delivery Time<input name="delivery" required placeholder="e.g. 5–7 business days" defaultValue={serviceDialog.service?.delivery||'5–7 business days'}/></label><label>Highlights <span>(comma separated)</span><input name="features" placeholder="Responsive design, Free consultation" defaultValue={(serviceDialog.service?.features||[]).join(', ')}/></label></div></section></div><footer><small>{serviceDialog.type==='add'?'Active services appear automatically in the user panel.':'Changes sync automatically across the marketplace.'}</small><button type="button" onClick={()=>setServiceDialog(null)}>Cancel</button><button className="is-primary">{serviceDialog.type==='edit'?'Save Changes':'Add Service'}</button></footer></form>:null}{serviceDialog.type==='view'?<div className="vn-service-preview"><img src={serviceDialog.service.image} alt={serviceDialog.service.title}/><h4>{serviceDialog.service.title}</h4><span>{serviceDialog.service.category}</span>{serviceDialog.service.description?<p>{serviceDialog.service.description}</p>:null}<dl><dt>Provider</dt><dd>{serviceDialog.service.provider}</dd><dt>Price</dt><dd>{serviceDialog.service.price}</dd><dt>Delivery</dt><dd>{serviceDialog.service.delivery||'Contact provider'}</dd><dt>Status</dt><dd><StatusBadge value={serviceDialog.service.status}/></dd></dl><button onClick={()=>setServiceDialog(null)}>Done</button></div>:null}{serviceDialog.type==='actions'?<div className="vn-service-action-menu"><button onClick={()=>setServiceDialog({type:'view',service:serviceDialog.service})}>View service</button><button onClick={()=>{setServiceImagePreview(serviceDialog.service.image);setServiceDialog({type:'edit',service:serviceDialog.service})}}>Edit service</button><button onClick={()=>updateService(serviceDialog.service,serviceDialog.service.status==='Active'?'Suspended':'Active')}>{serviceDialog.service.status==='Active'?'Suspend':'Activate'} service</button><button className="is-danger" onClick={()=>removeService(serviceDialog.service)}>Delete service</button></div>:null}</div></div>:null}</div>
  }

  const renderAnalytics = () => (
    <div className="vn-admin-dashboard">
      <section className="vn-admin-two-column-grid">
        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Growth Analytics</h2>
              <p>Performance snapshot for top providers, categories, conversion, and monthly demand.</p>
            </div>
          </div>
          <div className="vn-admin-chart is-compact">
            {adminRevenueSeries.map((entry) => (
              <div key={`analytics-${entry.month}`} className="vn-admin-chart-bar-group">
                <div className="vn-admin-chart-bar-track">
                  <span
                    className="vn-admin-chart-bar is-blue"
                    style={{ height: `${Math.max(8, (entry.users / 860) * 100)}%` }}
                  ></span>
                </div>
                <strong>{entry.month}</strong>
                <small>{entry.users}</small>
              </div>
            ))}
          </div>
        </article>

        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Best Performing Signals</h2>
              <p>Auto-generated view for fast executive decisions.</p>
            </div>
          </div>
          <div className="vn-admin-insight-grid">
            <article className="vn-admin-insight-card">
              <span>Top Provider</span>
              <strong>{topProvider.name}</strong>
              <p>{topProvider.requests} requests handled · {cleanText(topProvider.earnings)} earned</p>
            </article>
            <article className="vn-admin-insight-card">
              <span>Top Category</span>
              <strong>{topCategory.name}</strong>
              <p>{topCategory.services} active services · {topCategory.subcategories} subcategories</p>
            </article>
            <article className="vn-admin-insight-card">
              <span>Conversion Rate</span>
              <strong>18.6%</strong>
              <p>Lead-to-project conversion across all service requests this month.</p>
            </article>
            <article className="vn-admin-insight-card">
              <span>Average Order Value</span>
              <strong>Rs 14,200</strong>
              <p>Current blended order value across GST, web, and marketing verticals.</p>
            </article>
          </div>
        </article>
      </section>
    </div>
  )

  const renderRolesSection = () => (
    <div className="vn-admin-dashboard">
      <section className="vn-admin-insight-grid">
        {roleRows.map((role) => (
          <article key={role.id} className="vn-admin-insight-card">
            <span>{role.id}</span>
            <strong>{role.name}</strong>
            <p>{role.users} team members mapped to this role.</p>
            <div className="vn-admin-chip-row">
              {(role.permissions[0] === 'all' ? permissionMatrix.slice(0, 4) : role.permissions.slice(0, 4)).map((permission) => (
                <span key={`${role.id}-${permission}`} className="vn-admin-chip">
                  {permission}
                </span>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="vn-admin-panel">
        <div className="vn-admin-panel-head">
          <div>
            <h2>Permission Matrix</h2>
            <p>Customize access for Super Admin, Admin, Category Manager, Support, Content, and Finance teams.</p>
          </div>
          <button type="button" className="vn-admin-button is-primary" onClick={() => pushToast('Role editor opened.')}>
            Edit Permissions
          </button>
        </div>
        <div className="vn-admin-chip-grid">
          {permissionMatrix.map((permission) => (
            <span key={permission} className="vn-admin-permission-chip">
              {permission}
            </span>
          ))}
        </div>
      </section>
    </div>
  )

  const renderAiSection = () => (
    <div className="vn-admin-dashboard">
      <section className="vn-admin-insight-grid">
        {aiAssistantCards.map((assistantCard) => (
          <article key={assistantCard.id} className="vn-admin-insight-card is-highlight">
            <span>AI Assistant</span>
            <strong>{assistantCard.title}</strong>
            <p>{assistantCard.description}</p>
            <button type="button" className="vn-admin-text-button" onClick={() => pushToast(`${assistantCard.title} launched.`)}>
              Open Assistant
            </button>
          </article>
        ))}
      </section>
    </div>
  )

  const renderSettingsSection = () => (
    <div className="vn-admin-dashboard">
      <section className="vn-admin-two-column-grid is-wide-sidebar">
        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Website Settings</h2>
              <p>Logo, favicon, SEO, social links, contact details, analytics, SMTP, and payment gateway controls.</p>
            </div>
          </div>
          <div className="vn-admin-settings-grid">
            {settingsCards.map((settingCard) => (
              <article key={settingCard.id} className="vn-admin-setting-card">
                <strong>{settingCard.title}</strong>
                <p>{settingCard.description}</p>
                <button type="button" className="vn-admin-text-button" onClick={() => pushToast(`${settingCard.title} opened.`)}>
                  Configure
                </button>
              </article>
            ))}
          </div>
        </article>

        <aside className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Logo / Banner Upload</h2>
              <p>Drag and drop visual assets here for preview.</p>
            </div>
          </div>
          <label
            className="vn-admin-upload"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault()
              handleBannerUpload(event.dataTransfer.files?.[0])
            }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(event) => handleBannerUpload(event.target.files?.[0])}
            />
            {bannerPreview ? (
              <img src={bannerPreview} alt="Admin upload preview" className="vn-admin-upload-preview" />
            ) : (
              <>
                <AdminIcon type="upload" className="vn-admin-upload-icon" />
                <strong>Drop image here</strong>
                <p>Upload logo, favicon, banner, or promotional media for admin preview.</p>
              </>
            )}
          </label>
        </aside>
      </section>
    </div>
  )

  const renderNotificationsSection = () => (
    <div className="vn-admin-dashboard">
      <section className="vn-admin-two-column-grid">
        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Notification Center</h2>
              <p>Send push, email, SMS, or WhatsApp communication to users or providers.</p>
            </div>
          </div>
          <div className="vn-admin-form-grid">
            <label>
              <span>Audience</span>
              <select value={notificationAudience} onChange={(event) => setNotificationAudience(event.target.value)}>
                <option>All Users</option>
                <option>All Providers</option>
                <option>Selected Providers</option>
                <option>Single User</option>
              </select>
            </label>
            <label>
              <span>Channel</span>
              <select value={notificationChannel} onChange={(event) => setNotificationChannel(event.target.value)}>
                <option>Push + Email</option>
                <option>Email</option>
                <option>SMS</option>
                <option>WhatsApp</option>
              </select>
            </label>
            <label className="is-full">
              <span>Message</span>
              <textarea
                rows="6"
                value={notificationMessage}
                onChange={(event) => setNotificationMessage(event.target.value)}
                placeholder="Write a platform-wide announcement, campaign launch, KYC reminder, or support update..."
              />
            </label>
          </div>
          <div className="vn-admin-panel-actions">
            <button
              type="button"
              className="vn-admin-button is-primary"
              onClick={() => pushToast(`Notification sent to ${notificationAudience} via ${notificationChannel}.`)}
            >
              Send Notification
            </button>
          </div>
        </article>

        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Saved Templates</h2>
              <p>Quick launch templates for repeated admin communication.</p>
            </div>
          </div>
          <div className="vn-admin-list-stack">
            {notificationTemplates.map((template) => (
              <article key={template.id} className="vn-admin-list-card">
                <div>
                  <strong>{template.title}</strong>
                  <p>
                    {template.channel} · {template.audience}
                  </p>
                </div>
                <div className="vn-admin-list-card-meta">
                  <StatusBadge value={template.status} />
                  <button type="button" className="vn-admin-text-button" onClick={() => pushToast(`${template.title} template loaded.`)}>
                    Use
                  </button>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  )

  const renderProfileSection = () => (
    <div className="vn-admin-dashboard">
      <section className="vn-admin-two-column-grid">
        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Admin Profile</h2>
              <p>Primary super admin identity, access summary, and current session details.</p>
            </div>
          </div>
          <div className="vn-admin-profile-card">
            <span className="vn-admin-profile-avatar">RS</span>
            <div>
              <strong>{adminProfileCard.name}</strong>
              <p>{adminProfileCard.role}</p>
            </div>
          </div>
          <div className="vn-admin-profile-meta">
            <article>
              <span>Email</span>
              <strong>{adminProfileCard.email}</strong>
            </article>
            <article>
              <span>Phone</span>
              <strong>{adminProfileCard.phone}</strong>
            </article>
            <article>
              <span>Location</span>
              <strong>{adminProfileCard.location}</strong>
            </article>
            <article>
              <span>Last Login</span>
              <strong>{cleanText(adminProfileCard.lastLogin)}</strong>
            </article>
          </div>
        </article>

        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Session Controls</h2>
              <p>Safe access management for super admin usage on this device.</p>
            </div>
          </div>
          <div className="vn-admin-insight-grid is-single-column">
            <article className="vn-admin-insight-card">
              <span>Access Mode</span>
              <strong>OTP + Social Demo Login</strong>
              <p>Current frontend admin login supports mobile OTP plus Google and Facebook entry flow.</p>
            </article>
            <article className="vn-admin-insight-card">
              <span>Session State</span>
              <strong>{isAuthenticated ? 'Authenticated' : 'Logged out'}</strong>
              <p>Session is stored locally in browser for the current frontend demo build.</p>
            </article>
          </div>
        </article>
      </section>
    </div>
  )

  const renderSecuritySection = () => (
    <div className="vn-admin-dashboard">
      <section className="vn-admin-two-column-grid">
        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Backup & Security</h2>
              <p>Snapshot health, audit readiness, and platform security visibility.</p>
            </div>
          </div>
          <div className="vn-admin-list-stack">
            {securityBackups.map((backup) => (
              <article key={backup.id} className="vn-admin-list-card">
                <div>
                  <strong>{backup.type}</strong>
                  <p>{cleanText(backup.date)}</p>
                </div>
                <StatusBadge value={backup.status} />
              </article>
            ))}
          </div>
        </article>

        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Recent Security Logs</h2>
              <p>Last important actions affecting platform controls.</p>
            </div>
          </div>
          <div className="vn-admin-list-stack">
            {activityLogRows.slice(0, 4).map((log) => (
              <article key={log.id} className="vn-admin-list-card">
                <div>
                  <strong>{log.actor}</strong>
                  <p>{log.action}</p>
                </div>
                <small>{cleanText(log.time)}</small>
              </article>
            ))}
          </div>
        </article>
      </section>
    </div>
  )

  const renderSectionContent = () => {
    if (sectionBusy) {
      return renderSkeleton()
    }

    if (activeSection === 'dashboard') {
      return renderDashboard()
    }

    if (activeSection === 'users') {
      return renderUsersSection()
    }

    if (activeSection === 'providers') {
      return renderProvidersSection()
    }

    if (activeSection === 'categories') {
      return renderCategoriesSection()
    }

    if (activeSection === 'services') {
      return renderServicesSection()
    }

    if (activeSection === 'analytics') {
      return renderAnalytics()
    }

    if (activeSection === 'roles') {
      return renderRolesSection()
    }

    if (activeSection === 'ai') {
      return renderAiSection()
    }

    if (activeSection === 'settings') {
      return renderSettingsSection()
    }

    if (activeSection === 'notifications') {
      return renderNotificationsSection()
    }

    if (activeSection === 'profile') {
      return renderProfileSection()
    }

    if (activeSection === 'security') {
      return renderSecuritySection()
    }

    return renderManagementTable()
  }

  if (!isAuthenticated || hashState.isLogin) {
    return (
      <div className={`vn-admin-login-root${isDarkMode ? ' is-dark' : ''}`}>
        <div className="vn-admin-login-shell">
          <section className="vn-admin-login-hero">
            <a className="vn-admin-login-brand" href="#top">
              <img src="/vyaparnest-navbar-footer-logo.png" alt="VyaparNest" />
            </a>
            <span className="vn-admin-login-kicker">Super Admin Control Center</span>
            <h1>Secure admin access for your marketplace operations.</h1>
            <p>
              Manage users, providers, categories, services, payments, homepage content, analytics,
              and platform security from one premium control panel.
            </p>
            <div className="vn-admin-login-feature-grid">
              <article>
                <strong>White, Black & Golden UI</strong>
                <span>Minimal premium dashboard with quick actions and modular controls.</span>
              </article>
              <article>
                <strong>Marketplace Command Center</strong>
                <span>Approve providers, manage payouts, moderate content, and handle support.</span>
              </article>
              <article>
                <strong>Responsive Admin Experience</strong>
                <span>Desktop-first admin workspace with mobile access and dark mode support.</span>
              </article>
            </div>
          </section>

          <section className="vn-admin-login-card">
            <div className="vn-admin-login-card-head">
              <div>
                <h2>Admin Login</h2>
                <p>Sign in with your authorized administrator email and password.</p>
              </div>
              <button type="button" className="vn-admin-theme-toggle" onClick={() => setIsDarkMode((value) => !value)}>
                <AdminIcon type={isDarkMode ? 'sun' : 'moon'} />
              </button>
            </div>

            <form className="vn-admin-direct-login" onSubmit={handleCredentialLogin}>
              <label>
                <span>Admin Email</span>
                <div className="vn-admin-login-input">
                  <AdminIcon type="email" className="vn-admin-login-input-icon" />
                  <input type="email" autoComplete="username" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} placeholder="Enter admin email" required />
                </div>
              </label>
              <label>
                <span>Password</span>
                <div className="vn-admin-login-input">
                  <AdminIcon type="lock" className="vn-admin-login-input-icon" />
                  <input type="password" autoComplete="current-password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} placeholder="Enter admin password" required />
                </div>
              </label>
              {loginError ? <p className="vn-admin-login-error">{loginError}</p> : null}
              <button type="submit" className="vn-admin-button is-primary is-block" disabled={loginBusy || !adminEmail.trim() || !adminPassword}>
                {loginBusy ? 'Signing in...' : 'Login to Admin Dashboard'}
              </button>
            </form>

            <div className="vn-admin-login-alternative"><span>Alternative demo access</span></div>

            <div className="vn-admin-login-steps">
              <span className={loginStep === 'phone' ? 'is-active' : 'is-done'}>1. Mobile Number</span>
              <span className={loginStep === 'otp' ? 'is-active' : ''}>2. Verify OTP</span>
            </div>

            <div className="vn-admin-login-form">
              <label>
                <span>Admin Mobile Number</span>
                <div className="vn-admin-login-input">
                  <AdminIcon type="phone" className="vn-admin-login-input-icon" />
                  <span className="vn-admin-login-country">+91</span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength="10"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter mobile number"
                  />
                </div>
              </label>

              {loginStep === 'otp' ? (
                <label>
                  <span>OTP Verification</span>
                  <div className="vn-admin-login-input">
                    <AdminIcon type="otp" className="vn-admin-login-input-icon" />
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength="6"
                      value={otp}
                      onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))}
                      placeholder="Enter 6-digit OTP"
                    />
                  </div>
                </label>
              ) : null}

              <div className="vn-admin-login-note">
                <AdminIcon type="shield" className="vn-admin-login-note-icon" />
                <div>
                  <strong>Demo access note</strong>
                  <p>Use OTP <strong>123456</strong> for the current frontend admin login flow.</p>
                </div>
              </div>

              {loginStep === 'otp' && loginError ? <p className="vn-admin-login-error">{loginError}</p> : null}

              {loginStep === 'phone' ? (
                <button type="button" className="vn-admin-button is-primary is-block" onClick={handleSendOtp} disabled={loginBusy}>
                  {loginBusy ? 'Sending OTP...' : 'Send OTP'}
                </button>
              ) : (
                <button type="button" className="vn-admin-button is-primary is-block" onClick={handleVerifyOtp} disabled={loginBusy}>
                  {loginBusy ? 'Verifying...' : 'Login to Admin Dashboard'}
                </button>
              )}
            </div>

            <div className="vn-admin-divider">
              <span>or continue with</span>
            </div>

            <div className="vn-admin-social-login">
              <button type="button" className="vn-admin-social-button" onClick={() => handleSocialLogin('Google')}>
                <AdminIcon type="google" className="vn-admin-social-button-icon" />
                Login with Google
              </button>
              <button type="button" className="vn-admin-social-button" onClick={() => handleSocialLogin('Facebook')}>
                <AdminIcon type="facebook" className="vn-admin-social-button-icon" />
                Login with Facebook
              </button>
            </div>
          </section>
        </div>

        {toast ? (
          <div className={`vn-admin-toast is-${toast.tone}`}>
            <AdminIcon type={toast.tone === 'danger' ? 'warning' : 'check'} className="vn-admin-toast-icon" />
            <span>{toast.message}</span>
          </div>
        ) : null}
      </div>
    )
  }

  return (
    <div className={`vn-admin-root${isDarkMode ? ' is-dark' : ''}${sidebarCollapsed ? ' is-sidebar-collapsed' : ''}`}>
      <aside className={`vn-admin-sidebar${mobileMenuOpen ? ' is-open' : ''}`}>
        <div className="vn-admin-sidebar-brand">
          <img src="/vyaparnest-navbar-footer-logo.png" alt="VyaparNest" />
          <div className="vn-admin-sidebar-brand-copy">
            <strong>Admin Panel</strong>
            <span>Super Admin Workspace</span>
          </div>
          <button
            type="button"
            className="vn-admin-sidebar-toggle"
            onClick={() => setSidebarCollapsed((value) => !value)}
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-expanded={!sidebarCollapsed}
            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m12.5 5-5 5 5 5" />
            </svg>
          </button>
          <button type="button" className="vn-admin-sidebar-close" onClick={() => setMobileMenuOpen(false)}>
            <AdminIcon type="close" />
          </button>
        </div>

        <div className="vn-admin-sidebar-scroll">
          {adminNavigationGroups.map((group) => (
            <section key={group.label} className="vn-admin-sidebar-group">
              <span className="vn-admin-sidebar-group-label">{group.label}</span>
              <div className="vn-admin-sidebar-group-links">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={`vn-admin-sidebar-link${activeSection === item.id ? ' is-active' : ''}`}
                    title={sidebarCollapsed ? item.label : undefined}
                    onClick={() => {
                      if (item.id === 'logout') {
                        handleLogout()
                        return
                      }

                      openAdminSection(item.id)
                    }}
                  >
                    <AdminIcon type={item.icon} className="vn-admin-sidebar-link-icon" />
                    <span className="vn-admin-sidebar-link-label">{item.label}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="vn-admin-sidebar-footer">
          <div className="vn-admin-sidebar-admin" title={sidebarCollapsed ? `${adminProfileCard.name} · ${adminProfileCard.role}` : undefined}>
            <span>RS</span>
            <div className="vn-admin-sidebar-admin-copy">
              <strong>{adminProfileCard.name}</strong>
              <small>{adminProfileCard.role}</small>
            </div>
          </div>
          <a href="#top" className="vn-admin-website-link">
            Back to Website
          </a>
        </div>
      </aside>

      {mobileMenuOpen ? <button type="button" className="vn-admin-backdrop" onClick={() => setMobileMenuOpen(false)} /> : null}

      <div className="vn-admin-main">
        <header className="vn-admin-header">
          <div className="vn-admin-header-left">
            <button type="button" className="vn-admin-mobile-menu" onClick={() => setMobileMenuOpen(true)}>
              <AdminIcon type="menu" />
            </button>
            <div>
              <span className="vn-admin-header-kicker">VyaparNest Admin</span>
              <h1>{activeSection === 'dashboard' ? 'Super Admin Dashboard' : activeConfig?.title ?? 'Admin Panel'}</h1>
            </div>
          </div>

          <div className="vn-admin-header-right">
            <label className="vn-admin-header-search">
              <AdminIcon type="search" className="vn-admin-header-search-icon" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search current admin section..."
              />
            </label>
            <button type="button" className="vn-admin-theme-toggle" onClick={() => setIsDarkMode((value) => !value)}>
              <AdminIcon type={isDarkMode ? 'sun' : 'moon'} />
            </button>
          </div>
        </header>

        <main className="vn-admin-content">{renderSectionContent()}</main>
      </div>

      {toast ? (
        <div className={`vn-admin-toast is-${toast.tone}`}>
          <AdminIcon type={toast.tone === 'danger' ? 'warning' : 'check'} className="vn-admin-toast-icon" />
          <span>{toast.message}</span>
        </div>
      ) : null}

      {confirmState ? (
        <div className="vn-admin-modal-backdrop">
          <div className="vn-admin-modal">
            <h3>{confirmState.title}</h3>
            <p>{confirmState.description}</p>
            <div className="vn-admin-modal-actions">
              <button type="button" className="vn-admin-button is-secondary" onClick={() => setConfirmState(null)}>
                Cancel
              </button>
              <button
                type="button"
                className={`vn-admin-button is-primary${confirmState.tone === 'danger' ? ' is-danger' : ''}`}
                onClick={() => {
                  const nextAction = confirmState.onConfirm
                  setConfirmState(null)
                  nextAction?.()
                }}
              >
                {confirmState.confirmLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default AdminPage
