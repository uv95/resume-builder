import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Dates from '../Dates';
import parse from 'html-react-parser';
import style from '../Page.module.scss';
import { Position } from '@/utils/types/settingsTypes';
import {  IProjectItem } from '@/utils/types/contentTypes';
import { ISettings } from '@/utils/types/resumeTypes';

type Props = {
  sectionPosition?: Position.LEFT | Position.RIGHT;
  items:IProjectItem[];
  settings: ISettings
};

const ProjectBlock = ({ sectionPosition,items, settings }: Props) => {
    // const { settings } = useContext(ResumeContext);
    const { columns } = settings?.layout!;
    const { date } = settings!;

    const contentStyle = { display: columns === 1 ? 'grid' : 'block' };

    return (
        <>
            {items.map((item) => (
                <div key={item.id} className={style.item}>
                    <div className={style.content} style={contentStyle}>
                        {item.startDate && columns === 1 && (
                            <Dates
                                settings={settings}
                                format={date}
                                startDate={item.startDate}
                                endDate={item.endDate}
                                sectionPosition={sectionPosition}
                            />
                        )}
                        <div>
                            <b>{item.title}</b>
                            {item.startDate && columns === 2 && (
                                <Dates
                                    settings={settings}
                                    format={date}
                                    startDate={item.startDate}
                                    endDate={item.endDate}
                                    sectionPosition={sectionPosition}
                                />
                            )}
                            <div>{parse(item.description)}</div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default ProjectBlock;
