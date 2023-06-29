import Button from '@/components/UI/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import { UPDATE_SETTINGS } from '@/graphql/mutations/settings';
import { useMutation } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import style from './Layout.module.scss';
import { useTranslation } from 'next-i18next';

const ColumnWidth = () => {
    const {t} = useTranslation(['customization'])

    const { settings } = useContext(ResumeContext);
    const [updateSettings] = useMutation(UPDATE_SETTINGS);

    const [left, setLeft] = useState(
        settings?.layout.columnWidth.left || 50
    );
    const [right, setRight] = useState(
        settings?.layout.columnWidth.right || 50
    );

    useEffect(() => {
        const updateColumnWidth = (left: number, right: number) => {
            const { position, columns } = settings?.layout!;
            return updateSettings({
                variables: {
                    id: settings?.id,
                    layout: {
                        position,
                        columns,
                        columnWidth: { left, right },
                    },
                },
            });
        };

        updateColumnWidth(left, right);
    }, [
        left,
        right,
        settings?.id,
        settings?.layout,
        updateSettings,
    ]);

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
                        }}
                    >
                        +
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ColumnWidth;
