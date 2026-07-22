import { useEffect, useRef, useState } from 'react'
import AryassBrandMark from './AryassBrandMark.jsx'
import './PartnerRegistrationPage.css'

const stepDefinitions = [
  {
    key: 'basic',
    title: 'Basic Information',
    subtitle: "Let's start with your basic details.",
    description: 'Add your personal details',
    icon: 'user',
  },
  {
    key: 'business',
    title: 'Business Information',
    subtitle: 'Tell us about your business.',
    description: 'Company and owner details',
    icon: 'briefcase',
  },
  {
    key: 'services',
    title: 'Service Details',
    subtitle: 'Tell customers what you offer.',
    description: 'Categories, experience, website',
    icon: 'services',
  },
  {
    key: 'area',
    title: 'Service Area',
    subtitle: 'Choose where you provide your services.',
    description: 'Coverage area and locations',
    icon: 'globe',
  },
  {
    key: 'documents',
    title: 'Documents Verification',
    subtitle: 'Upload documents for verification.',
    description: 'Verify your business profile',
    icon: 'shield',
  },
  {
    key: 'payment',
    title: 'Complete Your Registration',
    subtitle: 'Choose a subscription plan to activate your partner account.',
    description: 'Secure activation and billing',
    icon: 'payment',
  },
]

const serviceCategories = [
  'Website Development',
  'Graphic Design',
  'Digital Marketing',
  'GST & Accounting',
  'Home Services',
  'Education & Tutors',
  'Event Services',
  'Business Consulting',
  'Mobile App Development',
  'SEO & Growth',
]

const subCategoryMap = {
  'Website Development': ['Corporate Website', 'Landing Page', 'E-Commerce Store', 'Portfolio Website'],
  'Graphic Design': ['Brand Identity', 'Social Media Design', 'Packaging Design', 'Presentation Design'],
  'Digital Marketing': ['Performance Marketing', 'Social Media Marketing', 'Content Marketing', 'Lead Generation'],
  'GST & Accounting': ['GST Filing', 'Tax Planning', 'Bookkeeping', 'Compliance Support'],
  'Home Services': ['Electrician', 'Plumbing', 'Interior Services', 'Cleaning Services'],
  'Education & Tutors': ['Academic Tutors', 'Competitive Exam Prep', 'Language Training', 'Skill Coaching'],
  'Event Services': ['Wedding Planning', 'Photography', 'Catering', 'Event Production'],
  'Business Consulting': ['Startup Consulting', 'Operations Strategy', 'Sales Consulting', 'HR Advisory'],
  'Mobile App Development': ['Android Apps', 'iOS Apps', 'Flutter Apps', 'MVP Development'],
  'SEO & Growth': ['Technical SEO', 'Local SEO', 'Growth Strategy', 'Analytics Setup'],
}

const experienceOptions = ['0-1 Years', '2-4 Years', '5-7 Years', '8-10 Years', '10+ Years']
const serviceRadiusOptions = ['5 km', '10 km', '25 km', '50 km', '100 km', 'Across State', 'Nationwide']

const documentFields = [
  { key: 'aadhaarCard', label: 'Aadhaar Card', required: true },
  { key: 'panCard', label: 'PAN Card', required: false },
  { key: 'gstCertificate', label: 'GST Certificate', required: false },
  { key: 'businessRegistration', label: 'Business Registration', required: false },
  { key: 'profilePhoto', label: 'Profile Photo', required: false },
]

const planOptions = [
  {
    key: 'starter',
    name: 'Starter',
    price: 1499,
    summary: 'Best for new solo professionals.',
    features: ['Verified partner badge', 'Basic profile listing', '5 premium leads / month'],
  },
  {
    key: 'professional',
    name: 'Professional',
    price: 2999,
    summary: 'Built for growing service businesses.',
    recommended: true,
    features: ['Priority placement', 'Unlimited lead alerts', 'Team profile support'],
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: 5499,
    summary: 'For multi-city partner teams.',
    features: ['Dedicated manager', 'Multi-branch onboarding', 'Advanced analytics dashboard'],
  },
]

const paymentMethods = [
  { key: 'upi', label: 'UPI', icon: 'upi' },
  { key: 'creditCard', label: 'Credit Card', icon: 'card' },
  { key: 'debitCard', label: 'Debit Card', icon: 'card' },
  { key: 'netBanking', label: 'Net Banking', icon: 'bank' },
  { key: 'wallet', label: 'Wallet', icon: 'wallet' },
]

const initialFormState = {
  fullName: '',
  countryCode: '+91',
  mobileNumber: '',
  businessName: '',
  ownerName: '',
  emailAddress: '',
  gstNumber: '',
  panNumber: '',
  serviceCategory: '',
  subCategory: '',
  experience: '',
  description: '',
  website: '',
  country: 'India',
  state: '',
  city: '',
  pincode: '',
  serviceRadius: '',
  couponCode: '',
}

const initialDocumentState = documentFields.reduce((uploads, field) => {
  uploads[field.key] = { fileName: '', progress: 0 }
  return uploads
}, {})

const pincodeApiBaseUrl = 'https://api.postalpincode.in/pincode/'
const initialPincodeLookupState = {
  status: 'idle',
  message: 'Enter a 6-digit Indian pincode to auto-fill your state and city.',
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)
}

function extractPincodeLocation(payload) {
  const responseEntry = Array.isArray(payload) ? payload[0] : null
  const postOffices = Array.isArray(responseEntry?.PostOffice) ? responseEntry.PostOffice : []

  if (responseEntry?.Status !== 'Success' || !postOffices.length) {
    throw new Error(responseEntry?.Message || 'No location found for this pincode.')
  }

  const primaryOffice =
    postOffices.find((office) => office?.Block && office.Block.trim().toLowerCase() !== 'na') ??
    postOffices.find((office) => office?.District) ??
    postOffices[0]

  const city =
    primaryOffice?.Block?.trim() && primaryOffice.Block.trim().toLowerCase() !== 'na'
      ? primaryOffice.Block.trim()
      : primaryOffice?.District?.trim() || ''
  const state = primaryOffice?.State?.trim() || ''
  const country = primaryOffice?.Country?.trim() || 'India'

  if (!city || !state) {
    throw new Error('We could not extract the city and state for this pincode.')
  }

  return { city, state, country }
}

