import { UPDATE_RESUME } from '@/graphql/mutations/resume';
import { GET_RESUME } from '@/graphql/queries/resume';
import { useMutation } from '@apollo/client';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from './Button/Button';
import Card from './Card/Card';
import edit from '../icons/edit.svg';
import Image from 'next/image';
import { useReactToPrint } from 'react-to-print';

type Props = {
  resumeName: string;
  id: string;
  reactToPrintContent: () => React.ReactInstance | null;
};

const ResumeName = ({ id, resumeName, reactToPrintContent }: Props) => {
    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
    });
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
                        <Button isSubmit btnType="pink">
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
                <Button btnType="pink" onClick={handlePrint}>
                    Print
                </Button>
            </div>
        </Card>
    );
};

export default ResumeName;
