import DetailsIcons from '@/components/DetailsIcons';
import Button from '@/components/UI/Button/Button';
import { useHeaderContext } from '@/context/settings';
import useUpdateHeader from '@/hooks/settings/useUpdateHeader';
import { removeTypename } from '@/utils/removeTypename';
import {
    HeaderAdditionalInfoStyle,
    HeaderPosition
} from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import Section from '../shared/Section';
import SettingsButtons from '../shared/SettingsButtons';
import SettingsCard from '../shared/SettingsCard';
import SmileIcon from './SmileIcon';

const Header = () => {
    const {t} = useTranslation(['customization'])

    const { header } = useHeaderContext();
    const additionalInfoOrder = header?.additionalInfoOrder;
    const additionalInfoStyle = header?.additionalInfoStyle;
    const position = header?.position;

    const updateHeader = useUpdateHeader();
    const [values, setValues] = useState(
        removeTypename(header!)
    );
    const update = (
        updatedField: 'additionalInfoStyle' | 'position',
        newVal: string
    ) =>
        updateHeader({
            ...values,
            [updatedField]: newVal,
        });

    return (
        <SettingsCard title={t('header')}>
            <SettingsButtons
                options={Object.values(HeaderPosition)}
                updatedField="position"
                allValues={values}
                setValues={setValues}
                update={update}
            />

            <Section title={t('details-style')}>
                <div className="flex">
                    {Object.values(HeaderAdditionalInfoStyle).map((detailsStyle) => (
                        <Button
                            key={detailsStyle}
                            btnType="customization"
                            isActive={additionalInfoStyle === detailsStyle}
                            onClick={() =>
                                updateHeader({
                                    additionalInfoOrder,
                                    position,
                                    additionalInfoStyle: detailsStyle,
                                })
                            }
                        >
                            <div
                                className="flex gap-05 centered"
                                style={{
                                    minWidth: '6rem',
                                }}
                            >
                                {detailsStyle === HeaderAdditionalInfoStyle.ICON ? (
                                    <SmileIcon
                                        fill={
                                            additionalInfoStyle === HeaderAdditionalInfoStyle.ICON
                                                ? 'rgb(33, 72, 200)'
                                                : 'rgb(75, 75, 75)'
                                        }
                                    />
                                ) : (
                                    <p style={{ marginBottom: '0.2rem' }}>|</p>
                                )}
                                <p>{t(detailsStyle)}</p>
                            </div>
                        </Button>
                    ))}
                </div>
            </Section>

            {additionalInfoOrder && additionalInfoOrder.length !== 0 && (
                <Section title={t('change-order')}>
                    <div className="flex">
                        {additionalInfoOrder.map((info) => (
                            <Button key={info} btnType="gray" onClick={() => {}}>
                                <div className="centered" style={{ height: '2.5rem' }}>
                                    <DetailsIcons
                                        fill="rgb(75, 75, 75)"
                                        size={15}
                                        dataName={info}
                                    />
                                </div>
                            </Button>
                        ))}
                    </div>
                </Section>
            )}
        </SettingsCard>
    );
};

export default Header;
