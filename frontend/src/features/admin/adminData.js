export const adminLoginHash = '#admin-login'
export const adminDashboardHash = '#admin'
export const adminRoutePrefix = '#admin/'

export const adminNavigationGroups = [
  {
    label: 'Overview',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
      { id: 'users', label: 'Users', icon: 'users' },
      { id: 'providers', label: 'Service Providers', icon: 'briefcase' },
      { id: 'categories', label: 'Categories', icon: 'grid' },
      { id: 'services', label: 'Services', icon: 'layers' },
      { id: 'portfolio', label: 'Profile Management', icon: 'gallery' },
    ],
  },
  {
    label: 'Commerce',
    items: [
      { id: 'requests', label: 'Service Requests', icon: 'clipboard' },
      { id: 'projects', label: 'Orders / Projects', icon: 'kanban' },
      { id: 'payments', label: 'Payments', icon: 'wallet' },
      { id: 'withdrawals', label: 'Withdrawals', icon: 'bank' },
      { id: 'reviews', label: 'Reviews & Ratings', icon: 'star' },
      { id: 'coupons', label: 'Coupons & Offers', icon: 'ticket' },
    ],
  },
  {
    label: 'Content',
    items: [
      { id: 'banners', label: 'Banners', icon: 'image' },
      { id: 'homepage', label: 'Homepage Sections', icon: 'home' },
      { id: 'notifications', label: 'Notifications', icon: 'bell' },
      { id: 'analytics', label: 'Reports & Analytics', icon: 'chart' },
      { id: 'blog', label: 'Blog Management', icon: 'document' },
      { id: 'faqs', label: 'FAQs', icon: 'faq' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'support', label: 'Support Tickets', icon: 'support' },
      { id: 'ai', label: 'AI Assistant', icon: 'spark' },
      { id: 'settings', label: 'Website Settings', icon: 'settings' },
      { id: 'roles', label: 'Roles & Permissions', icon: 'shield' },
      { id: 'activity', label: 'Activity Logs', icon: 'history' },
      { id: 'security', label: 'Backup & Security', icon: 'lock' },
      { id: 'profile', label: 'Profile', icon: 'profile' },
      { id: 'logout', label: 'Logout', icon: 'logout' },
    ],
  },
]

export const adminOverviewStats = [
  { id: 'totalProviders', label: 'Total Providers', value: '1,248', delta: '+18.6% this month', tone: 'gold' },
  { id: 'pendingApprovals', label: 'Pending Approvals', value: '24', delta: '6 added today', tone: 'amber' },
  { id: 'totalClients', label: 'Total Clients', value: '5,734', delta: '+12.4% this month', tone: 'ink' },
  { id: 'totalBookings', label: 'Total Bookings', value: '8,945', delta: '+15.3% this month', tone: 'gold' },
  { id: 'revenue', label: 'Total Revenue', value: '₹12,45,890', delta: '+16.5% this month', tone: 'ink' },
]

export const adminRevenueSeries = [
  { month: 'Jan', revenue: 8.2, users: 280, providers: 64, orders: 840 },
  { month: 'Feb', revenue: 9.1, users: 340, providers: 72, orders: 910 },
  { month: 'Mar', revenue: 10.8, users: 380, providers: 80, orders: 1020 },
  { month: 'Apr', revenue: 12.6, users: 420, providers: 98, orders: 1180 },
  { month: 'May', revenue: 14.9, users: 480, providers: 116, orders: 1310 },
  { month: 'Jun', revenue: 16.4, users: 520, providers: 124, orders: 1450 },
  { month: 'Jul', revenue: 18.3, users: 610, providers: 142, orders: 1588 },
  { month: 'Aug', revenue: 17.2, users: 590, providers: 136, orders: 1492 },
  { month: 'Sep', revenue: 19.5, users: 640, providers: 148, orders: 1620 },
  { month: 'Oct', revenue: 21.1, users: 710, providers: 162, orders: 1775 },
  { month: 'Nov', revenue: 23.9, users: 782, providers: 174, orders: 1908 },
  { month: 'Dec', revenue: 26.4, users: 860, providers: 188, orders: 2086 },
]

