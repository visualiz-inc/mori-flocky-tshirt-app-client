import { Box, Checkbox, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { AllPropertyShapeType, AllShape } from "../../../../../Types"
import { GlobalContext } from '../../../../providers/GlobalProvider';

import '../.menu.css';

export const WidthProperty = (props: {   //幅
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.width));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == ('Rect' || 'Image')) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.width));
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(Number(e.target.value))){
    const TargetValue: number = Number(e.target.value);

    props.onChange({
      offsetX: TargetValue / 2,
      width: TargetValue,
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
          label="幅"
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
export const HeightProperty = (props: {   //高さ
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.height));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == ('Rect' || 'Image')) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.height));
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(Number(e.target.value))){
    const TargetValue: number = Number(e.target.value);

    props.onChange({
      offsetY: TargetValue / 2,
      height: TargetValue,
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
          label="高さ"
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