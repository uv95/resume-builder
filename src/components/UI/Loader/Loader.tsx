import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './Loader.module.scss';
    
export const Loader = () => {
    const [isLoading, setIsLoading]=useState(false)
    const router = useRouter();

    useEffect(()=>{
        router?.events?.on('routeChangeStart', ()=>setIsLoading(true));
        router?.events?.on('routeChangeComplete', ()=>setIsLoading(false));
        router?.events?.on('routeChangeError', ()=>setIsLoading(false));

        return ()=>{
            router?.events?.off('routeChangeStart', ()=>setIsLoading(true));
            router?.events?.off('routeChangeComplete', ()=>setIsLoading(false));
            router?.events?.off('routeChangeError', ()=>setIsLoading(false));
        }
    })
    
    return (
        <>
            {isLoading && <div className={style.backdrop}>
                <div className={style.lds_ellipsis}>
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>}
        </>
    );
};