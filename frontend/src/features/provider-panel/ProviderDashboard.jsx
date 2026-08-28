import './providerDashboard.css'

const dashboardItems = [
  ['Overview', 'Dashboard snapshot'], ['My Services', 'Manage service listings'], ['Leads / Requests', 'New customer enquiries'], ['Projects', 'Active work'], ['Earnings', 'Payouts and invoices'], ['Messages', 'Customer conversations'], ['Reviews', 'Customer feedback'], ['Verification Status', 'Admin approval'], ['Settings', 'Business preferences'],
]

function ProviderDashboard() {
  return (
    <main className="provider-dashboard-page">
      <aside className="provider-dashboard-sidebar">
        <a href="#top" className="provider-dashboard-brand">Vyapar<span>Nest</span></a>
        <p className="provider-dashboard-label">Provider workspace</p>
        <nav aria-label="Provider dashboard navigation">
          {dashboardItems.map(([label, description], index) => (
            <a key={label} href={`#provider-${label.toLowerCase().replaceAll(' ', '-').replace('/', '')}`} className={index === 0 ? 'is-active' : ''} title={description}>{label}</a>
          ))}
        </nav>
      </aside>
      <section className="provider-dashboard-content">
        <header className="provider-dashboard-header">
          <div><span>Overview</span><h1>Welcome back, Partner</h1><p>Here is a quick view of your VyaparNest business account.</p></div>
          <a href="#top" className="provider-dashboard-home">Back to Home</a>
        </header>
        <section className="provider-dashboard-verification">
          <div className="provider-dashboard-status-icon">◷</div>
          <div><strong>Verification Pending</strong><p>Your profile will activate after admin approval. We will notify you once the review is complete.</p></div>
          <span>Under review</span>
        </section>
        <section className="provider-dashboard-stats">
          {[['0', 'New leads'], ['0', 'Active projects'], ['₹0', 'This month’s earnings'], ['—', 'Average rating']].map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}
        </section>
        <section className="provider-dashboard-grid">
          <article className="provider-dashboard-card"><h2>Recent Leads</h2><p>New customer requests will appear here once your profile is approved.</p><a href="#provider-leads-requests">View leads</a></article>
          <article className="provider-dashboard-card"><h2>My Services</h2><p>Keep your services, pricing, and availability up to date.</p><a href="#provider-my-services">Manage services</a></article>
          <article className="provider-dashboard-card"><h2>Profile completion</h2><p>All required onboarding details have been submitted for verification.</p><div className="provider-dashboard-progress"><span /></div></article>
        </section>
      </section>
    </main>
  )
}

export default ProviderDashboard
