import { useSubtitleContext } from '@/context/settings';
import { UPDATE_SUBTITLE } from '@/graphql/mutations/settings/subtitle';
import { ISubtitle } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';

function useUpdateSubtitle() {
    const [updateSubtitle] = useMutation(UPDATE_SUBTITLE);   
    const {subtitle}= useSubtitleContext();
    const subtitleId = subtitle?.id
   
    const updateSubtitleSettings = (subtitle: ISubtitle) =>
        updateSubtitle({
            variables: {
                ...subtitle,
                id: subtitleId,
            },
        });
    
    return updateSubtitleSettings
}

export default useUpdateSubtitle;
