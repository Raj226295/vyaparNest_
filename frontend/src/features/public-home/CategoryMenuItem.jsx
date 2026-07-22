function ChevronRightIcon({ className = '' }) {
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
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}

function CategoryMenuItem({
  category,
  href,
  icon,
  onSelect,
  compact = false,
}) {
  return (
    <a
      className={`categories-menu-item${compact ? ' compact' : ''}`}
      href={href}
      onClick={onSelect}
    >
      <span className="categories-menu-item-icon-shell" aria-hidden="true">
        <span className="categories-menu-item-icon-core">{icon}</span>
      </span>

      <span className="categories-menu-item-copy">
        <span className="categories-menu-item-title">{category.title}</span>
        <span className="categories-menu-item-meta">{category.experts}</span>
      </span>

      <ChevronRightIcon className="categories-menu-item-arrow" />
    </a>
  )
}

export default CategoryMenuItem
