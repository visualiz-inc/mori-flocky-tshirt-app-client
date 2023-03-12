import { useContext, useState } from 'react';

import { Box, Button, Tooltip } from "@mui/material";

import CheckroomIcon from '@mui/icons-material/Checkroom';
import BuildIcon from '@mui/icons-material/Build';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import StampIcon from '../../../img/SideIcon/stamp.svg';
import ColorLensIcon from '@mui/icons-material/ColorLens';


import { DefaultWindow } from './menu/Default';
import { ItemWindow } from './menu/Item/Home';
import { PropertyWindow } from './menu/Property/Main';
import { ImageWindow } from './menu/Image';
import { StampWindow } from './menu/Stamp';
import { TemplateWindow } from './menu/Template';

import './side.css';
import { GlobalContext } from '../../providers/GlobalProvider';
import { AllShape } from '../../../Types';

export const Sidebar = () => {
    const GlobalValue: {
        State?: {
            Object: AllShape[][],                                                       //描画されているオブジェクト
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>               //↑の更新
            ObjectInside: number,                                                       //オブジェクトの裏表
            ObjectLog: AllShape[][][],                                                  //オブジェクトのログ
            SetObjectLog: React.Dispatch<React.SetStateAction<AllShape[][][]>>,         //↑の更新
            ObjectLogIndex: number,                                                     //ログのインデックス番号
            SetObjectLogIndex: React.Dispatch<React.SetStateAction<number>>,            //↑の更新
            RefObjectLog: AllShape[][] | null,                                          //ひとつ前のログ保存
            MainWindowProperty: string,                                                 //メインウィンドウの種類
            SetMainWindowProperty: React.Dispatch<React.SetStateAction<string>>         //上の更新
            Property: AllShape | null,                                                  //選択しているオブジェクトの情報
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>          //↑の更新
        }
    } = useContext(GlobalContext);

    const Icons: string[] = ['アイテム', 'プロパティ', '写真', 'スタンプ', 'テンプレ'];
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

    const onClickUndo = () => { //戻る
        if (GlobalValue.State!.ObjectLogIndex == 0) {
            return;
        }

        const LogIndex: number = GlobalValue.State!.ObjectLogIndex - 1;
        GlobalValue.State!.SetObjectLogIndex(LogIndex);

        GlobalValue.State!.SetObject(JSON.parse(JSON.stringify(GlobalValue.State!.ObjectLog[LogIndex])));

        if (GlobalValue.State!.Property != null) {
            const Property = GlobalValue.State!.ObjectLog[LogIndex][GlobalValue.State!.ObjectInside].find((obj) => obj.id == GlobalValue.State!.Property!.id)!;
            GlobalValue.State!.SetProperty(Property);
        }
    }
    const onClickRedo = () => { //やり直す
        if (GlobalValue.State!.ObjectLogIndex == GlobalValue.State!.ObjectLog.length - 1) {
            return;
        }

        const LogIndex: number = GlobalValue.State!.ObjectLogIndex + 1;
        GlobalValue.State!.SetObjectLogIndex(LogIndex);

        GlobalValue.State!.SetObject(JSON.parse(JSON.stringify(GlobalValue.State!.ObjectLog[LogIndex])));

        if (GlobalValue.State!.Property != null) {
            const Property = GlobalValue.State!.ObjectLog[LogIndex][GlobalValue.State!.ObjectInside].find((obj) => obj.id == GlobalValue.State!.Property!.id)!;
            GlobalValue.State!.SetProperty(Property);
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
                                    maxHeight: '30px',
                                    minWidth: '45px',
                                    background: Windows[i] ? "rgb(200, 77, 150)" : "rgb(45, 45, 45)",
                                    "&:hover": Windows[i] ? {
                                        background: "rgb(200, 77, 150)"
                                    } : {
                                        background: "rgb(182, 182, 182)"
                                    }
                                }}>
                                {obj == 'アイテム' &&
                                    <CheckroomIcon fontSize='small' />
                                }{obj == 'プロパティ' &&
                                    <BuildIcon fontSize='small' />
                                }{obj == '写真' &&
                                    <InsertPhotoIcon fontSize='small' />
                                }{obj == 'スタンプ' &&
                                    <img src={StampIcon} />
                                }{obj == 'テンプレ' &&
                                    <ColorLensIcon fontSize='small' />
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
                    <PropertyWindow />
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
            {

            }
            <Box id='logMove'>
                <Button onClick={onClickUndo}>
                    <p className='logMoveArrow'>←</p>
                    <p className='logMoveText'>戻る</p>
                </Button>

                <Button onClick={onClickRedo}>
                    <p className='logMoveText'>やり直す</p>
                    <p className='logMoveArrow'>→</p>
                </Button>
            </Box>
        </Box>

    );
};
