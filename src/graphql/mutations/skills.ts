import { gql } from '@apollo/client';
import { SKILLS_FIELDS } from '../fragments/content';

export const ADD_SKILL = gql`
  ${SKILLS_FIELDS}
  mutation addSkill(
    $skill: String!
    $info: String
    $skillLevel: SkillLevel
    $resumeId: ID!
  ) {
    addSkill(
      skill: $skill
      info: $info
      skillLevel: $skillLevel
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
    $skill: String
    $info: String
    $skillLevel: SkillLevelUpdate
  ) {
    updateSkill(id: $id, skill: $skill, info: $info, skillLevel: $skillLevel) {
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
