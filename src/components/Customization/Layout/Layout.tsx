import { ResumeContext } from '@/context/ResumeContext';
import React, { useContext } from 'react';
import SettingsCard from '../UI/SettingsCard';
import Columns from './Columns';
import ColumnWidth from './ColumnWidth';
import Position from './Position';
import RearrangeSections from './RearrangeSections';

const Layout = () => {
  const { resume } = useContext(ResumeContext);

  return (
    <SettingsCard title="Layout">
      <Position />
      <Columns />
      <RearrangeSections />
      {resume?.settings.layout.columns === 2 && <ColumnWidth />}
    </SettingsCard>
  );
};

export default Layout;
