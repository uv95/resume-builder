import Button from '@/components/UI/Button/Button';
import { useLayoutContext } from '@/context/LayoutContext';
import useUpdateLayout from '@/hooks/settings/useUpdateLayout';
import { Position } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import style from './Layout.module.scss';

const PositionComponent = () => {
    const { layout } = useLayoutContext();
    const position = layout?.position;
    const { updatePosition } = useUpdateLayout();
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
