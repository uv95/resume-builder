import { Field, Form, Formik } from 'formik';
import React from 'react';
import Button from '../Button/Button';
import PersonalDetailsAdditionalInfo from '../PersonalDetailsAdditionalInfo/PersonalDetailsAdditionalInfo';
import style from './InputsSection.module.scss';

type Props = {
  inputData: any;
  setContentToEdit: React.Dispatch<React.SetStateAction<string | null>>;
};

const InputsSection = ({ inputData, setContentToEdit }: Props) => {
  return (
    <div>
      <h3 className="p-2">{inputData.editTitle}</h3>
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form className="p-2 flex-column">
          {inputData.inputs.map((input: any) => (
            <div className="inputGroup" key={input.name}>
              <label htmlFor={input.name}>{input.label}</label>
              <Field
                required
                name={input.name}
                id={input.name}
                type={input.type || 'text'}
                placeholder={input.placeholder}
                as={
                  input.type === 'date' || input.type === 'email' || !input.type
                    ? 'input'
                    : input.type
                }
              >
                {input.options?.map((option: string) => (
                  <option key={option}>{option}</option>
                ))}
              </Field>
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
                onClick={() => setContentToEdit(null)}
              />
              <Button
                type="submit"
                color="pink"
                text="Save"
                bold
                onClick={() => setContentToEdit(null)}
              />
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default InputsSection;
