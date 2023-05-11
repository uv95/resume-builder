import { gql } from '@apollo/client';

export const ADD_PERSONAL_DETAILS = gql`
  mutation addPersonalDetails(
    $fullName: String!
    $jobTitle: String!
    $email: String
    $phone: String
    $address: String
    $additionalInfo: [AdditionalInfoInput]
    $resumeId: ID!
  ) {
    addPersonalDetails(
      fullName: $fullName
      jobTitle: $jobTitle
      email: $email
      phone: $phone
      address: $address
      additionalInfo: $additionalInfo
      resumeId: $resumeId
    ) {
      fullName
      jobTitle
      email
      phone
      address
      additionalInfo {
        input
        name
      }
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
    $additionalInfo: [AdditionalInfoUpdate]
  ) {
    updatePersonalDetails(
      id: $id
      fullName: $fullName
      jobTitle: $jobTitle
      email: $email
      phone: $phone
      address: $address
      additionalInfo: $additionalInfo
    ) {
      fullName
      jobTitle
      email
      phone
      address
      additionalInfo {
        input
        name
      }
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
