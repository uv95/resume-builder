import { ResumeContext } from '@/context/ResumeContext';
import { DELETE_RESUME } from '@/graphql/mutations/resume';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useContext, useState } from 'react';
import Button from '../../UI/Button/Button'
import Modal from '../../UI/Modal/Modal';
import style from './DeleteResume.module.scss';
import { useRouter } from 'next/router';

const DeleteResume = () => {
    const router = useRouter();
    const {resume} = useContext(ResumeContext);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteResume] = useMutation(DELETE_RESUME)
    const {t} = useTranslation()

    const handleDeleteResume = () =>{
        const myExistingResumesLS = localStorage.getItem("myResumes");
        const myExistingResumes = myExistingResumesLS ? JSON.parse(myExistingResumesLS) as {id:string,name:string}[] : null;
        const myResumesUpdated = myExistingResumes?.filter((resumeItem:{id:string,name:string})=>resume?.id!==resumeItem.id);
        localStorage.setItem('myResumes', JSON.stringify(myResumesUpdated));
        deleteResume({variables:{id: resume?.id}})
        router.push('/')
    }

    return (
        <>
            <div className='centered'>
                <Button btnType='red' onClick={()=>setConfirmDelete(true)}>
                    {t('delete-resume')}
                </Button>
            </div>
            {confirmDelete && <Modal close={()=>setConfirmDelete(false)}>
                <div className={style.content}>
                    <p>{t('confirm-delete')}</p>
                    <div className={style.buttons}>
                        <Button btnType='gray' onClick={handleDeleteResume}>Yes</Button>
                        <Button btnType='gray' onClick={()=>setConfirmDelete(false)}>No</Button>
                    </div>
                </div>
            </Modal>}
        </>
    )
}

export default DeleteResume