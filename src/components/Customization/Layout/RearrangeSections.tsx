import Card from '@/components/UI/Card/Card';
import { ResumeContext } from '@/context/ResumeContext';
import { getSectionIcon } from '@/utils/getSectionIcon';
import Image from 'next/image';
import React, { memo, useContext } from 'react';
import DraggableCard from './DraggableCard';
import style from './Layout.module.scss';
import user from '../../../icons/user.svg';
import { Position } from '@/utils/types/settingsTypes';
import { useTranslation } from 'next-i18next';
import { useLayoutContext } from '@/context/LayoutContext';

type Props = {
  setInitialColumn: React.Dispatch<React.SetStateAction<Position | undefined>>;
  setPreviousColumn: React.Dispatch<React.SetStateAction<Position | undefined>>;
  previousColumn: Position | undefined;
  setInitialCard: React.Dispatch<React.SetStateAction<string>>;
  initialCard: string;
  sectionsOrder: any;
};

const RearrangeSections = ({
    setInitialColumn,
    setPreviousColumn,
    previousColumn,
    setInitialCard,
    initialCard,
    sectionsOrder,
}: Props) => {
    const {t} = useTranslation(['customization'])

    const { layout } = useLayoutContext();
    const columns = layout?.columns;
    const  position = layout?.position;
    
    return (
        <div>
            <h5 className="mb-1">{t('rearrange')}</h5>

            {/* TOP / 1 column */}
            {position === Position.TOP && (
                <div id={Position.TOP} className="flex-column gap-1">
                    <Card gray>
                        <div className="p-2 centered">
                            <Image src={user} width="20" height="20" alt="icon" />
                        </div>
                    </Card>
                    {/* TOP */}
                    {columns === 1 &&
            sectionsOrder.top.map((section: string) => (
                <DraggableCard
                    key={section}
                    section={section}
                    sectionsOrder={sectionsOrder.top}
                    icon={getSectionIcon(section)}
                    setInitialColumn={setInitialColumn}
                    setPreviousColumn={setPreviousColumn}
                    previousColumn={previousColumn}
                    setInitialCard={setInitialCard}
                    initialCard={initialCard}
                    column={Position.TOP}
                />
            ))}
                </div>
            )}

            {/* 2 columns */}
            {columns === 2 && (
                <div id="columnsArea" className={style.rearrangeSections}>
                    <div id={Position.LEFT} className={style.rearrangeSections_column}>
                        {position === Position.LEFT && (
                            <Card gray>
                                <div className="p-2 centered">
                                    <Image src={user} width="20" height="20" alt="icon" />
                                </div>
                            </Card>
                        )}
                        {sectionsOrder.left.map((section: string) => (
                            <DraggableCard
                                key={section}
                                section={section}
                                sectionsOrder={sectionsOrder.left}
                                icon={getSectionIcon(section)}
                                column={Position.LEFT}
                                setInitialColumn={setInitialColumn}
                                setInitialCard={setInitialCard}
                                initialCard={initialCard}
                                setPreviousColumn={setPreviousColumn}
                                previousColumn={previousColumn}
                            />
                        ))}
                    </div>

                    <div id={Position.RIGHT} className={style.rearrangeSections_column}>
                        {position === Position.RIGHT && (
                            <Card gray>
                                <div className="p-2 centered">
                                    <Image src={user} width="20" height="20" alt="icon" />
                                </div>
                            </Card>
                        )}
                        {sectionsOrder.right.map((section: string) => (
                            <DraggableCard
                                key={section}
                                section={section}
                                sectionsOrder={sectionsOrder.right}
                                icon={getSectionIcon(section)}
                                column={Position.RIGHT}
                                setInitialColumn={setInitialColumn}
                                setInitialCard={setInitialCard}
                                initialCard={initialCard}
                                setPreviousColumn={setPreviousColumn}
                                previousColumn={previousColumn}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default memo(RearrangeSections);
