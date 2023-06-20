import { FontType } from './types/settingsTypes';

export const fonts: {
  type: FontType;
  title: 'Serif' | 'Sans';
  fonts: string[];
}[] = [
  {
    type: FontType.SERIF,
    title: 'Serif',
    fonts: ['Times New Roman', 'Georgia', 'EB Garamond'],
  },
  {
    type: FontType.SANS,
    title: 'Sans',
    fonts: ['Arial', 'Open Sans', 'Roboto'],
  },
];
