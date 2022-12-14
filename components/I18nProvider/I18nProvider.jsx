import React, { createContext, useContext, useState } from "react";
import { en, zodCustomErrorMapEn } from "./locales/en";
import { es, zodCustomErrorMapEs } from "./locales/es";
import { z } from "zod";
import { de, zodCustomErrorMapDe } from "./locales/de";

export const i18nContext = createContext({});
const langs = {
  en: en,
  es: es,
  de: de,
};
const zodErrorMaps = {
  es: zodCustomErrorMapEs,
  en: zodCustomErrorMapEn,
  de: zodCustomErrorMapDe,
};
const initialLang = "es";
z.setErrorMap(zodErrorMaps[initialLang]);
export function I18nProvider({ children }) {
  const [i18nStoreState, setI18nStoreState] = useState({
    lang: initialLang,
  });
  function changeLanguage(lang) {
    setI18nStoreState({
      lang,
    });
    z.setErrorMap(zodErrorMaps[lang]);
  }
  function t(key) {
    if (!langs[i18nStoreState.lang]) return key;
    return langs[i18nStoreState.lang][key];
  }
  return (
    <i18nContext.Provider value={{ ...i18nStoreState, changeLanguage, t }}>
      {children}
    </i18nContext.Provider>
  );
}
export const useI18n = () => useContext(i18nContext);
