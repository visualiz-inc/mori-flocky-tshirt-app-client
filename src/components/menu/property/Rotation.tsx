import { useCallback, useContext, useState, useEffect } from 'react';
import { Common } from './common';
import '../side.css';
import { GlobalContext } from "../../providers/GlobalProvider";

import { Shape,AllShape } from "../../../Types"

export const Rotation = (props:{index:number,Value:number}) => {
  const GlbalValue: {
    Canvas?:{
                Object: Shape[],
                SetObject: React.Dispatch<React.SetStateAction<Shape[]>>
            },
    SideProperty?:{
      Property:AllShape,
      SetProperty:React.Dispatch<React.SetStateAction<Shape & {index:number} | null>>
    },
  } = useContext(GlobalContext);


  const [Value,SetValue] = useState<number>(props.Value);
  useEffect(() => {
    Common('rotation', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      let Num: number = Number(e.target.value);
      if(Num > 360){
        Num -= 360;
      }else if(Num < 0){
        Num = 360 + Num;
      }
      SetValue(Num);
    },[]
  )
          return (
            <div className='SideText'>
              <p className='SideItem'>回転:</p>
              <input type="number" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
            </div>
         )
}