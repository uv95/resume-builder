import useUpdateMutations from '@/hooks/useUpdateMutations';
import { IResume } from '@/utils/types';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from '../Button/Button';
import PersonalDetailsAdditionalInfo from '../PersonalDetailsAdditionalInfo/PersonalDetailsAdditionalInfo';
import Select from '../Select/Select';
import style from './InputsSection.module.scss';

type Props = {
  inputData: any;
  resume: IResume;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: string;
      itemId: string;
    }>
  >;
  itemId: string;
};

const InputsSection = ({
  inputData,
  resume: resume1,
  setContentToEdit,
  itemId,
}: Props) => {
  const getInitialValues = () => {
    if (inputData.name === 'personalDetails') return resume1.personalDetails;

    let currentSection: any;
    currentSection = resume1[inputData.name as keyof typeof resume1];
    const currentItem = currentSection.find((item: any) => item.id === itemId);
    if (currentItem) {
      const typenameRemoved = Object.keys(currentItem)
        .filter((key) => key !== '__typename')
        .reduce((obj: any, key: string) => {
          obj[key] = currentItem[key];
          return obj;
        }, {});

      if (inputData.name === 'skills')
        switch (typenameRemoved.skillLevel) {
          case 'Novice':
            typenameRemoved.skillLevel = 'novice';
            break;
          case 'Beginner':
            typenameRemoved.skillLevel = 'beginner';
            break;
          case 'Skillful':
            typenameRemoved.skillLevel = 'skillful';
            break;
          case 'Experienced':
            typenameRemoved.skillLevel = 'experienced';
            break;
          case 'Expert':
            typenameRemoved.skillLevel = 'expert';
            break;
          default:
            typenameRemoved.skillLevel = 'default';
        }

      if (inputData.name === 'language')
        switch (typenameRemoved.languageLevel) {
          case 'Beginner (A1)':
            typenameRemoved.languageLevel = 'beginner';
            break;
          case 'Elementary (A2)':
            typenameRemoved.languageLevel = 'elementary';
            break;
          case 'Limited working proficiency (B1)':
            typenameRemoved.languageLevel = 'limited';
            break;
          case 'Highly proficient (B2-C1)':
            typenameRemoved.languageLevel = 'highlyProficient';
          case 'Native / full working proficiency (C2)':
            typenameRemoved.languageLevel = 'fullProficiency';
            break;
          default:
            typenameRemoved.languageLevel = 'default';
        }

      return typenameRemoved;
    } else {
      const emptyValues = inputData.inputs
        .map((input: any) => input.name)
        .reduce((acc: any, curr: any) => ((acc[curr] = ''), acc), {});
      return emptyValues;
    }
  };

  const initialValues = getInitialValues();

  const update = useUpdateMutations(inputData.name, resume1.id);

  return (
    <div>
      <h3 className="p-2">{inputData.editTitle}</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          update(values);
          setContentToEdit({ itemId: '', section: '' });
        }}
      >
        <Form className="p-2 flex-column">
          {inputData.inputs.map((input: any) => (
            <div className="inputGroup" key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>

              {input.type === 'select' ? (
                <Select input={input} />
              ) : (
                <Field
                  // required
                  name={input.name}
                  id={input.name}
                  type={input.type || 'text'}
                  placeholder={input.placeholder}
                />
              )}
            </div>
          ))}

          {inputData.name === 'personalDetails' && (
            <PersonalDetailsAdditionalInfo />
          )}

          <div className={style.buttons}>
            {inputData.name !== 'personalDetails' && (
              <Button color="white" text="Delete" bold />
            )}
            <div className="flex rightPositioned">
              <Button
                color="white"
                text="Cancel"
                bold
                onClick={() => setContentToEdit({ itemId: '', section: '' })}
              />
              <Button type="submit" color="pink" text="Save" bold />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InputsSection;
