import { createContext, useState, ReactNode } from "react";
import { Prop, AllShape, TshirtType, MaskType } from "../../Types"

import ObjectJsonData from '../../json/Object.json';
import ItemJsonData from '../../json/Item.json';

export const GlobalContext = createContext({});

export const GlobalProvider = (props: { children: ReactNode }) => {
  const { children } = props;


  const [Object, SetObject] = useState<AllShape[][]>([ObjectJsonData["FrontObject"],ObjectJsonData["BackObject"]]); //オブジェクト情報
  const [ObjectInside,SetObjectInside] = useState<number>(0);           //裏表
  const [ObjectLog,SetObjectLog] = useState<AllShape[][][]>([JSON.parse(JSON.stringify(Object))]);  //オブジェクトログ
  const [ObjectLogIndex,SetObjectLogIndex] = useState<number>(0);       //オブジェクトログのインデックス

  const [Property, SetProperty] =
    useState<AllShape | null>(null);

  const [Color, SetColor] =
    useState<string>('ホワイト'); //アイテムの色設定

  const ItemsData: (TshirtType | MaskType)[] = ItemJsonData["Item"];  //Tシャツのデータ
  const [Item, SetItem] = useState<TshirtType | MaskType>(ItemsData[0]);  //初期アイテム設定

  const [MainWindowProperty, SetMainWindowProperty] = useState<string>("Canvas");  //メインウィンドウの表示切り替え

  const Global = {
    CanvasProperty: {
      Width: 180,
      Height: 220,
      Border: '2px dashed #ffffff'
    } as Prop,
    ItemsData,
    State: {
      Object, SetObject,
      ObjectInside,SetObjectInside,
      ObjectLog,SetObjectLog,
      ObjectLogIndex,SetObjectLogIndex,
      Property, SetProperty,
      Color, SetColor,
      Item, SetItem,
      MainWindowProperty, SetMainWindowProperty
    }
  }

  return (
    <GlobalContext.Provider value={Global}>
      {children}
    </GlobalContext.Provider>
  );
};