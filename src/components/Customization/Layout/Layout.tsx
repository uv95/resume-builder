import { ResumeContext } from '@/context/ResumeContext';
import useLayoutDnD from '@/hooks/useLayoutDnD';
import { useContext } from 'react';
import SettingsCard from '../UI/SettingsCard';
import Columns from './Columns';
import ColumnWidth from './ColumnWidth';
import Position from './Position';
import RearrangeSections from './RearrangeSections';

const Layout = () => {
  const { resume } = useContext(ResumeContext);
  const {
    dragEndHandler,
    dragEnterHandler,
    dragOverHandler,
    dropHandler,
    setInitialColumn,
    setPreviousColumn,
    previousColumn,
    setInitialCard,
    initialCard,
    sectionsOrder,
  } = useLayoutDnD();

  return (
    <div
      onDragEnter={(e) => dragEnterHandler(e)}
      onDrop={(e) => dropHandler(e)}
      onDragOver={(e) => dragOverHandler(e)}
      onDragEnd={(e) => dragEndHandler(e)}
    >
      <SettingsCard title="Layout">
        <Position />
        <Columns />
        <RearrangeSections
          setInitialColumn={setInitialColumn}
          setPreviousColumn={setPreviousColumn}
          previousColumn={previousColumn}
          setInitialCard={setInitialCard}
          initialCard={initialCard}
          sectionsOrder={sectionsOrder}
        />

        {resume?.settings.layout.columns === 2 && <ColumnWidth />}
      </SettingsCard>
    </div>
  );
};

export default Layout;
