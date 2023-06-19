import { ILanguage, ISkills, LanguageLevel, SkillLevel } from './types';

export const formatLevelProp = ({
  section,
  item,
}: {
  section: 'skills' | 'language';
  item: ILanguage | ISkills;
}) => {
  if (section === 'skills') {
    const enumValue = item['skillLevel' as keyof typeof item];
    const enumKey = Object.values(SkillLevel).includes(enumValue as SkillLevel)
      ? Object.keys(SkillLevel)[
          Object.values(SkillLevel).indexOf(enumValue as SkillLevel)
        ]
      : enumValue;

    return enumKey;
  }

  if (section === 'language') {
    const enumValue = item['languageLevel' as keyof typeof item];
    const enumKey = Object.values(LanguageLevel).includes(
      enumValue as LanguageLevel
    )
      ? Object.keys(LanguageLevel)[
          Object.values(LanguageLevel).indexOf(enumValue as LanguageLevel)
        ]
      : enumValue;

    return enumKey;
  }
};
