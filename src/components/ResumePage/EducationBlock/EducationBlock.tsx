import Dates from '../shared/Dates';
import parse from 'html-react-parser';
import {
    FontStyle,
    Position,
    SubtitlePosition,
} from '@/utils/types/settingsTypes';
import { IEducationItem } from '@/utils/types/contentTypes';
import { ISettings } from '@/utils/types/resumeTypes';
import Block from '../shared/Block';
import { memo } from 'react';
import { useLayoutContext, useSubtitleContext } from '@/context/settings';

type Props = {
  sectionPosition?: Position.LEFT | Position.RIGHT;
  items:IEducationItem[]
  settings: ISettings
};

const EducationBlock = ({ sectionPosition, items, settings}: Props) => {
    const { degreeFirst } = settings?.education!;
    const {layout} = useLayoutContext();
    const {subtitle} = useSubtitleContext();
    const columns = layout?.columns!;
    const subtitleStyle = subtitle?.style;
    const position = subtitle?.position;
    const { date } = settings!;

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
                                { (item.city||item.country)&&<p>
                                    {item.city}{item.country&&','} {item.country}
                                </p>}
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

                                    { (item.city||item.country)&&<p>
                                        {item.city}{item.country&&','} {item.country}
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

export default memo(EducationBlock);
