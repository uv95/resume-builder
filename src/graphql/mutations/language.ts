import { gql } from '@apollo/client';
import { LANGUAGE_FIELDS } from '../fragments/content';

export const ADD_LANGUAGE = gql`
  ${LANGUAGE_FIELDS}
  mutation addLanguage(
    $language: String!
    $info: String
    $languageLevel: LanguageLevel
    $index: Int
    $resumeId: ID!
  ) {
    addLanguage(
      language: $language
      info: $info
      languageLevel: $languageLevel
      index: $index
      resumeId: $resumeId
    ) {
      ...LanguageItemFields
    }
  }
`;

export const UPDATE_LANGUAGE = gql`
  ${LANGUAGE_FIELDS}
  mutation updateLanguage(
    $id: ID!
    $language: String!
    $info: String
    $languageLevel: LanguageLevelUpdate
    $index: Int
  ) {
    updateLanguage(
      id: $id
      language: $language
      info: $info
      languageLevel: $languageLevel
      index: $index
    ) {
      ...LanguageItemFields
    }
  }
`;

export const UPDATE_LANGUAGES_ORDER = gql`
  ${LANGUAGE_FIELDS}
  mutation updateLanguagesOrder($items: [LanguagesOrder]) {
    updateLanguagesOrder(items: $items) {
      ...LanguageItemFields
    }
  }
`;

export const UPDATE_SECTION_NAME_LANGUAGE = gql`
  mutation updateSectionNameLanguage($id: ID! $sectionName: String!) {
    updateSectionNameLanguage( id: $id sectionName: $sectionName) {
      id
      sectionName
      items
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
