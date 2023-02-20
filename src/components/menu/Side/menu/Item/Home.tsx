import { useContext } from 'react';
import { TshirtType } from '../../../../../Types';
import { GlobalContext } from '../../../../providers/GlobalProvider';
import { ItemMain } from './ItemMain';

import '../.menu.css';
import { ItemSelect } from './ItemSelect';
import { TshirtSelect } from './TshirtSelect';

export const ItemWindow = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty:string,
            SetMainWindowProperty: React.Dispatch<React.SetStateAction<string>>
        }
    } = useContext(GlobalContext);

        return (
            <>
            {GlobalValue.State!.MainWindowProperty == 'Canvas' && (
                <ItemMain />
            )}
            {(GlobalValue.State!.MainWindowProperty == 'ItemSelect' || 
             GlobalValue.State!.MainWindowProperty == 'MaskSelect') && (
                <ItemSelect />
            )}
            {GlobalValue.State!.MainWindowProperty == 'T-shirtSelect' && (
                <TshirtSelect />
            )}
            </>
        )
};
