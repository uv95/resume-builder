import style from './Layout.module.scss';
import React, { memo, useContext } from 'react';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import Button from '@/components/UI/Button/Button';
import { Position } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';

const PositionComponent = () => {
    const { settings } = useContext(ResumeContext);
    const { position } = settings?.layout!;
    const { updatePosition } = useUpdateSettings();
    const {t} = useTranslation(['customization'])

    return (
        <div className="flex">
            {Object.values(Position).map((positionItem) => (
                <div
                    key={positionItem}
                    className={style.position}
                    onClick={() =>
                        updatePosition(positionItem, positionItem === Position.TOP ? 1 : 2)
                    }
                >
                    <Button
                        btnType="customization"
                        isActive={position === positionItem}
                        className={`${style.figure} ${
                            position === positionItem
                                ? style[`${positionItem}_active`]
                                : style[positionItem]
                        }`}
                    />
                    <p>{t(positionItem)}</p>
                </div>
            ))}
        </div>
    );
};

export default memo(PositionComponent);
