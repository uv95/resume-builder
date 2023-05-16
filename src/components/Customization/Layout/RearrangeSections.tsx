import Card from '@/components/Card/Card';
import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import style from './Layout.module.scss';

type Props = {};

const RearrangeSections = (props: Props) => {
  const { resume } = useContext(ResumeContext);

  return (
    <div>
      <h5 className="mb-1">Rearrange sections</h5>

      {/* TOP / 1 column */}
      {resume?.settings.layout.position === 'top' && (
        <div className="flex-column gap-1">
          <Card gray>
            <p className="p-2 centered">Personal details</p>
          </Card>
          {/* TOP */}
          {resume?.settings.layout.columns === 1 &&
            resume.settings.sectionsOrder.top.map((section) => (
              <Card key={section} gray>
                {section}
              </Card>
            ))}
        </div>
      )}

      {/* 2 columns */}
      {resume?.settings.layout.columns === 2 && (
        <div className={style.rearrangeSections}>
          <div className={style.rearrangeSections_column}>
            {resume.settings.layout.position === 'left' && (
              <Card gray>
                <p className="p-2 centered">Personal details</p>
              </Card>
            )}
            {resume.settings.sectionsOrder.left.map((section) => (
              <Card key={section} gray>
                {section}
              </Card>
            ))}
          </div>

          <div className={style.rearrangeSections_column}>
            {resume.settings.layout.position === 'right' && (
              <Card gray>
                <p className="p-2 centered">Personal details</p>
              </Card>
            )}
            {resume.settings.sectionsOrder.right.map((section) => (
              <Card key={section} gray>
                {section}
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RearrangeSections;
