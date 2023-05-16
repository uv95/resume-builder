import { gql } from '@apollo/client';

export const UPDATE_SETTINGS = gql`
  mutation updateSettings(
    $id: ID!
    $sectionsOrder: SectionsOrderInput
    $layout: LayoutInput
  ) {
    updateSettings(id: $id, sectionsOrder: $sectionsOrder, layout: $layout) {
      id
      sectionsOrder {
        top
        left
        right
      }
      layout {
        columns
        position
        columnWidth {
          left
          right
        }
      }
    }
  }
`;
