import React, { useState } from 'react';
import Button from '../Button/Button';
import Card from '../Card/Card';

type Props = {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
};

const Navigation = ({ active, setActive }: Props) => {
  return (
    <Card>
      <div className="flex-column p-2">
        <Button
          type="nav"
          active={active === 'Content'}
          onClick={() => setActive('Content')}
        >
          Content
        </Button>
        <Button
          type="nav"
          active={active === 'Customize'}
          onClick={() => setActive('Customize')}
        >
          Customize
        </Button>
      </div>
    </Card>
  );
};

export default Navigation;
