import { useContext, useState } from 'react';

import { Box, Button, Tooltip } from "@mui/material";

import CheckroomIcon from '@mui/icons-material/Checkroom';
import BuildIcon from '@mui/icons-material/Build';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StampIcon from '../../../img/SideIcon/stamp.svg';
import ColorLensIcon from '@mui/icons-material/ColorLens';


import { DefaultWindow } from './menu/Default';
import { ItemWindow } from './menu/Item/Home';
import { TextWindow } from './menu/Config';
import { ImageWindow } from './menu/Image';
import { StampWindow } from './menu/Stamp';
import { TemplateWindow } from './menu/Template';

import './side.css';
import { GlobalContext } from '../../providers/GlobalProvider';

export const Sidebar = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty: string,
            SetMainWindowProperty: React.Dispatch<React.SetStateAction<string>>
        }
    } = useContext(GlobalContext);

    const Icons: string[] = ['アイテム', 'コンフィグ', '写真', 'スタンプ', 'テンプレ'];
    const [Windows, SetWindow] = useState<boolean[]>([false, false, false, false, false]);

    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        const ClickElement: EventTarget = e.target;
        if (ClickElement instanceof Element) {
            let Dummy: boolean[] = [false, false, false, false, false];
            Icons.forEach((text, i) => {
                if (text == ClickElement.getAttribute('aria-label') && !Windows[i]) {
                    Dummy[i] = true;
                } else {
                    Dummy[i] = false;
                }
            });
            GlobalValue.State!.SetMainWindowProperty('Canvas');

            SetWindow(Dummy);
        }
    }


    return (
        <Box id='sidebar'>
            <Box id='icons'>
                {Icons.map((obj: string, i: number) => {
                    return (
                        <Tooltip
                            key={`icon${i}`}
                            title={obj}
                        >
                            <Button onClick={onClick!}
                                sx={{
                                    background: Windows[i] ? "rgb(200, 77, 150)" : "rgb(45, 45, 45)",
                                    "&:hover": Windows[i] ? {
                                        background: "rgb(200, 77, 150)"
                                    } : {
                                        background: "rgb(182, 182, 182)"
                                    },
                                }}>
                                {obj == 'アイテム' &&
                                    <CheckroomIcon />
                                }{obj == 'コンフィグ' &&
                                    <BuildIcon />
                                }{obj == '写真' &&
                                    <InsertPhotoIcon />
                                }{obj == 'スタンプ' &&
                                    <img src={StampIcon} />
                                }{obj == 'テンプレ' &&
                                    <ColorLensIcon />
                                }
                            </Button>
                        </Tooltip>
                    )
                })}
            </Box>
            <Box id='menu'>
                {!Windows[0] && !Windows[1] && !Windows[2] && !Windows[3] && !Windows[4] && (
                    <DefaultWindow window={[Windows, SetWindow]} />
                )}

                {Windows[0] && (
                    <ItemWindow />
                )}
                {Windows[1] && (
                    <TextWindow />
                )}
                {Windows[2] && (
                    <ImageWindow />
                )}
                {Windows[3] && (
                    <StampWindow />
                )}
                {Windows[4] && (
                    <TemplateWindow />
                )}
            </Box>
        </Box>
    );
};
