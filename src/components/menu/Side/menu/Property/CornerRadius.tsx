import { Box, FormControl, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import { AllPropertyShapeType, AllShape } from "../../../../../Types"
import { GlobalContext } from '../../../../providers/GlobalProvider';

import '../.menu.css';

export const CornerRadiusProperty = (props: {   //角の丸み
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.cornerRadius));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property && GlobalValue.State!.Property.type == 'Rect') {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.cornerRadius));
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      const TargetValue: number = Number(e.target.value);

      props.onChange({
        cornerRadius: TargetValue,
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
          label="角の丸み"
          value={Value}
          inputProps={{
            min: "0"
          }}
          onFocus={() => SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}