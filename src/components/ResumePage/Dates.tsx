import useSetColor from '@/hooks/useSetColor';
import React from 'react';

type Props = {
  startDate: string;
  endDate: string;
  sectionPosition?: 'left' | 'right';
};

const Dates = ({ startDate, endDate, sectionPosition }: Props) => {
  const { setColor } = useSetColor();

  return (
    <div
      className="flex"
      style={{
        color: setColor({
          section: 'dates',
          colorOf: 'font',
          sectionPosition,
        }),
      }}
    >
      <p>
        {startDate}-{endDate}
      </p>
    </div>
  );
};

export default Dates;
