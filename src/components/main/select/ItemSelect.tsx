import { Box, Button, CircularProgress } from '@mui/material';
import { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from '../../../components/providers/GlobalProvider';
import { MaskType, TshirtType } from '../../../Types';

import '../main.css'

async function ImageItem(color: string) {
  const src: string = `../../../img/ItemSelect/${color}.png`;

  return await import(/* @vite-ignore */src);
}


export const ItemSelect = () => {
  const GlobalValue: {
    ItemsData?: (TshirtType | MaskType)[],
    State?:{
      SetMainWindowProperty: React.Dispatch<React.SetStateAction<string>>
      SetItem:React.Dispatch<React.SetStateAction<TshirtType | MaskType>>
    }
  } = useContext(GlobalContext);

  const [WaitFlag, SetWaitFlag] = useState<boolean>(false)

  let itemImageSrc: string[] = useMemo(() => {
    return [];
  }, [])
  GlobalValue.ItemsData!.forEach(element => {
    ImageItem(element.ImageSrc)
      .then(function (value) {
        itemImageSrc.push(value.default)
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  useEffect(() => {
    WaitFunction();
  }, [])

  function WaitFunction() {   //待機
    if (itemImageSrc.length != GlobalValue.ItemsData!.length) {
      setTimeout(function () {
        WaitFunction();
      }, 25)
    } else {
      SetWaitFlag(true);
    }
  }

  function onClickSelectWindow(e: React.MouseEvent<HTMLElement>){
    const ClickElement: EventTarget = e.target;
        if (ClickElement instanceof Element) {
            const ImageIndex: number = Number(ClickElement.id.slice(-1));
            GlobalValue.State!.SetItem(GlobalValue.ItemsData![ImageIndex]);
            GlobalValue.State!.SetMainWindowProperty('Canvas');
        };
  }
  
  if (WaitFlag != false) {
    return (
      <Box id="selectWindow">
        {GlobalValue.ItemsData!.map((item: (TshirtType | MaskType), i: number) => (
          <Button
            key={`image${i}`} id={`selectimage${i}`}
            className="ImageSelectButton"
            sx={{
              border:'0px solid rgb(200, 77, 150)',
              "&:hover": {
                borderWidth:'2px'
              }}}
              onClick={onClickSelectWindow!}
            >
            <img
              className="ImageSelectImage"
              src={`${itemImageSrc[i]}`}
              alt={item.Name}
            />
          </Button>
        ))}

      </Box>

    );
  } else {
    return (
      <CircularProgress />
    )
  }
}
