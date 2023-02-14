import { useCallback, useContext, useState, useEffect } from 'react';
import '../side.css';
import { Common } from './common';
import { GlobalContext } from "../../providers/GlobalProvider";

import { AllShape,Shape } from "../../../Types"

export const Fill = (props:{index:number,Value:string}) => {
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
    Common('fill', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(e.target.value);
    },[]
  )

      
          return (
            <>
              <div className='SideText'>
                <p className='SideItem'>塗りつぶし:</p>
                <input type="color" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
              </div>
            </>
         )
}