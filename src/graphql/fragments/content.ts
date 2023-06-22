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
  fragment EducationItemFields on EducationItem {
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
  fragment LanguageItemFields on LanguageItem {
    language
    info
    languageLevel
    index
    id
  }
`;
export const PROFESSIONAL_EXPERIENCE_FIELDS = gql`
  fragment ProfessionalExperienceItemFields on ProfessionalExperienceItem {
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
  fragment ProjectItemFields on ProjectItem {
    title
    startDate
    endDate
    description
    index
    id
  }
`;
export const PROFILE_FIELDS = gql`
  fragment ProfileItemFields on ProfileItem {
    text
    index
    id
  }
`;
export const SKILLS_FIELDS = gql`
  fragment SkillsItemFields on SkillsItem {
    skill
    info
    skillLevel
    index
    id
  }
`;

export const CONTENT_FIELDS = gql`
  ${PERSONAL_DETAILS_FIELDS}
  ${PROFILE_FIELDS}
  ${SKILLS_FIELDS}
  ${LANGUAGE_FIELDS}
  ${EDUCATION_FIELDS}
  ${PROFESSIONAL_EXPERIENCE_FIELDS}
  ${PROJECT_FIELDS}
  fragment ContentFields on Content {
    id
    personalDetails {
      ...PersonalDetailsFields
    }
    skills {
      id
      sectionName
      items{
      ...SkillsItemFields
    }
    }
    language {
      id
      sectionName
      items {
        ...LanguageItemFields
      }

    }
    professionalExperience {
      id
      sectionName
      items{
       ...ProfessionalExperienceItemFields
      }
    }
    profile {
      id
      sectionName
      items {
       ...ProfileItemFields
      }
    }
    education {
      id
      sectionName
      items {
      ...EducationItemFields
      }
    }
    project {
      id
      sectionName
      items {
      ...ProjectItemFields
      }
    }
  }
`;
