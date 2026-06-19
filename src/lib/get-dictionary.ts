import 'server-only'

const dictionaries = {
  pt: () => import('../dictionaries/pt.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
}

export type Locale = 'pt' | 'en' | 'es'

export const getDictionary = async (locale: Locale) => {
  if (dictionaries[locale]) {
    return dictionaries[locale]()
  }
  return dictionaries.pt()
}
