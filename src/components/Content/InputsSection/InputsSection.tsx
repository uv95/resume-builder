import { AdditionalInfoContext } from '@/context/AdditionalInfoContext';
import { ResumeContext } from '@/context/ResumeContext';
import useAddMutations from '@/hooks/useAddMutations';
import useDeleteMutations from '@/hooks/useDeleteMutations';
import useUpdateMutations from '@/hooks/useUpdateMutations';
import { getInitialValues, isInputsEmpty } from '@/utils/getInitialValues';
import { Field, Form, Formik } from 'formik';
import React, { memo, useContext, useState } from 'react';
import PersonalDetailsAdditionalInfo from '../PersonalDetails/PersonalDetailsAdditionalInfo';
import Select from '../../Select/Select';
import dynamic from 'next/dynamic';
import Buttons from './Buttons';
import { Sections } from '@/utils/types/resumeTypes';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { useTranslation } from 'next-i18next';
import { useContentContext } from '@/context/ContentContext';

const Textarea = dynamic(() => import('../Textarea'), { ssr: false });

type Props = {
  inputData: any;
  setContentToEdit: React.Dispatch<
    React.SetStateAction<{
      section: Sections | '';
      itemId: string;
    }>
  >;
  itemId: string;
};

const InputsSection = ({ inputData, setContentToEdit, itemId }: Props) => {
    const {t, i18n} = useTranslation(['content'])

    const { resume } = useContext(ResumeContext);
    const { content } =useContentContext();
    const { additionalInfo } = useContext(AdditionalInfoContext);
    const initialValues = getInitialValues(inputData, content!, itemId);

    const updateContent = useUpdateMutations({
        section: inputData.name,
        resumeId: resume?.id!,
    });
    const addContent = useAddMutations(inputData.name, resume?.id!);
    const deleteContent = useDeleteMutations(inputData.name, resume?.id!);

    const [textareaText, setTextareaText] = useState(
        initialValues.text || initialValues.description
    );

    const sectionTitle = `${inputData.name==='personalDetails' ? t('edit') : t(itemId ? 'edit' : 'add')} ${t(`${inputData.name}.sectionName`)}`

    return (
        <div>
            <h3 className="p-2">{sectionTitle}</h3>
          
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    let finalValues;
                    if (inputData.name === Sections.PERSONAL_DETAILS)
                        finalValues = { ...values, additionalInfo };
                    else
                        finalValues = isInputsEmpty(initialValues)
                            ? {
                                ...values,
                                index:
                    (content![
                      inputData.name as keyof typeof content
                    ] as AdditionalContentSection).items.length,
                            }
                            : values;

                    if (values.hasOwnProperty('description'))
                        finalValues = { ...finalValues, description: textareaText };

                    if (values.hasOwnProperty('text'))
                        finalValues = { ...finalValues, text: textareaText };

                    isInputsEmpty(initialValues)
                        ? addContent(finalValues)
                        : updateContent(finalValues);
                    setContentToEdit({ section: '', itemId: '' });
                }}
            >
                <Form className="p-2 flex-column" aria-label={sectionTitle}>
                    {inputData.inputs.map((input: any) => (
                        <div className="inputGroup" key={input.name}>
                            <label htmlFor={input.name}>{(t(inputData.name, {returnObjects:true}) as any)[input.name]}</label>

                            {input.type === 'select' ? (
                                <Select input={input.name} />
                            ) : input.type === 'textarea' ? (
                                <Textarea
                                    setTextareaText={setTextareaText}
                                    textareaText={textareaText}
                                    placeholder={i18n.language==='en' ? input.placeholder : t('profile-placeholder')}
                                />
                            ) : (
                                <Field
                                    required={input.required}
                                    name={input.name}
                                    id={input.name}
                                    type={input.type || 'text'}
                                    placeholder={i18n.language==='en' ? input.placeholder: (t(inputData.name, {returnObjects:true}) as any)[input.name]}
                                />
                            )}
                        </div>
                    ))}

                    {inputData.name === Sections.PERSONAL_DETAILS && (
                        <PersonalDetailsAdditionalInfo />
                    )}

                    <Buttons
                        itemId={itemId}
                        deleteContent={deleteContent}
                        setContentToEdit={setContentToEdit}
                        inputData={inputData}
                    />
                </Form>
            </Formik>
        </div>
    );
};

export default memo(InputsSection);
