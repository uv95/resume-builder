import Card from '@/components/Card/Card';
import { ResumeContext } from '@/context/ResumeContext';
import { getSectionIcon } from '@/utils/getSectionIcon';
import Image from 'next/image';
import React, { useContext } from 'react';
import DraggableCard from './DraggableCard';
import style from './Layout.module.scss';
import user from '../../../icons/user.svg';

type Props = {
  setInitialColumn: React.Dispatch<
    React.SetStateAction<'right' | 'left' | 'top' | undefined>
  >;
  setPreviousColumn: React.Dispatch<
    React.SetStateAction<'right' | 'left' | 'top' | undefined>
  >;
  previousColumn: 'right' | 'left' | 'top' | undefined;
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
  const { resume } = useContext(ResumeContext);
  const { columns, position } = resume?.settings.layout!;
  return (
    <div>
      <h5 className="mb-1">Rearrange sections</h5>

      {/* TOP / 1 column */}
      {position === 'top' && (
        <div id={'top'} className="flex-column gap-1">
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
                column="top"
              />
            ))}
        </div>
      )}

      {/* 2 columns */}
      {columns === 2 && (
        <div id="columnsArea" className={style.rearrangeSections}>
          <div id={'left'} className={style.rearrangeSections_column}>
            {position === 'left' && (
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
                column="left"
                setInitialColumn={setInitialColumn}
                setInitialCard={setInitialCard}
                initialCard={initialCard}
                setPreviousColumn={setPreviousColumn}
                previousColumn={previousColumn}
              />
            ))}
          </div>

          <div id={'right'} className={style.rearrangeSections_column}>
            {position === 'right' && (
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
                column="right"
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

export default RearrangeSections;
