import { Field } from 'formik';
import React, { useState } from 'react';
import Button from '../Button/Button';
import Tag from '../Tag/Tag';
import style from './AddInfo.module.scss';

type Props = { tags: string[]; infoSection: any };

const AddInfo = ({ tags, infoSection }: Props) => {
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');
  return (
    <>
      {currentTag &&
        infoSection.inputs.map((input: any) => (
          <div className="inputGroup mt-1" key={input.name}>
            <label htmlFor={input.name}>{currentTag}</label>
            <div className="flex spaceBetween">
              <Field
                required
                name={input.name}
                id={input.name}
                type="text"
                placeholder={`Enter ${currentTag}`}
              />
              <Button
                color="pink"
                text="Delete"
                bold
                onClick={() => {
                  setAddedTags(addedTags.filter((tag) => tag !== currentTag));
                  setCurrentTag('');
                }}
              />
            </div>
          </div>
        ))}

      <div className={style.tags}>
        {tags.map((tag) => (
          <Tag
            text={tag}
            key={tag}
            onClick={() => {
              setCurrentTag(tag);
              setAddedTags((prev) => [...prev, currentTag]);
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AddInfo;
