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
import save from '../../../icons/check.svg';
import trash from '../../../icons/trash.svg';
import style from './InputsSection.module.scss';
import Image from 'next/image';

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
                type="white"
                bold
                onClick={() => {
                  deleteContent(itemId);
                  setContentToEdit({ section: '', itemId: '' });
                }}
              >
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <Image src={trash} width="18" height="18" alt="trash" />
                  <p>Delete</p>
                </div>
              </Button>
            )}
            <div className="flex rightPositioned">
              <Button
                type="white"
                bold
                onClick={() => {
                  setContentToEdit({ section: '', itemId: '' });
                }}
              >
                Cancel
              </Button>
              <Button submit type="pink" bold>
                <div className="flex gap-1" style={{ alignItems: 'center' }}>
                  <Image
                    src={save}
                    width="20"
                    height="20"
                    alt="save"
                    style={{ filter: 'invert()' }}
                  />
                  <p>Save</p>
                </div>
              </Button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InputsSection;
