import { MY_RESUMES_LOCALSTORAGE_KEY } from "@/utils/consts/localStorage";
import { ILocalStorageResume } from "@/utils/types/common";
import { IResume } from "@/utils/types/resumeTypes";
import { useState, useEffect } from "react";

const useResumes = (resumes: IResume[]) => {
    const [myResumes, setMyResumes] = useState<IResume[]>([]);
    const [myResumesLS, setMyResumesLS] = useState<ILocalStorageResume[]>([]);

    useEffect(() => {
        try {
            const myExistingResumesLS = localStorage.getItem(
                MY_RESUMES_LOCALSTORAGE_KEY
            );
            const myExistingResumes = myExistingResumesLS
                ? (JSON.parse(myExistingResumesLS) as ILocalStorageResume[])
                : null;

            if (myExistingResumes?.length) {
                const allMyResumes = resumes.filter((item: IResume) =>
                    myExistingResumes.some(
                        (resume: ILocalStorageResume) => resume.id === item.id
                    )
                );
                setMyResumesLS(myExistingResumes);
                setMyResumes(allMyResumes);
            }
        } catch (error) {
            console.error("Error loading resumes from localStorage:", error);
        }
    }, [resumes]);

    return { myResumes, myResumesLS };
};

export default useResumes;
