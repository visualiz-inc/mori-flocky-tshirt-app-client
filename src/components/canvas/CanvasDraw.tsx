import React, { useRef, useEffect, useContext } from "react";
import { KonvaNodeComponent, Transformer } from 'react-konva';
import Konva from 'konva';
import { GlobalContext } from "../providers/GlobalProvider";

export const CanvasDraw = (props: {
    index: object,
    shapeProps: any,
    isSelected: boolean,
    onSelect: Function,
    onChange: Function
}) => {
    const GlobalValue: { SideProperty?: any } = useContext(GlobalContext);
    const shapeRef: React.MutableRefObject<null> = useRef(null);  //useRef currentプロパティに値を保持する
    const trRef = useRef<Konva.Transformer>(null);

    const Property = {
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
            // we need to attach transformer manually
            trRef.current?.nodes([shapeRef.current]); // <-ここ使い方あってる？
            trRef.current?.getLayer()?.batchDraw();
            //この図形が位置するレイヤーを"次のtickに"再描画

            UpdateProperty();

            const elem = document.getElementsByClassName('Side')[0];

            if (elem) {
                document.getElementsByClassName('Side')[0].animate({
                    right: '0px',
                }, {
                    duration: 500,
                    fill: 'forwards',
                    easing: 'ease-in'
                });
            }
        }
    }, [props.isSelected]); //isSelectedを監視

    function UpdateProperty() {
        GlobalValue.SideProperty.SetProperty({
            ...NodeProperty(),
        });

    }

    function NodeProperty() {
        const node: any = shapeRef.current!;
        let rotation: number = Math.round(node.rotation());
        if (rotation < 0) rotation = 360 + rotation;  //値を使いやすくする
        return {
            ...props.shapeProps,    //図形のスタイル等
            index: props.index,

            rotation: rotation,

            width: Math.ceil(node.width() * 10) / 10,
            height: Math.ceil(node.height() * 10) / 10,

            x: Math.round(node.x()),  //x座標を更新
            y: Math.round(node.y()),  //y座標を更新

            scaleX: Math.round(node.scaleX() * 100) / 100,   //widthを更新
            scaleY: Math.round(node.scaleY() * 100) / 100, //heightを更新
        }
    }

    return (
        <>
            <props.shapeProps.type {...Property} />

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
