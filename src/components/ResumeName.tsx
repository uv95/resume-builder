import { UPDATE_RESUME } from '@/graphql/mutations/resume';
import { GET_RESUME } from '@/graphql/queries/resume';
import { useMutation } from '@apollo/client';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import Button from './UI/Button/Button';
import Card from './UI/Card/Card';
import edit from '../icons/edit.svg';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useReactToPrint } from 'react-to-print';

type Props = {
  resumeName: string;
  id: string;
  reactToPrintContent: () => React.ReactInstance | null;
};

const ResumeName = ({ id, resumeName, reactToPrintContent }: Props) => {
    const {t} = useTranslation();

    const handlePrint = useReactToPrint({
        content: reactToPrintContent,
        documentTitle: resumeName,
        onBeforeGetContent: ()=>{
            const page = document.querySelector('#resumePage') as HTMLDivElement;
            page.style.transform = 'scale(1)'
        }
    });

    const [isEdit, setIsEdit] = useState(false);
    const [updateResume] = useMutation(UPDATE_RESUME, {
        update(cache, { data }) {
            const { name } = data.updateResume;
            const { resume } = cache.readQuery({
                query: GET_RESUME,
                variables: { id },
            })!;
            cache.writeQuery({
                query: GET_RESUME,
                data: { resume: { ...resume, name } },
            });
        },
    });

    return <Card>
        {isEdit ? <Formik
            initialValues={{ name: resumeName }}
            onSubmit={({ name }) => {
                updateResume({
                    variables: { id, name },
                });
                const myExistingResumes = localStorage.getItem("myResumes") ? JSON.parse(localStorage.getItem("myResumes")!):null;
                const myUpdatedResumes = [...myExistingResumes, {id, name}]
                localStorage.setItem('myResumes', JSON.stringify(myUpdatedResumes));
                setIsEdit(false)
            }}
        >
            <Form>
                <div className="flex p-2">
                    <Field name="name" id="name" type="text" />
                    <Button isSubmit btnType="pink">
                        {t('save', {ns: 'content'})}
                    </Button>
                </div>
            </Form>
        </Formik> :  <div style={{ alignItems: 'center' }} className="flex spaceBetween p-2">
            <div style={{ alignItems: 'center' }} className="flex pointer"
                onClick={() => setIsEdit(true)} >
                <p style={{fontSize:'1.8rem',fontWeight:'bold'}}>{resumeName}</p>
                <Image src={edit} width="20" height="20" alt="edit" />
            </div>
            <Button btnType="pink" onClick={handlePrint}>
                {t('print')}
            </Button>
        </div>
        }
    </Card>
};

export default ResumeName;
