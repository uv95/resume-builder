import { classNames } from '@/utils/classNames';
import { ButtonHTMLAttributes, FC } from 'react';

import style from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmit?: boolean;
  className?: string;
  onClick?: (arg?: React.FormEvent<HTMLFormElement> | any) => void;
  btnType?: string;
  isActive?: boolean;
  isBold?: boolean;
}

const Button: FC<ButtonProps> = (props) => {
  const {
    isSubmit,
    className,
    onClick,
    btnType,
    children,
    isActive,
    isBold,
    ...otherProps
  } = props;

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={classNames(
        style.button,
        {
          [style[`button-${btnType}`]]: !!btnType,
          [style[`button-${btnType}--active`]]: !!isActive,
        },
        [className || '']
      )}
      {...otherProps}
      onClick={onClick}
      style={{
        fontWeight: isBold ? 'bold' : 'normal',
      }}
    >
      {children}
    </button>
  );
};

export default Button;
