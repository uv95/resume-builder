import { ResumeContext } from '@/context/ResumeContext';
import useLayoutDnD from '@/hooks/useLayoutDnD';
import { useContext } from 'react';
import SettingsCard from '../UI/SettingsCard';
import Columns from './Columns';
import ColumnWidth from './ColumnWidth';
import PositionComponent from './PositionComponent';
import RearrangeSections from './RearrangeSections';

const Layout = () => {
    const { settings } = useContext(ResumeContext);
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
            onDragEnd={dragEndHandler}
        >
            <SettingsCard title="Layout">
                <PositionComponent />
                <Columns />
                <RearrangeSections
                    setInitialColumn={setInitialColumn}
                    setPreviousColumn={setPreviousColumn}
                    previousColumn={previousColumn}
                    setInitialCard={setInitialCard}
                    initialCard={initialCard}
                    sectionsOrder={sectionsOrder}
                />

                {settings?.layout.columns === 2 && <ColumnWidth />}
            </SettingsCard>
        </div>
    );
};

export default Layout;