export const adminActivityFeed = [
  { id: 1, title: 'Provider approved', meta: 'AuditBridge Partners approved by Super Admin', time: '2 min ago', tone: 'success' },
  { id: 2, title: 'Banner updated', meta: 'Festive homepage banner scheduled for July 26, 2026', time: '12 min ago', tone: 'info' },
  { id: 3, title: 'Payment flagged', meta: 'Razorpay settlement batch requires manual review', time: '27 min ago', tone: 'warning' },
  { id: 4, title: 'Coupon created', meta: 'SAVE250 launched for GST & Tax Services', time: '1 hour ago', tone: 'success' },
  { id: 5, title: 'Support escalation', meta: 'Ticket #SUP-188 moved to finance manager queue', time: '2 hours ago', tone: 'danger' },
]

export const latestRegisteredProviders = [
  { id: 'prov-1', name: 'AuditBridge Partners', category: 'Accounting', city: 'Noida', verified: true, joined: 'Today, 09:40 AM' },
  { id: 'prov-2', name: 'RankSprint Media', category: 'Digital Marketing', city: 'Delhi', verified: false, joined: 'Today, 08:20 AM' },
  { id: 'prov-3', name: 'SafeHands Home Support', category: 'Home Services', city: 'Hyderabad', verified: true, joined: 'Yesterday' },
  { id: 'prov-4', name: 'Smart Website Development', category: 'Website Development', city: 'Pune', verified: true, joined: 'Yesterday' },
]

export const recentCustomerRequests = [
  { id: 'REQ-9012', customer: 'Rohan Gupta', service: 'GST Filing', budget: '₹4,500', status: 'Pending', priority: 'High' },
  { id: 'REQ-9011', customer: 'Mansi Sharma', service: 'Business Website', budget: '₹18,000', status: 'Assigned', priority: 'Medium' },
  { id: 'REQ-9009', customer: 'Kavya Verma', service: 'SEO Audit', budget: '₹9,500', status: 'Open', priority: 'High' },
  { id: 'REQ-9007', customer: 'Aman Jha', service: 'Company Registration', budget: '₹6,000', status: 'Completed', priority: 'Low' },
]

export const adminQuickActions = [
  { id: 'approveProviders', label: 'Approve Providers', target: 'providers' },
  { id: 'addCategory', label: 'Add Category', target: 'categories' },
  { id: 'createCoupon', label: 'Create Coupon', target: 'coupons' },
  { id: 'scheduleBanner', label: 'Schedule Banner', target: 'banners' },
  { id: 'sendBroadcast', label: 'Send Broadcast', target: 'notifications' },
  { id: 'openAnalytics', label: 'View Analytics', target: 'analytics' },
]

