import { gql } from '@apollo/client';
import { PROFESSIONAL_EXPERIENCE_FIELDS } from '../fragments/content';

export const ADD_PROFESSIONAL_EXPERIENCE = gql`
  ${PROFESSIONAL_EXPERIENCE_FIELDS}
  mutation addProfessionalExperience(
    $jobTitle: String!
    $employer: String
    $city: String
    $country: String
    $startDate: String
    $endDate: String
    $description: String
    $index: Int
    $resumeId: ID!
  ) {
    addProfessionalExperience(
      jobTitle: $jobTitle
      employer: $employer
      city: $city
      country: $country
      startDate: $startDate
      endDate: $endDate
      description: $description
      index: $index
      resumeId: $resumeId
    ) {
      ...ProfessionalExperienceItemFields
    }
  }
`;

export const UPDATE_PROFESSIONAL_EXPERIENCE = gql`
  ${PROFESSIONAL_EXPERIENCE_FIELDS}
  mutation updateProfessionalExperience(
    $id: ID!
    $jobTitle: String!
    $employer: String
    $city: String
    $country: String
    $startDate: String
    $endDate: String
    $description: String
    $index: Int
  ) {
    updateProfessionalExperience(
      id: $id
      jobTitle: $jobTitle
      employer: $employer
      city: $city
      country: $country
      startDate: $startDate
      endDate: $endDate
      description: $description
      index: $index
    ) {
      ...ProfessionalExperienceItemFields
    }
  }
`;

export const UPDATE_PROFESSIONAL_EXPERIENCE_ORDER = gql`
  ${PROFESSIONAL_EXPERIENCE_FIELDS}
  mutation updateProfessionalExperienceOrder(
    $items: [ProfessionalExperienceOrder]
  ) {
    updateProfessionalExperienceOrder(items: $items) {
      ...ProfessionalExperienceItemFields
    }
  }
`;

export const UPDATE_SECTION_NAME_PROFESSIONAL_EXPERIENCE = gql`
  ${PROFESSIONAL_EXPERIENCE_FIELDS}
  mutation updateSectionNameProfessionalExperience($id: ID! $sectionName: String!) {
    updateSectionNameProfessionalExperience( id: $id sectionName: $sectionName) {
      id
      sectionName
      items {
      ...ProfessionalExperienceItemFields
      }
    }
  }
`;

export const DELETE_PROFESSIONAL_EXPERIENCE = gql`
  mutation deleteProfessionalExperience($id: ID!) {
    deleteProfessionalExperience(id: $id) {
      id
    }
  }
`;
