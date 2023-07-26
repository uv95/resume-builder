import Button from '@/components/UI/Button/Button';
import { useLayoutContext } from '@/context/settings';
import useUpdateLayout from '@/hooks/settings/useUpdateLayout';
import { Position } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { memo } from 'react';
import style from './Layout.module.scss';

const Columns = () => {
    const {t} = useTranslation(['customization'])

    const { layout } = useLayoutContext();
    const columns = layout?.columns;
    const position = layout?.position;
    const { updateColumns } = useUpdateLayout();

    return (
        <div>
            <h5 className="mb-1">{t('columns')}</h5>
            <div className="flex">
                {position === Position.TOP && (
                    <Button
                        btnType="customization"
                        isActive={columns === 1}
                        className={`${
                            columns === 1 ? style.columns_active : style.columns
                        }`}
                        onClick={() => updateColumns(1)}
                    >
                        <div className={style.columns_container__one}>
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className={style.line}></div>
                            ))}
                        </div>
                    </Button>
                )}
                <Button
                    btnType="customization"
                    isActive={columns === 2}
                    className={`${columns === 2 ? style.columns_active : style.columns}`}
                    onClick={() => updateColumns(2)}
                >
                    <div className={style.columns_container__two}>
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className={style.line}></div>
                        ))}
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default memo(Columns);
