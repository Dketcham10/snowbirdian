import { useCallback, useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { entryPopup, site } from '../content'
import { BlueprintGrid, PlatLines } from './art/ArchitecturalMotifs'
import { HubSpotForm } from './HubSpotForm'

const SESSION_KEY = 'sba_popup_shown'
const LEAD_KEY = 'sba_lead_captured'
const OPEN_DELAY_MS = 900
const THANKS_MS = 2200

type Step = 'offer' | 'form' | 'thanks'

function alreadyConverted() {
  try {
    return window.localStorage.getItem(LEAD_KEY) === '1'
  } catch {
    return false
  }
}

function alreadyShownThisSession() {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === '1'
  } catch {
    return false
  }
}

function markShown() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, '1')
  } catch {
    /* private mode — still show once this visit */
  }
}

function markConverted() {
  try {
    window.localStorage.setItem(LEAD_KEY, '1')
  } catch {
    /* ignore quota / private mode */
  }
}

export function EntryPopup() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>('offer')
  const headingId = useId()

  const close = useCallback(() => {
    setOpen(false)
    setStep('offer')
  }, [])

  useEffect(() => {
    if (alreadyConverted() || alreadyShownThisSession()) return

    let timer = 0
    const schedule = () => {
      timer = window.setTimeout(() => {
        markShown()
        setOpen(true)
      }, OPEN_DELAY_MS)
    }

    if (document.readyState === 'complete') {
      schedule()
    } else {
      window.addEventListener('load', schedule, { once: true })
    }

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('load', schedule)
    }
  }, [])

  useEffect(() => {
    const node = dialogRef.current
    if (!node) return
    if (open && !node.open) node.showModal()
    if (!open && node.open) node.close()
  }, [open])

  useEffect(() => {
    if (step !== 'thanks') return
    const timer = window.setTimeout(() => {
      markConverted()
      close()
    }, THANKS_MS)
    return () => window.clearTimeout(timer)
  }, [step, close])

  const onSubmitted = useCallback(() => {
    markConverted()
    setStep('thanks')
  }, [])

  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) close()
  }

  return (
    <dialog
      ref={dialogRef}
      className="entry-popup"
      aria-modal="true"
      aria-labelledby={headingId}
      onClose={close}
      onClick={onBackdropClick}
    >
      {open ? (
      <div className="entry-popup-panel">
        <button
          type="button"
          className="entry-popup-close"
          onClick={close}
          aria-label={entryPopup.closeLabel}
        >
          <span aria-hidden="true">×</span>
        </button>

        <div className="entry-popup-visual" aria-hidden="true">
          <BlueprintGrid className="pointer-events-none absolute inset-0 h-full w-full text-[#C9A063]/15" />
          <PlatLines className="pointer-events-none absolute -right-6 top-10 w-48 text-[#C9A063]/35 md:w-64" />
          <div className="relative flex h-full flex-col justify-between p-5 min-[640px]:p-8">
            <div className="flex items-center gap-3">
              <img
                src={site.logo.src}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <p className="font-display text-lg tracking-tight text-[#F4EFE6]">
                {site.name}
              </p>
            </div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-[#C9A063]">
              {entryPopup.proof}
            </p>
          </div>
        </div>

        <div className="entry-popup-content">
          {step === 'offer' ? (
            <>
              <p className="text-eyebrow uppercase text-[#C9A063]">{entryPopup.eyebrow}</p>
              <h2
                id={headingId}
                className="font-display mt-4 text-[2rem] leading-[1.15] text-[#1C1B19] min-[640px]:text-[2.5rem]"
              >
                {entryPopup.headline}
              </h2>
              <p className="mt-5 text-[1.05rem] leading-relaxed text-[#5C564E]">
                {entryPopup.supporting}
              </p>
              <button
                type="button"
                autoFocus
                className="mt-8 flex min-h-11 w-full items-center justify-center bg-[#1C1B19] px-5 text-small font-medium text-[#F4EFE6] transition-colors hover:bg-[#2C2824]"
                onClick={() => setStep('form')}
              >
                {entryPopup.primary}
              </button>
              <button
                type="button"
                className="mt-4 flex min-h-11 w-full items-center justify-center text-small text-[#5C564E] underline-offset-4 hover:text-[#1C1B19] hover:underline"
                onClick={close}
              >
                {entryPopup.dismiss}
              </button>
            </>
          ) : null}

          {step === 'form' ? (
            <>
              <h2
                id={headingId}
                className="font-display text-[1.75rem] leading-[1.2] text-[#1C1B19] min-[640px]:text-[2rem]"
              >
                {entryPopup.formLead}
              </h2>
              <div className="mt-5">
                <HubSpotForm compact onSubmitted={onSubmitted} />
              </div>
            </>
          ) : null}

          {step === 'thanks' ? (
            <div className="flex min-h-[16rem] flex-col justify-center">
              <h2
                id={headingId}
                className="font-display text-[2rem] leading-[1.15] text-[#1C1B19]"
              >
                {entryPopup.thanksTitle}
              </h2>
              <p className="mt-4 text-[1.05rem] leading-relaxed text-[#5C564E]">
                {entryPopup.thanksBody}
              </p>
            </div>
          ) : null}
        </div>
      </div>
      ) : null}
    </dialog>
  )
}
