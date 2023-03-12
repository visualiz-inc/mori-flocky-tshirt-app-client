import { Box, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { AllPropertyShapeType, AllShape } from "../../../../../Types"
import { GlobalContext } from '../../../../providers/GlobalProvider';

import '../.menu.css';

export const TextProperty = (props: {   //テキスト
  onChange: Function,
  onBlur: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const [Value, SetValue] = useState<string>(props.Ref!.text);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Text') {
      if (Id != GlobalValue.State!.Property.id) {
        const State = GlobalValue.State!.Property as AllPropertyShapeType;
        SetValue(State!.text);
        SetId(State!.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    //文字のサイズを再定義する
    const textCtx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
    textCtx!.font = `${props.Ref!.fontStyle} ${props.Ref!.fontSize}px ${props.Ref!.fontFamily}`;

    const textWidth: number = Math.max(
      e.target.value.split('\n').map((text) => {  //テキストの幅を取得
        return textCtx!.measureText(text).width
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number =
      Math.max(e.target.value.split('\n').length * props.Ref!.fontSize, 5);

    props.onChange({
      text: e.target.value,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    SetValue(e.target.value);
    SetChangeFlag(true);
  }
  const FocusElem = () => { //フォーカスしたときFlagを初期化
    SetChangeFlag(false);
  }
  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          multiline
          size='small'
          label="テキスト"
          value={Value}
          onFocus={FocusElem}
          onBlur={() => props.onBlur(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}

export const FontSizeProperty = (props: {   //テキストサイズ
  onChange: Function,
  onBlur: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const [Value, SetValue] = useState<number>(props.Ref!.fontSize);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Text') {
      if (Id != GlobalValue.State!.Property.id) {
        const State = GlobalValue.State!.Property as AllPropertyShapeType;
        SetValue(State!.fontSize);
        SetId(State!.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const TargetValue: number = Math.max(0, Number(e.target.value));
    //文字のサイズを再定義する
    const textCtx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
    textCtx!.font = `${props.Ref!.fontStyle} ${TargetValue}px ${props.Ref!.fontFamily}`;

    const textWidth: number = Math.max(
      props.Ref!.text.split('\n').map((text) => {  //テキストの幅を取得
        return textCtx!.measureText(text).width
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number = props.Ref!.text.split('\n').length * TargetValue;

    props.onChange({
      fontSize: Math.max(TargetValue, 1),
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    SetValue(TargetValue);
    SetChangeFlag(true);
  }
  const FocusElem = () => { //フォーカスしたときFlagを初期化
    SetChangeFlag(false);
  }
  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="テキストサイズ"
          value={Value}
          onFocus={FocusElem}
          onBlur={() => props.onBlur(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}

export const FontStyleProperty = (props: {   //テキストスタイル
  onChange: Function,
  onBlur: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const [BoldCheck, SetBoldCheck] = useState<boolean>(props.Ref!.fontStyle.includes('bold') ? true : false);
  const [ItalicCheck, SetItalicCheck] = useState<boolean>(props.Ref!.fontStyle.includes('italic') ? true : false);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Text') {
      if (Id != GlobalValue.State!.Property.id) {
        const State = GlobalValue.State!.Property as AllPropertyShapeType;
        SetBoldCheck(State!.fontStyle.includes('bold') ? true : false);
        SetItalicCheck(State!.fontStyle.includes('italic') ? true : false)
        SetId(props.Ref!.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fontStyle: string = '';
    if ((e.target.value == 'bold' && !BoldCheck) || (e.target.value != 'bold' && BoldCheck)) {
      console.log(BoldCheck)
      fontStyle += 'bold ';
    }
    if ((e.target.value == 'italic' && !ItalicCheck) || (e.target.value != 'italic' && ItalicCheck)) {
      fontStyle += 'italic';
    }

    //文字のサイズを再定義する
    const textCtx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
    textCtx!.font = `${fontStyle} ${props.Ref!.fontSize}px ${props.Ref!.fontFamily}`;

    const textWidth: number = Math.max(
      props.Ref!.text.split('\n').map((text) => {  //テキストの幅を取得
        return textCtx!.measureText(text).width
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number = props.Ref!.text.split('\n').length * props.Ref!.fontSize;

    props.onChange({
      fontStyle,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);

    if (e.target.value == 'bold') {
      SetBoldCheck(!BoldCheck)
    } else if (e.target.value == 'italic') {
      SetItalicCheck(!ItalicCheck)
    }
    props.onBlur(true);
  }
  return (
    <Box className='PropertyInput'>
      <span>Bold</span>
      <Checkbox
        value={'bold'}
        checked={BoldCheck}
        onChange={ChangeValue}
        color="default" />
      <span>Italic</span>
      <Checkbox
        value={'italic'}
        checked={ItalicCheck}
        onChange={ChangeValue}
        color="default" />
    </Box>
  )
}

export const FontFamilyProperty = (props: {   //テキストファミリー
  onChange: Function,
  onBlur: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const Fonts:string[] = [
    'メイリオ',
    'Impact',
    'ＭＳ 明朝',
    'MS Pゴシック',
    'HGP行書体'
  ];

  const [Value, SetValue] = useState<string>(props.Ref!.fontFamily);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Text') {
      if (Id != GlobalValue.State!.Property.id) {
        const State = GlobalValue.State!.Property as AllPropertyShapeType;
        SetValue(State!.fontFamily);
        SetId(State!.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: SelectChangeEvent<any>) => {
    //文字のサイズを再定義する
    const textCtx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
    textCtx!.font = `${props.Ref!.fontStyle} ${props.Ref!.fontSize}px ${e.target.value}`;

    const textWidth: number = Math.max(
      props.Ref!.text.split('\n').map((text) => {  //テキストの幅を取得
        return textCtx!.measureText(text).width
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number = props.Ref!.text.split('\n').length * props.Ref!.fontSize;
      
    props.onChange({
      FontFamily: e.target.value,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    
    SetValue(e.target.value);
    SetChangeFlag(true);
  }
  const FocusElem = () => { //フォーカスしたときFlagを初期化
    SetChangeFlag(false);
  }
  return (
    <Box className='PropertyInput'>
      <FormControl fullWidth>
        <InputLabel>フォント</InputLabel>
        <Select
          size='small'
          value={Value}
          label="フォント"
          onChange={ChangeValue}
          onFocus={FocusElem}
          onBlur={() => props.onBlur(ChangeFlag)}
        >
          {Fonts.map((font: string, i: number) => (
            <MenuItem key={`font${i}`} value={font}>{font}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}