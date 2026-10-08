const nav = document.querySelector('[data-nav]')
const navToggle = document.querySelector('[data-nav-toggle]')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function setSolidNav() {
  nav.classList.toggle('is-solid', window.scrollY > 12)
}

setSolidNav()
window.addEventListener('scroll', setSolidNav, { passive: true })

navToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open')
  navToggle.setAttribute('aria-expanded', String(open))
  navToggle.querySelector('.nav-toggle-label').textContent = open ? 'Close' : 'Menu'
})

nav.querySelector('[data-nav-links]').addEventListener('click', (event) => {
  if (!event.target.closest('a')) return
  nav.classList.remove('is-open')
  navToggle.setAttribute('aria-expanded', 'false')
  navToggle.querySelector('.nav-toggle-label').textContent = 'Menu'
})

if (!reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        revealObserver.unobserve(entry.target)
      })
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' },
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
}

const tabs = [...document.querySelectorAll('[data-tab]')]
const panels = [...document.querySelectorAll('[data-panel]')]

function showService(name) {
  tabs.forEach((tab) => {
    const selected = tab.dataset.tab === name
    tab.classList.toggle('is-active', selected)
    tab.setAttribute('aria-selected', String(selected))
    tab.tabIndex = selected ? 0 : -1
  })
  panels.forEach((panel) => {
    const selected = panel.dataset.panel === name
    panel.classList.toggle('is-shown', selected)
    panel.hidden = !selected
  })
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => showService(tab.dataset.tab))
})

showService('full')

document.querySelectorAll('[data-help]').forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.help-card')
    const open = card.classList.toggle('is-open')
    button.setAttribute('aria-expanded', String(open))
    button.querySelector('.help-cue').textContent = open ? 'Less' : 'More'
  })
})

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item')
    const open = item.classList.toggle('is-open')
    button.setAttribute('aria-expanded', String(open))
  })
})

const year = document.querySelector('[data-year]')
if (year) year.textContent = String(new Date().getFullYear())