export const providerRows = [
  { id: 'P-1001', name: 'AuditBridge Partners', category: 'Accounting', city: 'Noida', status: 'Pending', verified: 'KYC Review', earnings: '₹4.8L', rating: 4.8, requests: 112, portfolio: 6, documents: 4, joined: 'Jul 24, 2026' },
  { id: 'P-1002', name: 'Smart Website Development', category: 'Website Development', city: 'Pune', status: 'Active', verified: 'Verified', earnings: '₹9.4L', rating: 4.9, requests: 188, portfolio: 9, documents: 5, joined: 'Jul 22, 2026' },
  { id: 'P-1003', name: 'RankSprint Media', category: 'Digital Marketing', city: 'Delhi', status: 'Pending', verified: 'Docs Missing', earnings: '₹2.1L', rating: 4.7, requests: 84, portfolio: 5, documents: 3, joined: 'Jul 21, 2026' },
  { id: 'P-1004', name: 'TaxExpert India', category: 'GST & Tax Services', city: 'Purnia', status: 'Active', verified: 'Verified', earnings: '₹7.2L', rating: 4.9, requests: 164, portfolio: 7, documents: 5, joined: 'Jul 18, 2026' },
  { id: 'P-1005', name: 'HomeFix Experts', category: 'Home Services', city: 'Purnia', status: 'Suspended', verified: 'Verified', earnings: '₹3.7L', rating: 4.8, requests: 96, portfolio: 4, documents: 5, joined: 'Jul 14, 2026' },
  { id: 'P-1006', name: 'WebCraft Solutions', category: 'Website Development', city: 'Patna', status: 'Active', verified: 'Verified', earnings: '₹5.9L', rating: 4.8, requests: 126, portfolio: 8, documents: 5, joined: 'Jul 10, 2026' },
  { id: 'P-1007', name: 'CA LedgerLine Experts', category: 'CA Services', city: 'Chennai', status: 'Blocked', verified: 'Fraud Review', earnings: '₹1.1L', rating: 4.2, requests: 38, portfolio: 3, documents: 2, joined: 'Jul 08, 2026' },
  { id: 'P-1008', name: 'DigitalGrow Agency', category: 'Digital Marketing', city: 'Purnia', status: 'Active', verified: 'Verified', earnings: '₹6.6L', rating: 4.9, requests: 152, portfolio: 8, documents: 5, joined: 'Jul 05, 2026' },
  { id: 'P-1009', name: 'Smart App Development', category: 'App Development', city: 'Pune', status: 'Active', verified: 'Verified', earnings: '₹8.2L', rating: 4.9, requests: 133, portfolio: 7, documents: 5, joined: 'Jul 02, 2026' },
]

export const userRows = [
  { id: 'U-1201', name: 'Rahul Kumar', email: 'rahul@example.com', role: 'Customer', city: 'Purnia', status: 'Active', spend: '₹18,400', joined: 'Jul 24, 2026' },
  { id: 'U-1202', name: 'Priya Singh', email: 'priya@example.com', role: 'Customer', city: 'Patna', status: 'Active', spend: '₹24,900', joined: 'Jul 24, 2026' },
  { id: 'U-1203', name: 'Finance Manager', email: 'finance@vyaparnest.com', role: 'Finance Manager', city: 'Delhi', status: 'Active', spend: '-', joined: 'Jul 22, 2026' },
  { id: 'U-1204', name: 'Nitesh Verma', email: 'nitesh@example.com', role: 'Customer', city: 'Noida', status: 'Suspended', spend: '₹6,700', joined: 'Jul 21, 2026' },
  { id: 'U-1205', name: 'Shweta Das', email: 'shweta@example.com', role: 'Customer', city: 'Bangalore', status: 'Active', spend: '₹12,300', joined: 'Jul 20, 2026' },
  { id: 'U-1206', name: 'Karan Mehta', email: 'karan@example.com', role: 'Admin', city: 'Mumbai', status: 'Active', spend: '-', joined: 'Jul 19, 2026' },
]

