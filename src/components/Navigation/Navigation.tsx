import React, { useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';

type Props = {};

const Navigation = (props: Props) => {
  const [active, setActive] = useState('Content');
  return (
    <Card>
      <div className="flex-column p-2">
        <Button
          color="nav"
          text="Content"
          active={active === 'Content'}
          onClick={() => setActive('Content')}
        />
        <Button
          color="nav"
          text="Customize"
          active={active === 'Customize'}
          onClick={() => setActive('Customize')}
        />
      </div>
    </Card>
  );
};

export default Navigation;
