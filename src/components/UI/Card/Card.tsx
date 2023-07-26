import { memo } from 'react';
import style from './Card.module.scss';

type Props = {
  children: React.ReactNode;
  gray?: boolean;
  hoverScale?: boolean;
  className?: string;
  id?: string;
};

const Card = ({ children, gray, hoverScale, className, id }: Props) => {
    return (
        <div
            id={id}
            className={`${className||''} ${style.card} ${gray ? style.gray : ''} ${
                hoverScale ? style.hoverScale : ''
            }`}
        >
            {children}
        </div>
    );
};

export default memo(Card);
