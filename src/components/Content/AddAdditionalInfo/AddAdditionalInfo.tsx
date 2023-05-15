import { AdditionalInfoContext } from '@/context/AdditionalInfoContext';
import React, { useContext, useEffect, useState } from 'react';
import Button from '../../Button/Button';
import Tag from '../Tag/Tag';
import style from './AddAdditionalInfo.module.scss';
import { IAdditionalInfo } from '../../../utils/types';

type Props = {
  tags: string[];
};

const AddAdditionalInfo = ({ tags }: Props) => {
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
            <label htmlFor={item.name}>{item.name}</label>
            <div className="flex spaceBetween">
              <input
                type="text"
                name={item.name}
                id={item.name}
                value={item.input}
                placeholder={item.input || `Enter ${item.name}`}
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
                color="pink"
                text="Delete"
                bold
                onClick={() => {
                  setAdditionalInfo((prev) =>
                    prev.filter((info) => info.name !== item.name)
                  );
                  setCurrentTag('');
                }}
              />
            </div>
          </div>
        ))}

      <div className={style.tags}>
        {remainedTags.map((tag) => (
          <Tag
            text={tag}
            key={tag}
            onClick={() => {
              setCurrentTag(tag);
              setAdditionalInfo((prev) => [...prev, { name: tag, input: '' }]);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AddAdditionalInfo;
