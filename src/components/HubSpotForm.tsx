import { useEffect, useRef } from 'react'
import { hubspot } from '../content'
import { isHubSpotFormSubmitted } from '../lib/hubspotSubmit'
import { cn } from '../lib/cn'

const SCRIPT_ID = `hs-forms-embed-${hubspot.portalId}`
const SCRIPT_SRC = `https://js-${hubspot.region}.hsforms.net/forms/embed/${hubspot.portalId}.js`

function mountEmbedScript() {
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src = SCRIPT_SRC
  script.defer = true
  document.body.appendChild(script)
}

function ensureEmbedScript() {
  if (document.getElementById(SCRIPT_ID)) return
  mountEmbedScript()
}

/**
 * HubSpot's per-portal embed script scans the DOM for `.hs-form-frame`
 * elements and mounts each form into an iframe. Field styling comes from the
 * `--hsf-*` custom properties in index.css, which the embed script reads off
 * the host page.
 */
export function HubSpotForm({
  className,
  compact = false,
  onSubmitted,
}: {
  className?: string
  compact?: boolean
  onSubmitted?: () => void
}) {
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ensureEmbedScript()
    if (!compact) return

    // The page form already loaded the embed script. If this late frame is
    // still empty, reload the script so HubSpot binds the new node.
    const timer = window.setTimeout(() => {
      const frame = wrapRef.current?.querySelector('.hs-form-frame')
      if (!frame || frame.querySelector('iframe')) return
      document.getElementById(SCRIPT_ID)?.remove()
      mountEmbedScript()
    }, 700)

    return () => window.clearTimeout(timer)
  }, [compact])

  useEffect(() => {
    if (!onSubmitted) return

    const onMessage = (event: MessageEvent) => {
      if (isHubSpotFormSubmitted(event)) onSubmitted()
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [onSubmitted])

  return (
    <div
      ref={wrapRef}
      className={cn('hubspot-form-wrap', compact && 'hubspot-form-wrap--compact', className)}
    >
      <div
        className={cn('hs-form-frame', compact ? 'min-h-[22rem]' : 'min-h-[28rem]')}
        data-region={hubspot.region}
        data-form-id={hubspot.formId}
        data-portal-id={hubspot.portalId}
      />
    </div>
  )
}
