import { AdditionalInfoContext } from '@/context/AdditionalInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import Tag from '../Tag/Tag';
import style from './AddAdditionalInfo.module.scss';
import { IAdditionalInfo } from '../../../utils/types/contentTypes';
import { useTranslation } from 'next-i18next';

type Props = {
  tags: string[];
  tagsGroup: string;
};

const AddAdditionalInfo = ({ tags,tagsGroup }: Props) => {
    const {t, i18n} = useTranslation(['content'])

    const { additionalInfo, setAdditionalInfo } = useContext(
        AdditionalInfoContext
    );

    const [remainedTags, setRemainedTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState<string>('');
    const [currentAdditionalInfo, setCurrentAdditionalInfo] = useState<
    IAdditionalInfo[]
  >([]);

    useEffect(() => {
        setCurrentAdditionalInfo(
            additionalInfo.filter((item) => tags.includes(item.name))
        );
        setRemainedTags(
            tags.filter(
                (tag) =>
                    !additionalInfo.map((item) => item.name).includes(tag) &&
          tag !== currentTag
            )
        );
    }, [additionalInfo, tags, currentTag]);

    return (
        <>
            {currentAdditionalInfo.length !== 0 &&
        currentAdditionalInfo.map((item) => (
            <div className="inputGroup mt-1" key={item.name}>
                <label htmlFor={item.name}>{tagsGroup==='Links' ? item.name : (t('additionalInfo',{returnObjects:true}) as any)[item.name]}</label>
                <div className="flex spaceBetween">
                    <input
                        type="text"
                        name={item.name}
                        id={item.name}
                        value={item.input}
                        placeholder={i18n.language==='en'?`Enter ${item.name}` : (t('additionalInfo',{returnObjects:true}) as any)[item.name]}
                        onChange={(e) =>
                            setAdditionalInfo((prev) =>
                                prev.map((info) =>
                                    info.name === item.name
                                        ? { ...info, input: e.target.value }
                                        : info
                                )
                            )
                        }
                    />
                    <Button
                        btnType="pink"
                        isBold
                        onClick={() => {
                            setAdditionalInfo((prev) =>
                                prev.filter((info) => info.name !== item.name)
                            );
                            setCurrentTag('');
                        }}
                    >
                        {t('delete')}
                    </Button>
                </div>
            </div>
        ))}

            <div className={style.tags}>
                {remainedTags.map((tag) => (
                    <Tag
                        text={tag}
                        tagsGroup={tagsGroup}
                        key={tag}
                        onClick={() => {
                            setCurrentTag(tag);
                            setAdditionalInfo((prev) => [...prev, { name: tag, input: '', isLink: tagsGroup==='Links' }]);
                        }}
                    />
                ))}
            </div>
        </>
    );
};

export default AddAdditionalInfo;
