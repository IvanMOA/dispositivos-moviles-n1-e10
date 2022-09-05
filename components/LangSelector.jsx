import { useI18n } from "./I18nProvider";
import { HamburgerIcon, Menu, Pressable, Text } from "native-base";
import React from "react";

export function LangSelector({ style }) {
  const { changeLanguage, lang } = useI18n();
  const langs = {
    es: "🇲🇽",
    en: "🇺🇸",
  };
  return (
    <Menu
      style={style}
      shadow={2}
      trigger={(triggerProps) => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <Text>{langs[lang]}</Text>
          </Pressable>
        );
      }}
    >
      {Object.entries(langs).map(([lang, flag]) => (
        <Menu.Item key={lang} onPress={() => changeLanguage(lang)}>
          {flag}
        </Menu.Item>
      ))}
    </Menu>
  );
}
