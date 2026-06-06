import { ref } from 'vue'

export type SocialNetwork = 'instagram' | 'telegram' | 'pinterest'

export interface NavLink {
  to: string
  labelKey: string
}

export interface SocialLink {
  network: SocialNetwork
  href: string
  label: string
}

export interface ContactInfo {
  email: string
  phone: string
  location: string
}

type FetchStatus = 'idle' | 'loading' | 'success' | 'error'

const DEFAULT_NAV_LINKS: NavLink[] = [
  { to: '/#about',     labelKey: 'nav.about' },
  { to: '/#portfolio', labelKey: 'nav.portfolio' },
  { to: '/#story',     labelKey: 'nav.story' },
  { to: '/#contacts',  labelKey: 'nav.contacts' },
]

const DEFAULT_SOCIALS: SocialLink[] = [
  { network: 'instagram', href: '#', label: 'Instagram' },
  { network: 'telegram',  href: '#', label: 'Telegram' },
  { network: 'pinterest', href: '#', label: 'Pinterest' },
]

const DEFAULT_CONTACTS: ContactInfo = {
  email:    'hello@varvara.photo',
  phone:    '+7 999 000-00-00',
  location: 'Нижний Новгород · съёмки по всей России',
}

export const useSiteStore = defineStore('site', () => {
  const status   = ref<FetchStatus>('idle')
  const navLinks = ref<NavLink[]>([...DEFAULT_NAV_LINKS])
  const socials  = ref<SocialLink[]>([...DEFAULT_SOCIALS])
  const contacts = ref<ContactInfo>({ ...DEFAULT_CONTACTS })

  async function fetchSiteData() {
    if (status.value === 'loading') return
    status.value = 'loading'
    try {
      // const data = await $fetch<{ navLinks: NavLink[]; socials: SocialLink[]; contacts: ContactInfo }>('/api/site')
      // navLinks.value = data.navLinks
      // socials.value  = data.socials
      // contacts.value = data.contacts
      status.value = 'success'
    }
    catch {
      status.value = 'error'
    }
  }

  return { status, navLinks, socials, contacts, fetchSiteData }
})
