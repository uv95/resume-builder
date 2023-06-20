import { AdditionalInfoContext } from '@/context/AdditionalInfoContext';
import { ResumeContext } from '@/context/ResumeContext';
import { personalDetailInputData } from '@/utils/data';
import { removeTypename } from '@/utils/removeTypename';
import React, { useContext, useEffect } from 'react';
import AddAdditionalInfo from '../AddAdditionalInfo/AddAdditionalInfo';

const PersonalDetailsAdditionalInfo = () => {
  const { setAdditionalInfo } = useContext(AdditionalInfoContext);
  const { resume } = useContext(ResumeContext);

  useEffect(() => {
    const additionalInfoTypenameRemoved =
      resume?.content.personalDetails?.additionalInfo.map((item) =>
        removeTypename(item)
      );
    setAdditionalInfo(additionalInfoTypenameRemoved || []);
  }, [resume?.content.personalDetails?.additionalInfo, setAdditionalInfo]);

  return (
    <div>
      {personalDetailInputData.additionalInfo.map((info: any) => (
        <div key={info.title}>
          <h3 className="mt-1">{info.title}</h3>
          <AddAdditionalInfo tags={info.tags} />
        </div>
      ))}
    </div>
  );
};

export default PersonalDetailsAdditionalInfo;
