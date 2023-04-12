import React from 'react';
import style from './Button.module.scss';

type Props = {
  color: string;
  text: string;
  active?: boolean;
  onClick: (arg?: React.FormEvent<HTMLFormElement> | any) => void;
};

const Button = ({ color, text, active, onClick }: Props) => {
  return (
    <div
      className={`${style.button} ${
        style[`button-${color}${active ? '--active' : ''}`]
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
