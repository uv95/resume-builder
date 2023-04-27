import { gql } from '@apollo/client';

export const ADD_PERSONAL_DETAILS = gql`
  mutation addPersonalDetails(
    $fullName: String!
    $jobTitle: String!
    $email: String
    $phone: String
    $address: String
    $resumeId: ID!
  ) {
    addPersonalDetails(
      fullName: $fullName
      jobTitle: $jobTitle
      email: $email
      phone: $phone
      address: $address
      resumeId: $resumeId
    ) {
      fullName
      jobTitle
      email
      phone
      address
      id
    }
  }
`;

export const UPDATE_PERSONAL_DETAILS = gql`
  mutation updatePersonalDetails(
    $id: ID!
    $fullName: String
    $jobTitle: String
    $email: String
    $phone: String
    $address: String
  ) {
    updatePersonalDetails(
      id: $id
      fullName: $fullName
      jobTitle: $jobTitle
      email: $email
      phone: $phone
      address: $address
    ) {
      fullName
      jobTitle
      email
      phone
      address
      id
    }
  }
`;

export const DELETE_PERSONAL_DETAILS = gql`
  mutation deletePersonalDetails($id: ID!) {
    deletePersonalDetails(id: $id) {
      id
    }
  }
`;
