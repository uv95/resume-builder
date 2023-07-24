import { useSpacingContext } from '@/context/settings';
import { UPDATE_SPACING } from '@/graphql/mutations/settings/spacing';
import { removeTypename } from '@/utils/removeTypename';
import { SpacingSections } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';

function useUpdateSpacing() {
    const [updateSpacing] = useMutation(UPDATE_SPACING);
    const {spacing}=useSpacingContext()
   
    const updateSpacingSettings = (section: SpacingSections, value: number) => {
        return updateSpacing({
            variables: {
                id: spacing?.id,
                ...removeTypename(spacing!),
                [section]: value,
            },
        });
    };

    return updateSpacingSettings

}

export default useUpdateSpacing;
