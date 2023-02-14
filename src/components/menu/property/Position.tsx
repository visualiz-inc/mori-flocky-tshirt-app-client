import { useCallback, useContext, useState, useEffect } from 'react';
import { Common } from './common';
import '../side.css';
import { GlobalContext } from "../../providers/GlobalProvider";

import { AllShape,Shape } from "../../../Types"

export const PositionX = (props:{index:number,Value:number}) => {
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
    Common('x', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )
   
  return (
    <>
      <div className='SideText'>
        <p className='SideItem'>X座標:</p>
        <input type="number" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
      </div>
    </>
 )
}

export const PositionY = (props:{index:number,Value:number}) => {
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
    Common('y', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )
   
  return (
    <>
      <div className='SideText'>
        <p className='SideItem'>Y座標:</p>
        <input type="number" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
      </div>
    </>
 )
}