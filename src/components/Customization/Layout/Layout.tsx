import Card from '@/components/Card/Card';
import React from 'react';
import Columns from './Columns';
import ColumnWidth from './ColumnWidth';
import style from './Layout.module.scss';
import Position from './Position';
import RearrangeSections from './RearrangeSections';

type Props = {};

const Layout = (props: Props) => {
  return (
    <Card>
      <div className="p-2">
        <h3>Layout</h3>
        <div className="flex-column mt-2">
          <Position />
          <Columns />
          <RearrangeSections />
          <ColumnWidth />
        </div>
      </div>
    </Card>
  );
};

export default Layout;