function Icon({ name, className = '' }) {
  const sharedProps = {
    viewBox: '0 0 24 24',
    className,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.9',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  switch (name) {
    case 'arrow-left':
      return (
        <svg {...sharedProps}>
          <path d="M19 12H5" />
          <path d="m11 6-6 6 6 6" />
        </svg>
      )
    case 'arrow-right':
      return (
        <svg {...sharedProps}>
          <path d="M5 12h14" />
          <path d="m13 7 5 5-5 5" />
        </svg>
      )
    case 'save':
      return (
        <svg {...sharedProps}>
          <path d="M5.2 20h13.6a1.7 1.7 0 0 0 1.7-1.7V8.5L15.9 4H5.2a1.7 1.7 0 0 0-1.7 1.7v12.6A1.7 1.7 0 0 0 5.2 20Z" />
          <path d="M8 4v5.2h7.5V4" />
          <path d="M8 20v-6.1h8V20" />
        </svg>
      )
    case 'check':
      return (
        <svg {...sharedProps}>
          <path d="m5 12 4.2 4.2L19 6.6" />
        </svg>
      )
    case 'shield':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.9 6.3 6.3v4.1c0 4.1 2.4 7.6 5.7 9 3.3-1.4 5.7-4.9 5.7-9V6.3L12 3.9Z" />
          <path d="m9.7 11.9 1.7 1.7 3.4-3.7" />
        </svg>
      )
    case 'help':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.4" />
          <path d="M9.7 9.6a2.5 2.5 0 0 1 4.8.9c0 1.6-1.7 2.2-2.5 3.1-.4.4-.5.7-.5 1.3" />
          <path d="M12 17.4h.01" />
        </svg>
      )
    case 'info':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.2" />
          <path d="M12 10.4v4.5" />
          <path d="M12 7.6h.01" />
        </svg>
      )
    case 'user':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="8.2" r="3.2" />
          <path d="M5.1 19v-1a4.4 4.4 0 0 1 4.4-4.4h5a4.4 4.4 0 0 1 4.4 4.4v1" />
        </svg>
      )
    case 'phone':
      return (
        <svg {...sharedProps}>
          <path d="M6.8 4.9h3.3l1.1 3.8-1.9 1.9a13.3 13.3 0 0 0 4.1 4.1l1.9-1.9 3.8 1.1v3.3a1.9 1.9 0 0 1-2.1 1.9A16.1 16.1 0 0 1 4.9 7a1.9 1.9 0 0 1 1.9-2.1Z" />
        </svg>
      )
    case 'mail':
      return (
        <svg {...sharedProps}>
          <rect x="3.8" y="6.3" width="16.4" height="11.4" rx="2.2" />
          <path d="m5.8 8.4 6.2 4.8 6.2-4.8" />
        </svg>
      )
    case 'briefcase':
      return (
        <svg {...sharedProps}>
          <rect x="4" y="7.2" width="16" height="11.6" rx="2.4" />
          <path d="M8.4 7.2V6a2 2 0 0 1 2-2h3.2a2 2 0 0 1 2 2v1.2" />
          <path d="M4 11.8h16" />
        </svg>
      )
    case 'category':
      return (
        <svg {...sharedProps}>
          <rect x="4.2" y="4.2" width="6.4" height="6.4" rx="1.4" />
          <rect x="13.4" y="4.2" width="6.4" height="6.4" rx="1.4" />
          <rect x="4.2" y="13.4" width="6.4" height="6.4" rx="1.4" />
          <rect x="13.4" y="13.4" width="6.4" height="6.4" rx="1.4" />
        </svg>
      )
    case 'services':
      return (
        <svg {...sharedProps}>
          <path d="M4.2 8.5h15.6" />
          <path d="M8.1 4.5v15" />
          <path d="M15.9 4.5v15" />
          <rect x="4.2" y="4.5" width="15.6" height="15" rx="2.2" />
        </svg>
      )
    case 'experience':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.1" />
          <path d="M12 7.8v4.5l3 1.8" />
        </svg>
      )
    case 'note':
      return (
        <svg {...sharedProps}>
          <path d="M7 4.8h7.6l3.4 3.4v11.1a1.7 1.7 0 0 1-1.7 1.7H7a1.7 1.7 0 0 1-1.7-1.7V6.5A1.7 1.7 0 0 1 7 4.8Z" />
          <path d="M14.6 4.8v3.4H18" />
          <path d="M8.4 12.1h7.2" />
          <path d="M8.4 15.6h5.3" />
        </svg>
      )
    case 'globe':
      return (
        <svg {...sharedProps}>
          <circle cx="12" cy="12" r="8.2" />
          <path d="M4.2 12h15.6" />
          <path d="M12 3.8a12.3 12.3 0 0 1 0 16.4 12.3 12.3 0 0 1 0-16.4Z" />
        </svg>
      )
    case 'location':
      return (
        <svg {...sharedProps}>
          <path d="M12 20.2s6-4.9 6-10.4a6 6 0 1 0-12 0c0 5.5 6 10.4 6 10.4Z" />
          <circle cx="12" cy="9.7" r="2.1" />
        </svg>
      )
    case 'upload':
      return (
        <svg {...sharedProps}>
          <path d="M12 15.5V7.8" />
          <path d="m8.9 10.9 3.1-3.1 3.1 3.1" />
          <path d="M4.8 16.7v1.5A1.8 1.8 0 0 0 6.6 20h10.8a1.8 1.8 0 0 0 1.8-1.8v-1.5" />
        </svg>
      )
    case 'payment':
      return (
        <svg {...sharedProps}>
          <rect x="3.9" y="6.2" width="16.2" height="11.6" rx="2.4" />
          <path d="M3.9 10.3h16.2" />
          <path d="M8.2 14.3h3.4" />
        </svg>
      )
    case 'wallet':
      return (
        <svg {...sharedProps}>
          <path d="M5.1 7.4h12.4a1.8 1.8 0 0 1 1.8 1.8v8.1a1.8 1.8 0 0 1-1.8 1.8H6.5a1.8 1.8 0 0 1-1.8-1.8V8.6a1.2 1.2 0 0 1 1.2-1.2h11.6" />
          <path d="M15.2 13.2h4.1" />
          <circle cx="15.3" cy="13.2" r=".1" />
        </svg>
      )
    case 'bank':
      return (
        <svg {...sharedProps}>
          <path d="m4.4 9.1 7.6-4.1 7.6 4.1" />
          <path d="M5.9 10.1h12.2" />
          <path d="M7.4 10.1v6.3" />
          <path d="M12 10.1v6.3" />
          <path d="M16.6 10.1v6.3" />
          <path d="M4.9 18.1h14.2" />
        </svg>
      )
    case 'upi':
      return (
        <svg {...sharedProps}>
          <path d="m5.4 14.8 3.2-5.7 2.3 3.8 2.8-5.2 4.1 7.1" />
          <path d="M18 10.9h1.7v1.8" />
        </svg>
      )
    case 'spark':
      return (
        <svg {...sharedProps}>
          <path d="M12 3.8 13.2 7l3.2 1.2-3.2 1.2L12 12.6l-1.2-3.2L7.6 8.2 10.8 7 12 3.8Z" />
          <path d="m18.5 13.8.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7.7-1.9Z" />
          <path d="m5.2 14.5.6 1.4 1.4.6-1.4.5-.6 1.5-.5-1.5-1.5-.5 1.5-.6.5-1.4Z" />
        </svg>
      )
    default:
      return null
  }
}

