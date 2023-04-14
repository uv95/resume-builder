import React from 'react';
import style from './Button.module.scss';

type Props = {
  color: string;
  text: string;
  active?: boolean;
  bold?: boolean;
  type?: 'submit';
  onClick?: (arg?: React.FormEvent<HTMLFormElement> | any) => void;
};

const Button = ({ color, text, active, type, bold, onClick }: Props) => {
  return (
    <button
      type={type || 'button'}
      className={`${style.button} ${
        style[`button-${color}${active ? '--active' : ''}`]
      } ${bold ? 'bold' : ''}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
