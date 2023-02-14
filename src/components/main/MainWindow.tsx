import { useContext } from 'react';
import { GlobalContext } from '../../components/providers/GlobalProvider';

import { TShirt } from './canvas/TShirt';
import { ItemSelect } from './select/ItemSelect';

export const MainWindow = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty: string
        }
    }
        = useContext(GlobalContext);
    return (
        <>
            {GlobalValue.State?.MainWindowProperty == 'Canvas' && (
                <TShirt />
            )}
            {GlobalValue.State?.MainWindowProperty == 'ItemSelect' && (
                <ItemSelect />
            )}
        </>

    );
}
