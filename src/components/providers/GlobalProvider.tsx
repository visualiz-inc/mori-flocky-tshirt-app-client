import { createContext, useState, ReactNode } from "react";
import { Prop, Svg, Rect, RegularPolygon, Circle, Text, TshirtType, MaskType } from "../../Types"

import ObjectJsonData from '../../json/Object.json';
import ItemJsonData from '../../json/Item.json';

export const GlobalContext = createContext({});

export const GlobalProvider = (props: { children: ReactNode }) => {
  const { children } = props;


  const [Object, SetObject] = useState<(Rect | RegularPolygon | Circle | Text | Svg)[]>(ObjectJsonData["Object"]);

  const [Property, SetProperty] =
    useState<Rect | RegularPolygon | Circle | Text | Svg | null>(null);

  const [Color, SetColor] =
    useState<string>('ホワイト'); //アイテムの色設定

  const ItemsData: (TshirtType | MaskType)[] = ItemJsonData["Item"];  //Tシャツのデータ
  const [Item, SetItem] = useState<TshirtType | MaskType>(ItemsData[0]);  //初期アイテム設定

  const [MainWindowProperty, SetMainWindowProperty] = useState<string>("Canvas");  //メインウィンドウの表示切り替え

  const Global = {
    CanvasProperty: {
      Width: 250,
      Height: 330,
      Border: '2px dashed #ffffff'
    } as Prop,
    ItemsData,
    State: {
      Object, SetObject,
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