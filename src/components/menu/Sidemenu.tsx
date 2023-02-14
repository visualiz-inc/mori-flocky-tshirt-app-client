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

import { AllShape, Shape } from "../../Types"

export const Side = () => {
    const GlobalValue:
        {
            Canvas?: {
                Object: Shape[],
                SetObject: React.Dispatch<React.SetStateAction<Shape[]>>
            },
            SideProperty?: {
                Property: AllShape
            }
        } = useContext(GlobalContext);

    if (GlobalValue.SideProperty && GlobalValue.SideProperty.Property) {
        const property: AllShape = GlobalValue.SideProperty.Property;
        const [Items, SetItems] = useState<(string|number)[]>([]);
        useEffect(() => {
            if (property) {
                SetItems(Object.keys(property));
            }
        }, []);
        return (
            <div className='Side'>
                {Items.includes('type') && typeof property['type'] == 'string' && (
                    <Type Value={property['type']} />
                )}
                {Items.includes('fontSize') && (
                    <>
                        <Text index={property['index']} Value={property['text']} />
                        <FontSize index={property['index']} Value={property['fontSize']}/>
                        <FontStyle index={property['index']} />
                        <FontFamily index={property['index']} Value={property['fontFamily']} />
                    </>
                )}
                {Items.includes('radius') && (
                    <Radius index={property['index']} Value={property['radius']} />
                )}
                {Items.includes('x') && (
                    <>
                        <PositionX index={property['index']} Value={property['x']} />
                        <PositionY index={property['index']} Value={property['y']} />
                    </>
                )}
                {Items.includes('rotation') && (
                    <Rotation index={property['index']} Value={property['rotation']} />
                )}
                {Items.includes('scaleX') && (
                    <>
                        <ScaleX index={property['index']} Value={property['scaleX']} />
                        <ScaleY index={property['index']} Value={property['scaleY']} />
                    </>
                )}
                {Items.includes('fill') && (
                    <Fill index={property['index']} Value={property['fill']} />
                )}
                {Items.includes('opacity') && (
                    <Opacity index={property['index']} Value={property['opacity']} />
                )}
                {Items.includes('cornerRadius') && (
                    <CornerRadius index={property['index']} Value={property['cornerRadius']} />
                )}
                {Items.includes('stroke') && (
                    <>
                        <Stroke index={property['index']} Value={property['stroke']} />
                        <StrokeWidth index={property['index']} Value={property['strokeWidth']} />
                    </>
                )}

            </div>
        )
    }else {
        return (
            <p>NULL</p>
        )
    }
};