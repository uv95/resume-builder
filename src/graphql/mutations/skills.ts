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
      ...SkillsFields
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
      ...SkillsFields
    }
  }
`;

export const UPDATE_ALL_SKILLS = gql`
  ${SKILLS_FIELDS}
  mutation updateAllSkills($items: [SkillsTypeAll]) {
    updateAllSkills(items: $items) {
      ...SkillsFields
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
