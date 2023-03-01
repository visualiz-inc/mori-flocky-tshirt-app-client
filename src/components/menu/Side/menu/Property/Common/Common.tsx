import { Svg, Rect, RegularPolygon, Circle, Text, AllShape, Shape } from "../../../../../../Types"
type AllPropertyShapeType = (Shape & Rect & RegularPolygon & Circle & Text & Svg) | null;


import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../../providers/GlobalProvider';
import '../../.menu.css';
import { Box, Button } from "@mui/material";

import { TextProperty } from './Text';
import { Others } from '../Others/Others'

export const PropertyWindow = () => {
    const GlobalValue: {
        State?: {
            Object: AllShape[],
            SetObject: React.Dispatch<React.SetStateAction<AllShape[]>>,
            Property: AllShape,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
        }
    } = useContext(GlobalContext);

    const [RefProperty, SetRefProperty] = useState<AllPropertyShapeType>(null);     //Keysと参照用
    const ChangeProperty = (    //プロパティ変更
        changeValue: {},
        ref: AllPropertyShapeType,
        State: {
            Object: AllShape[],
            SetObject: React.Dispatch<React.SetStateAction<AllShape[]>>,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
        }) => {
        const newProperty = {
            ...ref as AllShape,
            ...changeValue
        }

        if (ref) {
            State.SetObject(State.Object.map((obj, index) =>
                (index == ref.index ? newProperty : obj)));      //Object代入
        }
        State.SetProperty(newProperty);
    };

    useEffect(() => {
        SetRefProperty(GlobalValue.State!.Property as AllPropertyShapeType);
    }, [GlobalValue.State!.Property]);

    const [PropertyPage, SetPropertyPage] = useState<number>(0);

    if (!RefProperty) {    //選択オブジェクトがない場合
        return (
            <Box id='PropertyMenu'>
                <p>オブジェクトを選択してください</p>
            </Box>
        )
    } else {
        const Keys = Object.keys(RefProperty);
        if (PropertyPage == 0) {
            return (
                <>
                <Box id='PropertyMenu'>
                    {Keys.includes('text') && (
                        <TextProperty onChange={ChangeProperty} Ref={RefProperty} />
                    )}
                </Box>
                <Box id='OthersButtonBox'>
                        <Button 
                            id='OthersButton'
                            onClick={() => SetPropertyPage(1)}
                        >その他の設定</Button>
                </Box>
                </>
            )
        }else if(PropertyPage == 1) {
            return (
                <Box id='PropertyMenu'>
                    <Others SetPropertyPage={SetPropertyPage}/>
                </Box>
            )
        }else {
            return (
                <p>ERROR</p>
            )
        }
    }
};