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
      resumeId: $resumeId
    ) {
      ...ProfessionalExperienceFields
    }
  }
`;

export const UPDATE_PROFESSIONAL_EXPERIENCE = gql`
  ${PROFESSIONAL_EXPERIENCE_FIELDS}
  mutation updateProfessionalExperience(
    $id: ID!
    $jobTitle: String
    $employer: String
    $city: String
    $country: String
    $startDate: String
    $endDate: String
    $description: String
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
    ) {
      ...ProfessionalExperienceFields
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
