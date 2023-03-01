import { useCallback, useContext, useState, useEffect } from 'react';
import { Common } from './common';
import '../side.css';
import { GlobalContext } from "../../providers/GlobalProvider";

import { AllShape,Shape } from "../../../Types"

export const Text = (props:{index:number,Value:string}) => {
  const GlbalValue: {
    Canvas?:{
                Object: Shape[],
                SetObject: React.Dispatch<React.SetStateAction<Shape[]>>
            },
    SideProperty?:{
      Property: AllShape,
      SetProperty:React.Dispatch<React.SetStateAction<Shape & {index:number} | null>>
        },
  } = useContext(GlobalContext);

  const [Value,SetValue] = useState<string>(props.Value);
  useEffect(() => {
    Common('Text', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(e.target.value);
    },[]
  )

      
          return (
            <>
              <div className='SideText'>
                <p className='SideItem'>テキスト:</p>
                <input type="text" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
              </div>
            </>
         )
}

function Common(
  type: string,
  Value: number | string,
  index: number) {
  const GlobalValue: {
      State?: {
          Object: (Rect | RegularPolygon | Circle | Text | Svg)[],
          SetObject: React.Dispatch<React.SetStateAction<(Rect | RegularPolygon | Circle | Text | Svg)[]>>,
          SetProperty: React.Dispatch<React.SetStateAction<(Rect | RegularPolygon | Circle | Text | Svg) | null>>
      }
  } = useContext(GlobalContext);
  if (index != undefined && GlobalValue.State){
      interface CommonInterface extends AllShape {
          [key: string]: number | string | unknown    //ブランケット記法で参照した際の返り値を定義
      }
      let TempObject = GlobalValue.State.Object as CommonInterface[];
      TempObject[index][type] = Value;
      
      GlobalValue.State.SetObject(TempObject);   //オブジェクトを代入 
      GlobalValue.State.SetProperty({         //サイドバーに代入
          ...TempObject[index],
          'index': index
      });
  }
}