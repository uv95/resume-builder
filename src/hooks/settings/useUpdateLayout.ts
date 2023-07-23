import { useLayoutContext } from '@/context/LayoutContext';
import { UPDATE_LAYOUT } from '@/graphql/mutations/settings/layout';
import { removeTypename } from '@/utils/removeTypename';
import { Position } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';

function useUpdateLayout() {
    const [updateLayout] = useMutation(UPDATE_LAYOUT);
    const {layout}=useLayoutContext()
   
    const updatePosition = (position: Position, columns: number) => {
        return updateLayout({
            variables: {
                id: layout?.id,
                ...removeTypename(layout),
                position,
                columns,
               
            },
        });
    };

    const updateColumns = (columns: 1 | 2) => {
        return updateLayout({
            variables: {
                id: layout?.id,
                ...removeTypename(layout),
                columns 
            },
        });
    };

    const updateColumnWidth = (left: number, right: number) => {
        return updateLayout({
            variables: {
                id: layout?.id,
                ...removeTypename(layout),
                columnWidth: { left, right },
            },
        });
    };

    return {
        updatePosition,
        updateColumns,
        updateColumnWidth
    };
}

export default useUpdateLayout;
