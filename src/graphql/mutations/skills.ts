import { gql } from '@apollo/client';
import { SKILLS_FIELDS } from '../fragments/content';

export const ADD_SKILL = gql`
  ${SKILLS_FIELDS}
  mutation addSkill(
    $skill: String!
    $info: String
    $skillLevel: SkillLevel
    $index: Int
    $resumeId: ID!
  ) {
    addSkill(
      skill: $skill
      info: $info
      skillLevel: $skillLevel
      index: $index
      resumeId: $resumeId
    ) {
      ...SkillsItemFields
    }
  }
`;

export const UPDATE_SKILL = gql`
  ${SKILLS_FIELDS}
  mutation updateSkill(
    $id: ID!
    $skill: String!
    $info: String
    $skillLevel: SkillLevelUpdate
    $index: Int
  ) {
    updateSkill(
      id: $id
      skill: $skill
      info: $info
      skillLevel: $skillLevel
      index: $index
    ) {
      ...SkillsItemFields
    }
  }
`;

export const UPDATE_SKILLS_ORDER = gql`
  ${SKILLS_FIELDS}
  mutation updateSkillsOrder($items: [SkillsOrder]) {
    updateSkillsOrder(items: $items) {
      ...SkillsItemFields
    }
  }
`;

export const UPDATE_SECTION_NAME_SKILLS = gql`
  mutation updateSectionNameSkills($id: ID! $sectionName: String!) {
    updateSectionNameSkills( id: $id sectionName: $sectionName) {
      id
      sectionName
      items
    }
  }
`;

export const DELETE_SKILL = gql`
  mutation deleteSkill($id: ID!) {
    deleteSkill(id: $id) {
      id
    }
  }
`;
