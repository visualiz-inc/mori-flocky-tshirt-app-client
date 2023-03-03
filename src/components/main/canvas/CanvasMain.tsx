import { useState, useContext, useMemo } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { Prop, Shape, AllShape } from '../../../Types'

import { CanvasDraw } from './CanvasDraw';

import { GlobalContext } from "../../providers/GlobalProvider";

export const CanvasMain = () => {

  const GlobalValue: {
    State?: {
      Object: AllShape[][];
      SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
      ObjectInside: number,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    },
    CanvasProperty?: Prop
  } = useContext(GlobalContext);  //グローバル変数を読み込み



  const [selectedId, SelectShape] = useState<string | null>(null);


  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>) => {
    // canvasクリックで実行
    const ClickedOnEmpty = e.target === e.target.getStage(); //クリック位置に図形があるか
    if (ClickedOnEmpty) { //なければ実行
      SelectShape(null);  //selectShapeを初期値にする
      GlobalValue.State!.SetProperty(null);
    }
  };

  const CanvasSize = useMemo(() => {
    const Width = GlobalValue.CanvasProperty?.Width;
    const Height = GlobalValue.CanvasProperty?.Height;
    return [Width, Height]
  }, [GlobalValue.CanvasProperty]);
  const ShapeObjects: AllShape[] = GlobalValue.State!.Object[GlobalValue.State!.ObjectInside].sort(function (SortA, SortB) {

    return (SortA.zindex > SortB.zindex) ? -1 : 1;
  });
  return (
    <Stage
      width={CanvasSize[0]}    //幅指定と微調整
      height={CanvasSize[1]}   //高さ指定と微調整
      scaleX={0.5}
      scaleY={0.5}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
      style={{
        pointerEvents: 'auto',
      }}
    >
      <Layer>
        {ShapeObjects.map((obj: Shape, i: number) => {
          if (obj != null) {
            return (
              <CanvasDraw
                key={`obj${i}`} //えらー回避
                index={i}
                shapeProps={obj} //描画する図形のデータ受け渡し
                isSelected={obj.id === selectedId} //selectedIDがrect.idイコールのときtrueを渡す

                onSelect={() => { //クリックまたはタップ時に実行
                  SelectShape(obj.id);
                }}
                onChange={(newAttrs: AllShape) => {   //図形をtransformした際に更新する
                  if (GlobalValue.State && GlobalValue.State.SetObject && obj) {
                    const Objs: AllShape[][] = GlobalValue.State.Object;
                    if (Objs != undefined) {
                      const Keys: string[] = Object.keys(Objs[GlobalValue.State.ObjectInside]);
                      const KeysNumber: number = Number(Keys[i]); //indexに使うためにnumberに変換
                      Objs[GlobalValue.State.ObjectInside][KeysNumber] = newAttrs;
                      GlobalValue.State.SetObject(Objs);
                    }
                  }
                }}
              />
            );
          }
        })}
      </Layer>
    </Stage>

  )
};