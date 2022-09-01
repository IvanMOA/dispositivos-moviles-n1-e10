import React, { createContext, useContext, useState } from "react";
import { en, zodCustomErrorMapEn } from "./locales/en";
import { es, zodCustomErrorMapEs } from "./locales/es";
import { z } from "zod";

export const i18nContext = createContext({});
const langs = {
  en: en,
  es: es,
};
const zodErrorMaps = {
  es: zodCustomErrorMapEs,
  en: zodCustomErrorMapEn,
};
const initialLang = "en";
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
    if (!langs[i18nStoreState.lang]) return "";
    return langs[i18nStoreState.lang][key];
  }
  return (
    <i18nContext.Provider value={{ ...i18nStoreState, changeLanguage, t }}>
      {children}
    </i18nContext.Provider>
  );
}
export const useI18n = () => useContext(i18nContext);
