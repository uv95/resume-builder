import React from 'react';
import style from './Button.module.scss';

type Props = {
  type?: string;
  active?: boolean;
  bold?: boolean;
  submit?: boolean;
  classes?: string;
  children?: React.ReactNode;
  onClick?: (arg?: React.FormEvent<HTMLFormElement> | any) => void;
};

const Button = ({
  type,
  active,
  classes,
  submit,
  bold,
  children,
  onClick,
}: Props) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={`${style.button} ${style[`button-${type}`]} ${
        style[`button-${type}${active ? '--active' : ''}`]
      } ${bold ? 'bold' : ''} ${classes || ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
