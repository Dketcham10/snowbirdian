import { useEffect, useRef } from 'react'
import { hubspot } from '../content'

declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (options: {
          region: string
          portalId: string
          formId: string
          target: string
          css?: string
        }) => void
      }
    }
  }
}

const SCRIPT_ID = 'hs-forms-v2'

export function HubSpotForm() {
  const targetId = 'hubspot-form'
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    const createForm = () => {
      const target = document.getElementById(targetId)
      if (!target || !window.hbspt?.forms) return
      target.innerHTML = ''
      window.hbspt.forms.create({
        region: hubspot.region,
        portalId: hubspot.portalId,
        formId: hubspot.formId,
        target: `#${targetId}`,
        css: '',
      })
    }

    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
    if (window.hbspt?.forms) {
      createForm()
      return
    }

    const script = existing ?? document.createElement('script')
    if (!existing) {
      script.id = SCRIPT_ID
      script.src = `https://js-${hubspot.region}.hsforms.net/forms/embed/v2.js`
      script.charset = 'utf-8'
      script.async = true
      document.body.appendChild(script)
    }
    script.addEventListener('load', createForm)
    if (window.hbspt?.forms) createForm()

    return () => {
      script.removeEventListener('load', createForm)
    }
  }, [])

  return (
    <div className="hubspot-form-wrap border border-white/15 px-6 py-8 md:px-10 md:py-10">
      <div
        id="hubspot-form"
        className="hs-form-frame min-h-[28rem]"
        aria-label="Contact form"
      />
    </div>
  )
}
