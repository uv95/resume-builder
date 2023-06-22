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
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
};

export default function Modal({ children, setOpen, heading }: ModalProps) {
    return (
        <ClientOnlyPortal selector="#modal">
            <div className={style.backdrop} onClick={() => setOpen(false)}></div>
            <div id="modal" className={style.modal}>
                <Card>
                    <div className="py-1">
                        <div className="flex spaceBetween p-2">
                            <h1>{heading}</h1>
                            <button type="button" onClick={() => setOpen(false)}>
                                X
                            </button>
                        </div>
                        {children}
                    </div>
                </Card>
            </div>
        </ClientOnlyPortal>
    );
}
