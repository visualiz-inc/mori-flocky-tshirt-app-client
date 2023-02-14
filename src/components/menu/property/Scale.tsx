import { useCallback, useContext, useState, useEffect } from 'react';
import { Common } from './common';
import '../side.css';
import { GlobalContext } from "../../providers/GlobalProvider";

import { AllShape,Shape } from "../../../Types"


export const ScaleX = (props:{index:number,Value:number}) => {
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
    Common('scaleX', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )
          return (
            <div className='SideText'>
              <p className='SideItem'>拡大率X:</p>
              <input type="number" step="0.01" className='SideValue' value = {props.Value} onChange={ChangeValue}></input>
            </div>
         )
}


export const ScaleY = (props:{index:number,Value:number}) => {
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
    Common('scaleY', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )
          return (
            <div className='SideText'>
              <p className='SideItem'>拡大率Y:</p>
              <input type="number" step="0.01" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
            </div>
         )
}