import { gql } from '@apollo/client';
import { EDUCATION_FIELDS } from '../fragments/content';

export const ADD_EDUCATION = gql`
  ${EDUCATION_FIELDS}
  mutation addEducation(
    $degree: String!
    $school: String!
    $city: String
    $country: String
    $startDate: String
    $endDate: String
    $description: String
    $resumeId: ID!
  ) {
    addEducation(
      degree: $degree
      school: $school
      city: $city
      country: $country
      startDate: $startDate
      endDate: $endDate
      description: $description
      resumeId: $resumeId
    ) {
      ...EducationFields
    }
  }
`;

export const UPDATE_EDUCATION = gql`
  ${EDUCATION_FIELDS}
  mutation updateEducation(
    $id: ID!
    $degree: String!
    $school: String!
    $city: String
    $country: String
    $startDate: String
    $endDate: String
    $description: String
  ) {
    updateEducation(
      id: $id
      degree: $degree
      school: $school
      city: $city
      country: $country
      startDate: $startDate
      endDate: $endDate
      description: $description
    ) {
      ...EducationFields
    }
  }
`;

export const DELETE_EDUCATION = gql`
  mutation deleteEducation($id: ID!) {
    deleteEducation(id: $id) {
      id
    }
  }
`;