function CaretIcon({ className = '' }) {
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

function IndiaFlagIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 16" aria-hidden="true" className={className}>
      <rect width="24" height="16" rx="2" fill="#ffffff" />
      <rect width="24" height="5.34" rx="2" fill="#ff9933" />
      <rect y="10.66" width="24" height="5.34" rx="2" fill="#138808" />
      <circle cx="12" cy="8" r="2.15" fill="none" stroke="#1a3c8e" strokeWidth="0.9" />
      <circle cx="12" cy="8" r="0.55" fill="#1a3c8e" />
    </svg>
  )
}

function FieldBlock({
  label,
  required = false,
  optional = false,
  hint = '',
  hintTone = 'default',
  error = '',
  children,
}) {
  return (
    <div className="partner-wizard-field-block">
      <div className="partner-wizard-field-head">
        <span className="partner-wizard-field-label">
          <span>
            {label}
            {required ? <em>*</em> : null}
          </span>
          {optional ? (
            <span className="partner-wizard-field-label-meta">
              <span className="partner-wizard-field-optional">(Optional)</span>
              <span className="partner-wizard-field-info" aria-hidden="true">
                <Icon name="info" className="partner-wizard-field-info-icon" />
              </span>
            </span>
          ) : null}
        </span>
      </div>
      {children}
      {hint ? <p className={`partner-wizard-field-hint is-${hintTone}`}>{hint}</p> : null}
      {error ? <p className="partner-wizard-field-error">{error}</p> : null}
    </div>
  )
}

function InputShell({ icon, error = '', className = '', children }) {
  return (
    <div className={`partner-wizard-input-shell${error ? ' has-error' : ''}${className ? ` ${className}` : ''}`}>
      {icon ? <span className="partner-wizard-input-icon-shell">{icon}</span> : null}
      {children}
    </div>
  )
}

