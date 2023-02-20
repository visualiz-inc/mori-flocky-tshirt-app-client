import { useContext } from 'react';
import { GlobalContext } from '../../components/providers/GlobalProvider';

import { TShirt } from './canvas/TShirt';
import { ALLItemSelect, OneItemSelect } from './ItemSelect';

export const MainWindow = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty: string
        }
    }
        = useContext(GlobalContext);

    const ItemTypes:string[] = [
        'T-shirt',
        'Mask',
        'ShortSleeve',
        'DrySports',
        'NoSleeve',
        'WomenSleeve',
        'LongSleeve'
    ]

    return (
        <>
            {GlobalValue.State!.MainWindowProperty == 'Canvas' && (
                <TShirt />
            )}
            {GlobalValue.State!.MainWindowProperty == 'ItemSelect' && (
                <ALLItemSelect />
            )}
            {!(GlobalValue.State!.MainWindowProperty == 'Canvas' || GlobalValue.State!.MainWindowProperty == 'ItemSelect') &&
                ItemTypes.map((value:string,i:number) => {
                    if (GlobalValue.State!.MainWindowProperty.replace('Select', '') == value) {
                        return (
                            <OneItemSelect key={`select${i}`} StateItem={value} />
                        )
                    }
                })

            }
        </>

    );
}
