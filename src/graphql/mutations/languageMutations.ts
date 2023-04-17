import { gql } from '@apollo/client';

export const ADD_LANGUAGE = gql`
  mutation addLanguage(
    $language: String!
    $info: String
    $languageLevel: LanguageLevel
    $resumeId: ID!
  ) {
    addLanguage(
      language: $language
      info: $info
      languageLevel: $languageLevel
      resumeId: $resumeId
    ) {
      language
      info
      languageLevel
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  mutation updateLanguage(
    $id: ID!
    $language: String
    $info: String
    $languageLevel: LanguageLevelUpdate
  ) {
    updateLanguage(
      id: $id
      language: $language
      info: $info
      languageLevel: $languageLevel
    ) {
      language
      info
      languageLevel
    }
  }
`;

export const DELETE_LANGUAGE = gql`
  mutation deleteLanguage($id: ID!) {
    deleteLanguage(id: $id) {
      id
    }
  }
`;
