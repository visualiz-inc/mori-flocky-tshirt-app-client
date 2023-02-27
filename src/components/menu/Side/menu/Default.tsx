import CheckroomIcon from '@mui/icons-material/Checkroom';
import BuildIcon from '@mui/icons-material/Build';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StampIcon from '../../../../img/SideIcon/stamp.svg';
import ColorLensIcon from '@mui/icons-material/ColorLens';

import './.menu.css';
import { Button, SxProps, Theme } from '@mui/material';

export const DefaultWindow = (props: {
    window: [
        Windows: boolean[],
        SetWindow: React.Dispatch<React.SetStateAction<boolean[]>>
    ]
}) => {
    const IconStyle: SxProps<Theme> = {
        background: 'rgb(45, 45, 45)',
        borderRadius: '10px',
        padding: '12px',
        marginLeft: '0px',
        pointerEvents: 'none'
    }

    const ButtonStyle: SxProps<Theme> = {
        "&:hover": {
            background: "rgb(173, 173, 173)"
        }
    }
    const Menu: string[] = [
        'アイテムの確認・変更',
        'オブジェクトの設定',
        '画像のアップロード',
        'スタンプを選ぶ',
        'デザインテンプレート'
    ]

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        const ClickElement: EventTarget = e.target;
        if (ClickElement instanceof Element) {
            let Dummy: boolean[] = [false, false, false, false, false];
            Menu.forEach((text, i) => {
                if(ClickElement.children[1].innerHTML == text){
                    Dummy[i] = true;
                }
            })
            props.window[1](Dummy);
        };

    }

    return (
        <div id='defaultMenu'>
            {
                Menu.map((text: string, i: number) => {
                    return (
                        <Button key = {`Default${i}`} sx={ButtonStyle} onClick={onClick!}>
                            {text == 'アイテムの確認・変更' && (
                                <CheckroomIcon sx={IconStyle} />
                            )}
                            {text == 'オブジェクトの設定' && (
                                <BuildIcon sx={IconStyle} />
                            )}
                            {text == '画像のアップロード' && (
                                <InsertPhotoIcon sx={IconStyle} />
                            )}
                            {text == 'スタンプを選ぶ' && (
                                <img src={StampIcon} style={IconStyle as React.CSSProperties} />
                            )}
                            {text == 'デザインテンプレート' && (
                                <ColorLensIcon sx={IconStyle} />
                            )}
                            <p>{text}</p>
                        </Button>
                    )
                })
            }

        </div>
    );
};