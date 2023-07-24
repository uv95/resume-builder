import { useHeaderContext } from '@/context/settings';
import { UPDATE_HEADER } from '@/graphql/mutations/settings/header';
import { IHeader } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';

function useUpdateHeader() {
    const [updateHeader] = useMutation(UPDATE_HEADER);
    const {header}=useHeaderContext()
    const headerId = header?.id
   
    const updateHeaderSettings = (header: Partial<IHeader>) =>
        updateHeader({
            variables: {
                ...header,
                id: headerId
            },
        });

    return updateHeaderSettings
    
}

export default useUpdateHeader;
