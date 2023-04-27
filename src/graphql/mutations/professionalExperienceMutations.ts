import { gql } from '@apollo/client';

export const ADD_PROFESSIONAL_EXPERIENCE = gql`
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
      jobTitle
      employer
      city
      country
      startDate
      endDate
      description
      id
    }
  }
`;

export const UPDATE_PROFESSIONAL_EXPERIENCE = gql`
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
      jobTitle
      employer
      city
      country
      startDate
      endDate
      description
      id
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
