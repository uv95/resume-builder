import { UPDATE_RESUME } from '@/graphql/mutations/resume';
import { GET_RESUME } from '@/graphql/queries/resume';
import { useMutation } from '@apollo/client';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from './Button/Button';
import Card from './Card/Card';
import edit from '../icons/edit.svg';
import download from '../icons/download.svg';
import Image from 'next/image';

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
            <Button submit type="pink">
              Save
            </Button>
          </div>
        </Form>
      </Formik>
    </Card>
  ) : (
    <Card>
      <div style={{ alignItems: 'center' }} className="flex spaceBetween p-2">
        <div
          style={{ alignItems: 'center' }}
          className="flex pointer"
          onClick={() => setIsEdit(true)}
        >
          <h3>{resumeName}</h3>
          <Image src={edit} width="20" height="20" alt="edit" />
        </div>
        <Button type="pink">
          Download
          <Image
            src={download}
            width="20"
            height="20"
            alt="edit"
            style={{ filter: 'invert()', marginLeft: '0.5rem' }}
          />
        </Button>
      </div>
    </Card>
  );
};

export default ResumeName;
