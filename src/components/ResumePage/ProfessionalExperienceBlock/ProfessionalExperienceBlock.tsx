import Dates from '../shared/Dates';
import parse from 'html-react-parser';
import {
    FontStyle,
    Position,
    SubtitlePosition,
} from '@/utils/types/settingsTypes';
import { IProfessionalExperienceItem } from '@/utils/types/contentTypes';
import { ISettings } from '@/utils/types/resumeTypes';
import Block from '../shared/Block';
import { memo } from 'react';
import { useLayoutContext } from '@/context/LayoutContext';

type Props = {
  sectionPosition?: Position.LEFT | Position.RIGHT;
  items:IProfessionalExperienceItem[]
  settings: ISettings
};

const ProfessionalExperienceBlock = ({ sectionPosition,items,settings }: Props) => {
    const { style: subtitleStyle, position } = settings?.subtitle!;
    const {layout} = useLayoutContext();
    const  columns  = layout?.columns!;
    const { date } = settings!;
    const { jobTitleFirst } = settings?.professionalExperience!;

    const subtitlePositionStyle = {
        display: position === SubtitlePosition.SAME_LINE ? 'inline' : 'block',
    };
    return (
        <>
            {items.map((item) => (
                <div key={item.id} style={{marginBottom:"1rem"}}>
                    <Block columns={columns}>
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
                                {(item.city|| item.country) && <p>
                                    {item.city}, {item.country}
                                </p>}
                            </div>
                        )}
                        <div>
                            <b style={subtitlePositionStyle}>
                                {jobTitleFirst ? item.jobTitle : item.employer}
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
                                {jobTitleFirst ? item.employer : item.jobTitle}
                                {position === SubtitlePosition.SAME_LINE &&
                    !jobTitleFirst &&
                    ', '}
                            </p>
                            
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

                                    {(item.city|| item.country) && <p>
                                        {item.city}, {item.country}
                                    </p>}
                                </div>
                            )}
                            <div>{parse(item.description)}</div>
                        </div>
                    </Block>
                </div>
            ))}
        </>
    );
};

export default memo(ProfessionalExperienceBlock);
