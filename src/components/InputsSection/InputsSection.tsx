import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from '../Button/Button';
import style from './InputsSection.module.scss';

type Props = {
  content: any;
  isAddNew?: boolean;
  setIsAddNew?: React.Dispatch<React.SetStateAction<boolean>>;
  setContentToEdit?: React.Dispatch<React.SetStateAction<string | null>>;
};

const InputsSection = ({
  isAddNew,
  setIsAddNew,
  content,
  setContentToEdit,
}: Props) => {
  console.log(content, 'content InputsSection');
  return (
    <div>
      <h3 className="p-2">{content.editTitle}</h3>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form className="p-2 flex-column">
          {content.inputs.map((input: any) => (
            <div className="inputGroup" key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>
              {input.type === 'select' ? (
                <select name={input.name} id={input.name}>
                  {input.options?.map((option: any) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              ) : (
                <Field
                  required
                  name={input.name}
                  id={input.name}
                  type={input.type || 'text'}
                  placeholder={input.placeholder}
                />
              )}
            </div>
          ))}
          <div className={style.buttons}>
            <Button color="white" text="Delete" bold />
            <div className="flex">
              <Button
                color="white"
                text="Cancel"
                bold
                onClick={() => {
                  setIsAddNew && setIsAddNew(false);
                  setContentToEdit && setContentToEdit(null);
                }}
              />
              <Button
                type="submit"
                color="pink"
                text="Save"
                bold
                onClick={() => {
                  setIsAddNew && setIsAddNew(false);
                  setContentToEdit && setContentToEdit(null);
                }}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InputsSection;
