import { Box, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { AllPropertyShapeType, AllShape } from "../../../../../Types"
import { GlobalContext } from '../../../../providers/GlobalProvider';

import '../.menu.css';

export const TextProperty = (props: {   //テキスト
  onChange: Function,
  Update: (flag: boolean) => void,
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
        SetValue((GlobalValue.State!.Property as AllPropertyShapeType)!.text);
        SetId(GlobalValue.State!.Property.id);
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
        return textCtx!.measureText(text).width + props.Ref!.letterSpacing * text.length
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number =
      Math.max(e.target.value.split('\n').length * props.Ref!.fontSize, 5);

    props.onChange({
      text: e.target.value,
      offsetX: textWidth / 2,
      offsetY: textHeight / 2,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    SetValue(e.target.value);
    SetChangeFlag(true);
  }
  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          multiline
          size='small'
          label="テキスト"
          value={Value}
          onFocus={() =>SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const FontSizeProperty = (props: {   //テキストサイズ
  onChange: Function,
  Update: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const [Value, SetValue] = useState<string>(String(props.Ref!.fontSize));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Text') {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.fontSize));
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if(!isNaN(Number(e.target.value))){
    const TargetValue: number = Number(e.target.value);
    //文字のサイズを再定義する
    const textCtx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
    textCtx!.font = `${props.Ref!.fontStyle} ${TargetValue}px ${props.Ref!.fontFamily}`;

    const textWidth: number = Math.max(
      props.Ref!.text.split('\n').map((text) => {  //テキストの幅を取得
        return textCtx!.measureText(text).width + props.Ref!.letterSpacing * text.length
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number = props.Ref!.text.split('\n').length * TargetValue;

    props.onChange({
      fontSize: Math.max(TargetValue, 1),
      offsetX: textWidth / 2,
      offsetY: textHeight / 2,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    SetValue(e.target.value);
    SetChangeFlag(true);
  }
  }
  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="テキストサイズ"
          inputProps={{
            min: "0"
          }}
          value={Value}
          onFocus={() =>SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const FontStyleProperty = (props: {   //テキストスタイル
  onChange: Function,
  Update: (flag: boolean) => void,
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
        SetBoldCheck((GlobalValue.State!.Property as AllPropertyShapeType)!.fontStyle.includes('bold') ? true : false);
        SetItalicCheck((GlobalValue.State!.Property as AllPropertyShapeType)!.fontStyle.includes('italic') ? true : false)
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
        return textCtx!.measureText(text).width + props.Ref!.letterSpacing * text.length
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number = props.Ref!.text.split('\n').length * props.Ref!.fontSize;

    props.onChange({
      fontStyle,
      offsetX: textWidth / 2,
      offsetY: textHeight / 2,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);

    if (e.target.value == 'bold') {
      SetBoldCheck(!BoldCheck)
    } else if (e.target.value == 'italic') {
      SetItalicCheck(!ItalicCheck)
    }
    props.Update(true);
  }
  return (
    <Box className='PropertyInput'>
      <span className='PropertyInputText'>Bold</span>
      <Checkbox
        value={'bold'}
        checked={BoldCheck}
        onChange={ChangeValue}
        color="default" />
      <span className='PropertyInputText'>Italic</span>
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
  Update: (flag: boolean) => void,
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
        SetValue((GlobalValue.State!.Property as AllPropertyShapeType)!.fontFamily);
        SetId(GlobalValue.State!.Property.id);
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
        return textCtx!.measureText(text).width + props.Ref!.letterSpacing * text.length
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number = props.Ref!.text.split('\n').length * props.Ref!.fontSize;
      
    props.onChange({
      FontFamily: e.target.value,
      offsetX: textWidth / 2,
      offsetY: textHeight / 2,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    
    SetValue(e.target.value);
    SetChangeFlag(true);
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
          onFocus={() =>SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
        >
          {Fonts.map((font: string, i: number) => (
            <MenuItem key={`font${i}`} value={font}>{font}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
export const AlignProperty = (props: {   //文字揃え
  onChange: Function,
  Update: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const Fonts:string[] = [
    ' left',
    'center',
    'right'
  ];

  const [Value, SetValue] = useState<string>(props.Ref!.align);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Text') {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue((GlobalValue.State!.Property as AllPropertyShapeType)!.align);
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: SelectChangeEvent<any>) => {
    props.onChange({
      align: e.target.value,
    }, props.Ref, GlobalValue.State!);
    
    SetValue(e.target.value);
    SetChangeFlag(true);
  }
  return (
    <Box className='PropertyInput'>
      <FormControl fullWidth>
        <InputLabel>文字揃え</InputLabel>
        <Select
          size='small'
          value={Value}
          label="文字揃え"
          onChange={ChangeValue}
          onFocus={() =>SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
        >
          {Fonts.map((font: string, i: number) => (
            <MenuItem key={`font${i}`} value={font}>{font}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
export const LetterSpacingProperty = (props: {   //文字間隔
  onChange: Function,
  Update: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const [Value, SetValue] = useState<string>(String(props.Ref!.letterSpacing));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Text') {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.letterSpacing));
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    
    if(!isNaN(Number(e.target.value))){
    const TargetValue: number = Number(e.target.value);
    //文字のサイズを再定義する
    const textCtx: CanvasRenderingContext2D = document.createElement('canvas').getContext('2d')!;
    textCtx!.font = `${props.Ref!.fontStyle} ${props.Ref!.fontSize}px ${props.Ref!.fontFamily}`;
    const textWidth: number = Math.max(
      props.Ref!.text.split('\n').map((text) => {  //テキストの幅を取得
        return textCtx!.measureText(text).width + TargetValue * text.length
      }).reduce((el1, el2) => el1 >= el2 ? el1 : el2) //配列内の最大値を取得
      , 5);  //最小を設定 5
    const textHeight: number = props.Ref!.text.split('\n').length * props.Ref!.fontSize;

    props.onChange({
      letterSpacing: Math.max(TargetValue, 0),
      offsetX: textWidth / 2,
      offsetY: textHeight / 2,
      width: textWidth,
      height: textHeight
    }, props.Ref, GlobalValue.State!);
    SetValue(e.target.value);
    SetChangeFlag(true);
  }
  }
  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="文字間隔"
          value={Value}
          inputProps={{
            min: "0"
          }}
          onFocus={() =>SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}