import React, { FC, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Card from '../Card/Card';
import style from './Modal.module.scss';

type Props = { children: React.ReactNode };

const ClientOnlyPortal = ({ children }: Props) => {
    const ref = useRef<Element>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.body;
        setMounted(true);
    }, []);

    return mounted ? createPortal(children, ref.current!) : null;
};

type ModalProps = {
  children: React.ReactNode;
  close?: () => void;
  heading?: string;
  className?: string;
};

export const Modal:FC<ModalProps> = ({ children, close, heading, className }) => {
    return (
        <ClientOnlyPortal>
            <div className={style.backdrop} onClick={close}></div>
            <Card role="dialog"
                aria-labelledby="dialog1Title" id="modal" className={`${style.modal} ${className||''}`}>
                {heading&&<div className={style.heading}>
                    <h1 id="dialog1Title">{heading}</h1>
                    <button aria-label='close' onClick={close}>
                        X
                    </button>
                </div>}
                {children}
            </Card>
        </ClientOnlyPortal>
    );
}
