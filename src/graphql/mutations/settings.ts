import { gql } from '@apollo/client';
import { SETTINGS_FIELDS } from '../fragments/settings';

export const UPDATE_SETTINGS = gql`
  ${SETTINGS_FIELDS}
  mutation updateSettings(
    $id: ID!
    $sectionsOrder: SectionsOrderInput
    $layout: LayoutInput
    $spacing: SpacingInput
    $font: FontInput
    $heading: HeadingInput
    $subtitle: SubtitleInput
    $header: HeaderInput
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
      layout: $layout
      spacing: $spacing
      font: $font
      heading: $heading
      subtitle: $subtitle
      header: $header
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
