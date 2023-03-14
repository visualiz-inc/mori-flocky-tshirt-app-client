import React, { useRef, useEffect, useContext } from "react";
import { Rect, Circle, RegularPolygon, Text, Transformer, Image } from 'react-konva';
import { GlobalContext } from "../../providers/GlobalProvider";

import { AllShape, Shape } from '../../../Types'
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";
import { Box } from "konva/lib/shapes/Transformer";
import useImage from 'use-image';

export const CanvasDraw = (props: {
    index: number,
    shapeProps: Shape,
    isSelected: boolean,
    onSelect: (evt: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => void
    onChange: Function
}) => {
    const GlobalValue: {
        LogMaxTimes?: number,
        State?: {
            Object: AllShape[][];
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
            ObjectInside: number,
            ObjectLog: AllShape[][][],
            SetObjectLog: React.Dispatch<React.SetStateAction<AllShape[][][]>>,
            ObjectLogIndex: number,
            SetObjectLogIndex: React.Dispatch<React.SetStateAction<number>>,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
        }
    } = useContext(GlobalContext);
    const shapeRef: React.MutableRefObject<null> = useRef(null);  //useRef currentプロパティに値を保持する
    const trRef = useRef<Konva.Transformer>(null);


    const DrawProperty = {
        ...props.shapeProps,    //図形のスタイル等
        draggable: true,    //ドラッグ有効
        onClick: props.onSelect,  //クリックで選択状態
        onTap: props.onSelect,    //タップで選択状態
        ref: shapeRef,
        onDragmove: () => {
            UpdateProperty();
        },
        onDragEnd: () => {  //トランスフォームが終わった際に実行
            props.onChange({    //図形の情報を更新
                ...NodeProperty()
            });
        }
    }

    useEffect(() => {
        if (props.isSelected) {   //選択されている際に実行
            trRef.current?.nodes([shapeRef.current!]); // <-ここ使い方あってる？
            trRef.current?.getLayer()!.batchDraw();

            UpdateProperty();
        }
    }, [props.isSelected]); //isSelectedを監視

    function UpdateProperty() {
        GlobalValue.State!.SetProperty({
            ...NodeProperty() as AllShape,
        });
    }

    function NodeProperty() {   //nodeメソッドの場合直代入 返り値はSideへ
        const node: Konva.Node = shapeRef.current!;
        let rotation: number = Math.round(node.rotation());
        if (rotation < 0) rotation = 360 + rotation;  //値を使いやすくする

        return {
            ...props.shapeProps,    //図形のスタイル等
            index: props.index,

            rotation: rotation,

            x: Math.round(node.x()),
            y: Math.round(node.y()),  //x,y座標を更新
            scaleX: Math.round(node.scaleX() * 100) / 100,   //scalexを更新
            scaleY: Math.round(node.scaleY() * 100) / 100, //scaleyを更新
        }
    }
    return (
        <>
            {props.shapeProps.type == 'Rect' && (
                <Rect {...DrawProperty} />
            )}
            {props.shapeProps.type == 'Circle' && (
                <Circle {...DrawProperty} />
            )}
            {props.shapeProps.type == 'RegularPolygon' && (
                <RegularPolygon sides={0} radius={0} {...DrawProperty} />
            )}
            {props.shapeProps.type == 'Text' && (
                <Text {...DrawProperty} />
            )}
            {props.shapeProps.type == 'Image' && (
                <DrawImage DrawProperty={DrawProperty}/>
            )}


            {props.isSelected && (  //isSelected == true
                <Transformer
                    ref={trRef}
                    anchorStroke='#0000ff' // アンカー枠の色
                    anchorSize={6} // アンカーのサイズ
                    borderStroke='#6464f5' // 枠の色
                    rotateAnchorOffset={30}
                    boundBoxFunc={(oldBox: Box, newBox: Box) => {
                        UpdateProperty();
                        // もし変形後の幅か高さが5以下の場合、直前のサイズに戻す
                        //変形の最小値を設定している
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                    onTransformEnd={(e: KonvaEventObject<Event>) => {

                        const node: Konva.Node = e.target;
                        let rotation: number = Math.round(node.rotation());
                        if (rotation < 0) rotation = 360 + rotation;  //値を使いやすくする
                        let Objs: AllShape[][] = GlobalValue.State!.Object;
                        Objs[GlobalValue.State!.ObjectInside][e.target.index] = {
                            ...Objs[GlobalValue.State!.ObjectInside][e.target.index],

                            rotation: rotation,
                            x: Math.round(node.x()),
                            y: Math.round(node.y()),  //x,y座標を更新
                            scaleX: Math.round(node.scaleX() * 100) / 100,   //scalexを更新
                            scaleY: Math.round(node.scaleY() * 100) / 100, //scaleyを更新
                        }
                        GlobalValue.State!.SetObject(Objs);



                        const LogIndex = Math.min(GlobalValue.State!.ObjectLogIndex + 1, GlobalValue.LogMaxTimes!);
                        const MinIndex = Math.max(0, GlobalValue.State!.ObjectLog.length - GlobalValue.LogMaxTimes!);
                        const Logs: AllShape[][][] = GlobalValue.State!.ObjectLog.slice(MinIndex, LogIndex).concat([JSON.parse(JSON.stringify(Objs))]);
                        GlobalValue.State!.SetObjectLog(Logs);
                        GlobalValue.State!.SetObjectLogIndex(LogIndex);
                    }}

                />
            )}
        </>
    );
};

const DrawImage = (props:{DrawProperty:any}) => {
    const [image] = useImage(props.DrawProperty.src);
    return <Image {...props.DrawProperty} image={image} />;
  };