export const categoryRows = [
  { id: 'C-01', name: 'Accounting', icon: 'tax.gif', image: 'accounting-services-hero-user.png', services: 128, status: 'Enabled', order: 1, subcategories: 8 },
  { id: 'C-02', name: 'App Development', icon: 'applications.gif', image: 'web-developer.gif', services: 156, status: 'Enabled', order: 2, subcategories: 9 },
  { id: 'C-03', name: 'Business Consultant', icon: 'user.gif', image: 'business-consulting-hero.png', services: 98, status: 'Enabled', order: 3, subcategories: 7 },
  { id: 'C-04', name: 'Business Loans', icon: 'analytics.gif', image: 'guide-growth-hover.png', services: 64, status: 'Enabled', order: 4, subcategories: 6 },
  { id: 'C-05', name: 'Website Development', icon: 'web.gif', image: 'guide-website-hover.png', services: 210, status: 'Enabled', order: 5, subcategories: 12 },
  { id: 'C-06', name: 'Digital Marketing', icon: 'analytics.gif', image: 'guide-marketing-hover.png', services: 342, status: 'Enabled', order: 6, subcategories: 10 },
  { id: 'C-07', name: 'Graphic Design', icon: 'graphic-designer.gif', image: 'guide-branding-hover.png', services: 186, status: 'Enabled', order: 7, subcategories: 11 },
  { id: 'C-08', name: 'Video Editing', icon: 'movie-camera.gif', image: 'movie-camera.gif', services: 112, status: 'Enabled', order: 8, subcategories: 8 },
  { id: 'C-09', name: 'GST & Tax Services', icon: 'tax.gif', image: 'accounting-services-hero-user.png', services: 89, status: 'Enabled', order: 9, subcategories: 8 },
  { id: 'C-10', name: 'CA Services', icon: 'contract.gif', image: 'accounting-services-hero-user.png', services: 78, status: 'Enabled', order: 10, subcategories: 7 },
  { id: 'C-11', name: 'Legal Consultant', icon: 'contract.gif', image: 'contract.gif', services: 75, status: 'Enabled', order: 11, subcategories: 7 },
  { id: 'C-12', name: 'Company Registration', icon: 'mission.gif', image: 'business-consulting-hero.png', services: 92, status: 'Enabled', order: 12, subcategories: 6 },
  { id: 'C-13', name: 'Social Media Marketing', icon: 'web-data.gif', image: 'automation-hero.png', services: 123, status: 'Enabled', order: 13, subcategories: 9 },
  { id: 'C-14', name: 'SEO Services', icon: 'category-seo.gif', image: 'category-seo.gif', services: 168, status: 'Enabled', order: 14, subcategories: 8 },
  { id: 'C-15', name: 'Content Writing', icon: 'category-comments.gif', image: 'category-comments.gif', services: 97, status: 'Enabled', order: 15, subcategories: 8 },
  { id: 'C-16', name: 'Photography', icon: 'category-photo.gif', image: 'category-photo.gif', services: 84, status: 'Enabled', order: 16, subcategories: 7 },
  { id: 'C-17', name: 'Interior Design', icon: 'vector.gif', image: 'guide-branding-hover.png', services: 73, status: 'Enabled', order: 17, subcategories: 7 },
  { id: 'C-18', name: 'Home Services', icon: 'cleaning-service.gif', image: 'cleaning-service.gif', services: 144, status: 'Enabled', order: 18, subcategories: 11 },
  { id: 'C-19', name: 'AI Automation', icon: 'mission.gif', image: 'automation-hero.png', services: 69, status: 'Enabled', order: 19, subcategories: 5 },
]

export const serviceRows = [
  { id: 'S-801', title: 'Business Website', category: 'Website Development', provider: 'Smart Website Development', price: '₹4,200', status: 'Active', featured: true, mode: 'Online' },
  { id: 'S-802', title: 'GST Filing', category: 'GST & Tax Services', provider: 'TaxExpert India', price: '₹3,100', status: 'Active', featured: true, mode: 'Online' },
  { id: 'S-803', title: 'SEO Audit', category: 'Digital Marketing', provider: 'RankSprint Media', price: '₹6,800', status: 'Draft', featured: false, mode: 'Online' },
  { id: 'S-804', title: 'Company Registration', category: 'Company Registration', provider: 'AuditBridge Partners', price: '₹5,500', status: 'Active', featured: false, mode: 'Hybrid' },
  { id: 'S-805', title: 'Home Deep Cleaning', category: 'Home Services', provider: 'HomeFix Experts', price: '₹2,600', status: 'Hidden', featured: false, mode: 'On-site' },
  { id: 'S-806', title: 'Graphic Logo Package', category: 'Graphic Design', provider: 'PixelCraft Studio', price: '₹2,200', status: 'Archived', featured: false, mode: 'Online' },
]

