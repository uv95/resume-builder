import { useHeadingContext } from '@/context/settings';
import { UPDATE_HEADING } from '@/graphql/mutations/settings/heading';
import { IHeading } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';

function useUpdateHeading() {
    const [updateHeading] = useMutation(UPDATE_HEADING);
    const {heading} = useHeadingContext();
    const headingId = heading?.id;
   
    const updateHeadingSettings = (heading: Partial<IHeading>) =>
        updateHeading({
            variables: {
                ...heading,
                id: headingId,
            },
        });

    return updateHeadingSettings
}

export default useUpdateHeading;
