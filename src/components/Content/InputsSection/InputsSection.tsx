import { AdditionalInfoContext } from '@/context/AdditionalInfoContext';
import { ResumeContext } from '@/context/ResumeContext';
import useAddMutations from '@/hooks/useAddMutations';
import useDeleteMutations from '@/hooks/useDeleteMutations';
import useUpdateMutations from '@/hooks/useUpdateMutations';
import { getInitialValues, isInputsEmpty } from '@/utils/getInitialValues';
import { Field, Form, Formik } from 'formik';
import React, { useContext } from 'react';
import Button from '../../Button/Button';
import AdditionalInfoSection from '../AdditionalInfoSection/AdditionalInfoSection';
import Select from '../../Select/Select';
import style from './InputsSection.module.scss';

type Props = {
  inputData: any;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: string;
      itemId: string;
    }>
  >;
  itemId: string;
};

const InputsSection = ({ inputData, setContentToEdit, itemId }: Props) => {
  const { resume } = useContext(ResumeContext);
  const { additionalInfo } = useContext(AdditionalInfoContext);
  const initialValues = getInitialValues(inputData, resume!, itemId);

  const updateContent = useUpdateMutations(inputData.name, resume?.id!);
  const addContent = useAddMutations(inputData.name, resume?.id!);
  const deleteContent = useDeleteMutations(inputData.name, resume?.id!);

  return (
    <div>
      <h3 className="p-2">{inputData.editTitle}</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          const finalValues =
            inputData.name === 'personalDetails'
              ? { ...values, additionalInfo }
              : values;
          console.log(
            finalValues,
            'finalValues',
            initialValues,
            'initialValues'
          );
          isInputsEmpty(initialValues)
            ? addContent(finalValues)
            : updateContent(finalValues);
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
                  as={input.type === 'textarea' ? 'textarea' : 'input'}
                />
              )}
            </div>
          ))}

          {inputData.name === 'personalDetails' && <AdditionalInfoSection />}

          <div className={style.buttons}>
            {inputData.name !== 'personalDetails' && (
              <Button
                color="white"
                text="Delete"
                bold
                onClick={() => {
                  deleteContent(itemId);
                  setContentToEdit({ section: '', itemId: '' });
                }}
              />
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
