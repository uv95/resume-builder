import { gql } from '@apollo/client';

export const PERSONAL_DETAILS_FIELDS = gql`
  fragment PersonalDetailsFields on PersonalDetails {
    id
    fullName
    jobTitle
    email
    phone
    address
    additionalInfo {
      input
      name
    }
  }
`;
export const EDUCATION_FIELDS = gql`
  fragment EducationFields on Education {
    degree
    school
    city
    country
    startDate
    endDate
    description
    index
    id
  }
`;
export const LANGUAGE_FIELDS = gql`
  fragment LanguageFields on Language {
    language
    info
    languageLevel
    index
    id
  }
`;
export const PROFESSIONAL_EXPERIENCE_FIELDS = gql`
  fragment ProfessionalExperienceFields on ProfessionalExperience {
    jobTitle
    employer
    city
    country
    startDate
    endDate
    description
    index
    id
  }
`;
export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    title
    startDate
    endDate
    description
    index
    id
  }
`;
export const SKILLS_FIELDS = gql`
  fragment SkillsFields on Skills {
    skill
    info
    skillLevel
    index
    id
  }
`;

export const CONTENT_FIELDS = gql`
  ${PERSONAL_DETAILS_FIELDS}
  ${EDUCATION_FIELDS}
  ${LANGUAGE_FIELDS}
  ${PROFESSIONAL_EXPERIENCE_FIELDS}
  ${PROJECT_FIELDS}
  ${SKILLS_FIELDS}
  fragment ContentFields on Content {
    id
    personalDetails {
      ...PersonalDetailsFields
    }
    skills {
      ...SkillsFields
    }
    language {
      ...LanguageFields
    }
    professionalExperience {
      ...ProfessionalExperienceFields
    }
    profile {
      id
      text
      index
    }
    education {
      ...EducationFields
    }
    project {
      ...ProjectFields
    }
  }
`;
