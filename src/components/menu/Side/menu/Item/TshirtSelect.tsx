import { Theme } from '@emotion/react';
import { Box, Button, SxProps } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from '../../../../providers/GlobalProvider'

import TshirtIcon from '../../../../../img/SideIcon/ItemIcon/TshirtIcon.svg'
import NosleeveIcon from '../../../../../img/SideIcon/ItemIcon/NosleeveIcon.svg'
import LadiesKidsIcon from '../../../../../img/SideIcon/ItemIcon/LadiesKidsIcon.svg'
import DrySportsIcon from '../../../../../img/SideIcon/ItemIcon/DrySportsIcon.svg'
import LongSleeveIcon from '../../../../../img/SideIcon/ItemIcon/LongSleeveIcon.svg'
import '../.menu.css';

export const TshirtSelect = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty:string,
            SetMainWindowProperty :React.Dispatch<React.SetStateAction<string>>
        }
    } = useContext(GlobalContext);

    const ButtonStyle: SxProps<Theme> = {
        display:'block',
        width:'110px',
        background: 'rgb(45, 45, 45)',
        "&:hover": {
            background: "rgb(200, 77, 150)"
        }
    }
    const SelectButtonStyle: SxProps<Theme> = {
        display:'block',
        width:'100px',
        background: "rgb(200, 77, 150)",
        "&:hover": {
            background: "rgb(200, 77, 150)"
        }
    }

    return (
        <>
        <h1 id = 'itemSelctH1'>Tシャツ</h1>
        <Box id='itemSelectBox'>
            <Button sx={
                GlobalValue.State?.MainWindowProperty == 'ShortSleeveSelect' ? SelectButtonStyle : ButtonStyle } 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('ShortSleeveSelect')}>
                <img src={TshirtIcon} />
                <p>半袖Tシャツ</p>
            </Button>
            <Button sx={
                GlobalValue.State?.MainWindowProperty == 'NoSleeveSelect' ? SelectButtonStyle : ButtonStyle } 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('NoSleeveSelect')}>
                <img src={NosleeveIcon} />
                <p>ノースリーブタンクトップ</p>
            </Button>
            <Button sx={
                GlobalValue.State?.MainWindowProperty == 'LadiesKidsSelect' ? SelectButtonStyle : ButtonStyle } 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('LadiesKidsSelect')}>
                <img src={LadiesKidsIcon} />
                <p>レディースキッズ</p>
            </Button>
            <Button sx={
                GlobalValue.State?.MainWindowProperty == 'DrySportsSelect' ? SelectButtonStyle : ButtonStyle } 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('DrySportsSelect')}>
                <img src={DrySportsIcon} />
                <p>ドライスポーツ</p>
            </Button>
            <Button sx={
                GlobalValue.State?.MainWindowProperty == 'LongSleeveSelect' ? SelectButtonStyle : ButtonStyle } 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('LongSleeveSelect')}>
                <img src={LongSleeveIcon} />
                <p>長袖Tシャツ</p>
            </Button>
            
        </Box>
        </>
    );
};