import Button from '@/components/UI/Button/Button';
import useUpdateSpacing from '@/hooks/settings/useUpdateSpacing';
import { SpacingSections } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import style from './Spacing.module.scss';
import Track from './Track';

type Props = {
  sectionName: SpacingSections;
  currentValue: number;
  values: number[];
};

const Bar = ({ sectionName, currentValue, values }: Props) => {
    const {updateSpacingSettings}=useUpdateSpacing()
    const {t} = useTranslation(['customization'])

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
                        updateSpacing={updateSpacingSettings}
                    />
                </div>
                <div className={style.buttons}>
                    <Button
                        btnType="thickBorder"
                        onClick={() =>
                            values.indexOf(currentValue) !== 0 &&
                            updateSpacingSettings(
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
                            updateSpacingSettings(
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
