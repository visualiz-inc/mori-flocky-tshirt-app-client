import { Box, Button, FormControl, Slider, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import HexagonIcon from '@mui/icons-material/Hexagon';

import { AllPropertyShapeType, AllShape } from "../../../../../Types"
import { GlobalContext } from '../../../../providers/GlobalProvider';

import '../.menu.css';

export const PosXProperty = (props: {   //座標X
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.x));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String(GlobalValue.State!.Property.x));
        SetId(GlobalValue.State!.Property.id);
      } else if (Number(Value) != GlobalValue.State!.Property.x) {
        SetValue(String(GlobalValue.State!.Property.x));
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      const TargetValue = Number(e.target.value);

      props.onChange({
        x: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetChangeFlag(true);
    }
    SetValue(e.target.value);
  }

  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="X座標"
          value={Value}
          onFocus={() => SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const PosYProperty = (props: {   //座標Y
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.y));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String(GlobalValue.State!.Property.y));
        SetId(GlobalValue.State!.Property.id);
      } else if (Number(Value) != GlobalValue.State!.Property.y) {
        SetValue(String(GlobalValue.State!.Property.y));
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      const TargetValue = Number(e.target.value);

      props.onChange({
        y: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetChangeFlag(true);
    }
    SetValue(e.target.value);
  }

  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="Y座標"
          value={Value}
          onFocus={() => SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const RotationProperty = (props: {   //回転
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.rotation));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String(GlobalValue.State!.Property.rotation));
        SetId(GlobalValue.State!.Property.id);
      } else if (Number(Value) != GlobalValue.State!.Property.rotation) {
        SetValue(String(GlobalValue.State!.Property.rotation));
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      let TargetValue = Number(e.target.value);

      if (TargetValue < 0) {

        TargetValue = TargetValue % 360 + 360;
      } else if (TargetValue >= 360) {
        TargetValue = TargetValue % 360;
      }
      props.onChange({
        rotation: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetValue(String(TargetValue));
      SetChangeFlag(true);
    }
    SetValue(e.target.value);
  }
  const onBlur = () => {
    if (Number(Value) < 0) {
      SetValue(String(Number(Value) % 360 + 360));
    } else if (Number(Value) >= 360) {
      SetValue(String(Number(Value) % 360));
    }
    props.Update(ChangeFlag);
  }
  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="回転"
          value={Value}
          onFocus={() => SetChangeFlag(false)}
          onBlur={onBlur}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const ScaleXProperty = (props: {   //拡大率X
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.scaleX));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String(GlobalValue.State!.Property.scaleX));
        SetId(GlobalValue.State!.Property.id);
      } else if (Number(Value) != GlobalValue.State!.Property.scaleX) {
        SetValue(String(GlobalValue.State!.Property.scaleX));
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      const TargetValue = Number(e.target.value);

      props.onChange({
        scaleX: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetChangeFlag(true);
    }
    SetValue(e.target.value);
  }

  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="拡大率X"
          inputProps={{
            step: "0.1"
          }}
          value={Value}
          onFocus={() => SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const ScaleYProperty = (props: {   //拡大率Y
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.scaleY));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String(GlobalValue.State!.Property.scaleY));
        SetId(GlobalValue.State!.Property.id);
      } else if (Number(Value) != GlobalValue.State!.Property.scaleY) {
        SetValue(String(GlobalValue.State!.Property.scaleY));
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      const TargetValue = Number(e.target.value);

      props.onChange({
        scaleY: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetChangeFlag(true);
    }
    SetValue(e.target.value);
  }

  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="拡大率Y"
          inputProps={{
            step: "0.1"
          }}
          value={Value}
          onFocus={() => SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const FillProperty = (props: {   //塗りつぶし 枠線
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

  const [FillValue, SetFillValue] = useState<string>(props.Ref!.fill);
  const [StrokeValue, SetStrokeValue] = useState<string>(props.Ref!.stroke);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetFillValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.fill));
        SetStrokeValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.stroke));
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const ButtonStyle = {
    border: '2px solid',
    marginBottom: '5px',
    display: 'block',
    marginLeft: '2.5%',
    marginRight: '2.5%',
    width: '90%'
  }

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const [OpenColorPallet, SetOpenColorPallet] = useState<number>(0); //カラーパレット開閉
  const ChangeValue = (color: ColorResult) => {
    const TargetValue = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;

    if (OpenColorPallet == 1) {
      props.onChange({
        fill: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetFillValue(TargetValue);
    } else if (OpenColorPallet == 2) {
      props.onChange({
        stroke: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetStrokeValue(TargetValue);
    }
    SetChangeFlag(true);
  }

  return (
    <Box className='PropertyInput' onClick={() => {
      if (OpenColorPallet) {
        props.Update(ChangeFlag);
        SetChangeFlag(false);
      }
    }}
    onMouseLeave={() => SetOpenColorPallet(0)}
    >
      <Box sx={{ display: 'flex' }}>

        <Button //塗りつぶし
          sx={{
            ...ButtonStyle,
            borderColor: props.Ref!.fill
          }}
          onClick={() => {
            if(OpenColorPallet == 1){
                SetOpenColorPallet(0);
            }else {
                SetOpenColorPallet(1);
            }
            }}
            >
          <p className='PropertyInputText'>塗りつぶし</p>
          <HexagonIcon sx={{ color: props.Ref!.fill }} />
        </Button>
        <Button //枠色
          sx={{
            ...ButtonStyle,
            borderColor: props.Ref!.stroke
          }}
          
          onClick={() => {
            if(OpenColorPallet == 2){
                SetOpenColorPallet(0);
            }else {
                SetOpenColorPallet(2);
            }
            }}>
          <p className='PropertyInputText'>枠色<br /></p>
          <HexagonIcon sx={{ color: props.Ref!.stroke }} />
        </Button>
      </Box>

      {OpenColorPallet == 1 && (
        <ChromePicker color={FillValue} onChange={ChangeValue} />
      )}
      {OpenColorPallet == 2 && (
        <ChromePicker color={StrokeValue} onChange={ChangeValue} />
      )}
    </Box>
  )
}
export const StrokeWidthProperty = (props: {   //枠の太さ
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

  const [Value, SetValue] = useState<string>(String(props.Ref!.strokeWidth));
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(String((GlobalValue.State!.Property as AllPropertyShapeType)!.strokeWidth));
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(e.target.value))) {
      const TargetValue = Number(e.target.value);

      props.onChange({
        strokeWidth: TargetValue,
      }, props.Ref, GlobalValue.State!);
      SetChangeFlag(true);
    }
    SetValue(e.target.value);
  }

  return (
    <Box className='PropertyInput'>
      <FormControl variant="outlined">
        <TextField
          size='small'
          type="number"
          label="枠の太さ"
          inputProps={{
            min: "0"
          }}
          value={Value}
          onFocus={() => SetChangeFlag(false)}
          onBlur={() => props.Update(ChangeFlag)}
          onChange={ChangeValue}
        />
      </FormControl>
    </Box>
  )
}
export const OpacityProperty = (props: {   //透明度
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

  const [Value, SetValue] = useState<number>(props.Ref!.opacity);
  const [Id, SetId] = useState<string>(props.Ref!.id);

  useEffect(() => {   //選択オブジェクト変更時
    if (GlobalValue.State!.Property) {
      if (Id != GlobalValue.State!.Property.id) {
        SetValue(GlobalValue.State!.Property.opacity);
        SetId(GlobalValue.State!.Property.id);
      }
    }
  }, [GlobalValue.State!.Property])

  const [ChangeFlag, SetChangeFlag] = useState<boolean>(false); //変更したか
  const ChangeValue = (e: Event, value: number | number[]) => {
    props.onChange({
      opacity: value,
    }, props.Ref, GlobalValue.State!);
    SetChangeFlag(true);
    SetValue(value as number);
  }

  return (
    <Box className='PropertyInput'>
      <Typography>透明度</Typography>
      <Slider
        onFocus={() => SetChangeFlag(false)}
        onBlur={() => props.Update(ChangeFlag)}
        onChange={ChangeValue}
        value={Value}
        step={0.1}
        max={1} min={0}
        sx={{ color: "rgb(200, 77, 150)" }}
        aria-label="Default"
        valueLabelDisplay="auto" />
    </Box>
  )
}