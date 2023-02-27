import { Svg, Rect, RegularPolygon, Circle, Text } from "../../../../../Types"


import { useContext } from 'react';
import { GlobalContext } from '../../../../providers/GlobalProvider';
import '../.menu.css';

export const PropertyWindow = () => {
    const GlobalValue: {
        State?: {
            Property:(Rect | RegularPolygon | Circle | Text | Svg | null)
            SetProperty :React.Dispatch<React.SetStateAction<Rect | RegularPolygon | Circle | Text | Svg | null>>
        }
    } = useContext(GlobalContext);
    console.log(GlobalValue.State!.Property)
    return (
        <div id='PropertyMenu'>
            <h1>プロパティ</h1>
            <div style={{ height: 500 }}></div>
        </div>
    );
};