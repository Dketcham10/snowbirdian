const header = document.querySelector('[data-header]')
const menuBtn = document.querySelector('[data-menu]')
const mobileNav = document.querySelector('[data-mobile-nav]')

menuBtn.addEventListener('click', () => {
  const open = mobileNav.hasAttribute('hidden')
  mobileNav.toggleAttribute('hidden', !open)
  menuBtn.setAttribute('aria-expanded', String(open))
  menuBtn.textContent = open ? 'Close' : 'Menu'
})
mobileNav.addEventListener('click', (event) => {
  if (!event.target.closest('a')) return
  mobileNav.hidden = true
  menuBtn.setAttribute('aria-expanded', 'false')
  menuBtn.textContent = 'Menu'
})

document.querySelectorAll('[data-search-tab]').forEach((tab) => {
  tab.addEventListener('click', () => {
    const mode = tab.dataset.searchTab
    document.querySelectorAll('[data-search-tab]').forEach((item) => {
      item.setAttribute('aria-selected', String(item === tab))
    })
    document.querySelector('[data-owners-form]').hidden = mode !== 'owners'
    document.querySelector('[data-guests-form]').hidden = mode !== 'guests'
    document.querySelector('[data-search-note]').textContent =
      mode === 'owners'
        ? 'Free conversation. No commitment.'
        : 'Sample homes only. Direct booking is not open.'
  })
})

document.querySelector('[data-owners-form]').addEventListener('submit', (event) => {
  event.preventDefault()
  document.querySelector('#contact').scrollIntoView()
})

const cards = [...document.querySelectorAll('.card')]
const empty = document.querySelector('[data-empty]')
let cat = 'all'
let city = ''

function applyFilters() {
  let shown = 0
  cards.forEach((card) => {
    const cats = card.dataset.cats.split(' ')
    const cityOk = !city || card.dataset.city.includes(city)
    const catOk = cat === 'all' || cats.includes(cat)
    const visible = cityOk && catOk
    card.hidden = !visible
    if (visible) shown += 1
  })
  empty.hidden = shown !== 0
}

document.querySelector('[data-cats]').addEventListener('click', (event) => {
  const chip = event.target.closest('[data-cat]')
  if (!chip) return
  cat = chip.dataset.cat
  document.querySelectorAll('[data-cat]').forEach((item) => {
    item.classList.toggle('is-on', item === chip)
  })
  applyFilters()
})

document.querySelector('[data-guests-form]').addEventListener('submit', (event) => {
  event.preventDefault()
  city = event.currentTarget.where.value.trim().toLowerCase()
  applyFilters()
  document.querySelector('#homes').scrollIntoView()
})

document.querySelectorAll('.heart').forEach((button) => {
  button.addEventListener('click', () => {
    const on = button.getAttribute('aria-pressed') !== 'true'
    button.setAttribute('aria-pressed', String(on))
    button.textContent = on ? '♥' : '♡'
  })
})

const nights = document.querySelector('[data-nights]')
const nightsRead = document.querySelector('[data-nights-read]')
nights.addEventListener('input', () => {
  nightsRead.textContent = `Sample only. Slider set to ${nights.value} nights. Not your home's earnings.`
})

document.querySelectorAll('.faq-item button').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item')
    const open = item.classList.toggle('is-open')
    button.setAttribute('aria-expanded', String(open))
  })
})

const sheet = document.querySelector('[data-services]')
document.querySelector('[data-open-services]').addEventListener('click', () => {
  sheet.showModal()
})

const year = document.querySelector('[data-year]')
if (year) year.textContent = String(new Date().getFullYear())
