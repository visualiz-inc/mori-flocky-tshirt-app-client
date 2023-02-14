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