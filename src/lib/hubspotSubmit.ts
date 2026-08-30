import { hubspot } from '../content'

/**
 * HubSpot's new embed posts a message from the iframe on successful submit.
 * The payload shape has shifted across embed versions, so this matches the
 * known variants without treating "form ready" pings as a conversion.
 */
export function isHubSpotFormSubmitted(event: MessageEvent): boolean {
  if (!isHubSpotOrigin(event.origin)) return false

  const data = unwrap(event.data)
  if (!data) return false

  const eventName = stringProp(data, 'eventName') ?? stringProp(data, 'event')
  const type = stringProp(data, 'type') ?? stringProp(data, 'listener')
  const formId =
    stringProp(data, 'id') ??
    stringProp(data, 'formId') ??
    stringProp(data, 'form-id')

  if (formId && formId !== hubspot.formId) return false

  if (eventName === 'onFormSubmitted' || eventName === 'onFormSubmit') return true
  if (type === 'onFormSubmitted' || type === 'hs-form-submit-success') return true
  if (type === 'hs:form:submit-success' || type === 'hsForm:submitted') return true

  return false
}

function isHubSpotOrigin(origin: string) {
  try {
    const host = new URL(origin).hostname
    return (
      host.endsWith('hubspot.com') ||
      host.endsWith('hsforms.com') ||
      host === window.location.hostname
    )
  } catch {
    return false
  }
}

function unwrap(raw: unknown): Record<string, unknown> | null {
  if (typeof raw === 'string') {
    try {
      raw = JSON.parse(raw) as unknown
    } catch {
      return null
    }
  }
  if (!raw || typeof raw !== 'object') return null
  return raw as Record<string, unknown>
}

function stringProp(data: Record<string, unknown>, key: string) {
  const value = data[key]
  return typeof value === 'string' ? value : null
}
