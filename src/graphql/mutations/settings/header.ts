import { HEADER_FIELDS } from '@/graphql/fragments/settings';
import { gql } from '@apollo/client';

export const UPDATE_HEADER = gql`
  ${HEADER_FIELDS}
  mutation updateHeader(
    $id: ID!
    $position: HeaderPositionType
    $additionalInfoStyle: AdditionalInfoStyleType
    $additionalInfoOrder: [String]
  ) {
    updateHeader(
      id: $id
      position: $position
      additionalInfoStyle: $additionalInfoStyle
      additionalInfoOrder: $additionalInfoOrder
    ) {
      ...HeaderFields
    }
  }
`;