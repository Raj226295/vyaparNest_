function AryassBrandMark({ tagline = null, tone = 'dark', className = '' }) {
  const classes = ['aryass-brand']

  if (tone === 'light') {
    classes.push('is-light')
  }

  if (className) {
    classes.push(className)
  }

  return (
    <span className={classes.join(' ')}>
      <span className="aryass-brand__symbol">
        <img
          src="/vyaparnest-brand-cropped.png"
          alt="VyaparNest"
          className="aryass-brand__image"
        />
      </span>

      {tagline ? (
        <span className="aryass-brand__copy">
          <small className="aryass-brand__tag">{tagline}</small>
        </span>
      ) : null}
    </span>
  )
}

export default AryassBrandMark