export const portfolioRows = [
  { id: 'PF-11', provider: 'AuditBridge Partners', title: 'Annual Audit Report', category: 'Accounting', status: 'Approved', featured: true, updated: 'Jul 24, 2026' },
  { id: 'PF-12', provider: 'TaxExpert India', title: 'GST Compliance Support', category: 'GST & Tax Services', status: 'Approved', featured: false, updated: 'Jul 23, 2026' },
  { id: 'PF-13', provider: 'WebCraft Solutions', title: 'Premium Service Website', category: 'Website Development', status: 'Pending', featured: true, updated: 'Jul 22, 2026' },
  { id: 'PF-14', provider: 'DigitalGrow Agency', title: 'Performance Campaign Dashboard', category: 'Digital Marketing', status: 'Approved', featured: true, updated: 'Jul 21, 2026' },
  { id: 'PF-15', provider: 'RankSprint Media', title: 'Lead Funnel Landing Experience', category: 'Digital Marketing', status: 'Rejected', featured: false, updated: 'Jul 20, 2026' },
]

export const requestRows = [
  { id: 'REQ-9012', customer: 'Rohan Gupta', provider: 'Unassigned', service: 'GST Filing', status: 'Pending', priority: 'High', budget: '₹4,500', attachment: 'Invoice.pdf' },
  { id: 'REQ-9011', customer: 'Mansi Sharma', provider: 'Smart Website Development', service: 'Business Website', status: 'Accepted', priority: 'Medium', budget: '₹18,000', attachment: 'Scope.docx' },
  { id: 'REQ-9009', customer: 'Kavya Verma', provider: 'RankSprint Media', service: 'SEO Audit', status: 'Assigned', priority: 'High', budget: '₹9,500', attachment: 'Brand-kit.zip' },
  { id: 'REQ-9007', customer: 'Aman Jha', provider: 'AuditBridge Partners', service: 'Company Registration', status: 'Completed', priority: 'Low', budget: '₹6,000', attachment: 'PAN.jpg' },
  { id: 'REQ-9004', customer: 'Nisha Roy', provider: 'HomeFix Experts', service: 'Home Deep Cleaning', status: 'Rejected', priority: 'Medium', budget: '₹2,000', attachment: 'Property.png' },
  { id: 'REQ-9001', customer: 'Sandeep Mishra', provider: 'TaxExpert India', service: 'Tax Planning', status: 'Cancelled', priority: 'Low', budget: '₹5,500', attachment: 'P&L.xlsx' },
]

export const projectRows = [
  { id: 'PR-2001', title: 'GST Registration Sprint', customer: 'Rohan Gupta', provider: 'TaxExpert India', status: 'Active', progress: 72, deadline: 'Jul 28, 2026', value: '₹12,000' },
  { id: 'PR-2002', title: 'Smart Website Build', customer: 'Mansi Sharma', provider: 'Smart Website Development', status: 'Active', progress: 58, deadline: 'Aug 03, 2026', value: '₹42,000' },
  { id: 'PR-2003', title: 'SEO Audit & Cleanup', customer: 'Kavya Verma', provider: 'RankSprint Media', status: 'Pending', progress: 20, deadline: 'Jul 30, 2026', value: '₹18,500' },
  { id: 'PR-2004', title: 'Company Registration', customer: 'Aman Jha', provider: 'AuditBridge Partners', status: 'Completed', progress: 100, deadline: 'Jul 18, 2026', value: '₹16,000' },
  { id: 'PR-2005', title: 'Home Service Retainer', customer: 'Nisha Roy', provider: 'HomeFix Experts', status: 'Cancelled', progress: 12, deadline: 'Jul 26, 2026', value: '₹8,500' },
]

export const paymentRows = [
  { id: 'PAY-1001', customer: 'Rohan Gupta', provider: 'TaxExpert India', amount: '₹12,000', commission: '₹1,800', method: 'Razorpay', status: 'Pending', date: 'Jul 24, 2026' },
  { id: 'PAY-1002', customer: 'Mansi Sharma', provider: 'Smart Website Development', amount: '₹42,000', commission: '₹6,300', method: 'Stripe', status: 'Settled', date: 'Jul 24, 2026' },
  { id: 'PAY-1003', customer: 'Kavya Verma', provider: 'RankSprint Media', amount: '₹18,500', commission: '₹2,775', method: 'PayPal', status: 'Refunded', date: 'Jul 23, 2026' },
  { id: 'PAY-1004', customer: 'Aman Jha', provider: 'AuditBridge Partners', amount: '₹16,000', commission: '₹2,400', method: 'Razorpay', status: 'Settled', date: 'Jul 22, 2026' },
  { id: 'PAY-1005', customer: 'Nisha Roy', provider: 'HomeFix Experts', amount: '₹8,500', commission: '₹1,275', method: 'Wallet', status: 'Pending', date: 'Jul 21, 2026' },
]

export const withdrawalRows = [
  { id: 'WD-201', provider: 'TaxExpert India', amount: '₹84,000', bank: 'HDFC Bank', status: 'Pending', requestedOn: 'Jul 24, 2026' },
  { id: 'WD-202', provider: 'Smart Website Development', amount: '₹1,12,000', bank: 'ICICI Bank', status: 'Approved', requestedOn: 'Jul 23, 2026' },
  { id: 'WD-203', provider: 'DigitalGrow Agency', amount: '₹68,000', bank: 'Axis Bank', status: 'Processing', requestedOn: 'Jul 23, 2026' },
  { id: 'WD-204', provider: 'HomeFix Experts', amount: '₹24,000', bank: 'SBI', status: 'Rejected', requestedOn: 'Jul 21, 2026' },
]

export const reviewRows = [
  { id: 'REV-1', customer: 'Rahul Sharma', provider: 'AuditBridge Partners', rating: 5, status: 'Approved', reply: 'Shared', reported: false, excerpt: 'Excellent service and timely delivery.' },
  { id: 'REV-2', customer: 'Priya Singh', provider: 'TaxExpert India', rating: 5, status: 'Approved', reply: 'Pending', reported: false, excerpt: 'Reliable GST support and clear communication.' },
  { id: 'REV-3', customer: 'Amit Verma', provider: 'Smart Website Development', rating: 4, status: 'Pending', reply: 'Pending', reported: false, excerpt: 'Design quality was good, response time can improve.' },
  { id: 'REV-4', customer: 'Nisha Roy', provider: 'HomeFix Experts', rating: 2, status: 'Reported', reply: 'Pending', reported: true, excerpt: 'Service did not match the promised time slot.' },
]

export const bannerRows = [
  { id: 'BN-1', type: 'Homepage Banner', title: 'Marketplace Hero', status: 'Active', schedule: 'Now Live', cta: 'Search Services' },
  { id: 'BN-2', type: 'Category Banner', title: 'Accounting Growth Push', status: 'Scheduled', schedule: 'Jul 26, 2026', cta: 'Explore Category' },
  { id: 'BN-3', type: 'Offer Banner', title: 'SAVE250 Campaign', status: 'Active', schedule: 'Now Live', cta: 'Apply Coupon' },
  { id: 'BN-4', type: 'Promotional Banner', title: 'Partner Onboarding Spotlight', status: 'Draft', schedule: 'Not Scheduled', cta: 'Become a Partner' },
]

