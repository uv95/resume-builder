import { useColorsContext } from '@/context/ColorsContext';
import { UPDATE_COLORS } from '@/graphql/mutations/settings/colors';
import { removeTypename } from '@/utils/removeTypename';
import {
    ColorOption,
    IAdvancedMulticolor,
    IBasicMulticolor, Mode
} from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';

function useUpdateColors() {
    const [updateColors] = useMutation(UPDATE_COLORS);
    const { colors } = useColorsContext();

    const updateMode = (mode: Mode) => {
        return updateColors({
            variables: {
                id: colors?.id,
                ...removeTypename(colors!),
                mode,
            },
        });
    };

    const selectOption = (option: ColorOption, mode: Mode) => {
        return updateColors({
            variables: {
                id: colors?.id,
                ...removeTypename(colors!),
                [mode]: {
                    ...removeTypename(colors![mode]),
                    selected: option,
                },
            },
        });
    };

    const updateAccentColor = (accent: string, mode: Mode) => {
        return updateColors({
            variables: {
                id: colors?.id,
                ...removeTypename(colors!),
                [mode]: { ...removeTypename(colors![mode]), accent },
            },
        });
    };

    const updateMulticolor = (
        multicolor: IAdvancedMulticolor | IBasicMulticolor,
        mode: Mode
    ) => {
        return updateColors({
            variables: {
                id: colors?.id,
                ...removeTypename(colors!),
                [mode]: {
                    ...removeTypename(colors![mode]),
                    multicolor,
                },
            },
        });
    };

    return {
        updateMode,
        selectOption,
        updateAccentColor,
        updateMulticolor,
    };
}

export default useUpdateColors;
