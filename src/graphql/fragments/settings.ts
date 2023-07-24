import { gql } from '@apollo/client';

const SECTIONS_ORDER_FIELDS = gql`
  fragment SectionsOrderFields on SectionsOrder {
    top
    left
    right
  }
`;

export const LAYOUT_FIELDS = gql`
  fragment LayoutFields on Layout {
    id
    columns
    position
    columnWidth {
      left
      right
    }
  }
`;
export const COLORS_FIELDS = gql`
  fragment ColorsFields on Colors {
    id
    mode
    basic {
      selected
      accent
      multicolor {
        accent
        font
        background
      }
    }
    advanced {
      selected
      accent
      multicolor {
        primary {
          accent
          font
          background
        }
        secondary {
          accent
          font
          background
        }
      }
    }
    applyAccentColor {
      name
      dots
      headings
      dates
      headingsLine
      linkIcons
      headerIcons
    }
  }
`;
export const SPACING_FIELDS = gql`
  fragment SpacingFields on Spacing {
    id
    fontSize
    lineHeight
    leftRightMargin
    topBottomMargin
    spaceBetweenSections
  }
`;

const FONT_FIELDS = gql`
  fragment FontFields on Font {
    type
    font
  }
`;

export const HEADING_FIELDS = gql`
  fragment HeadingFields on Heading {
    id
    style
    isUppercase
    size
  }
`;

export const SUBTITLE_FIELDS = gql`
  fragment SubtitleFields on Subtitle {
    id
    style
    position
  }
`;

export const HEADER_FIELDS = gql`
  fragment HeaderFields on Header {
    id
    position
    additionalInfoStyle
    additionalInfoOrder
  }
`;

const NAME_FIELDS = gql`
  fragment NameFields on Name {
    size
    style
  }
`;

const JOBTITLE_FIELDS = gql`
  fragment JobTitleFields on JobTitle {
    size
    style
  }
`;

const DATE_FIELDS = gql`
  fragment DateFields on Date {
    month
    delimiter
  }
`;
const SKILLS_SETTINGS_FIELDS = gql`
  fragment SkillsSettingsFields on SkillsSettings {
    format
    gridCols
    textFormat
    infoItalic
  }
`;
const LANGUAGE_SETTINGS_FIELDS = gql`
  fragment LanguageSettingsFields on LanguageSettings {
    format
    gridCols
    textFormat
    infoItalic
  }
`;
const PROFILE_SETTINGS_FIELDS = gql`
  fragment ProfileSettingsFields on ProfileSettings {
    showHeading
  }
`;
const EDUCATION_SETTINGS_FIELDS = gql`
  fragment EducationSettingsFields on EducationSettings {
    degreeFirst
  }
`;
const PROFESSIONAL_EXPERIENCE_SETTINGS_FIELDS = gql`
  fragment ProfessionalExperienceSettingsFields on ProfessionalExperienceSettings {
    jobTitleFirst
  }
`;

export const SETTINGS_FIELDS = gql`
  ${SECTIONS_ORDER_FIELDS}
  ${LAYOUT_FIELDS}
  ${COLORS_FIELDS}
  ${SPACING_FIELDS}
  ${FONT_FIELDS}
  ${HEADING_FIELDS}
  ${SUBTITLE_FIELDS}
  ${HEADER_FIELDS}
  ${NAME_FIELDS}
  ${JOBTITLE_FIELDS}
  ${DATE_FIELDS}
  ${SKILLS_SETTINGS_FIELDS}
  ${LANGUAGE_SETTINGS_FIELDS}
  ${PROFILE_SETTINGS_FIELDS}
  ${EDUCATION_SETTINGS_FIELDS}
  ${PROFESSIONAL_EXPERIENCE_SETTINGS_FIELDS}
  fragment SettingsFields on Settings {
    id
    sectionsOrder {
      ...SectionsOrderFields
    }
    layout {
      ...LayoutFields
    }
    colors {
      ...ColorsFields
    }
    spacing {
      ...SpacingFields
    }
    font {
      ...FontFields
    }
    heading {
      ...HeadingFields
    }
    subtitle {
      ...SubtitleFields
    }
    header {
      ...HeaderFields
    }
    name {
      ...NameFields
    }
    jobTitle {
      ...JobTitleFields
    }
    date {
      ...DateFields
    }
    skills {
      ...SkillsSettingsFields
    }
    language {
      ...LanguageSettingsFields
    }
    profile {
      ...ProfileSettingsFields
    }
    education {
      ...EducationSettingsFields
    }
    professionalExperience {
      ...ProfessionalExperienceSettingsFields
    }
  }
`;
