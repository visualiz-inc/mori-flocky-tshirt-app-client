import { useCallback, useContext, useState, useEffect } from 'react';
import { Common } from './common';
import '../side.css';
import { GlobalContext } from "../../providers/GlobalProvider";

export const Rotation = (props:{obj:any,index:number[],Value:number}) => {
  const GlbalValue: {Canvas?:Object,SideProperty?:any} = useContext(GlobalContext);
  const SideProperty :{ Property?:any } = GlbalValue.SideProperty;

  const [Value,SetValue] = useState(props.Value);
  useEffect(() => {
    Common('rotation', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
    
    const RelativeX = SideProperty.Property['x'] - ( SideProperty.Property['x'] + SideProperty.Property['width'] / 2);
    const RelativeY = SideProperty.Property['y'] - ( SideProperty.Property['y'] + SideProperty.Property['height'] / 2);
    
    const degree :number = Value * ( Math.PI / 180) ;
    const PosX :number = SideProperty.Property['x'] + 100 * Math.cos( degree ) - 50 * Math.sin( degree ); //回転に伴うx座標移動
    const PosY :number = SideProperty.Property['y'] + 100 * Math.sin( degree ) + 50 * Math.cos( degree ); //回転に伴うy座標移動
    console.log(degree)

    Common('x', GlbalValue.Canvas, GlbalValue.SideProperty, PosX, props.index);
    Common('y', GlbalValue.Canvas, GlbalValue.SideProperty, PosY, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      let Num = Number(e.target.value);
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