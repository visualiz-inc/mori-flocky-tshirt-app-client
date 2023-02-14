import { ImageList, ImageListItem } from '@mui/material';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../../components/providers/GlobalProvider';
import { MaskType, TshirtType } from '../../../Types';

async function ImageItem(color: string) {
  const src: string = `../../../img/ItemSelect/${color}.jpg`;

  return await import(src);
}


export const ItemSelect = () => {
  const GlobalValue: {
    ItemsData?: (TshirtType | MaskType)[],
  } = useContext(GlobalContext);

  let itemImageSrc: string[] = [];
  GlobalValue.ItemsData!.forEach(element => {
    let a = ImageItem(element.ImageSrc).then(function (value) {
      return value.default
      itemImageSrc!.push(value.default);
      console.log(itemImageSrc);
  })
  console.log(a)
  });
  if(itemImageSrc[0] != undefined){
  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {GlobalValue.ItemsData!.map((item:(TshirtType | MaskType),i:number) => (
          <ImageListItem key={`image${i}`}>
            <img
              src={`${itemImageSrc[i]}?w=164&h=164&fit=crop&auto=format`}
              alt={item.Name}
            />
          </ImageListItem>
        ))}
      </ImageList>

    </>

  );
  }else {
    return (
      <p>Loding</p>
    )
  }
}
