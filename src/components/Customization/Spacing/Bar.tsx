import Button from '@/components/UI/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import { useSpacingContext } from '@/context/SpacingContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import { removeTypename } from '@/utils/removeTypename';
import { SpacingSections } from '@/utils/types/settingsTypes';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { memo, useContext } from 'react';
import style from './Spacing.module.scss';
import Track from './Track';

type Props = {
  sectionName: SpacingSections;
  currentValue: number;
  values: number[];
};

const Bar = ({ sectionName, currentValue, values }: Props) => {
    // const { updateSpacing } = useUpdateSettings();
    const { settings } = useContext(ResumeContext);
    const {t} = useTranslation(['customization'])
    const [updateSettings] = useMutation(UPDATE_SETTINGS);
    const { spacing } =useSpacingContext();
    const updateSpacing = (section: SpacingSections, value: number) => {
        return updateSettings({
            variables: {
                id: settings?.id,
                spacing: {
                    ...removeTypename(spacing!),
                    [section]: value,
                },
            },
        });
    };

    return (
        <div>
            <div className="flex spaceBetween">
                <h5>{t(sectionName)}</h5>
                <p>
                    {currentValue}
                    {(sectionName === SpacingSections.LEFT_RIGHT_MARGIN ||
            sectionName === SpacingSections.TOP_BOTTOM_MARGIN) &&
            'mm'}
                </p>
            </div>

            <div className={style.container}>
                <div className={style.bar}>
                    <Track
                        sectionName={sectionName}
                        values={values}
                        currentValue={currentValue}
                        updateSpacing={updateSpacing}
                    />
                </div>
                <div className={style.buttons}>
                    <Button
                        btnType="thickBorder"
                        onClick={() =>
                            values.indexOf(currentValue) !== 0 &&
              updateSpacing(
                  sectionName,
                  values[values.indexOf(currentValue) - 1]
              )
                        }
                    >
                        -
                    </Button>
                    <Button
                        btnType="thickBorder"
                        onClick={() =>
                            values.indexOf(currentValue) !== 8 &&
              updateSpacing(
                  sectionName,
                  values[values.indexOf(currentValue) + 1]
              )
                        }
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(Bar);
