import { AllShape, AllPropertyShapeType } from "../../../../../Types"


import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../providers/GlobalProvider';
import '../.menu.css';
import { BottomNavigation, BottomNavigationAction, Box, Paper } from "@mui/material";

import SquareIcon from '@mui/icons-material/Square';
import CircleIcon from '@mui/icons-material/Circle';
import PentagonIcon from '@mui/icons-material/Pentagon';
import TextFormatIcon from '@mui/icons-material/TextFormat';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import InterestsIcon from '@mui/icons-material/Interests';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';

import {
    TextProperty,
    FontSizeProperty,
    FontStyleProperty,
    FontFamilyProperty,
    AlignProperty,
    LetterSpacingProperty
} from './Text';
import { WidthProperty, HeightProperty } from "./WidthHeight";
import { CornerRadiusProperty } from './CornerRadius';
import { SidesProperty } from "./Sides";
import { RadiusProperty } from "./Radius";

import {
    PosXProperty,
    PosYProperty,
    RotationProperty,
    ScaleXProperty,
    ScaleYProperty,
    FillProperty,
    StrokeWidthProperty,
    OpacityProperty
} from './Common';
import { SortProperty } from "./Sort";

export const PropertyWindow = () => {
    const GlobalValue: {
        LogMaxTimes?: number,
        State?: {
            ObjectLogIndex: number;
            Object: AllShape[][],
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>
            ObjectLog: AllShape[][][],
            SetObjectLog: React.Dispatch<React.SetStateAction<AllShape[][][]>>,
            SetObjectLogIndex: React.Dispatch<React.SetStateAction<number>>,
            Property: AllShape | null,
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
            let Object: AllShape[][] = State.Object;
            Object[State.ObjectInside] = (State.Object[State.ObjectInside].map((obj) =>
                (obj.id == ref.id ? newProperty : obj)));      //Object代入
            State.SetObject(Object);
        }
        State.SetProperty(newProperty);
    };
    const UpdateElem = (flag: boolean) => {    //フォーカス解除時
        if (flag == true) {   //値が変更されていたらログ更新
            const LogIndex = Math.min(GlobalValue.State!.ObjectLogIndex + 1, GlobalValue.LogMaxTimes!);
            const MinIndex = Math.max(0, GlobalValue.State!.ObjectLog.length - GlobalValue.LogMaxTimes!);
            const Logs: AllShape[][][] = GlobalValue.State!.ObjectLog.slice(MinIndex, LogIndex).concat([JSON.parse(JSON.stringify(GlobalValue.State!.Object))]);
            GlobalValue.State!.SetObjectLog(Logs);
            GlobalValue.State!.SetObjectLogIndex(LogIndex);
        }
    }
    useEffect(() => {
        SetRefProperty(GlobalValue.State!.Property as AllPropertyShapeType);
    }, [GlobalValue.State!.Property]);

    const [PageIndex, SetPageIndex] = useState<number>(0);
    if (!GlobalValue.State!.Property || !RefProperty) {    //選択オブジェクトがないとき
        return (

            <Box id='PropertyMenu'>
                <p>オブジェクトを<br />選択してください</p>
            </Box>
        )
    } else {
        const Keys = Object.keys(RefProperty);
        return (
            <>
                <Box id='PropertyMenu'>
                    {PageIndex == 0 && (
                        <>
                            {Keys!.includes('width') && !Keys!.includes('text') && (
                                <>
                                    <WidthProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                    <HeightProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                </>
                            )}
                            {Keys!.includes('cornerRadius') && (
                                <CornerRadiusProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            )}
                            {Keys!.includes('sides') && (
                                <SidesProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            )}
                            {Keys!.includes('radius') && (
                                <RadiusProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            )}
                            {Keys!.includes('text') && (
                                <>
                                    <TextProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                    <FontSizeProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                    <FontStyleProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                    <FontFamilyProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                    <AlignProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                    <LetterSpacingProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                                </>
                            )}
                        </>
                    )}
                    {PageIndex == 1 && (
                        <>
                            <PosXProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            <PosYProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            <RotationProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            <ScaleXProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            <ScaleYProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            <FillProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            <StrokeWidthProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                            <OpacityProperty onChange={ChangeProperty} Update={UpdateElem} Ref={RefProperty} />
                        </>
                    )}
                    {PageIndex == 2 && (
                        <SortProperty Update={UpdateElem} />
                    )}
                </Box>
                <Paper id="PageMenu" elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={PageIndex}
                        onChange={(e, value: number) => {
                            SetPageIndex(value);
                        }}
                    >
                        {RefProperty.type == 'Rect' && (
                            <BottomNavigationAction value={0} label="短形" icon={<SquareIcon />} />
                        )}
                        {RefProperty.type == 'Circle' && (
                            <BottomNavigationAction value={0} label="円形" icon={<CircleIcon />} />
                        )}
                        {RefProperty.type == 'RegularPolygon' && (
                            <BottomNavigationAction value={0} label="多角形" icon={<PentagonIcon />} />
                        )}
                        {RefProperty.type == 'Text' && (
                            <BottomNavigationAction value={0} label="文字" icon={<TextFormatIcon />} />
                        )}
                        {RefProperty.type == 'Image' && (
                            <BottomNavigationAction value={0} label="画像" icon={<InsertPhotoIcon />} />
                        )}
                        <BottomNavigationAction value={1} label="共通" icon={<InterestsIcon />} />
                        <BottomNavigationAction value={2} label="その他" icon={<HomeRepairServiceIcon />} />
                    </BottomNavigation>
                </Paper>
            </>
        )
    }
};