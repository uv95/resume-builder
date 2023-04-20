import { additionalInfo } from '@/utils/data';
import React from 'react';
import AddInfo from '../AddInfo/AddInfo';

type Props = {};

const PersonalDetailsAdditionalInfo = (props: Props) => {
  return (
    <div>
      {additionalInfo.map((info: any) => (
        <div key={info.name}>
          <h3 className="mt-1">{info.title}</h3>
          <AddInfo tags={info.tags} infoSection={info} />
        </div>
      ))}
    </div>
  );
};

export default PersonalDetailsAdditionalInfo;
