import { useCallback, useContext, useState, useEffect } from 'react';
import { Common } from './common';
import '../side.css';
import { GlobalContext } from "../../providers/GlobalProvider";

export const Text = (props:{obj:any,index:number[],Value:string}) => {
  const GlbalValue: {Canvas?:HTMLElement,SideProperty?:HTMLElement} = useContext(GlobalContext);

  const [Value,SetValue] = useState(props.Value);
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