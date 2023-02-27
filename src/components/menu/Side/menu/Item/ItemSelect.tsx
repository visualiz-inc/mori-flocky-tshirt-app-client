import { Box, Button, SxProps, Theme } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from '../../../../providers/GlobalProvider'

import TshirtIcon from '../../../../../img/ItemIcon/TshirtIcon.svg'
import MasksIcon from '@mui/icons-material/Masks';

import '../.menu.css';

export const ItemSelect = () => {
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
        width:'110px',
        background: "rgb(200, 77, 150)",
        "&:hover": {
            background: "rgb(200, 77, 150)"
        }
    }

    return (
        <>
        <h1 id = 'itemSelctH1'>アイテムを選んでください</h1>
        <Box id='itemSelectBox'>
            <Button sx={ButtonStyle} 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('T-shirtSelect')}>
                <img src={TshirtIcon} />
                <p>Tシャツ</p>
            </Button>
            <Button sx={
                GlobalValue.State?.MainWindowProperty == 'MaskSelect' ? SelectButtonStyle : ButtonStyle } 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('MaskSelect')}>
                <MasksIcon fontSize="large"/>
                <p>マスク</p>
            </Button>
            
        </Box>
        </>
    );
};