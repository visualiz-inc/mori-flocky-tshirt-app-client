import { useContext } from 'react';
import { TshirtType } from '../../../../../Types';
import { GlobalContext } from '../../../../providers/GlobalProvider';
import { ItemMain } from './ItemMain';

import '../.menu.css';
import { ItemSelect } from './ItemSelect';

export const ItemWindow = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty:string
        }
    } = useContext(GlobalContext);

        return (
            <>
            {GlobalValue.State!.MainWindowProperty == 'Canvas' && (
                <ItemMain />
            )}
            {GlobalValue.State!.MainWindowProperty == 'ItemSelect' && (
                <ItemSelect />
            )}
            </>
        )
};
