import React from 'react';
import style from './Card.module.scss';

type Props = {
  children: React.ReactNode;
  gray?: boolean;
  hoverScale?: boolean;
};

const Card = ({ children, gray, hoverScale }: Props) => {
    return (
        <div
            className={`${style.card} ${gray ? style.gray : ''} ${
                hoverScale ? style.hoverScale : ''
            }`}
        >
            {children}
        </div>
    );
};

export default Card;
