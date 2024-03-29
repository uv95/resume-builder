import { gql } from '@apollo/client';
import { SETTINGS_FIELDS } from '../fragments/settings';

export const UPDATE_SETTINGS = gql`
  ${SETTINGS_FIELDS}
  mutation updateSettings(
    $id: ID!
    $sectionsOrder: SectionsOrderInput
    $font: FontInput
    $name: NameInput
    $jobTitle: JobTitleInput
    $date: DateInput
    $skills: SkillsSettingsInput
    $language: LanguageSettingsInput
    $profile: ProfileSettingsInput
    $education: EducationSettingsInput
    $professionalExperience: ProfessionalExperienceSettingsInput
  ) {
    updateSettings(
      id: $id
      sectionsOrder: $sectionsOrder
      font: $font
      name: $name
      jobTitle: $jobTitle
      date: $date
      skills: $skills
      language: $language
      profile: $profile
      education: $education
      professionalExperience: $professionalExperience
    ) {
      ...SettingsFields
    }
  }
`;
