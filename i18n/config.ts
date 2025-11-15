import zh_cn from './lang/zh_cn';
import zh_tw from './lang/zh_tw';
import en_us from './lang/en_us';
import ja from './lang/ja';
import ko from './lang/ko';

export default defineI18nConfig(() => ({
  legacy: false,
  missingWarn: false,
  fallbackWarn: false,
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zh_cn,
    'zh-TW': zh_tw,
    'en-US': en_us,
    'JP': ja,
    'KO': ko
  }
}))