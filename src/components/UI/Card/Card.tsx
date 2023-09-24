import { FC, HTMLAttributes, HtmlHTMLAttributes, memo } from 'react';
import style from './Card.module.scss';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gray?: boolean;
  hoverScale?: boolean;
  className?: string;
  id?: string;
};

const Card: FC<Props> = ({ children, gray, hoverScale, className, id, ...otherProps }) => {
    return (
        <div
            id={id}
            className={`${className||''} ${style.card} ${gray ? style.gray : ''} ${
                hoverScale ? style.hoverScale : ''
            }`}
            {...otherProps}

        >
            {children}
        </div>
    );
};

export default memo(Card);
