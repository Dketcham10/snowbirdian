(function () {
  const content = window.PRICING
  if (!content) return

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  function options(list) {
    return list
      .map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`)
      .join("")
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
  }

  function formMarkup() {
    const pills = content.plans
      .map(
        (plan) =>
          `<button class="plan-pill" type="button" data-plan-choice="${plan.id}" aria-pressed="false">${escapeHtml(plan.label)}</button>`,
      )
      .join("")

    return `
      <form class="form quote-form" data-quote novalidate>
        <p class="hp" aria-hidden="true">
          <label>Leave this empty <input name="company" tabindex="-1" autocomplete="off" /></label>
        </p>
        <fieldset class="plan-pills">
          <legend>Which plan are you interested in?</legend>
          <div class="plan-pill-row">${pills}</div>
        </fieldset>
        <div class="fields">
          <label>
            Full name
            <input type="text" name="name" autocomplete="name" required aria-describedby="err-name" />
            <span class="field-error" id="err-name" hidden></span>
          </label>
          <label>
            Email
            <input type="email" name="email" autocomplete="email" required aria-describedby="err-email" />
            <span class="field-error" id="err-email" hidden></span>
          </label>
          <label>
            Phone
            <input type="tel" name="phone" autocomplete="tel" />
          </label>
          <label>
            <span data-address-label>Property address</span>
            <input type="text" name="address" autocomplete="street-address" />
          </label>
          <label>
            Bedrooms / sleeps
            <input type="text" name="sleeps" placeholder="e.g. 5 bed, sleeps 12" />
          </label>
          <label>
            <span data-listed-label>Currently listed?</span>
            <select name="listed">
              <option value="">Select one</option>
              ${options(content.listingStatus)}
            </select>
          </label>
          <label>
            When would you like to start?
            <select name="start">
              <option value="">Select one</option>
              ${options(content.startTimeline)}
            </select>
          </label>
          <label>
            How did you hear about us?
            <select name="source">
              <option value="">Select one</option>
              ${options(content.hearAbout)}
            </select>
          </label>
          <div class="partner-fields span-2" data-partner-fields hidden>
            <label>
              I am…
              <select name="partnerType">
                <option value="">Select one</option>
                ${options(content.partnerType)}
              </select>
            </label>
            <label>
              Investment range
              <select name="investment">
                <option value="">Select one</option>
                ${options(content.investmentRange)}
              </select>
            </label>
            <label>
              Preferred structure
              <select name="structure">
                <option value="">Select one</option>
                ${options(content.preferredStructure)}
              </select>
            </label>
          </div>
          <label class="span-2">
            Anything else we should know?
            <textarea name="message" rows="4"></textarea>
          </label>
        </div>
        <div class="quote-foot">
          <p class="quote-note">Pricing is confirmed after a free property walkthrough.</p>
          <button class="btn btn-clay" type="submit">Request My Quote</button>
        </div>
        <p class="privacy-note">
          By submitting, you agree we may contact you about your home. See our
          <a href="/privacy/">Privacy Policy</a>.
        </p>
        <p class="form-status" role="alert" hidden></p>
      </form>
    `
  }

  const checkIcon =
    '<span class="check-icon" role="img" aria-label="Included"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><path d="M4 10.5 8 14.5 16 5.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'

  function compareCell(value) {
    if (value === "we") return checkIcon
    if (value === "you") return "<strong>You</strong>"
    return '<strong class="is-addon">Add-on</strong>'
  }

  function renderCompare() {
    const body = document.querySelector("[data-compare-body]")
    if (!body || !content.compareGroups) return
    body.innerHTML = content.compareGroups
      .map((group) => {
        const heading = `<tr class="compare-group"><th scope="colgroup" colspan="4">${escapeHtml(group.label)}</th></tr>`
        const rows = group.rows
          .map(
            ([service, co, full, all]) =>
              `<tr><th scope="row">${escapeHtml(service)}</th><td>${compareCell(co)}</td><td>${compareCell(full)}</td><td>${compareCell(all)}</td></tr>`,
          )
          .join("")
        return heading + rows
      })
      .join("")
  }

  function applyFlags() {
    const spots = document.querySelector("[data-founding-spots]")
    const lock = document.querySelector("[data-founding-lock]")
    const notice = document.querySelector("[data-founding-notice]")
    if (spots) spots.textContent = String(content.FOUNDING_OWNER_SPOTS)
    if (lock) lock.textContent = content.FOUNDING_RATE_LOCK
    if (notice) notice.textContent = content.NOTICE_PERIOD
    if (!content.SHOW_FOUNDING_OFFER) {
      document.querySelectorAll("[data-founding]").forEach((el) => el.remove())
    }
    if (content.SHOW_FEES) {
      document.querySelectorAll("[data-fee-key]").forEach((el) => {
        const fee = content.fees && content.fees[el.dataset.feeKey]
        el.textContent = fee || "Custom quote"
      })
    }
  }

  function pageDefaultPlan(form) {
    const slot = form.closest("[data-quote-form]")
    return (slot && slot.dataset.defaultPlan) || "full-service"
  }

  function updateInvestorLabels(form) {
    const address = form.querySelector("[data-address-label]")
    const listed = form.querySelector("[data-listed-label]")
    if (!address || !listed) return
    const partner = selectedPlan(form) === "partnership"
    const type = String((form.elements.partnerType && form.elements.partnerType.value) || "")
    const soft = partner && (type === "Looking to buy a property" || type === "An investor")
    address.textContent = soft ? "Property address (if you have one)" : "Property address"
    listed.textContent = soft ? "Currently listed? (skip if buying)" : "Currently listed?"
  }

  function hutk() {
    const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/)
    return match ? decodeURIComponent(match[1]) : ""
  }

  function selectedPlan(form) {
    const pressed = form.querySelector("[data-plan-choice][aria-pressed='true']")
    return pressed ? pressed.dataset.planChoice : pageDefaultPlan(form)
  }

  function setPlan(form, planId) {
    const known = content.plans.some((plan) => plan.id === planId)
    const next = known ? planId : pageDefaultPlan(form)
    form.querySelectorAll("[data-plan-choice]").forEach((button) => {
      const on = button.dataset.planChoice === next
      button.setAttribute("aria-pressed", String(on))
      button.classList.toggle("is-selected", on)
    })
    const extra = form.querySelector("[data-partner-fields]")
    if (!extra) {
      updateInvestorLabels(form)
      return
    }
    const show = next === "partnership"
    if (show) {
      extra.hidden = false
      extra.inert = false
      if (reduceMotion) extra.classList.add("is-on")
      else requestAnimationFrame(() => extra.classList.add("is-on"))
      updateInvestorLabels(form)
      return
    }
    extra.classList.remove("is-on")
    extra.inert = true
    const hide = () => {
      if (!extra.classList.contains("is-on")) extra.hidden = true
    }
    if (reduceMotion || extra.hidden) {
      hide()
      updateInvestorLabels(form)
      return
    }
    extra.addEventListener("transitionend", hide, { once: true })
    window.setTimeout(hide, 400)
    updateInvestorLabels(form)
  }

  function clearErrors(form) {
    form.querySelectorAll(".field-error").forEach((el) => {
      el.hidden = true
      el.textContent = ""
    })
    form.querySelectorAll(".is-invalid").forEach((el) => {
      el.classList.remove("is-invalid")
      el.removeAttribute("aria-invalid")
    })
  }

  function setFieldError(form, name, message) {
    const input = form.elements[name]
    const error = form.querySelector(`#err-${name}`)
    if (!input || !error) return
    input.classList.add("is-invalid")
    input.setAttribute("aria-invalid", "true")
    error.hidden = false
    error.textContent = message
  }

  function splitName(full) {
    const parts = full.trim().split(/\s+/)
    const first = parts.shift() || ""
    return { first, last: parts.join(" ") }
  }

  function showStatus(form, message, isError) {
    const status = form.querySelector(".form-status")
    status.hidden = false
    status.innerHTML = message
    status.classList.toggle("is-error", Boolean(isError))
  }

  function contactFallback() {
    const tel = content.phoneTel
    const mail = content.email
    return `Something went wrong. Please call or text <a href="tel:${tel}">${content.phoneDisplay}</a> or email <a href="mailto:${mail}">${mail}</a>.`
  }

  async function submitHubspot(form) {
    const hub = content.hubspot
    if (!hub.portalId || !hub.formId) {
      showStatus(form, contactFallback(), true)
      return
    }

    const data = new FormData(form)
    const name = splitName(String(data.get("name") || ""))
    const map = hub.fields
    const plan = content.plans.find((item) => item.id === selectedPlan(form))
    const fields = [
      [map.firstname, name.first],
      [map.lastname, name.last],
      [map.email, String(data.get("email") || "")],
      [map.phone, String(data.get("phone") || "")],
      [map.property_address, String(data.get("address") || "")],
      [map.bedrooms_sleeps, String(data.get("sleeps") || "")],
      [map.plan_of_interest, plan ? plan.label : ""],
      [map.listing_status, String(data.get("listed") || "")],
      [map.start_timeline, String(data.get("start") || "")],
      [map.lead_source_detail, String(data.get("source") || "")],
      [map.message, String(data.get("message") || "")],
    ]
    if (selectedPlan(form) === "partnership") {
      fields.push(
        [map.partner_type, String(data.get("partnerType") || "")],
        [map.investment_range, String(data.get("investment") || "")],
        [map.preferred_structure, String(data.get("structure") || "")],
      )
    }

    const payload = {
      fields: fields
        .filter(([, value]) => value)
        .map(([name, value]) => ({ name, value })),
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    }
    const token = hutk()
    if (token) payload.context.hutk = token

    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${hub.portalId}/${hub.formId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    )
    if (!response.ok) throw new Error("HubSpot rejected the form")
  }

  function succeed(form) {
    form.innerHTML = `
      <div class="quote-success">
        <h3>Thank you!</h3>
        <p>We'll reach out within one business day to set up your walkthrough.</p>
      </div>
    `
  }

  function bind(form) {
    const initial = new URLSearchParams(window.location.search).get("plan") || pageDefaultPlan(form)
    setPlan(form, initial)

    form.querySelectorAll("[data-plan-choice]").forEach((button) => {
      button.addEventListener("click", () => setPlan(form, button.dataset.planChoice))
    })
    if (form.elements.partnerType) {
      form.elements.partnerType.addEventListener("change", () => updateInvestorLabels(form))
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault()
      clearErrors(form)
      const status = form.querySelector(".form-status")
      status.hidden = true
      status.textContent = ""

      const name = String(form.elements.name.value || "").trim()
      const email = String(form.elements.email.value || "").trim()
      let valid = true
      if (!name) {
        setFieldError(form, "name", "Enter your name.")
        valid = false
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setFieldError(form, "email", "Enter a valid email.")
        valid = false
      }
      if (!valid) {
        const firstInvalid = form.querySelector(".is-invalid")
        if (firstInvalid) firstInvalid.focus()
        return
      }

      if (String(form.elements.company.value || "").trim()) {
        succeed(form)
        return
      }

      const button = form.querySelector('[type="submit"]')
      button.disabled = true
      button.textContent = "Sending…"
      try {
        await submitHubspot(form)
        if (form.querySelector(".form-status") && !form.querySelector(".form-status").hidden) {
          button.disabled = false
          button.textContent = "Request My Quote"
          return
        }
        succeed(form)
      } catch (error) {
        button.disabled = false
        button.textContent = "Request My Quote"
        showStatus(form, contactFallback(), true)
      }
    })
  }

  function focusQuote() {
    const hash = window.location.hash
    if (hash !== "#quote" && hash !== "#contact") return
    const field = document.querySelector("[data-quote] [name='name']")
    if (field) field.focus({ preventScroll: true })
  }

  function scrollToQuote(planId) {
    const form = document.querySelector("[data-quote]")
    if (!form) return false
    const url = new URL(window.location.href)
    if (planId) {
      setPlan(form, planId)
      url.searchParams.set("plan", planId)
    }
    history.pushState(null, "", `${url.pathname}${url.search}#quote`)
    const target = document.getElementById("quote") || document.getElementById("contact")
    if (target) {
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
    }
    const field = form.querySelector("[name='name']")
    window.setTimeout(() => field && field.focus(), reduceMotion ? 0 : 350)
    return true
  }

  document.querySelectorAll("[data-quote-form]").forEach((slot) => {
    slot.innerHTML = formMarkup()
    bind(slot.querySelector("[data-quote]"))
  })

  renderCompare()
  applyFlags()

  document.addEventListener("click", (event) => {
    const link = event.target.closest("[data-plan]")
    if (!link || !document.querySelector("[data-quote]")) return
    if (link.getAttribute("href") && link.getAttribute("href").startsWith("/")) return
    event.preventDefault()
    scrollToQuote(link.dataset.plan)
  })

  function loadHubspotTracking() {
    if (!content.hubspot.tracking || !content.hubspot.portalId) return
    if (document.querySelector("script[data-hs-script]")) return
    const script = document.createElement("script")
    script.src = `https://js.hs-scripts.com/${content.hubspot.portalId}.js`
    script.async = true
    script.defer = true
    script.dataset.hsScript = "true"
    document.body.appendChild(script)
  }

  window.addEventListener("load", () => {
    focusQuote()
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(loadHubspotTracking, { timeout: 2500 })
    } else {
      window.setTimeout(loadHubspotTracking, 1)
    }
  })
})()
