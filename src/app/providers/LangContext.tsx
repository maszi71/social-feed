"use client";

import { createContext, useContext } from "react";
import { Locale } from "@/app/lib/i18n-config";
import en from "@/app/dictionaries/en.json";


export type DictionaryType = typeof en;

type LangContextType = {
  lang: Locale;
  t: DictionaryType;
};

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({
  children,
  lang,
  dictionary,
}: {
  children: React.ReactNode;
  lang: Locale;
  dictionary: DictionaryType;
}) {
  return (
    <LangContext.Provider value={{ lang, t: dictionary }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used within LangProvider");
  return context.lang;
}

export function useT() {
  const context = useContext(LangContext);
  if (!context) throw new Error("useT must be used within LangProvider");
  return context.t;
}
