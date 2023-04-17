import { gql } from '@apollo/client';

export const ADD_SKILL = gql`
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
      skill
      info
      skillLevel
    }
  }
`;

export const UPDATE_SKILL = gql`
  mutation updateSkill(
    $id: ID!
    $skill: String
    $info: String
    $skillLevel: SkillLevelUpdate
  ) {
    updateSkill(id: $id, skill: $skill, info: $info, skillLevel: $skillLevel) {
      skill
      info
      skillLevel
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
