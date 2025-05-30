import { useSettingsStore } from '../store/useSettingsStore';
import { translations } from './translations';

type TranslationKey = keyof typeof translations.en;

export const useLocalization = () => {
  const language = useSettingsStore(state => state.language);
  const t = (key: TranslationKey) => {
    return translations[language][key] || key;
  };

  return { t, language };
}; 