export const homepageSectionRows = [
  { id: 'HS-1', section: 'Hero Banner', status: 'Editable', updated: 'Today' },
  { id: 'HS-2', section: 'Categories', status: 'Editable', updated: 'Today' },
  { id: 'HS-3', section: 'Popular Services', status: 'Editable', updated: 'Yesterday' },
  { id: 'HS-4', section: 'Featured Providers', status: 'Editable', updated: 'Yesterday' },
  { id: 'HS-5', section: 'Why Choose Us', status: 'Editable', updated: 'Jul 22, 2026' },
  { id: 'HS-6', section: 'Testimonials', status: 'Editable', updated: 'Jul 20, 2026' },
  { id: 'HS-7', section: 'Blogs', status: 'Editable', updated: 'Jul 19, 2026' },
  { id: 'HS-8', section: 'Footer', status: 'Editable', updated: 'Jul 18, 2026' },
]

export const couponRows = [
  { id: 'CP-1', code: 'SAVE250', type: 'Flat', value: '₹250', usage: '142 / 500', expiry: 'Aug 05, 2026', scope: 'GST & Tax Services', status: 'Active' },
  { id: 'CP-2', code: 'WEB10', type: 'Percentage', value: '10%', usage: '64 / 250', expiry: 'Aug 12, 2026', scope: 'Website Development', status: 'Active' },
  { id: 'CP-3', code: 'NEWWORK', type: 'Flat', value: '₹500', usage: '18 / 100', expiry: 'Jul 31, 2026', scope: 'Provider Specific', status: 'Draft' },
  { id: 'CP-4', code: 'MONSOON15', type: 'Percentage', value: '15%', usage: 'Expired', expiry: 'Jul 20, 2026', scope: 'All Users', status: 'Expired' },
]

export const blogRows = [
  { id: 'BL-1', title: 'How to Hire the Right Website Developer', author: 'Content Manager', status: 'Published', date: 'Jul 23, 2026' },
  { id: 'BL-2', title: 'Documents Required for GST Registration', author: 'Finance Editor', status: 'Published', date: 'Jul 21, 2026' },
  { id: 'BL-3', title: 'Digital Marketing Metrics That Matter', author: 'Growth Team', status: 'Draft', date: 'Jul 19, 2026' },
  { id: 'BL-4', title: 'How Providers Can Increase Response Rates', author: 'Marketplace Ops', status: 'Review', date: 'Jul 18, 2026' },
]

export const faqRows = [
  { id: 'FAQ-1', question: 'How does VyaparNest work?', category: 'Marketplace', status: 'Published' },
  { id: 'FAQ-2', question: 'How do providers receive payouts?', category: 'Payments', status: 'Published' },
  { id: 'FAQ-3', question: 'How to verify provider documents?', category: 'Providers', status: 'Draft' },
  { id: 'FAQ-4', question: 'How to use AI Assist for website discovery?', category: 'AI Assistant', status: 'Published' },
]

export const supportTicketRows = [
  { id: 'SUP-188', customer: 'Arvind Sahu', topic: 'Refund request', priority: 'High', status: 'Escalated', assignee: 'Finance Manager' },
  { id: 'SUP-182', customer: 'Richa Roy', topic: 'Provider no-show complaint', priority: 'High', status: 'Open', assignee: 'Customer Support' },
  { id: 'SUP-176', customer: 'Prakash Das', topic: 'Wallet balance mismatch', priority: 'Medium', status: 'In Progress', assignee: 'Finance Manager' },
  { id: 'SUP-169', customer: 'Ritu Jain', topic: 'OTP not received', priority: 'Low', status: 'Resolved', assignee: 'Customer Support' },
]

export const aiAssistantCards = [
  { id: 'ai-1', title: 'Provider Approvals Assistant', description: 'Summarize KYC mismatches and recommend approve/reject actions.' },
  { id: 'ai-2', title: 'Request Routing Assistant', description: 'Suggest best-fit providers based on response rate, location, and category.' },
  { id: 'ai-3', title: 'Content Optimizer', description: 'Generate homepage copy ideas, offer headlines, and FAQ summaries.' },
]

