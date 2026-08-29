import { useEffect, useMemo, useState } from 'react'
import {
  adminActivityFeed,
  adminDashboardHash,
  adminLoginHash,
  adminNavigationGroups,
  adminOverviewStats,
  adminProfileCard,
  adminQuickActions,
  adminRevenueSeries,
  adminRoutePrefix,
  aiAssistantCards,
  bannerRows,
  blogRows,
  categoryRows,
  couponRows,
  faqRows,
  homepageSectionRows,
  latestRegisteredProviders,
  notificationTemplates,
  paymentRows,
  permissionMatrix,
  portfolioRows,
  projectRows,
  providerRows,
  recentCustomerRequests,
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

  const dashboardSummary = useMemo(
    () => ({
      activeProviders: providerRows.filter((row) => /active/i.test(row.status)).length,
      pendingProviders: providerRows.filter((row) => /pending/i.test(row.status)).length,
      activeCoupons: couponRows.filter((row) => /active/i.test(row.status)).length,
      openTickets: supportTicketRows.filter((row) => /open|escalated|in progress/i.test(row.status)).length,
    }),
    []
  )

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

  const maxRevenue = Math.max(...adminRevenueSeries.map((item) => item.revenue))
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

  const handleQuickAction = (targetSection, label) => {
    openAdminSection(targetSection)
    pushToast(`${label} opened.`)
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
      <section className="vn-admin-overview-grid">
        {adminOverviewStats.map((stat) => (
          <article key={stat.id} className={`vn-admin-overview-card is-${stat.tone}`}>
            <span className="vn-admin-overview-kicker">{stat.label}</span>
            <strong>{cleanText(stat.value)}</strong>
            <p>{cleanText(stat.delta)}</p>
          </article>
        ))}
      </section>

      <section className="vn-admin-analytics-layout">
        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Monthly Revenue</h2>
              <p>Track platform revenue, user growth, provider growth, and demand momentum together.</p>
            </div>
          </div>
          <div className="vn-admin-chart">
            {adminRevenueSeries.map((entry) => (
              <div key={entry.month} className="vn-admin-chart-bar-group">
                <div className="vn-admin-chart-bar-track">
                  <span
                    className="vn-admin-chart-bar"
                    style={{ height: `${Math.max(10, (entry.revenue / maxRevenue) * 100)}%` }}
                  ></span>
                </div>
                <strong>{entry.month}</strong>
                <small>{entry.revenue.toFixed(1)}L</small>
              </div>
            ))}
          </div>
          <div className="vn-admin-chart-legend">
            <span>
              <strong>{dashboardSummary.activeProviders}</strong>
              Active providers
            </span>
            <span>
              <strong>{dashboardSummary.openTickets}</strong>
              Open tickets
            </span>
            <span>
              <strong>{dashboardSummary.activeCoupons}</strong>
              Active offers
            </span>
          </div>
        </article>

        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Recent Activities</h2>
              <p>Latest moderation, payment, banner, coupon, and support activity across the marketplace.</p>
            </div>
          </div>
          <div className="vn-admin-activity-feed">
            {adminActivityFeed.map((feedItem) => (
              <article key={feedItem.id} className={`vn-admin-activity-item is-${feedItem.tone}`}>
                <span className="vn-admin-activity-dot"></span>
                <div>
                  <strong>{feedItem.title}</strong>
                  <p>{feedItem.meta}</p>
                </div>
                <small>{feedItem.time}</small>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="vn-admin-two-column-grid">
        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Latest Registered Providers</h2>
              <p>Fast review queue for new provider onboarding.</p>
            </div>
            <button type="button" className="vn-admin-button is-secondary" onClick={() => openAdminSection('providers')}>
              Open Providers
            </button>
          </div>
          <div className="vn-admin-list-stack">
            {latestRegisteredProviders.map((provider) => (
              <article key={provider.id} className="vn-admin-list-card">
                <div>
                  <strong>{provider.name}</strong>
                  <p>
                    {provider.category} · {provider.city}
                  </p>
                </div>
                <div className="vn-admin-list-card-meta">
                  <StatusBadge value={provider.verified ? 'Verified' : 'Pending'} />
                  <small>{provider.joined}</small>
                </div>
              </article>
            ))}
          </div>
        </article>

        <article className="vn-admin-panel">
          <div className="vn-admin-panel-head">
            <div>
              <h2>Recent Customer Requests</h2>
              <p>High-priority demand coming into the marketplace right now.</p>
            </div>
            <button type="button" className="vn-admin-button is-secondary" onClick={() => openAdminSection('requests')}>
              Open Requests
            </button>
          </div>
          <div className="vn-admin-list-stack">
            {recentCustomerRequests.map((request) => (
              <article key={request.id} className="vn-admin-list-card">
                <div>
                  <strong>{request.service}</strong>
                  <p>
                    {request.customer} · {cleanText(request.budget)}
                  </p>
                </div>
                <div className="vn-admin-list-card-meta">
                  <StatusBadge value={request.status} />
                  <small>{request.priority} priority</small>
                </div>
              </article>
            ))}
          </div>
        </article>
      </section>

      <section className="vn-admin-panel">
        <div className="vn-admin-panel-head">
          <div>
            <h2>Quick Actions</h2>
            <p>Jump directly into the most frequent super admin workflows.</p>
          </div>
        </div>
        <div className="vn-admin-quick-actions">
          {adminQuickActions.map((action) => (
            <button
              key={action.id}
              type="button"
              className="vn-admin-quick-action"
              onClick={() => handleQuickAction(action.target, action.label)}
            >
              <AdminIcon type="spark" className="vn-admin-quick-action-icon" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  )

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
    <div className={`vn-admin-root${isDarkMode ? ' is-dark' : ''}`}>
      <aside className={`vn-admin-sidebar${mobileMenuOpen ? ' is-open' : ''}`}>
        <div className="vn-admin-sidebar-brand">
          <img src="/vyaparnest-navbar-footer-logo.png" alt="VyaparNest" />
          <div>
            <strong>Admin Panel</strong>
            <span>Super Admin Workspace</span>
          </div>
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
                    onClick={() => {
                      if (item.id === 'logout') {
                        handleLogout()
                        return
                      }

                      openAdminSection(item.id)
                    }}
                  >
                    <AdminIcon type={item.icon} className="vn-admin-sidebar-link-icon" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="vn-admin-sidebar-footer">
          <div className="vn-admin-sidebar-admin">
            <span>RS</span>
            <div>
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
