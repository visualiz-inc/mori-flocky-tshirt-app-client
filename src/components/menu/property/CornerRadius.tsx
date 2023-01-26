import { useCallback, useContext, useState, useEffect } from 'react';
import '../side.css';
import { Common } from './common';
import { GlobalContext } from "../../providers/GlobalProvider";

export const CornerRadius = (props:{obj:any,index:number[],Value:number}) => {
  const GlbalValue: {Canvas?:Object,SideProperty?:Object} = useContext(GlobalContext);

  const [Value,SetValue] = useState(props.Value);
  useEffect(() => {
    Common('cornerRadius', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )
          return (
            <>
              <div className='SideText'>
                <p className='SideItem'>角丸:</p>
                <input type="number" className='SideValue' max={25} min = {0} value = {props.Value} onChange={ChangeValue}/>
              </div>
            </>
         )
}