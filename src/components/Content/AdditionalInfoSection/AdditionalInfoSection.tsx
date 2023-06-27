import { AdditionalInfoContext } from '@/context/AdditionalInfoContext';
import { ResumeContext } from '@/context/ResumeContext';
import { personalDetailInputData } from '@/utils/data';
import { removeTypename } from '@/utils/removeTypename';
import React, { useContext, useEffect } from 'react';
import AddAdditionalInfo from '../AddAdditionalInfo/AddAdditionalInfo';
import { useTranslation } from 'next-i18next';

const PersonalDetailsAdditionalInfo = () => {
    const { setAdditionalInfo } = useContext(AdditionalInfoContext);
    const { content } = useContext(ResumeContext);
    const {t} = useTranslation(['content'])

    useEffect(() => {
        const additionalInfoTypenameRemoved =
      content?.personalDetails?.additionalInfo.map((item) =>
          removeTypename(item)
      );
        setAdditionalInfo(additionalInfoTypenameRemoved || []);
    }, [content?.personalDetails?.additionalInfo, setAdditionalInfo]);

    return (
        <div>
            {personalDetailInputData.additionalInfo.map((info: any) => (
                <div key={info.title}>
                    <h3 className="mt-1">{t(info.title)}</h3>
                    <AddAdditionalInfo tags={info.tags} tagsGroup={info.title}/>
                </div>
            ))}
        </div>
    );
};

export default PersonalDetailsAdditionalInfo;
