import CategoryMenuItem from './CategoryMenuItem.jsx'

function ArrowRightIcon({ className = '' }) {
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
      <path d="M5 12h14" />
      <path d="m13 7 5 5-5 5" />
    </svg>
  )
}

function CategoriesMegaMenu({
  categories,
  isOpen,
  menuRef,
  arrowLeft,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onCategorySelect,
  renderCategoryIcon,
  getCategoryHref,
}) {
  const arrowStyle =
    typeof arrowLeft === 'number'
      ? { '--categories-menu-arrow-left': `${arrowLeft}px` }
      : undefined

  return (
    <div
      ref={menuRef}
      id="categories-mega-menu"
      className={`categories-mega-menu${isOpen ? ' is-open' : ''}`}
      role="region"
      aria-labelledby="categories-nav-trigger"
      aria-hidden={!isOpen}
      style={arrowStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
    >
      <span className="categories-mega-menu-arrow" aria-hidden="true"></span>

      <div className="categories-mega-menu-panel">
        <div className="categories-mega-menu-head">
          <div className="categories-mega-menu-heading">
            <span className="categories-mega-menu-kicker">Service Directory</span>
            <h3>Explore Categories</h3>
            <p>Browse trusted professional services across business, digital, home, and education needs.</p>
          </div>

          <a
            className="categories-mega-menu-all-link"
            href="#categories"
            onClick={onCategorySelect}
          >
            <span>View all categories</span>
            <ArrowRightIcon className="categories-mega-menu-all-icon" />
          </a>
        </div>

        <div className="categories-mega-menu-grid">
          {categories.map((category) => (
            <CategoryMenuItem
              key={category.title}
              category={category}
              href={getCategoryHref(category)}
              icon={renderCategoryIcon(category)}
              onSelect={onCategorySelect}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoriesMegaMenu
