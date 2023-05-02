import PersonalDetailsBlock from '../pageBlocks/PersonalDetailsBlock/PersonalDetailsBlock';
import style from './ResumePage.module.scss';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import { resumeStore } from '@/store';
import { useEffect } from 'react';

type Props = {};

const ResumePage = observer((props: Props) => {
  const { sectionsOrder } = resumeStore;

  return (
    <div className={style.resume}>
      <div className={style.page}>
        <PersonalDetailsBlock />
        {/* {pageBlocks.map(block=>{

          })} */}
      </div>
    </div>
  );
});

export default ResumePage;
