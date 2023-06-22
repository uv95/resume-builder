import style from './Layout.module.scss';
import React, { useContext } from 'react';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSettings from '@/hooks/useUpdateSettings';
import Button from '@/components/Button/Button';
import { Position } from '@/utils/types/settingsTypes';

const PositionComponent = () => {
    const { resume } = useContext(ResumeContext);
    const { position } = resume?.settings.layout!;
    const { updatePosition } = useUpdateSettings();

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
                    <p>{positionItem[0].toUpperCase() + positionItem.slice(1)}</p>
                </div>
            ))}
        </div>
    );
};

export default PositionComponent;
