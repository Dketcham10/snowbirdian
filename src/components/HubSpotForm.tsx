import { useEffect } from 'react'
import { hubspot } from '../content'

const SCRIPT_ID = `hs-forms-embed-${hubspot.portalId}`

/**
 * HubSpot's per-portal embed script scans the DOM for `.hs-form-frame`
 * elements and mounts each form into an iframe. Because the form renders
 * cross-origin, its fields can only be styled from the HubSpot form editor —
 * page CSS reaches the surrounding card, nothing inside it.
 */
export function HubSpotForm() {
  useEffect(() => {
    if (document.getElementById(SCRIPT_ID)) return

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://js-${hubspot.region}.hsforms.net/forms/embed/${hubspot.portalId}.js`
    script.defer = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="hubspot-form-wrap bg-cream px-5 py-6 md:px-8 md:py-8">
      <div
        className="hs-form-frame min-h-[28rem]"
        data-region={hubspot.region}
        data-form-id={hubspot.formId}
        data-portal-id={hubspot.portalId}
      />
    </div>
  )
}