export const notificationTemplates = [
  { id: 'NT-1', title: 'Broadcast to all users', channel: 'Push + Email', audience: 'All Users', status: 'Ready' },
  { id: 'NT-2', title: 'Pending KYC reminder', channel: 'Email + WhatsApp', audience: 'Selected Providers', status: 'Ready' },
  { id: 'NT-3', title: 'Offer launch alert', channel: 'SMS + Push', audience: 'Category Specific', status: 'Draft' },
]

export const roleRows = [
  { id: 'R-1', name: 'Super Admin', users: 2, permissions: ['all'] },
  { id: 'R-2', name: 'Admin', users: 3, permissions: ['dashboard', 'users', 'providers', 'requests', 'payments'] },
  { id: 'R-3', name: 'Category Manager', users: 2, permissions: ['categories', 'services', 'banners', 'homepage'] },
  { id: 'R-4', name: 'Customer Support', users: 4, permissions: ['users', 'requests', 'reviews', 'support', 'notifications'] },
  { id: 'R-5', name: 'Content Manager', users: 2, permissions: ['blog', 'faqs', 'banners', 'homepage', 'notifications'] },
  { id: 'R-6', name: 'Finance Manager', users: 2, permissions: ['payments', 'withdrawals', 'analytics', 'activity'] },
]

export const permissionMatrix = [
  'Dashboard',
  'Users',
  'Providers',
  'Categories',
  'Services',
  'Portfolio',
  'Requests',
  'Projects',
  'Payments',
  'Withdrawals',
  'Reviews',
  'Banners',
  'Homepage',
  'Coupons',
  'Notifications',
  'Analytics',
  'Blog',
  'FAQs',
  'Support',
  'AI Assistant',
  'Settings',
  'Roles',
  'Activity Logs',
  'Security',
]

export const activityLogRows = [
  { id: 'LOG-1', actor: 'Super Admin', action: 'Approved provider AuditBridge Partners', module: 'Providers', time: 'Jul 24, 2026 · 09:42 AM' },
  { id: 'LOG-2', actor: 'Finance Manager', action: 'Processed Razorpay settlement batch #RZP-448', module: 'Payments', time: 'Jul 24, 2026 · 08:15 AM' },
  { id: 'LOG-3', actor: 'Content Manager', action: 'Updated homepage testimonials and FAQ copy', module: 'Homepage', time: 'Jul 23, 2026 · 06:02 PM' },
  { id: 'LOG-4', actor: 'Category Manager', action: 'Disabled AI Automation category for review', module: 'Categories', time: 'Jul 23, 2026 · 03:30 PM' },
]

export const securityBackups = [
  { id: 'BK-1', type: 'Nightly Full Backup', status: 'Healthy', date: 'Jul 24, 2026 · 02:00 AM' },
  { id: 'BK-2', type: 'Media Archive Snapshot', status: 'Healthy', date: 'Jul 23, 2026 · 11:45 PM' },
  { id: 'BK-3', type: 'Database Replica Backup', status: 'Needs Review', date: 'Jul 23, 2026 · 02:00 AM' },
]

export const settingsCards = [
  { id: 'brand', title: 'Brand & Identity', description: 'Logo, favicon, theme colors, footer mark, and public branding controls.' },
  { id: 'seo', title: 'SEO & Tracking', description: 'Meta defaults, sitemap signals, Google Analytics, and conversion pixels.' },
  { id: 'payments', title: 'Payment Gateways', description: 'Razorpay, Stripe, PayPal, wallet rules, commission slabs, and invoice settings.' },
  { id: 'communication', title: 'Communication', description: 'SMTP, SMS, WhatsApp, push providers, sender IDs, and templates.' },
]

export const adminProfileCard = {
  name: 'Raj Singh',
  role: 'Super Admin',
  email: 'admin@vyaparnest.com',
  phone: '+91 99346 22433',
  location: 'Purnia, Bihar',
  lastLogin: 'Friday, July 24, 2026 · 10:12 AM',
}
