function SearchIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="10.5" cy="10.5" r="6.75" />
      <path d="M15.5 15.5 20 20" />
    </svg>
  )
}

function LocationIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s6-4.8 6-10.4A6 6 0 0 0 6 10.6C6 16.2 12 21 12 21Z" />
      <circle cx="12" cy="10.6" r="2.1" />
    </svg>
  )
}

function ChevronIcon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7 10 5 5 5-5" />
    </svg>
  )
}

function NavbarSearchBar() {
  return (
    <form
      className="nav-market-search"
      onSubmit={(event) => event.preventDefault()}
      role="search"
      aria-label="Marketplace search"
    >
      <label className="nav-market-location" aria-label="Choose location">
        <span className="nav-market-location-icon">
          <LocationIcon className="nav-market-location-svg" />
        </span>
        <select defaultValue="Purnia, Bihar">
          <option>Purnia, Bihar</option>
          <option>Mumbai, India</option>
          <option>Delhi, India</option>
          <option>Bengaluru, India</option>
        </select>
        <span className="nav-market-location-caret">
          <ChevronIcon className="nav-market-caret-svg" />
        </span>
      </label>

      <label className="nav-market-search-field">
        <span className="nav-market-search-icon">
          <SearchIcon className="nav-market-search-svg" />
        </span>
        <input
          type="search"
          placeholder="Search services..."
          aria-label="Search services"
        />
        <button type="submit" aria-label="Search">
          <SearchIcon className="nav-market-search-button-svg" />
        </button>
      </label>
    </form>
  )
}

export default NavbarSearchBar
