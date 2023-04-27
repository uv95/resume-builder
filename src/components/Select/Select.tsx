import { Field } from 'formik';
import React from 'react';

type Props = { input: any };

const Select = ({ input }: Props) => {
  return (
    <Field name={input.name} id={input.name} as="select">
      <option value="default"> --- Select level ---</option>
      {input.options.map((option: { value: string; text: string }) => (
        <option key={option.text} value={option.value}>
          {option.text}
        </option>
      ))}
    </Field>
  );
};

export default Select;
