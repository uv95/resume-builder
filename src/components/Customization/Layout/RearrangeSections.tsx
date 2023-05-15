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

      <div className="flex-column gap-1">
        <Card gray>
          <p className="p-2 centered">Personal details</p>
        </Card>
        {/* TOP */}
        {resume?.settings.layout.position === 'top' &&
          resume.settings.sectionsOrder.top.map((section) => (
            <Card key={section} gray>
              {section}
            </Card>
          ))}
      </div>
      {/* LEFT */}
      {resume?.settings.layout.position === 'left' && (
        <div className={style.rearrangeSections}>
          <div className={style.rearrangeSections_column}>
            {resume.settings.sectionsOrder.left.leftSide.map((section) => (
              <Card key={section} gray>
                {section}
              </Card>
            ))}
          </div>
          <div className={style.rearrangeSections_column}>
            {resume.settings.sectionsOrder.left.rightSide.map((section) => (
              <Card key={section} gray>
                {section}
              </Card>
            ))}
          </div>
        </div>
      )}
      {/* RIGHT */}
      {resume?.settings.layout.position === 'right' && (
        <div className={style.rearrangeSections}>
          <div className={style.rearrangeSections_column}>
            {resume.settings.sectionsOrder.right.leftSide.map((section) => (
              <Card key={section} gray>
                {section}
              </Card>
            ))}
          </div>
          <div className={style.rearrangeSections_column}>
            {resume.settings.sectionsOrder.right.rightSide.map((section) => (
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
