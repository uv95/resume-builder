import Dates from '../shared/Dates';
import parse from 'html-react-parser';
import { Position } from '@/utils/types/settingsTypes';
import { IProjectItem } from '@/utils/types/contentTypes';
import { ISettings } from '@/utils/types/resumeTypes';
import Block from '../shared/Block';
import { memo } from 'react';
import { useLayoutContext } from '@/context/settings';

type Props = {
  sectionPosition?: Position.LEFT | Position.RIGHT;
  items:IProjectItem[];
  settings: ISettings
};

const ProjectBlock = ({ sectionPosition, items, settings }: Props) => {
    const {layout} = useLayoutContext();
    const columns = layout?.columns!;
    const { date } = settings!;

    return (
        <>
            {items.map((item) => (
                <div key={item.id} style={{marginBottom:"1rem"}}>
                    <Block columns={columns}>
                        {item.startDate && columns === 1 && (
                            <Dates
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
                                    format={date}
                                    startDate={item.startDate}
                                    endDate={item.endDate}
                                    sectionPosition={sectionPosition}
                                />
                            )}
                            <div>{parse(item.description)}</div>
                        </div>
                    </Block>
                </div>
            ))}
        </>
    );
};

export default memo(ProjectBlock);
