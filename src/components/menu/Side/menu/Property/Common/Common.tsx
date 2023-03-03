import { Svg, Rect, RegularPolygon, Circle, Text, AllShape, Shape } from "../../../../../../Types"
type AllPropertyShapeType = (Shape & Rect & RegularPolygon & Circle & Text & Svg) | null;


import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../../providers/GlobalProvider';
import '../../.menu.css';
import { Box, Button } from "@mui/material";

import { TextProperty } from './Text';
import { Sort } from "./Sort";

export const PropertyWindow = () => {
    const GlobalValue: {
        State?: {
            Object: AllShape[][],
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
            Property: AllShape,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
        }
    } = useContext(GlobalContext);

    const [RefProperty, SetRefProperty] = useState<AllPropertyShapeType>(null);     //Keysと参照用
    const ChangeProperty = (    //プロパティ変更
        changeValue: {},
        ref: AllPropertyShapeType,
        State: {
            Object: AllShape[][],
            ObjectInside: number,
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
        }) => {
        const newProperty = {
            ...ref as AllShape,
            ...changeValue
        }

        if (ref) {
            let Object :AllShape[][] = State.Object;
            Object[State.ObjectInside] = (State.Object[State.ObjectInside].map((obj, index) =>
                (index == ref.index ? newProperty : obj)));      //Object代入
            State.SetObject(Object);
        }
        State.SetProperty(newProperty);
    };

    useEffect(() => {
        SetRefProperty(GlobalValue.State!.Property as AllPropertyShapeType);
    }, [GlobalValue.State!.Property]);

    const [OthersProperty, SetOthersProperty] = useState<number>(0);
    const onClickOther = () => {    //その他ボタンクリック
        if (OthersProperty == 0) {
            SetOthersProperty(1)
        } else if (OthersProperty == 1) {
            SetOthersProperty(0)
        }
    }
    if (!GlobalValue.State!.Property || !RefProperty) {    //選択オブジェクトがない場合
        return (

            <Box id='PropertyMenu'>
                <p>オブジェクトを選択してください</p>
            </Box>
        )
    } else {
        const Keys = Object.keys(RefProperty);
        return (
            <>
                <Box id='PropertyMenu'>
                    {Keys!.includes('text') && (
                        <TextProperty onChange={ChangeProperty} Ref={RefProperty} />
                    )}
                    <Box id='OthersButtonBox'>
                        <Button
                            id='OthersButton'
                            onClick={onClickOther}
                        >
                            {OthersProperty == 0 && (
                                <p>その他の設定</p>
                            )}
                            {OthersProperty == 1 && (
                                <p>閉じる</p>
                            )}
                        </Button>
                        {OthersProperty == 1 && (
                            <Sort />
                        )}
                    </Box>
                </Box>

            </>
        )
    }
};