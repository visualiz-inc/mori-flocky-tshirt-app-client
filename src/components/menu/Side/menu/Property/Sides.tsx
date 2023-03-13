import { Box, FormControl, Slider, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { AllPropertyShapeType, AllShape } from "../../../../../Types"
import { GlobalContext } from '../../../../providers/GlobalProvider';

import '../.menu.css';

export const SidesProperty = (props: {   //角の数
  onChange: Function,
  Update: (flag: boolean) => void,
  Ref: AllPropertyShapeType
}) => {
  const GlobalValue: {
    State?: {
      Object: AllShape[][],
      ObjectInside: number,
      Property: AllShape,
      SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
    }
  } = useContext(GlobalContext);

  const [Value, SetValue] = useState<number>(props.Ref!.sides);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'RegularPolygon') {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue((GlobalValue.State!.Property as AllPropertyShapeType)!.sides);
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e:Event,value:number | number[]) => {
      props.onChange({
        sides: value,
      }, props.Ref, GlobalValue.State!);
      SetChangeFlag(true);
    SetValue(value as number);
  }

  return (
    <Box className='PropertyInput'>
      <Typography>角の数</Typography>
      <Slider
        onFocus={() => SetChangeFlag(false)}
        onBlur={() => props.Update(ChangeFlag)}
        onChange={ChangeValue}
        value={Value}
        step={1}
        max={12} min={3}
        sx={{color:"rgb(200, 77, 150)"}}
        aria-label="Default"
        valueLabelDisplay="auto" />
    </Box>
  )
}