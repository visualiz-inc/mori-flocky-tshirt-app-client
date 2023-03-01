import React, { useRef, useEffect, useContext } from "react";
import { Rect, Circle, RegularPolygon, Text, Transformer } from 'react-konva';
import { GlobalContext } from "../../providers/GlobalProvider";

import { AllShape, Shape } from '../../../Types'
import { KonvaEventObject } from "konva/lib/Node";
import Konva from "konva";

export const CanvasDraw = (props: {
    index: number,
    shapeProps: Shape,
    isSelected: boolean,
    onSelect: (evt: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>) => void
    onChange: Function
}) => {
    const GlobalValue: {
        State?: {
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
            width: Math.ceil(node.width() * 10) / 10,
            height: Math.ceil(node.height() * 10) / 10,

            x: Math.round(node.x()), 
            y: Math.round(node.y()),  //x,y座標を更新

            scaleX: Math.round(node.scaleX() * 100) / 100,   //widthを更新
            scaleY: Math.round(node.scaleY() * 100) / 100, //heightを更新
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
            {
            props.shapeProps.type == 'Text' && (
                <Text {...DrawProperty} />
            )}


            {props.isSelected && (  //isSelected == true
                <Transformer
                    ref={trRef}
                    anchorStroke='#0000ff' // アンカー枠の色
                    anchorSize={7.5} // アンカーのサイズ
                    borderStroke='#6464f5' // 枠の色
                    rotateAnchorOffset={30}
                    boundBoxFunc={(oldBox, newBox) => {
                        UpdateProperty();
                        // もし変形後の幅か高さが5以下の場合、直前のサイズに戻す
                        //変形の最小値を設定している
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;

                    }}
                />
            )}
        </>
    );
};