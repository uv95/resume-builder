import { data } from '@/utils/data';
import { IResume } from '@/utils/types';
import React, { useState } from 'react';
import AddContent from '../AddContent/AddContent';
import Button from '../Button/Button';
import Card from '../Card/Card';
import ContentCard from '../ContentCard/ContentCard';
import Modal from '../Modal/Modal';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import style from './MainPanel.module.scss';

type Props = { content: IResume };

const MainPanel = ({ content }: Props) => {
  const [showAddContent, setShowAddContent] = useState(false);
  return (
    <>
      <div className={style.mainPanel}>
        <div className="flex-column">
          <Card>
            <h3 className="p-2">{content.name}</h3>
          </Card>
          <PersonalDetails content={content.personalDetails} />
          {data.slice(1).map((contentEl) => (
            <ContentCard key={contentEl.name} content={contentEl} />
          ))}
          <div className="centered">
            <Button
              onClick={() => setShowAddContent(true)}
              color="pink"
              text="+ Add Content"
            />
          </div>
        </div>
      </div>
      {showAddContent && (
        <Modal setOpen={setShowAddContent} heading="Add Content">
          <AddContent />
        </Modal>
      )}
    </>
  );
};

export default MainPanel;
