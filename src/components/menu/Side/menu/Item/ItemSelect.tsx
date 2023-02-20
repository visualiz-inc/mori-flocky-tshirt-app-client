import { Button, SxProps, Theme } from '@mui/material';
import { useContext } from 'react';
import { GlobalContext } from '../../../../providers/GlobalProvider';

import CheckroomIcon from '@mui/icons-material/Checkroom';
import MasksIcon from '@mui/icons-material/Masks';

import '../.menu.css';

export const ItemSelect = () => {
    const GlobalValue: {
        State?: {
            MainWindowProperty:string,
            SetMainWindowProperty :React.Dispatch<React.SetStateAction<string>>
        }
    } = useContext(GlobalContext);

    const IconStyle: SxProps<Theme> = {
        borderRadius: '10px',
        padding: '12px',
        pointerEvents: 'none'
        
    }
    const ButtonStyle: SxProps<Theme> = {
        display:'block',
        width:'100px',
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
        <div id='itemSelectBox'>
            <h1>アイテムを選んでください</h1>
            <Button sx={ButtonStyle} 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('T-shirtSelect')}>
                <CheckroomIcon fontSize="large"
                    sx={IconStyle} />
                <p>Tシャツ</p>
            </Button>
            <Button sx={
                GlobalValue.State?.MainWindowProperty == 'MaskSelect' ? SelectButtonStyle : ButtonStyle } 
                onClick={() => GlobalValue.State!.SetMainWindowProperty('MaskSelect')}>
                <MasksIcon fontSize="large"
                    sx={IconStyle} />
                <p>マスク</p>
            </Button>
            
        </div>
    );
};