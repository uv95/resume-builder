import { classNames } from '@/utils/classNames';
import { ButtonHTMLAttributes, FC, memo } from 'react';

import style from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmit?: boolean;
  className?: string;
  btnType?: string;
  isActive?: boolean;
  isBold?: boolean;
}

const Button: FC<ButtonProps> = memo(function Button (props) {
    const {
        isSubmit,
        className,
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
            style={{
                fontWeight: isBold ? 'bold' : 'normal',
            }}
        >
            {children}
        </button>
    );
});

export default Button;
