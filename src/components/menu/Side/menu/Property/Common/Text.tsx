import { FormControl, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { Svg, Rect, RegularPolygon, Circle, Text, AllShape, Shape } from "../../../../../../Types"
import { GlobalContext } from '../../../../../providers/GlobalProvider';
type AllPropertyShapeType = (Shape & Rect & RegularPolygon & Circle & Text & Svg) | null;

export const TextProperty = (props: {
  onChange: Function,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const [Value, SetValue] = useState<string | null>(props.Ref!.text);
  const [Index, SetIndex] = useState<number | null>(props.Ref!.index);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Index != GlobalValue.State!.Property.index) {
        const State = GlobalValue.State!.Property as AllPropertyShapeType;
        SetValue(State!.text);
        SetIndex(props.Ref!.index);
      }
    }
  }, [GlobalValue.State!.Property])


  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //文字のサイズを再定義する
    const textCtx = document.createElement('canvas').getContext('2d');
    textCtx!.font = `${props.Ref!.fontStyle} ${props.Ref!.fontSize}px ${props.Ref!.fontFamily}`;

    const textWidth: number = Math.max(
      e.target.value.split('\n').map((text)=>{  //テキストの幅を取得
        return textCtx!.measureText(text).width
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      ,5);  //最小を設定 5
    const textHeight: number =
      Math.max(e.target.value.split('\n').length * props.Ref!.fontSize, 5);

    props.onChange({
      text: e.target.value,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    SetValue(e.target.value);
  }
  return (
    <FormControl variant="outlined">
      <TextField
        id="outlined-size-small"
        multiline
        label="テキスト"
        value={Value}
        onChange={ChangeValue}
        size='small'
      />
    </FormControl>
  )
}