import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';
import parse from 'html-react-parser';
import style from '../Page.module.scss';
import {
    FontStyle,
    Position,
    SubtitlePosition,
} from '@/utils/types/settingsTypes';

type Props = {
  sectionPosition?: Position.LEFT | Position.RIGHT;
};

const EducationBlock = ({ sectionPosition }: Props) => {
    const { resume } = useContext(ResumeContext);
    const content = resume?.content.education.items;
    const { degreeFirst } = resume?.settings.education!;
    const { columns } = resume?.settings.layout!;
    const { style: subtitleStyle, position } = resume?.settings.subtitle!;
    const { date } = resume?.settings!;

    const subtitlePositionStyle = {
        display: position === SubtitlePosition.SAME_LINE ? 'inline' : 'block',
    };
    const contentStyle = { display: columns === 1 ? 'grid' : 'block' };

    return (
        <>
            {content &&
        content.map((item) => (
            <div key={item.id} className={style.item}>
                <div className={style.content} style={contentStyle}>
                    {columns === 1 && (
                        <div>
                            {item.startDate && (
                                <Dates
                                    format={date}
                                    startDate={item.startDate}
                                    endDate={item.endDate}
                                    sectionPosition={sectionPosition}
                                />
                            )}
                            <p>
                                {item.city}, {item.country}
                            </p>
                        </div>
                    )}
                    <div>
                        <b style={subtitlePositionStyle}>
                            {degreeFirst ? item.degree : item.school}
                            {position === SubtitlePosition.SAME_LINE && ', '}
                        </b>

                        <p
                            style={{
                                fontWeight:
                      subtitleStyle === FontStyle.BOLD ? 'bold' : 'normal',
                                fontStyle:
                      subtitleStyle === FontStyle.ITALIC ? 'italic' : 'normal',
                                ...subtitlePositionStyle,
                            }}
                        >
                            {degreeFirst ? item.school : item.degree}

                            {position === SubtitlePosition.SAME_LINE &&
                    !degreeFirst &&
                    ', '}
                        </p>
                    </div>
                </div>
                {columns === 2 && (
                    <div>
                        {item.startDate && (
                            <Dates
                                format={date}
                                startDate={item.startDate}
                                endDate={item.endDate}
                                sectionPosition={sectionPosition}
                            />
                        )}

                        <p>
                            {item.city}, {item.country}
                        </p>
                    </div>
                )}
                <div>{parse(item.description)}</div>
            </div>
        ))}
        </>
    );
};

export default EducationBlock;
