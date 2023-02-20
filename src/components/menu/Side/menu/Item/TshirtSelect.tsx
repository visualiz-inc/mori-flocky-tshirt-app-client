import { useContext } from 'react';
import { TshirtType } from '../../../../../Types';
import { GlobalContext } from '../../../../providers/GlobalProvider';

import '../.menu.css';

export const TshirtSelect = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty: string,
            SetMainWindowProperty: React.Dispatch<React.SetStateAction<string>>
        }
    } = useContext(GlobalContext);

    if (GlobalValue.State != undefined) {
        return (

            <div id='itemSelectBox'>
                <h1>Tシャツ</h1>
                
            </div>
        );
    } else {
        return (
            <p> エラー</p >
        )
    }
};
