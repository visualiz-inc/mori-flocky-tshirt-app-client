import { useContext, useState } from 'react';
import { Prop, TshirtType } from "../../../Types"

import { GlobalContext } from "../../providers/GlobalProvider";
import { CanvasMain } from './CanvasMain';

async function ImageT(color: string) {
  const src: string = `../../../img/Items/${color}.png`;
  return await import(/* @vite-ignore */src);
}

export const TShirt = () => {
  const GlobalValue: {
    CanvasProperty?: Prop,
    State?: {
      Color?: string,
      Item?: TshirtType,
    }
  } = useContext(GlobalContext);
  const { Width, Height, Border } = GlobalValue.CanvasProperty!;

  const [ImgSrc, setImgSrc] = useState<string>()
  if (GlobalValue.State != undefined && GlobalValue.State.Item != undefined) {
    ImageT(GlobalValue.State.Item.ImageSrc)
      .then(function (value) {
        setImgSrc(value.default)
      })
      .catch(function(error){
        console.log(error)
      })

  }



  const DivStyle: React.CSSProperties[] = [
    {
      'position': 'relative',
      'marginTop': '5vh',
      'pointerEvents': 'none'
    },
    {
      'position': 'absolute',
      'top': Height * -0.1,
      'width': Width * 2.225,
      'userSelect': 'none',
      'pointerEvents': 'none'
    },
    {
      'position': 'absolute',
      'width': Width,
      'height': Height,
      'top': Height * 0.5,
      'left': Width * 0.6,
      'border': Border
    }

  ]
  return (
    <div  //位置指定用div
      style={DivStyle[0]}>
      <img style={DivStyle[1]}
        src={ImgSrc} alt='' />
      <div    //枠線と位置指定用div
        style={DivStyle[2]}
      >
        <CanvasMain></CanvasMain>
      </div>
    </div>
  );
};