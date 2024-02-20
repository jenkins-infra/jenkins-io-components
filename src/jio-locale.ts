import {configureLocalization} from '@lit/localize';
import {sourceLocale, targetLocales} from './generated/locale-codes';

export const {getLocale, setLocale} = configureLocalization({
  sourceLocale,
  targetLocales,
  loadLocale: (locale: string) => {
    if (locale === 'en') {
      return import(`./generated/locales/en`);
    } else if (locale === 'es-ES') {
      return import(`./generated/locales/es-ES`);
    } else if (locale === 'fr-CA') {
      return import(`./generated/locales/fr-CA`);
    }
    return Promise.reject(`${locale} not found`);
  },
});

export const setLocaleFromUrl = async () => {
  const url = new URL(window.location.href);
  const locale = url.searchParams.get('locale') || (new Intl.NumberFormat()).resolvedOptions().locale || sourceLocale;
  await setLocale(locale);
};
setLocaleFromUrl().catch(e => console.log(`Error loading locale: ${(e as Error).message}`));


window.addEventListener('jio-locale-changed', (e) => {
  const customEvent = e as CustomEvent<{locale: string;}>;
  const {locale} = customEvent.detail;
  setLocale(locale);
});

