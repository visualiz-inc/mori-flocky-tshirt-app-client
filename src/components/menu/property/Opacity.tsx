import { useCallback, useContext, useState, useEffect } from 'react';
import '../side.css';
import { Common } from './common';
import { GlobalContext } from "../../providers/GlobalProvider";

import { AllShape, Shape } from "../../../Types"

export const Opacity = (props:{index:number,Value:number}) => {
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

  const [Value,SetValue] = useState<number>(props.Value);
  useEffect(() => {
    Common('opacity', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )

      
          return (
            <>
              <div className='SideText'>
                <p className='SideItem'>透明度:</p>
                <input type="range" name="volume" step="0.01" min="0" max="1" value={props.Value} onChange={ChangeValue}/>
              </div>
            </>
         )
}