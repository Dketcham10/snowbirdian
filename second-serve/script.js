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

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item')
    const willOpen = !item.classList.contains('is-open')
    item.parentElement.querySelectorAll('.faq-item').forEach((other) => {
      other.classList.remove('is-open')
      const otherButton = other.querySelector('button')
      if (otherButton) otherButton.setAttribute('aria-expanded', 'false')
    })
    if (willOpen) {
      item.classList.add('is-open')
      button.setAttribute('aria-expanded', 'true')
    }
  })
})

const year = document.querySelector('[data-year]')
if (year) year.textContent = String(new Date().getFullYear())

const audienceLinks = [...document.querySelectorAll('[data-audience]')]
if (audienceLinks.length) {
  const names = ['snowbirds', 'club']
  const bands = {
    snowbirds: document.getElementById('snowbirds'),
    club: document.getElementById('club'),
  }
  let index = 0
  let timer = null

  function setAudience(name) {
    audienceLinks.forEach((link) => {
      const on = link.dataset.audience === name
      link.classList.toggle('is-active', on)
      if (on) link.setAttribute('aria-current', 'true')
      else link.removeAttribute('aria-current')
    })
    Object.entries(bands).forEach(([key, band]) => {
      if (band) band.classList.toggle('is-lit', key === name)
    })
  }

  function startAudience() {
    if (reduceMotion || timer) return
    timer = window.setInterval(() => {
      index = (index + 1) % names.length
      setAudience(names[index])
    }, 2600)
  }

  function stopAudience() {
    window.clearInterval(timer)
    timer = null
  }

  setAudience('snowbirds')
  startAudience()

  audienceLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => {
      stopAudience()
      index = names.indexOf(link.dataset.audience)
      setAudience(link.dataset.audience)
    })
    link.addEventListener('focus', () => {
      stopAudience()
      setAudience(link.dataset.audience)
    })
    link.addEventListener('mouseleave', startAudience)
    link.addEventListener('blur', startAudience)
  })
}
