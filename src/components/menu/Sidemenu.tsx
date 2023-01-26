import { useEffect, useState, useContext } from 'react';
import './side.css';
import { GlobalContext } from "../providers/GlobalProvider";

import { Type } from "./property/Type"
import { Radius } from "./property/Radius"
import { Text, FontSize, FontStyle, FontFamily } from "./property/Font"
import { PositionX, PositionY } from "./property/Position"
import { Rotation } from "./property/Rotation"
import { ScaleX, ScaleY } from "./property/Scale"
import { Fill } from "./property/Fill"
import { Opacity } from "./property/Opacity"
import { CornerRadius } from "./property/CornerRadius"
import { Stroke, StrokeWidth } from "./property/Stroke"

export const Side = () => {
    const GlobalValue: { Canvas?: any, SideProperty?: any } = useContext(GlobalContext);
    const property = GlobalValue.SideProperty.Property;

    const [Items, SetItems]: [any, Function] = useState([]);
    useEffect(() => {
        if (property) {
            SetItems(Object.keys(property));
        }
    }, [property]);

    return (
        <div className='Side'>
            {Items.includes('type') && (
                <Type Value={property['type']} />
            )}
            {Items.includes('fontSize') && (
                <>
                    <Text obj={GlobalValue} index={property['index']} Value={property['text']} />
                    <FontSize obj={GlobalValue} index={property['index']} Value={property['fontSize']} />
                    <FontStyle obj={GlobalValue} index={property['index']} />
                    <FontFamily obj={GlobalValue} index={property['index']} Value={property['fontFamily']} />
                </>
            )}
            {Items.includes('radius') && (
                <Radius obj={GlobalValue} index={property['index']} Value={property['radius']} />
            )}
            {Items.includes('x') && (
                <>
                    <PositionX obj={GlobalValue} index={property['index']} Value={property['x']} />
                    <PositionY obj={GlobalValue} index={property['index']} Value={property['y']} />
                </>
            )}
            {Items.includes('rotation') && (
                <Rotation obj={GlobalValue} index={property['index']} Value={property['rotation']} />
            )}
            {Items.includes('scaleX') && (
                <>
                    <ScaleX obj={GlobalValue} index={property['index']} Value={property['scaleX']} />
                    <ScaleY obj={GlobalValue} index={property['index']} Value={property['scaleY']} />
                </>
            )}
            {Items.includes('fill') && (
                <Fill obj={GlobalValue} index={property['index']} Value={property['fill']} />
            )}
            {Items.includes('opacity') && (
                <Opacity obj={GlobalValue} index={property['index']} Value={property['opacity']} />
            )}
            {Items.includes('cornerRadius') && (
                <CornerRadius obj={GlobalValue} index={property['index']} Value={property['cornerRadius']} />
            )}
            {Items.includes('stroke') && (
                <>
                    <Stroke obj={GlobalValue} index={property['index']} Value={property['stroke']} />
                    <StrokeWidth obj={GlobalValue} index={property['index']} Value={property['strokeWidth']} />
                </>
            )}

        </div>
    )
};
