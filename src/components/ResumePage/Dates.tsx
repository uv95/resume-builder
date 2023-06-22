import useSetColor from '@/hooks/useSetColor';
import {
    AccentColorSections,
    ColorOf,
    IDate,
    Position,
} from '@/utils/types/settingsTypes';
import React from 'react';

type Props = {
  startDate: string;
  endDate: string;
  sectionPosition?: Position.LEFT | Position.RIGHT;
  format: IDate;
};

const Dates = ({ startDate, endDate, sectionPosition, format }: Props) => {
    const { setColor } = useSetColor();
    const formatDate = (date: string) => {
        const newDate = new Date(date).toLocaleString('default', {
            month: format.month === 'digits' ? '2-digit' : format.month,
            year: 'numeric',
        });

        if (format.month === 'digits')
            return newDate.split('/').join(format.delimiter[0]);

        return newDate;
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

export default Dates;
