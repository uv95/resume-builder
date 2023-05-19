import { UPDATE_RESUME } from '@/graphql/mutations/resumeMutations';
import { GET_RESUME } from '@/graphql/queries/resumeQuery';
import { useMutation } from '@apollo/client';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from './Button/Button';
import Card from './Card/Card';

type Props = { resumeName: string; id: string };

const ResumeName = ({ id, resumeName }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [updateResume] = useMutation(UPDATE_RESUME, {
    // update(cache, { data }) {
    //   const { name } = data.updateResume;
    //   const { resume } = cache.readQuery({
    //     query: GET_RESUME,
    //     variables: { id },
    //   })!;
    //   cache.writeQuery({
    //     query: GET_RESUME,
    //     data: { resume: { ...resume, name } },
    //   });
    // },
  });

  return isEdit ? (
    <Card>
      <Formik
        initialValues={{ name: resumeName }}
        onSubmit={({ name }) => {
          updateResume({
            variables: { id, name },
          });
          localStorage.setItem('resumeName', name);

          setIsEdit(false);
        }}
      >
        <Form>
          <div className="flex p-2">
            <Field name="name" id="name" type="text" />
            <Button text="Save" type="submit" color="pink" />
          </div>
        </Form>
      </Formik>
    </Card>
  ) : (
    <Card>
      <div className="flex p-2">
        <h3>{resumeName}</h3>
        <p className="pointer" onClick={() => setIsEdit(true)}>
          EDIT
        </p>
      </div>
    </Card>
  );
};

export default ResumeName;
