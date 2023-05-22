import useSetColor from '@/hooks/useSetColor';
import React from 'react';

type Props = { sectionPosition: 'left' | 'right' | undefined };

const HeadingLine = ({ sectionPosition }: Props) => {
  const { setColor } = useSetColor();

  return (
    <div
      style={{
        width: '100%',
        height: '0.2rem',
        background: setColor({
          section: 'headingsLine',
          colorOf: 'font',
          sectionPosition,
        }),
        marginTop: '-2px',
        marginBottom: '0.8rem',
      }}
    ></div>
  );
};

export default HeadingLine;
