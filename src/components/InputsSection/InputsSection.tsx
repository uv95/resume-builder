import useUpdateMutations from '@/hooks/useUpdateMutations';
import { getInitialValues } from '@/utils/getInitialValues';
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
  resume,
  setContentToEdit,
  itemId,
}: Props) => {
  const initialValues = getInitialValues(inputData, resume, itemId);

  const update = useUpdateMutations(inputData.name, resume.id);

  return (
    <div>
      <h3 className="p-2">{inputData.editTitle}</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          update(values);
          setContentToEdit({ section: '', itemId: '' });
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
                onClick={() => {
                  setContentToEdit({ section: '', itemId: '' });
                }}
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
