import Button from '@/components/UI/Button/Button';
import { ResumeContext } from '@/context/ResumeContext';
import useUpdateSectionName from '@/hooks/useUpdateSectionName';
import { removeTypename } from '@/utils/removeTypename';
import { AdditionalContentSection } from '@/utils/types/contentTypes';
import { Sections } from '@/utils/types/resumeTypes';
import { Field, Form, Formik } from 'formik'
import { useContext, useState } from 'react';
import style from './ContentCard.module.scss';
import { useTranslation } from 'next-i18next';

type Props = {sectionName:string,section: Sections}

const UpdateSectionName = ({sectionName,section}: Props) => {
    const {t} = useTranslation(['content'])

    const {resume,content} = useContext(ResumeContext)
    const updateName = useUpdateSectionName({section,resumeId:resume?.id!});
    const [isNameChanged, setIsNameChanged]=useState(false)
    const contentSection =  content![section as keyof typeof content] as AdditionalContentSection;
    const sectionId = contentSection?.id!;

    return (
        <Formik initialValues={{id:sectionId,sectionName, items: (resume?.content[section] as AdditionalContentSection).items.map(removeTypename)}}
            onSubmit={(values)=>{
                updateName(values)
                setIsNameChanged(false)}}
        >
            <Form  
                onChange={()=>
                    setIsNameChanged(true)}
            >
                <div className="flex">
                    <Field
                        className={style.updateSectionName}
                        name='sectionName'
                        id='sectionName'
                        type='text'
                   
                    />
                    { isNameChanged && <Button id='sectionNameBtn' isSubmit btnType='pink'>{t('save')}</Button>}
                </div>
            </Form>
        </Formik>
    )
}

export default UpdateSectionName