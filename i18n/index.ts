
// 框架 国际化文件
import zh_cn from './lang/zh_cn';
import zh_tw from './lang/zh_tw';
import en_us from './lang/en_us';
import ja from './lang/ja';
import ko from './lang/ko';

// 直接使用语言文件的默认导出
export const messages: { [key: string]: any } = {
  'zh-CN': {
    langName: '简体中文',
    ...zh_cn
  },
  'zh-TW': {
    langName: '繁體中文',
    ...zh_tw
  },
  'en-US': {
    langName: 'English',
    ...en_us
  },
  'JP': {
    langName: '日本語',
    ...ja
  },
  'KO': {
    langName: '한국어',
    ...ko
  }
}