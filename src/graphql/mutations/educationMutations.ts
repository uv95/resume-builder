import { gql } from '@apollo/client';

export const ADD_EDUCATION = gql`
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
      degree
      school
      city
      country
      startDate
      endDate
      description
      id
    }
  }
`;

export const UPDATE_EDUCATION = gql`
  mutation updateEducation(
    $id: ID!
    $degree: String
    $school: String
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
      degree
      school
      city
      country
      startDate
      endDate
      description
      id
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
