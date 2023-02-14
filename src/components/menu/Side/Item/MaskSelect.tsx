import SquareIcon from '@mui/icons-material/Square';
import { Box, Button, SxProps, Theme } from '@mui/material';
import { useContext, useState } from 'react';
import { TshirtType } from '../../../../Types';
import { GlobalContext } from '../../../providers/GlobalProvider';

import './.menu.css';

function ColorSearch(color: string) {
    if (color == 'ホワイト') {
        return 'rgb(255,255,255)'
    } else if (color == 'レッド') {
        return 'rgb(255,0,0)'
    } else if (color == 'ミディアムブルー') {
        return 'rgb(0,0,205)'
    } else if (color == 'イエロー') {
        return 'rgb(255,255,0)'
    } else if (color == 'グリーン') {
        return 'rgb(0,128,0)'
    } else if (color == 'ピンク') {
        return 'rgb(255,192,203)'
    }
}


export const ItemWindow = () => {
    const GlobalValue: {
        State?: {
            Color: string,
            SetColor: React.Dispatch<React.SetStateAction<string>>,
            Item: TshirtType,
        }
    } = useContext(GlobalContext);

    const ButtonStyle: SxProps<Theme> = {
        'maxWidth': '25px',
        'maxHeight': '25px',
        'minWidth': '25px',
        'minHeight': '25px'
    }

    const [ColorIndex, SetColorIndex] = useState<number>(0);
    const ColorClick = (e: React.MouseEvent<HTMLElement>) => {
        const ClickElement: EventTarget = e.target;
        if (ClickElement instanceof Element) {
            const ColorIndex: number = Number(ClickElement.id.slice(-1));
            SetColorIndex(ColorIndex);
        };
    }

    const ChangeClick = (e: React.MouseEvent<HTMLElement>) => {
        const ClickElement: EventTarget = e.target;
        if (ClickElement instanceof Element) {
            if (GlobalValue.State) {
                GlobalValue.State.SetColor(GlobalValue.State.Item.Color[ColorIndex]);
            }
        };
    }


    if (GlobalValue.State != undefined) {
        return (
            <Box id='itemMenu'>
                {GlobalValue.State.Item.CatchPhrase != '' && (
                    <h1>{GlobalValue.State.Item.CatchPhrase}</h1>
                )}
                {GlobalValue.State.Item.CatchPhrase == '' && (
                    <div style={{height:'48px'}}></div>
                )
                }
                
                <p>{GlobalValue.State.Item.Name}</p>
                <p>{GlobalValue.State.Item.Money}</p>
                {GlobalValue.State.Item.Description.map((text:string,i:number)=>{
                        return (
                            <p key={`text${i}`}>{text}</p>
                        )
                    })}
                <Box id='ColorSelect'>
                    {GlobalValue.State.Item.Color.map((color: string, i: number) => {
                        return (
                            <Button id={`color${i}`} key={`color${i}`} sx={ButtonStyle} onClick={ColorClick!}>
                                <SquareIcon sx={{
                                    color: `${ColorSearch(color)}`,
                                    pointerEvents: 'none',
                                    stroke: GlobalValue.State!.Item.Color[ColorIndex] == color ? 'rgb(82, 220, 255)' : 'rgb(196, 196, 196)',
                                    strokeWidth: GlobalValue.State!.Item.Color[ColorIndex] == color ? 3 : 2
                                }} />
                            </Button>
                        )
                    })}
                </Box>
                <p id='p1'>選択カラー　:　{GlobalValue.State.Item.Color[ColorIndex]}</p>

                <p>サイズ<br />
                {GlobalValue.State.Item.Size.join('/')}
                </p>
                <p>生地の厚み<br />
                    ({GlobalValue.State.Item.Thickness}oz)
                </p>
                <p>
                    アイテム料⾦ : ￥0000（税込0000）<br />
                    プリント料⾦ : 表⾯￥0000（税込￥0000）裏⾯￥0000
                    （税込￥0000）/袖￥0000（税込0000）<br />
                    ※価格は全てプリント代込みの表⽰です。
                </p>
                <Button id='ItemChangeButton' onClick={ChangeClick!}>
                    アイテムを変更する
                </Button>
            </Box>
        );
    } else {
        return (
            <p> エラー</p >
        )
    }
};
