import Card from '@/components/Card/Card';
import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import Columns from './Columns';
import ColumnWidth from './ColumnWidth';
import style from './Layout.module.scss';
import Position from './Position';
import RearrangeSections from './RearrangeSections';

type Props = {};

const Layout = (props: Props) => {
  const { resume } = useContext(ResumeContext);

  return (
    <Card>
      <div className="p-2">
        <h3>Layout</h3>
        <div className="flex-column mt-2">
          <Position />
          <Columns />
          <RearrangeSections />
          {resume?.settings.layout.columns === 2 && <ColumnWidth />}
        </div>
      </div>
    </Card>
  );
};

export default Layout;
