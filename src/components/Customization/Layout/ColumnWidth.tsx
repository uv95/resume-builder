import Button from '@/components/UI/Button/Button';
import { useLayoutContext } from '@/context/settings';
import useUpdateLayout from '@/hooks/settings/useUpdateLayout';
import { useTranslation } from 'next-i18next';
import React, { memo, useState } from 'react';
import style from './Layout.module.scss';

const ColumnWidth = () => {
    const {t} = useTranslation(['customization'])

    const { layout } = useLayoutContext();
    const {updateColumnWidth}=useUpdateLayout()

    const [left, setLeft] = useState(
        layout?.columnWidth.left || 50
    );
    const [right, setRight] = useState(
        layout?.columnWidth.right || 50
    );

    return (
        <div>
            <h5>{t('column-width')}</h5>
            <div className={style.columnWidth}>
                <div className={style.columnWidth_options}>
                    <p>{t('left')} {left}%</p>
                    <Button
                        btnType="thinBorder"
                        onClick={() => {
                            setLeft((prev) => prev + 1);
                            setRight((prev) => prev - 1);
                            updateColumnWidth(left, right);

                        }}
                    >
                        +
                    </Button>
                </div>
                <div className={style.columnWidth_options}>
                    <p>{t('right')} {right}%</p>
                    <Button
                        btnType="thinBorder"
                        onClick={() => {
                            setRight((prev) => prev + 1);
                            setLeft((prev) => prev - 1);
                            updateColumnWidth(left, right);

                        }}
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(ColumnWidth);
