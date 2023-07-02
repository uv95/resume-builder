import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Card from '../Card/Card';
import style from './Modal.module.scss';

type Props = { children: React.ReactNode; selector: string };

const ClientOnlyPortal = ({ children, selector }: Props) => {
    const ref = useRef<Element>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        ref.current = document.querySelector(selector)!;
        setMounted(true);
    }, [selector]);

    return mounted ? createPortal(children, ref.current!) : null;
};

type ModalProps = {
  children: React.ReactNode;
  close?: () => void;
  heading?: string;
  className?: string;
};

export default function Modal({ children, close, heading, className }: ModalProps) {
    return (
        <ClientOnlyPortal selector="#modal">
            <div className={style.backdrop} onClick={close}></div>
            <Card id="modal" className={`${style.modal} ${className||''}`}>
                {heading&&<div className={style.heading}>
                    <h1>{heading}</h1>
                    <button type="button" onClick={close}>
                        X
                    </button>
                </div>}
                {children}
            </Card>
        </ClientOnlyPortal>
    );
}
