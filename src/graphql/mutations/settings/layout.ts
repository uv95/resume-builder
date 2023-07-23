import { LAYOUT_FIELDS } from '@/graphql/fragments/settings';
import { gql } from '@apollo/client';

export const UPDATE_LAYOUT = gql`
  ${LAYOUT_FIELDS}
  mutation updateLayout(
    $id: ID!
    $columns: Int
    $position: Position
    $columnWidth: ColumnWidthInput
  ) {
    updateLayout(
      id: $id
      columns: $columns
      position: $position
      columnWidth: $columnWidth
    ) {
      ...LayoutFields
    }
  }
`;