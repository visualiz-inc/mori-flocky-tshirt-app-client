import { useState, useContext, useMemo } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { CanvasDraw } from './CanvasDraw';
import { GlobalContext } from "../providers/GlobalProvider";

type cProperty = {
    width: number,
    height: number,
    border: string
}

export const CanvasMain = () => {
    const GlobalValue: { Canvas?: object, CanvasProperty?: cProperty, SideProperty?: Object } = useContext(GlobalContext);  //グローバル変数を読み込み
    const GlobalCanvas: { Object?: any; SetObject?: React.Dispatch<React.SetStateAction<null>> } = GlobalValue.Canvas!;
    const SideProperty: { Property?: any, SetProperty?: React.Dispatch<React.SetStateAction<null>> } = GlobalValue.SideProperty!;

    const objects = [];
    for (var i in GlobalCanvas.Object) {
        objects.push([GlobalCanvas.Object[i]]);
    }

    const [selectedId, selectShape] = useState(null);

    const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>) => {
        // canvasクリックで実行
        const clickedOnEmpty = e.target === e.target.getStage(); //クリック位置に図形があるか
        const elem = document.getElementsByClassName('Side')[0];
        if (clickedOnEmpty) { //なければ実行
            selectShape(null);  //selectShapeを初期値にする

            if (elem) {
                elem.animate({
                    right: '-260px',
                }, {
                    duration: 200,
                    fill: 'forwards',
                    easing: 'ease-in'
                });
            }
        }
    };

    const CanvasSize = useMemo(() => {
        let width = GlobalValue.CanvasProperty?.width;
        let height = GlobalValue.CanvasProperty?.width; // <- あってる？
        return [width, height]
    }, [GlobalValue.CanvasProperty]);

    return (
        <Stage
            width={CanvasSize[0] && CanvasSize[0] / 2.5 + 0.5}    //幅指定と微調整
            height={CanvasSize[1] && CanvasSize[1] / 2 + 2}   //高さ指定と微調整
            onMouseDown={checkDeselect}
            onTouchStart={checkDeselect}
            style={{
                pointerEvents: 'auto',
            }}
        >

            {objects.map((layer, i) => {
                return (
                    <Layer key={`layer${i}`}>
                        {layer[0].map((obj: any, l: number) => {
                            return (
                                <CanvasDraw
                                    key={obj.id} //えらー回避
                                    index={[i, l]}
                                    shapeProps={obj} //描画する図形のデータ受け渡し
                                    isSelected={obj.id === selectedId} //selectedIDがrect.idイコールのときtrueを渡す

                                    onSelect={() => { //クリックまたはタップ時に実行
                                        selectShape(obj.id);
                                    }}
                                    onChange={(newAttrs: any) => {   //図形をtransformした際に更新する
                                        if (GlobalCanvas.SetObject != null) {
                                            const objs = GlobalCanvas.Object;
                                            const keys = Object.keys(objs);
                                            objs[keys[i]][l] = newAttrs;
                                            GlobalCanvas.SetObject(objs);
                                        }
                                    }}
                                />
                            );
                        })}
                    </Layer>
                );
            })}
        </Stage>
    );
};
