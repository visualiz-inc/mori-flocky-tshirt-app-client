import { useCallback, useContext, useState, useEffect } from 'react';
import { Common } from './common';
import '../side.css';
import { GlobalContext } from "../../providers/GlobalProvider";

export const Stroke = (props:{obj:any,index:number[],Value:string}) => {
  const GlbalValue: {Canvas?:Object,SideProperty?:Object} = useContext(GlobalContext);

  const [Value,SetValue] = useState(props.Value);
  useEffect(() => {
    Common('stroke', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(e.target.value);
    },[]
  )
          return (
            <>
              <div className='SideText'>
                <p className='SideItem'>枠色:</p>
                <input type="color" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
              </div>
            </>
         )
}

export const StrokeWidth = (props:{obj:any,index:number[],Value:number}) => {
  const GlbalValue: {Canvas?:Object,SideProperty?:Object} = useContext(GlobalContext);

  const [Value,SetValue] = useState(props.Value);
  useEffect(() => {
    Common('strokeWidth', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )
   
  return (
    <>
      <div className='SideText'>
        <p className='SideItem'>枠線:</p>
        <input type="number" className='SideValue' step="0.1" min={0} value = {props.Value} onChange={ChangeValue}/>
      </div>
    </>
 )
}