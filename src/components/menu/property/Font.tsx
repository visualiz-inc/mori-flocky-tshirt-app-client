import { useCallback, useContext, useState, useEffect, useMemo } from 'react';
import '../side.css';
import { Common } from './common';
import { GlobalContext } from "../../providers/GlobalProvider";

export const FontSize = (props:{obj:any,index:number[],Value:number}) => {
  const GlbalValue: {Canvas?:Object,SideProperty?:Object} = useContext(GlobalContext);

  const [Value,SetValue] = useState(props.Value);
  useEffect(() => {
    Common('fontSize', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(Number(e.target.value));
    },[]
  )
          return (
            <div className='SideText'>
              <p className='SideItem'>文字サイズ:</p>
              <input type="number" className='SideValue' value = {props.Value} onChange={ChangeValue}/>
            </div>
         )
}

export const FontStyle = (props:{obj:any,index:number[]}) => {
  const GlbalValue: {Canvas?:Object,SideProperty?:Object} = useContext(GlobalContext);

  const [Value,SetValue] = useState('');
  useEffect(() => {
    Common('fontStyle', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const BoldCheck = e.target.parentElement?.querySelector('#bold') as HTMLInputElement;
      const ItalicCheck = e.target.parentElement?.querySelector('#italic') as HTMLInputElement;

      let Value = '';
      if(BoldCheck.checked == true){
        Value += 'bold ';
      }
      if(ItalicCheck.checked == true){
        Value += 'italic';
      }

      SetValue(String(Value));
    },[]
  )
      return (
        <>
          <div className='SideText'>
            <p className='SideItem'>bold:&ensp;</p>
            <input type="checkbox" id='bold' onChange={ChangeValue}/>
            <p className='SideItem'>&emsp;italic:&ensp;</p> 
            <input type="checkbox" id='italic' onChange={ChangeValue}/>
          </div>
        </>
     )
}

export const FontFamily = (props:{obj:any,index:number[],Value:string}) => {
  const [Fontes] = useState([  //フォント一覧
    'メイリオ',
    'Arial',
    'Calibri',
    'HGP創英角ﾎﾟｯﾌﾟ体'
  ])
  const GlbalValue: {Canvas?:Object,SideProperty?:Object} = useContext(GlobalContext);

  const [Value,SetValue] = useState(props.Value);
  useEffect(() => {
    Common('fontFamily', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
      const Index:number = e.target.selectedIndex;
      SetValue(Fontes[Index]);
    },[]
  )
      return (
        <div className='SideText'>
          <p className='SideItem'>フォント:</p>
          <select style={{marginLeft:10,height:30}} onChange={ChangeValue} value={props.Value}>
            {Fontes.map((font,i) => {
              return(
                <option key={`font${i}`}>
                  {font}
                </option>
              )
              })
            }
          </select>
        </div>
     )
}

export const Text = (props:{obj:any,index:number[],Value:string}) => {
  const width = useMemo(() => {
    return '60%'
  },[])


  const GlbalValue: {Canvas?:{Object:any},SideProperty?:Object} = useContext(GlobalContext);

  const [Value,SetValue] = useState(props.Value);
  useEffect(() => {
    Common('text', GlbalValue.Canvas, GlbalValue.SideProperty, Value, props.index);
  },[Value]);
  useEffect(() => {
    SetValue(GlbalValue.Canvas?.Object[`Layer${props.index[0]+1}`][props.index[1]]['text']);
  },[props.index]);

  const ChangeValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      SetValue(e.target.value);
    },[]
  )

      
          return (
            <>
              <div className='SideText'>
                <p className='SideItem'>テキスト:</p>
                <input type="text" className='SideValue' style={{width}} id='text' value = {Value} onChange={ChangeValue}/>
              </div>
            </>
         )
}