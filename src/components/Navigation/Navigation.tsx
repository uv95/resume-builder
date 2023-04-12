import React, { useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';

type Props = {};

const Navigation = (props: Props) => {
  const [active, setActive] = useState('Content');
  return (
    <Card>
      <div className="flex-column">
        <Button
          color="white"
          text="Content"
          active={active === 'Content'}
          onClick={() => setActive('Content')}
        />
        <Button
          color="white"
          text="Customize"
          active={active === 'Customize'}
          onClick={() => setActive('Customize')}
        />
      </div>
    </Card>
  );
};

export default Navigation;
