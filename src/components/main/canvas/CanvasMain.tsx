import { useState, useContext } from 'react';
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { Prop, Shape, AllShape } from '../../../Types'

import { CanvasDraw } from './CanvasDraw';

import { GlobalContext } from "../../providers/GlobalProvider";
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { Box } from '@mui/material';

import { AddImage } from '../../../CreateObject';

export const CanvasMain = () => {

  const GlobalValue: {
    State?: {
      Object: AllShape[][];
      SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
      ObjectLog: AllShape[][][],
      SetObjectLog: React.Dispatch<React.SetStateAction<AllShape[][][]>>,
      ObjectLogIndex: number,
      SetObjectLogIndex: React.Dispatch<React.SetStateAction<number>>,
      RefObjectLog: AllShape[][] | null,
      SetRefObjectLog: React.Dispatch<React.SetStateAction<AllShape[][] | null>>,
      ObjectInside: number,
      ObjectID: number,
      SetObjectID: React.Dispatch<React.SetStateAction<number>>,
      Property: AllShape | null,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    },
    LogMaxTimes?: number,
    CanvasProperty?: Prop
  } = useContext(GlobalContext);  //グローバル変数を読み込み



  const [selectedId, SelectShape] = useState<string | null>(null);


  const checkDeselect = (e: Konva.KonvaEventObject<MouseEvent> | Konva.KonvaEventObject<TouchEvent>) => {
    // canvasクリックで実行
    const ClickedOnEmpty = e.target === e.target.getStage(); //クリック位置に図形があるか
    if (ClickedOnEmpty) { //なければ実行
      SelectShape(null);  //selectShapeを初期値にする

      if (  //保存されていなかった場合
        JSON.stringify(GlobalValue.State!.Object) != JSON.stringify(GlobalValue.State!.ObjectLog[GlobalValue.State!.ObjectLogIndex]) && selectedId) {


        const LogIndex = Math.min(GlobalValue.State!.ObjectLogIndex + 1, GlobalValue.LogMaxTimes!);
        const MinIndex = Math.max(0, GlobalValue.State!.ObjectLog.length - GlobalValue.LogMaxTimes!);
        const Logs: AllShape[][][] = GlobalValue.State!.ObjectLog.slice(MinIndex, LogIndex).concat([JSON.parse(JSON.stringify(GlobalValue.State!.Object))]);
        GlobalValue.State!.SetObjectLog(Logs);
        GlobalValue.State!.SetObjectLogIndex(LogIndex);
      }
      GlobalValue.State!.SetProperty(null);
    }
  };

  const ShapeObjects: AllShape[] = GlobalValue.State!.Object[GlobalValue.State!.ObjectInside].sort(function (SortA, SortB) {
    return (SortA.zindex > SortB.zindex) ? -1 : 1;
  });

  function onDrop<T extends File>(acceptedFiles: T[], fileRejections: FileRejection[], event: DropEvent) {
    if (isDragReject) { //許可されない形式がドロップされたときTrue
      return;
    }
    acceptedFiles.forEach(acceptedFile => {
      if (acceptedFile.size == 200000000) { //最大サイズを超えた場合
        console.log(`画像容量が大きすぎます\n${(acceptedFile.size / 1000000).toFixed(3)}MB`);
        return;
      }
      const DropImg = new Image();
      DropImg.onload = () => {
        if(DropImg.width > 6000 || DropImg.height > 6000){
          console.log(`画像サイズが大きすぎます\n${(DropImg.width).toFixed(1)}px×${(DropImg.height).toFixed(1)}px`);
          return;
        }
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = DropImg.width;
        canvas.height = DropImg.height;
        context!.drawImage(DropImg, 0, 0);
        AddImage(GlobalValue, DropImg.width, DropImg.height, canvas.toDataURL("image/*"));
      }
      DropImg.src = URL.createObjectURL(acceptedFile);
    });
  };

  const { isDragReject, getRootProps } = useDropzone({
    onDrop,
    accept: {
      'image/png': [],
      'image/jpeg': [],
      'image/svg+xml': [],
    },
  });

  return (
    <Box {...getRootProps()} onClick={() => {/*clickイベントを上書き*/ }}>
      <Stage
        width={GlobalValue.CanvasProperty!.Width}    //幅指定と微調整
        height={GlobalValue.CanvasProperty!.Height}   //高さ指定と微調整
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        scaleX={0.4}
        scaleY={0.4}
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
                    const Objs: AllShape[][] = GlobalValue.State!.Object;
                    if (Objs != undefined) {
                      const Keys: string[] = Object.keys(Objs[GlobalValue.State!.ObjectInside]);
                      const KeysNumber: number = Number(Keys[i]); //indexに使うためにnumberに変換
                      Objs[GlobalValue.State!.ObjectInside][KeysNumber] = newAttrs;
                      GlobalValue.State!.SetObject(Objs);

                      const LogIndex = Math.min(GlobalValue.State!.ObjectLogIndex + 1, GlobalValue.LogMaxTimes!);
                      const MinIndex = Math.max(0, GlobalValue.State!.ObjectLog.length - GlobalValue.LogMaxTimes!);
                      const Logs: AllShape[][][] = GlobalValue.State!.ObjectLog.slice(MinIndex, LogIndex).concat([JSON.parse(JSON.stringify(Objs))]);
                      GlobalValue.State!.SetObjectLog(Logs);
                      GlobalValue.State!.SetObjectLogIndex(LogIndex);
                    }
                  }}
                />
              );
            }
          })}
        </Layer>
      </Stage>
    </Box>
  )
};