function SuggestionField({
  icon,
  value,
  onValueChange,
  placeholder,
  options,
  ariaLabel,
  error = '',
  emptyStateText = 'No matching options. You can type your own value.',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const normalizedValue = value.trim().toLowerCase()
  const filteredOptions = options.filter((option, index) => {
    const normalizedOption = option.toLowerCase()
    return options.findIndex((item) => item.toLowerCase() === normalizedOption) === index &&
      normalizedOption.includes(normalizedValue)
  })

  const handleBlur = (event) => {
    if (event.currentTarget.contains(event.relatedTarget)) {
      return
    }

    setIsOpen(false)
  }

  return (
    <div
      className={`partner-wizard-combobox-wrap${isOpen ? ' is-open' : ''}`}
      onBlur={handleBlur}
    >
      <InputShell
        icon={icon}
        error={error}
        className="has-select has-combobox"
      >
        <input
          type="text"
          value={value}
          onChange={(event) => {
            onValueChange(event.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              setIsOpen(false)
              event.currentTarget.blur()
            }

            if (event.key === 'Enter') {
              setIsOpen(false)
            }
          }}
          placeholder={placeholder}
          aria-label={ariaLabel}
        />
        <button
          type="button"
          className="partner-wizard-combobox-toggle"
          aria-label={`Show ${ariaLabel} suggestions`}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => setIsOpen((open) => !open)}
        >
          <CaretIcon className="partner-wizard-select-caret partner-wizard-combobox-caret" />
        </button>
      </InputShell>

      {isOpen ? (
        <div className="partner-wizard-combobox-menu" role="listbox" aria-label={`${ariaLabel} suggestions`}>
          {filteredOptions.length ? (
            filteredOptions.map((option) => (
              <button
                key={option}
                type="button"
                className={`partner-wizard-combobox-option${option === value ? ' is-active' : ''}`}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => {
                  onValueChange(option)
                  setIsOpen(false)
                }}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="partner-wizard-combobox-empty">{emptyStateText}</div>
          )}
        </div>
      ) : null}
    </div>
  )
}

function StepIllustration({ step, paymentSuccessful }) {
  return (
    <div className="partner-wizard-illustration" aria-hidden="true">
      <Icon name="spark" className="partner-wizard-illustration-spark partner-wizard-illustration-spark-one" />
      <Icon name="spark" className="partner-wizard-illustration-spark partner-wizard-illustration-spark-two" />
      <Icon name="spark" className="partner-wizard-illustration-spark partner-wizard-illustration-spark-three" />
      <div className="partner-wizard-illustration-card">
        <Icon
          name={paymentSuccessful ? 'check' : step.icon}
          className="partner-wizard-illustration-icon"
        />
      </div>
    </div>
  )
}

function PartnerRegistrationPage({ isOverlay = false }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState([])
  const [formState, setFormState] = useState(initialFormState)
  const [fieldErrors, setFieldErrors] = useState({})
  const [pincodeLookupState, setPincodeLookupState] = useState(initialPincodeLookupState)
  const [documentUploads, setDocumentUploads] = useState(initialDocumentState)
  const [selectedPlan, setSelectedPlan] = useState('professional')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi')
  const [paymentSuccessful, setPaymentSuccessful] = useState(false)
  const uploadTimersRef = useRef({})

  const currentStepDefinition = stepDefinitions[currentStep]
  const selectedPlanData = planOptions.find((plan) => plan.key === selectedPlan) ?? planOptions[0]
  const selectedPaymentMethodData =
    paymentMethods.find((method) => method.key === selectedPaymentMethod) ?? paymentMethods[0]
  const subCategoryOptions = formState.serviceCategory
    ? subCategoryMap[formState.serviceCategory] ?? []
    : []
  const couponDiscount =
    ['VYAPAR500', 'VYAPARNEST500'].includes(formState.couponCode.trim().toUpperCase())
      ? 500
      : formState.couponCode.trim()
        ? 250
        : 0
  const gstAmount = Math.round(selectedPlanData.price * 0.18)
  const totalAmount = Math.max(selectedPlanData.price + gstAmount - couponDiscount, 0)
  const totalSteps = stepDefinitions.length
  const completionBasis = paymentSuccessful
    ? totalSteps
    : Math.max(currentStep + 1, completedSteps.length + 1)
  const completionPercent = Math.round((completionBasis / totalSteps) * 100)
  const timelineProgress = paymentSuccessful
    ? 100
    : (currentStep / Math.max(totalSteps - 1, 1)) * 100
  const furthestUnlockedStep =
    completedSteps.length > 0
      ? Math.min(
          totalSteps - 1,
          Math.max(currentStep, ...completedSteps.map((stepIndex) => stepIndex + 1)),
        )
      : currentStep
  const partnerFirstName = formState.fullName.trim().split(/\s+/)[0] || 'Partner'
  const activationLocation =
    [formState.city.trim(), formState.state.trim()].filter(Boolean).join(', ') ||
    formState.country.trim() ||
    'India'
  const activationReference = `AR-${selectedPlanData.key.slice(0, 3).toUpperCase()}-${(
    formState.mobileNumber.replace(/\D/g, '').slice(-4) || '0000'
  ).padStart(4, '0')}`

  useEffect(() => {
    const uploadTimers = uploadTimersRef.current

    return () => {
      Object.values(uploadTimers).forEach((timerId) => {
        window.clearInterval(timerId)
      })
    }
  }, [])

  useEffect(() => {
    setFieldErrors({})
  }, [currentStep, paymentSuccessful])

  useEffect(() => {
    const normalizedCountry = formState.country.trim().toLowerCase()
    const normalizedPincode = formState.pincode.replace(/\D/g, '').slice(0, 6)

    if (!normalizedPincode) {
      setPincodeLookupState(initialPincodeLookupState)
      return undefined
    }

    if (normalizedCountry && normalizedCountry !== 'india') {
      setPincodeLookupState({
        status: 'manual',
        message: 'Auto-fetch is currently available for Indian pincodes. You can still enter the location manually.',
      })
      return undefined
    }

    if (normalizedPincode.length < 6) {
      setPincodeLookupState({
        status: 'idle',
        message: 'Enter all 6 digits to auto-fill your city and state automatically.',
      })
      return undefined
    }

    const controller = new AbortController()
    const timeoutId = window.setTimeout(async () => {
      setPincodeLookupState({
        status: 'loading',
        message: 'Fetching your city and state from this pincode...',
      })

      try {
        const response = await fetch(`${pincodeApiBaseUrl}${normalizedPincode}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Unable to reach the pincode service right now.')
        }

        const payload = await response.json()
        const location = extractPincodeLocation(payload)

        setFormState((currentFormState) => {
          if (currentFormState.pincode !== normalizedPincode) {
            return currentFormState
          }

          return {
            ...currentFormState,
            country: location.country || currentFormState.country,
            state: location.state,
            city: location.city,
          }
        })

        setFieldErrors((currentErrors) => {
          if (
            !currentErrors.country &&
            !currentErrors.state &&
            !currentErrors.city &&
            !currentErrors.pincode
          ) {
            return currentErrors
          }

          const nextErrors = { ...currentErrors }
          delete nextErrors.country
          delete nextErrors.state
          delete nextErrors.city
          delete nextErrors.pincode
          return nextErrors
        })

        setPincodeLookupState({
          status: 'success',
          message: `${location.city}, ${location.state} auto-filled from pincode ${normalizedPincode}.`,
        })
      } catch {
        if (controller.signal.aborted) {
          return
        }

        setPincodeLookupState({
          status: 'error',
          message: 'We could not auto-fetch this pincode right now. You can still enter city and state manually.',
        })
      }
    }, 360)

    return () => {
      controller.abort()
      window.clearTimeout(timeoutId)
    }
  }, [formState.country, formState.pincode])

  const updateField = (name, value) => {
    const nextValue = name === 'pincode' ? value.replace(/\D/g, '').slice(0, 6) : value

    setFormState((currentFormState) => {
      const nextFormState = {
        ...currentFormState,
        [name]: nextValue,
      }

      if (name === 'serviceCategory') {
        nextFormState.subCategory = ''
      }

      return nextFormState
    })

    setFieldErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[name]
      return nextErrors
    })
  }

  const navigateToHome = (hash = '#top') => {
    if (typeof window === 'undefined') {
      return
    }

    window.location.hash = hash
  }

  const markStepCompleted = (stepIndex) => {
    setCompletedSteps((currentCompletedSteps) =>
      currentCompletedSteps.includes(stepIndex)
        ? currentCompletedSteps
        : [...currentCompletedSteps, stepIndex].sort((left, right) => left - right),
    )
  }

  const validateCurrentStep = (stepIndex) => {
    const nextErrors = {}

    if (stepIndex === 0) {
      if (!formState.fullName.trim()) {
        nextErrors.fullName = 'Please enter your full name.'
      }

      if (!formState.mobileNumber.trim()) {
        nextErrors.mobileNumber = 'Please enter your mobile number.'
      }
    }

    if (stepIndex === 1) {
      if (!formState.businessName.trim()) {
        nextErrors.businessName = 'Business / Company Name is required.'
      }

      if (!formState.ownerName.trim()) {
        nextErrors.ownerName = 'Owner Name is required.'
      }

      if (!formState.emailAddress.trim()) {
        nextErrors.emailAddress = 'Email Address is required.'
      }
    }

    if (stepIndex === 2) {
      if (!formState.serviceCategory.trim()) {
        nextErrors.serviceCategory = 'Please choose a service category.'
      }

      if (!formState.subCategory.trim()) {
        nextErrors.subCategory = 'Please choose a sub category.'
      }

      if (!formState.experience.trim()) {
        nextErrors.experience = 'Please select your experience.'
      }
    }

    if (stepIndex === 3) {
      if (!formState.country.trim()) {
        nextErrors.country = 'Country is required.'
      }

      if (!formState.state.trim()) {
        nextErrors.state = 'State is required.'
      }

      if (!formState.city.trim()) {
        nextErrors.city = 'City is required.'
      }

      if (!formState.pincode.trim()) {
        nextErrors.pincode = 'Pincode is required.'
      } else if (!/^\d{6}$/.test(formState.pincode.trim())) {
        nextErrors.pincode = 'Enter a valid 6-digit pincode.'
      }

      if (!formState.serviceRadius.trim()) {
        nextErrors.serviceRadius = 'Please choose a service radius.'
      }
    }

    if (stepIndex === 4) {
      if (!documentUploads.aadhaarCard.fileName || documentUploads.aadhaarCard.progress < 100) {
        nextErrors.aadhaarCard = 'Upload Aadhaar Card to continue.'
      }
    }

    if (stepIndex === 5) {
      if (!selectedPlan) {
        nextErrors.selectedPlan = 'Choose a subscription plan.'
      }

      if (!selectedPaymentMethod) {
        nextErrors.selectedPaymentMethod = 'Choose a payment method.'
      }
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleNext = () => {
    if (!validateCurrentStep(currentStep)) {
      return
    }

    markStepCompleted(currentStep)
    setCurrentStep((stepIndex) => Math.min(stepIndex + 1, totalSteps - 1))
  }

  const handlePrevious = () => {
    setCurrentStep((stepIndex) => Math.max(stepIndex - 1, 0))
  }

  const handleBackAction = () => {
    if (paymentSuccessful) {
      setPaymentSuccessful(false)
      setCurrentStep(totalSteps - 1)
      return
    }

    if (currentStep > 0) {
      handlePrevious()
      return
    }

    navigateToHome('#top')
  }

  const handleProceedPayment = () => {
    if (!validateCurrentStep(5)) {
      return
    }

    setCompletedSteps(stepDefinitions.map((_, index) => index))
    setPaymentSuccessful(true)
  }

  const handleDocumentUpload = (fieldKey, event) => {
    const selectedFile = event.target.files?.[0]

    if (!selectedFile) {
      return
    }

    if (uploadTimersRef.current[fieldKey]) {
      window.clearInterval(uploadTimersRef.current[fieldKey])
      delete uploadTimersRef.current[fieldKey]
    }

    setFieldErrors((currentErrors) => {
      if (!currentErrors[fieldKey]) {
        return currentErrors
      }

      const nextErrors = { ...currentErrors }
      delete nextErrors[fieldKey]
      return nextErrors
    })

    setDocumentUploads((currentUploads) => ({
      ...currentUploads,
      [fieldKey]: {
        fileName: selectedFile.name,
        progress: 16,
      },
    }))

    const timerId = window.setInterval(() => {
      setDocumentUploads((currentUploads) => {
        const activeUpload = currentUploads[fieldKey]
        const nextProgress = Math.min(activeUpload.progress + 21, 100)

        if (nextProgress >= 100) {
          window.clearInterval(timerId)
          delete uploadTimersRef.current[fieldKey]
        }

        return {
          ...currentUploads,
          [fieldKey]: {
            ...activeUpload,
            progress: nextProgress,
          },
        }
      })
    }, 90)

    uploadTimersRef.current[fieldKey] = timerId
  }

  const renderBasicInformation = () => (
    <div className="partner-wizard-fields-grid single-column">
      <FieldBlock label="Full Name" required error={fieldErrors.fullName}>
        <InputShell
          icon={<Icon name="user" className="partner-wizard-input-icon" />}
          error={fieldErrors.fullName}
        >
          <input
            type="text"
            value={formState.fullName}
            onChange={(event) => updateField('fullName', event.target.value)}
            placeholder="Enter your full name"
            autoComplete="name"
          />
        </InputShell>
      </FieldBlock>

      <FieldBlock label="Mobile Number" required error={fieldErrors.mobileNumber}>
        <div className={`partner-wizard-phone-shell${fieldErrors.mobileNumber ? ' has-error' : ''}`}>
          <label className="partner-wizard-country-select">
            <IndiaFlagIcon className="partner-wizard-country-flag" />
            <select
              value={formState.countryCode}
              onChange={(event) => updateField('countryCode', event.target.value)}
              aria-label="Country Code"
            >
              <option value="+91">+91</option>
            </select>
            <CaretIcon className="partner-wizard-select-caret partner-wizard-country-caret" />
          </label>

          <div className="partner-wizard-phone-input">
            <input
              type="tel"
              value={formState.mobileNumber}
              onChange={(event) => updateField('mobileNumber', event.target.value)}
              placeholder="Enter mobile number"
              autoComplete="tel-national"
              inputMode="tel"
            />
          </div>
        </div>
      </FieldBlock>
    </div>
  )

  const renderBusinessInformation = () => (
    <div className="partner-wizard-fields-grid two-column">
      <FieldBlock label="Business / Company Name" required error={fieldErrors.businessName}>
        <InputShell
          icon={<Icon name="briefcase" className="partner-wizard-input-icon" />}
          error={fieldErrors.businessName}
        >
          <input
            type="text"
            value={formState.businessName}
            onChange={(event) => updateField('businessName', event.target.value)}
            placeholder="Enter your business name"
            autoComplete="organization"
          />
        </InputShell>
      </FieldBlock>

      <FieldBlock label="Owner Name" required error={fieldErrors.ownerName}>
        <InputShell
          icon={<Icon name="user" className="partner-wizard-input-icon" />}
          error={fieldErrors.ownerName}
        >
          <input
            type="text"
            value={formState.ownerName}
            onChange={(event) => updateField('ownerName', event.target.value)}
            placeholder="Enter owner name"
            autoComplete="name"
          />
        </InputShell>
      </FieldBlock>

      <FieldBlock label="Email Address" required error={fieldErrors.emailAddress}>
        <InputShell
          icon={<Icon name="mail" className="partner-wizard-input-icon" />}
          error={fieldErrors.emailAddress}
        >
          <input
            type="email"
            value={formState.emailAddress}
            onChange={(event) => updateField('emailAddress', event.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
          />
        </InputShell>
      </FieldBlock>

      <FieldBlock label="GST Number" optional error={fieldErrors.gstNumber}>
        <InputShell
          icon={<Icon name="briefcase" className="partner-wizard-input-icon" />}
          error={fieldErrors.gstNumber}
        >
          <input
            type="text"
            value={formState.gstNumber}
            onChange={(event) => updateField('gstNumber', event.target.value)}
            placeholder="Enter GST number"
          />
        </InputShell>
      </FieldBlock>

      <FieldBlock label="PAN Number" optional error={fieldErrors.panNumber}>
        <InputShell
          icon={<Icon name="shield" className="partner-wizard-input-icon" />}
          error={fieldErrors.panNumber}
        >
          <input
            type="text"
            value={formState.panNumber}
            onChange={(event) => updateField('panNumber', event.target.value)}
            placeholder="Enter PAN number"
          />
        </InputShell>
      </FieldBlock>
    </div>
  )

  const renderServiceDetails = () => (
    <div className="partner-wizard-fields-grid two-column">
      <FieldBlock label="Service Category" required error={fieldErrors.serviceCategory}>
        <SuggestionField
          icon={<Icon name="category" className="partner-wizard-input-icon" />}
          value={formState.serviceCategory}
          onValueChange={(nextValue) => updateField('serviceCategory', nextValue)}
          placeholder="Choose or type a service category"
          options={serviceCategories}
          ariaLabel="Service Category"
          error={fieldErrors.serviceCategory}
        />
      </FieldBlock>

      <FieldBlock label="Sub Category" required error={fieldErrors.subCategory}>
        <SuggestionField
          icon={<Icon name="services" className="partner-wizard-input-icon" />}
          value={formState.subCategory}
          onValueChange={(nextValue) => updateField('subCategory', nextValue)}
          placeholder="Choose or type a sub category"
          options={subCategoryOptions}
          ariaLabel="Sub Category"
          error={fieldErrors.subCategory}
          emptyStateText={
            subCategoryOptions.length
              ? 'No matching sub category. You can type your own value.'
              : 'No preset sub categories yet. You can type your own value.'
          }
        />
      </FieldBlock>

      <FieldBlock label="Experience" required error={fieldErrors.experience}>
        <SuggestionField
          icon={<Icon name="experience" className="partner-wizard-input-icon" />}
          value={formState.experience}
          onValueChange={(nextValue) => updateField('experience', nextValue)}
          placeholder="Select or type years of experience"
          options={experienceOptions}
          ariaLabel="Experience"
          error={fieldErrors.experience}
        />
      </FieldBlock>

      <FieldBlock label="Website" optional error={fieldErrors.website}>
        <InputShell
          icon={<Icon name="globe" className="partner-wizard-input-icon" />}
          error={fieldErrors.website}
        >
          <input
            type="url"
            value={formState.website}
            onChange={(event) => updateField('website', event.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </InputShell>
      </FieldBlock>

      <div className="partner-wizard-field-span-two">
        <FieldBlock label="Description" error={fieldErrors.description}>
          <InputShell
            icon={<Icon name="note" className="partner-wizard-input-icon" />}
            error={fieldErrors.description}
            className="is-textarea"
          >
            <textarea
              rows="5"
              value={formState.description}
              onChange={(event) => updateField('description', event.target.value)}
              placeholder="Describe your services, expertise, and what makes your business stand out."
            />
          </InputShell>
        </FieldBlock>
      </div>
    </div>
  )

  const renderServiceArea = () => (
    <div className="partner-wizard-fields-grid two-column">
      <FieldBlock label="Country" required error={fieldErrors.country}>
        <SuggestionField
          icon={<Icon name="globe" className="partner-wizard-input-icon" />}
          value={formState.country}
          onValueChange={(nextValue) => updateField('country', nextValue)}
          placeholder="Choose or type country"
          options={['India']}
          ariaLabel="Country"
          error={fieldErrors.country}
        />
      </FieldBlock>

      <FieldBlock label="State" required error={fieldErrors.state}>
        <InputShell
          icon={<Icon name="location" className="partner-wizard-input-icon" />}
          error={fieldErrors.state}
          className={pincodeLookupState.status === 'success' ? 'is-auto-filled' : ''}
        >
          <input
            type="text"
            value={formState.state}
            onChange={(event) => updateField('state', event.target.value)}
            placeholder="Enter your state"
            autoComplete="address-level1"
          />
        </InputShell>
      </FieldBlock>

      <FieldBlock label="City" required error={fieldErrors.city}>
        <InputShell
          icon={<Icon name="location" className="partner-wizard-input-icon" />}
          error={fieldErrors.city}
          className={pincodeLookupState.status === 'success' ? 'is-auto-filled' : ''}
        >
          <input
            type="text"
            value={formState.city}
            onChange={(event) => updateField('city', event.target.value)}
            placeholder="Enter your city"
            autoComplete="address-level2"
          />
        </InputShell>
      </FieldBlock>

      <FieldBlock
        label="Pincode"
        required
        hint={pincodeLookupState.message}
        hintTone={pincodeLookupState.status}
        error={fieldErrors.pincode}
      >
        <InputShell
          icon={<Icon name="shield" className="partner-wizard-input-icon" />}
          error={fieldErrors.pincode}
          className={pincodeLookupState.status === 'success' ? 'is-auto-filled' : ''}
        >
          <input
            type="text"
            value={formState.pincode}
            onChange={(event) => updateField('pincode', event.target.value)}
            placeholder="Enter pincode"
            inputMode="numeric"
            maxLength={6}
            autoComplete="postal-code"
          />
        </InputShell>
      </FieldBlock>

      <div className="partner-wizard-field-span-two">
        <FieldBlock label="Service Radius" required error={fieldErrors.serviceRadius}>
          <SuggestionField
            icon={<Icon name="globe" className="partner-wizard-input-icon" />}
            value={formState.serviceRadius}
            onValueChange={(nextValue) => updateField('serviceRadius', nextValue)}
            placeholder="Choose or type your service radius"
            options={serviceRadiusOptions}
            ariaLabel="Service Radius"
            error={fieldErrors.serviceRadius}
          />
        </FieldBlock>
      </div>
    </div>
  )

  const renderDocuments = () => (
    <div className="partner-wizard-upload-grid">
      {documentFields.map((documentField) => {
        const uploadState = documentUploads[documentField.key]
        const uploadComplete = uploadState.progress >= 100

        return (
          <label
            key={documentField.key}
            className={`partner-wizard-upload-card${fieldErrors[documentField.key] ? ' has-error' : ''}`}
          >
            <input
              type="file"
              className="partner-wizard-upload-input"
              onChange={(event) => handleDocumentUpload(documentField.key, event)}
            />

            <div className="partner-wizard-upload-head">
              <span className="partner-wizard-upload-icon-shell" aria-hidden="true">
                <Icon
                  name={uploadComplete ? 'check' : 'upload'}
                  className="partner-wizard-upload-icon"
                />
              </span>

              <div>
                <div className="partner-wizard-upload-title-row">
                  <strong>
                    {documentField.label}
                    {documentField.required ? <em>*</em> : null}
                  </strong>
                  {!documentField.required ? (
                    <span className="partner-wizard-upload-badge">Optional</span>
                  ) : null}
                </div>
                <p>
                  {uploadState.fileName
                    ? uploadState.fileName
                    : 'Upload JPG, PNG, or PDF document'}
                </p>
              </div>
            </div>

            <div className="partner-wizard-upload-meta">
              <span>{uploadComplete ? 'Uploaded successfully' : 'Tap to upload'}</span>
              <span>{uploadState.progress}%</span>
            </div>

            <div className="partner-wizard-upload-progress">
              <span style={{ width: `${uploadState.progress}%` }}></span>
            </div>

            {fieldErrors[documentField.key] ? (
              <span className="partner-wizard-upload-error">{fieldErrors[documentField.key]}</span>
            ) : null}
          </label>
        )
      })}
    </div>
  )

  const renderPayment = () => {
    if (paymentSuccessful) {
      const successStats = [
        {
          label: 'Activated Plan',
          value: selectedPlanData.name,
          icon: 'payment',
        },
        {
          label: 'Primary Service',
          value: formState.serviceCategory.trim() || 'Custom Service',
          icon: 'services',
        },
        {
          label: 'Coverage Area',
          value: activationLocation,
          icon: 'globe',
        },
        {
          label: 'Payment Method',
          value: selectedPaymentMethodData.label,
          icon: selectedPaymentMethodData.icon,
        },
      ]
      const successChecklist = [
        `Your ${selectedPlanData.name} partner plan is now active and ready to receive premium leads.`,
        'Your public partner profile is unlocked and can now appear in relevant marketplace results.',
        'Business details, service areas, and uploaded documents have been securely saved to your account.',
      ]

      return (
        <div className="partner-wizard-success-layout">
          <div className="partner-wizard-success-card partner-wizard-success-hero">
            <div className="partner-wizard-success-hero-copy">
              <div className="partner-wizard-success-status-row">
                <div className="partner-wizard-success-icon-shell" aria-hidden="true">
                  <Icon name="check" className="partner-wizard-success-icon" />
                </div>

                <div className="partner-wizard-success-title-stack">
                  <p className="partner-wizard-success-kicker">Payment Successful</p>
                  <h3>{partnerFirstName}, your partner account is now live</h3>
                </div>
              </div>

              <p className="partner-wizard-success-copy">
                Your {selectedPlanData.name} plan has been activated successfully. You can now
                start receiving verified customer enquiries on VyaparNest.
              </p>

              <div className="partner-wizard-success-pill-row">
                <span className="partner-wizard-success-pill">100% Profile Completed</span>
                <span className="partner-wizard-success-pill">Verified Activation</span>
                <span className="partner-wizard-success-pill">
                  Amount Paid: {formatCurrency(totalAmount)}
                </span>
              </div>
            </div>

            <div className="partner-wizard-success-cta-row">
              <button
                type="button"
                className="partner-wizard-primary-btn"
                onClick={() => navigateToHome('#dashboard')}
              >
                <span>Go To Dashboard</span>
                <Icon name="arrow-right" className="partner-wizard-btn-icon" />
              </button>

              <button
                type="button"
                className="partner-wizard-secondary-btn"
                onClick={() => navigateToHome('#top')}
              >
                <span>Back to Home</span>
                <Icon name="arrow-right" className="partner-wizard-btn-icon" />
              </button>
            </div>
          </div>

          <div className="partner-wizard-success-grid">
            <section className="partner-wizard-success-panel">
              <div className="partner-wizard-success-panel-head">
                <h4>Activation Snapshot</h4>
                <p>Your onboarding details are now linked to your live partner profile.</p>
              </div>

              <div className="partner-wizard-success-stats-grid">
                {successStats.map((item) => (
                  <article key={item.label} className="partner-wizard-success-stat-card">
                    <span className="partner-wizard-success-stat-icon-shell" aria-hidden="true">
                      <Icon name={item.icon} className="partner-wizard-success-stat-icon" />
                    </span>
                    <span className="partner-wizard-success-stat-label">{item.label}</span>
                    <strong className="partner-wizard-success-stat-value">{item.value}</strong>
                  </article>
                ))}
              </div>
            </section>

            <section className="partner-wizard-success-panel">
              <div className="partner-wizard-success-panel-head">
                <h4>Order Summary</h4>
                <p>Secure confirmation of your completed partner registration payment.</p>
              </div>

              <div className="partner-wizard-success-detail-list">
                <div className="partner-wizard-success-detail-row">
                  <span>Reference ID</span>
                  <strong>{activationReference}</strong>
                </div>
                <div className="partner-wizard-success-detail-row">
                  <span>Business Name</span>
                  <strong>{formState.businessName.trim() || 'Partner Business'}</strong>
                </div>
                <div className="partner-wizard-success-detail-row">
                  <span>Owner Name</span>
                  <strong>{formState.ownerName.trim() || formState.fullName.trim() || 'Partner'}</strong>
                </div>
                <div className="partner-wizard-success-detail-row">
                  <span>Amount Paid</span>
                  <strong>{formatCurrency(totalAmount)}</strong>
                </div>
              </div>

              <div className="partner-wizard-success-inline-meta">
                <span className="partner-wizard-success-inline-chip">
                  {selectedPaymentMethodData.label}
                </span>
                <span className="partner-wizard-success-inline-chip">Secure Checkout</span>
                <span className="partner-wizard-success-inline-chip">Active in {activationLocation}</span>
              </div>
            </section>

            <section className="partner-wizard-success-panel is-full">
              <div className="partner-wizard-success-panel-head">
                <h4>What Happens Next</h4>
                <p>Your account is ready. Here is what is now active for you.</p>
              </div>

              <ul className="partner-wizard-success-checklist">
                {successChecklist.map((item) => (
                  <li key={item}>
                    <span className="partner-wizard-success-check-shell" aria-hidden="true">
                      <Icon name="check" className="partner-wizard-success-check-icon" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="partner-wizard-plans-grid">
          {planOptions.map((plan) => (
            <button
              key={plan.key}
              type="button"
              className={`partner-wizard-plan-card${selectedPlan === plan.key ? ' is-selected' : ''}`}
              onClick={() => {
                setSelectedPlan(plan.key)
                setFieldErrors((currentErrors) => {
                  if (!currentErrors.selectedPlan) {
                    return currentErrors
                  }

                  const nextErrors = { ...currentErrors }
                  delete nextErrors.selectedPlan
                  return nextErrors
                })
              }}
            >
              <div className="partner-wizard-plan-head">
                <strong>{plan.name}</strong>
                {plan.recommended ? (
                  <span className="partner-wizard-plan-tag">Recommended</span>
                ) : null}
              </div>
              <div className="partner-wizard-plan-price">
                {formatCurrency(plan.price)}
                <small>Activation Fee</small>
              </div>
              <p>{plan.summary}</p>
              <ul className="partner-wizard-plan-features">
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Icon name="check" className="partner-wizard-plan-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {fieldErrors.selectedPlan ? (
          <p className="partner-wizard-field-error standalone">{fieldErrors.selectedPlan}</p>
        ) : null}

        <div className="partner-wizard-payment-grid">
          <div className="partner-wizard-payment-panel">
            <div className="partner-wizard-panel-head">
              <h3>Payment Methods</h3>
              <p>Choose your preferred mode for secure activation.</p>
            </div>

            <div className="partner-wizard-method-grid">
              {paymentMethods.map((method) => (
                <button
                  key={method.key}
                  type="button"
                  className={`partner-wizard-method-card${selectedPaymentMethod === method.key ? ' is-selected' : ''}`}
                  onClick={() => {
                    setSelectedPaymentMethod(method.key)
                    setFieldErrors((currentErrors) => {
                      if (!currentErrors.selectedPaymentMethod) {
                        return currentErrors
                      }

                      const nextErrors = { ...currentErrors }
                      delete nextErrors.selectedPaymentMethod
                      return nextErrors
                    })
                  }}
                >
                  <span className="partner-wizard-method-icon-shell" aria-hidden="true">
                    <Icon name={method.icon} className="partner-wizard-method-icon" />
                  </span>
                  <span>{method.label}</span>
                </button>
              ))}
            </div>

            {fieldErrors.selectedPaymentMethod ? (
              <p className="partner-wizard-field-error standalone">
                {fieldErrors.selectedPaymentMethod}
              </p>
            ) : null}

            <FieldBlock
              label="Coupon Code"
              hint="Use VYAPAR500 for a premium launch discount."
              error={fieldErrors.couponCode}
            >
              <InputShell icon={<Icon name="wallet" className="partner-wizard-input-icon" />}>
                <input
                  type="text"
                  value={formState.couponCode}
                  onChange={(event) => updateField('couponCode', event.target.value)}
                  placeholder="Enter coupon code"
                />
              </InputShell>
            </FieldBlock>
          </div>

          <div className="partner-wizard-summary-panel">
            <div className="partner-wizard-panel-head">
              <h3>Order Summary</h3>
              <p>Transparent pricing before you activate your partner account.</p>
            </div>

            <div className="partner-wizard-summary-list">
              <div>
                <span>Registration Fee</span>
                <strong>{formatCurrency(selectedPlanData.price)}</strong>
              </div>
              <div>
                <span>GST</span>
                <strong>{formatCurrency(gstAmount)}</strong>
              </div>
              <div>
                <span>Discount</span>
                <strong>- {formatCurrency(couponDiscount)}</strong>
              </div>
            </div>

            <div className="partner-wizard-summary-total">
              <span>Total Amount</span>
              <strong>{formatCurrency(totalAmount)}</strong>
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderStepBody = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInformation()
      case 1:
        return renderBusinessInformation()
      case 2:
        return renderServiceDetails()
      case 3:
        return renderServiceArea()
      case 4:
        return renderDocuments()
      case 5:
        return renderPayment()
      default:
        return null
    }
  }

  const pageTitle =
    paymentSuccessful && currentStep === totalSteps - 1
      ? 'Partner Account Activated'
      : currentStepDefinition.title
  const pageSubtitle =
    paymentSuccessful && currentStep === totalSteps - 1
      ? 'Your partner profile is fully verified and ready to receive business.'
      : currentStepDefinition.subtitle

  return (
    <main className={`partner-wizard-page${isOverlay ? ' is-overlay' : ''}`}>
      <div className="partner-wizard-shell">
        <header className="partner-wizard-topbar">
          <button
            type="button"
            className="partner-wizard-brand"
            onClick={() => navigateToHome('#top')}
            aria-label="Go to homepage"
          >
            <AryassBrandMark tone="light" tagline={null} className="partner-wizard-brand-mark" />
            <span className="partner-wizard-brand-copy">
              <small>Partner Registration Wizard</small>
            </span>
          </button>

          <div className="partner-wizard-topbar-actions">
            <span className="partner-wizard-trust-pill">
              <Icon name="shield" className="partner-wizard-trust-icon" />
              <span>Secure & Trusted</span>
            </span>

            <a className="partner-wizard-help-link" href="mailto:support@vyaparnest.in">
              <Icon name="help" className="partner-wizard-help-icon" />
              <span>Need Help?</span>
            </a>
          </div>
        </header>

        <div className="partner-wizard-layout">
          <aside className="partner-wizard-sidebar">
            <div className="partner-wizard-completion-card">
              <div
                className="partner-wizard-completion-ring"
                style={{ '--partner-completion-angle': `${completionPercent * 3.6}deg` }}
              >
                <div className="partner-wizard-completion-ring-core">
                  <strong>{completionPercent}%</strong>
                </div>
              </div>

              <div className="partner-wizard-completion-copy">
                <h2>Profile Completion</h2>
                <p>Complete your profile to start receiving verified leads and premium visibility.</p>
              </div>
            </div>

            <div className="partner-wizard-step-list-wrap">
              <span
                className="partner-wizard-step-line-active"
                style={{ height: `${timelineProgress}%` }}
                aria-hidden="true"
              ></span>

              <div className="partner-wizard-step-list">
                {stepDefinitions.map((step, index) => {
                  const isCurrent = index === currentStep
                  const isCompleted = paymentSuccessful || completedSteps.includes(index)
                  const isUnlocked = index <= furthestUnlockedStep

                  return (
                    <button
                      key={step.key}
                      type="button"
                      className={`partner-wizard-step-item${isCurrent ? ' is-current' : ''}${isCompleted ? ' is-completed' : ''}${isUnlocked ? ' is-unlocked' : ''}`}
                      onClick={() => {
                        if (!isUnlocked) {
                          return
                        }

                        setCurrentStep(index)
                      }}
                    >
                      <span className="partner-wizard-step-pin">
                        {isCompleted ? (
                          <Icon name="check" className="partner-wizard-step-check" />
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </span>

                      <span className="partner-wizard-step-icon-shell" aria-hidden="true">
                        <Icon name={step.icon} className="partner-wizard-step-icon" />
                      </span>

                      <span className="partner-wizard-step-copy">
                        <strong>{step.title}</strong>
                        <small>{step.description}</small>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          <section className="partner-wizard-content">
            <div className="partner-wizard-content-head">
              <div className="partner-wizard-content-copy">
                <div className="partner-wizard-content-meta">
                  <button
                    type="button"
                    className="partner-wizard-back-btn"
                    onClick={handleBackAction}
                  >
                    <Icon name="arrow-left" className="partner-wizard-back-icon" />
                    <span>
                      {paymentSuccessful
                        ? 'Review Payment'
                        : currentStep > 0
                          ? 'Back'
                          : 'Back to Home'}
                    </span>
                  </button>

                  <p className="partner-wizard-step-kicker">
                    {paymentSuccessful
                      ? 'Registration Complete'
                      : `Step ${currentStep + 1} of ${totalSteps}`}
                  </p>
                </div>
                <h1>{pageTitle}</h1>
                <p className="partner-wizard-step-subtitle">{pageSubtitle}</p>
              </div>

              <StepIllustration
                step={currentStepDefinition}
                paymentSuccessful={paymentSuccessful && currentStep === totalSteps - 1}
              />
            </div>

            <div className="partner-wizard-content-body">{renderStepBody()}</div>

            {!paymentSuccessful ? (
              <div className="partner-wizard-actions">
                <div className="partner-wizard-actions-left">
                  <button
                    type="button"
                    className="partner-wizard-secondary-btn"
                    onClick={() => navigateToHome('#top')}
                  >
                    <span>Save & Exit</span>
                    <Icon name="save" className="partner-wizard-btn-icon" />
                  </button>
                </div>

                <div className="partner-wizard-actions-right">
                  {currentStep < totalSteps - 1 ? (
                    <button
                      type="button"
                      className="partner-wizard-primary-btn"
                      onClick={handleNext}
                    >
                      <span>Next</span>
                      <Icon name="arrow-right" className="partner-wizard-btn-icon" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="partner-wizard-primary-btn"
                      onClick={handleProceedPayment}
                    >
                      <span>Proceed to Payment</span>
                      <Icon name="arrow-right" className="partner-wizard-btn-icon" />
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  )
}

export default PartnerRegistrationPage
