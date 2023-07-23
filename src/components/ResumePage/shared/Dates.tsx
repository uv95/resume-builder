import useSetColor from '@/hooks/useSetColor';
import { capitalizeFirstLetter } from '@/utils/capitalizeFirstLetter';
import { ISettings } from '@/utils/types/resumeTypes';
import {
    AccentColorSections,
    ColorOf,
    IDate,
    Position,
} from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';

type Props = {
  startDate: string;
  endDate: string;
  sectionPosition?: Position.LEFT | Position.RIGHT;
  format: IDate;
  settings:ISettings
};

const Dates = ({ startDate, endDate, sectionPosition, format,settings }: Props) => {
    const {i18n} = useTranslation()

    const { setColor } = useSetColor(settings);
    const formatDate = (date: string) => {
        const newDate = new Date(date).toLocaleString(i18n.language==='en'? 'en-US':'ru-RU', {
            month: format.month === 'digits' ? '2-digit' : format.month,
            year: 'numeric',
        });

        if (format.month === 'digits')
            return newDate.split('/').join(format.delimiter[0]);

        return capitalizeFirstLetter(newDate);
    };

    return (
        <div
            className="flex"
            style={{
                color: setColor({
                    section: AccentColorSections.DATES,
                    colorOf: ColorOf.FONT,
                    sectionPosition,
                }),
            }}
        >
            <p>
                {formatDate(startDate)} - {formatDate(endDate)}
            </p>
        </div>
    );
};

export default memo(Dates);
