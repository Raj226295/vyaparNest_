import { useEffect, useMemo, useState } from 'react'
import UserPanelLayout from './components/UserPanelLayout.jsx'
import './userPanel.css'

const marketplaceServicesStorageKey = 'vyaparnest-marketplace-services-v1'

const readServices = () => {
  if (typeof window === 'undefined') return []
  try {
    const services = JSON.parse(window.localStorage.getItem(marketplaceServicesStorageKey) || '[]')
    return Array.isArray(services) ? services : []
  } catch {
    return []
  }
}

function UserPanelPage() {
  const [services, setServices] = useState(readServices)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    const syncServices = (event) => {
      if (!event || event.key === marketplaceServicesStorageKey) setServices(readServices())
    }
    window.addEventListener('storage', syncServices)
    window.addEventListener('focus', syncServices)
    return () => {
      window.removeEventListener('storage', syncServices)
      window.removeEventListener('focus', syncServices)
    }
  }, [])

  const activeServices = useMemo(() => services.filter((service) => service.status === 'Active'), [services])
  const categories = useMemo(() => [...new Set(activeServices.map((service) => service.category))], [activeServices])
  const filteredServices = activeServices.filter((service) =>
    (category === 'All' || service.category === category) &&
    [service.title, service.provider, service.category].join(' ').toLowerCase().includes(query.toLowerCase())
  )

  return (
    <section className="user-panel-page">
      <header className="user-panel-hero">
        <div><span className="user-panel-kicker">VyaparNest Marketplace</span><h1>Discover professional services</h1><p>Admin-approved services, trusted providers and clear pricing—all in one place.</p></div>
        <div className="user-panel-hero-stat"><strong>{activeServices.length}</strong><span>Active services</span></div>
      </header>
      <UserPanelLayout />
      <section className="user-marketplace">
        <header><div><h2>Services for you</h2><p>New services added by the admin appear here automatically.</p></div><div className="user-marketplace-tools"><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Search services or providers..."/><select value={category} onChange={(event)=>setCategory(event.target.value)}><option value="All">All categories</option>{categories.map((item)=><option key={item}>{item}</option>)}</select></div></header>
        {filteredServices.length?<div className="user-service-grid">{filteredServices.map((service)=><article key={service.id}><div className="user-service-cover"><img src={service.image} alt={service.title}/><span>{service.category}</span></div><div className="user-service-content"><h3>{service.title}</h3><p>{service.description||`Professional ${service.title.toLowerCase()} tailored to your goals.`}</p><div className="user-service-provider"><i>{service.initials}</i><span><small>Provided by</small><strong>{service.provider}</strong></span></div>{service.features?.length?<ul>{service.features.slice(0,3).map((feature)=><li key={feature}>✓ {feature}</li>)}</ul>:null}<div className="user-service-meta"><span><small>Starting range</small><strong>{service.price}</strong></span><span><small>Delivery</small><strong>{service.delivery||'Contact provider'}</strong></span></div><button type="button" onClick={()=>window.alert(`Request sent for ${service.title}`)}>View & Request Service</button></div></article>)}</div>:<div className="user-service-empty"><strong>No active services found</strong><p>Try another category or add an Active service from the admin panel.</p></div>}
      </section>
    </section>
  )
}

export default UserPanelPage
