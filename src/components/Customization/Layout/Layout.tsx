import { useLayoutContext } from '@/context/settings';
import useLayoutDnD from '@/hooks/useLayoutDnD';
import { useTranslation } from 'next-i18next';
import { memo } from 'react';
import SettingsCard from '../shared/SettingsCard';
import Columns from './Columns';
import ColumnWidth from './ColumnWidth';
import PositionComponent from './PositionComponent';
import RearrangeSections from './RearrangeSections';

const Layout = () => {
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
    
    const { layout } = useLayoutContext();
    const {t} = useTranslation(['customization'])

    return (
        <div
            onDragEnter={(e) => dragEnterHandler(e)}
            onDrop={(e) => dropHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragEnd={dragEndHandler}
        >
            <SettingsCard title={t('layout')}>
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

                {layout?.columns === 2 && <ColumnWidth />}
            </SettingsCard>
        </div>
    );
};

export default memo(Layout);
