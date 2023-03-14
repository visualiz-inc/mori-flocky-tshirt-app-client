import { Box, Button, Typography } from '@mui/material';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

import ImageUploadIcon from '../../../../img/SideIcon/image-upload.svg'
import { GlobalContext } from '../../../providers/GlobalProvider';

import { AddImage } from '../../../../CreateObject';
import './.menu.css';
import { AllShape } from '../../../../Types';


export const ImageWindow = () => {
    const GlobalValue: {
        State?: {
            Object: AllShape[][];
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
            ObjectLog: AllShape[][][],
            SetObjectLog: React.Dispatch<React.SetStateAction<AllShape[][][]>>,
            ObjectLogIndex: number,
            SetObjectLogIndex: React.Dispatch<React.SetStateAction<number>>,
            ObjectInside: number,
            ObjectID: number,
            SetObjectID: React.Dispatch<React.SetStateAction<number>>,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>,
            Images: string[],
            SetImages: React.Dispatch<React.SetStateAction<string[]>>
        }
    } = useContext(GlobalContext);

    const ImageViewIndex : number = GlobalValue.State!.Images.length < 3 ? 0 : GlobalValue.State!.Images.length - 3;
    let ViewImage:string[] = GlobalValue.State!.Images.slice(ImageViewIndex, ImageViewIndex + 3);
    if(ImageViewIndex == 0){
        ViewImage = (new Array(3 - ViewImage.length)).concat(ViewImage);
    }

    function ImageChange(e: ChangeEvent<HTMLInputElement>) {    //画像読み込み
        const acceptedFile: File = e.target.files![0];
        if (acceptedFile.size == 200000000) { //最大サイズを超えた場合
            console.log(`画像容量が大きすぎます\n${(acceptedFile.size / 1000000).toFixed(3)}MB`);
            return;
        }
        const DropImg = new Image();
        DropImg.onload = () => {
            if (DropImg.width > 6000 || DropImg.height > 6000) {
                console.log(`画像サイズが大きすぎます\n${(DropImg.width).toFixed(1)}px×${(DropImg.height).toFixed(1)}px`);
                return;
            }
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = DropImg.width;
            canvas.height = DropImg.height;
            context!.drawImage(DropImg, 0, 0);
            AddImage(GlobalValue, DropImg.width, DropImg.height, canvas.toDataURL("image/*"));
        }
        DropImg.src = URL.createObjectURL(acceptedFile);
        e.target.value = '';    //reset
    }

    return (
        <Box id='ImageMenu'>
            <img id = 'ImageMenuImg' src={ImageUploadIcon} />
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: 14,
                fontFamily: 'メイリオ'
            }}>写真を直接ドラッグ＆ドロップできます</Typography>
            <Button
                variant="contained"
                component="label"
                sx={{
                    background: "rgb(200, 77, 150)",
                    "&:hover": {
                        background: "rgb(200, 77, 150)"
                    }
                }}>
                または写真を選択
                <input
                    type="file"
                    onChange={ImageChange}
                    accept="image/png, image/jpeg, image/gif"
                    hidden />
            </Button>
            <Typography sx={{
                fontWeight: 'bold',
                fontSize: 14,
                fontFamily: 'メイリオ',
                marginTop: '15px'

            }}>最近アップロードした写真</Typography>
            <Box className = 'ViewImageBox'>
                <Box>
                    <img src={ViewImage[0]} />
                </Box>
                <Box>
                    <img src={ViewImage[1]} />
                </Box>
                <Box>
                    <img src={ViewImage[2]} />
                </Box>
            </Box>
            <ul>
                <li><span style={{ color: '#ff4b4b' }}>※商品カラー「ホワイト」に白色はプリントされません&gt;&gt;</span><a href='aaa'>詳細</a></li>
                <li>JPEG、PNG、GIF形式のファイルをアップロードできます。</li>
                <li>最大容量は20MB、最大サイズは横6000px縦6000pxです。</li>
                <li>Tシャツに印刷する場合は、横3500px縦5000px以上が推奨です。</li>
                <li>その他製品の推奨サイズはヘルプを参照してください。</li>
            </ul>
        </Box>
    );
};