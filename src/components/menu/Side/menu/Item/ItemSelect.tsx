import { Box, Button, SxProps, Theme } from '@mui/material';
import { useContext } from 'react';
import { TshirtType } from '../../../../../Types';
import { GlobalContext } from '../../../../providers/GlobalProvider';

import MasksIcon from '@mui/icons-material/Masks';

import '../.menu.css';

export const ItemSelect = () => {
    const GlobalValue: {
        State?: {
            Color: string,
            SetColor: React.Dispatch<React.SetStateAction<string>>,
            Item: TshirtType,
            MainWindowProperty: string,
            SetMainWindowProperty: React.Dispatch<React.SetStateAction<string>>
        }
    } = useContext(GlobalContext);
    const IconStyle: SxProps<Theme> = {
        borderRadius: '10px',
        padding: '12px',
        marginLeft: '-10px',
        pointerEvents: 'none'
    }
    const ButtonStyle: SxProps<Theme> = {
        background: 'rgb(45, 45, 45)',
        "&:hover": {
            background: "rgb(200, 77, 150)"
        }
    }


    const onClick = (e: React.MouseEvent<HTMLElement>) => {
        const ClickElement: EventTarget = e.target;
        if (ClickElement instanceof Element) {
            console.log(ClickElement);
        };
    }

    return (
        <div id='defaultMenu'>

            <Button sx={ButtonStyle} onClick={onClick!}>
                <MasksIcon fontSize="large"
                    sx={IconStyle} />
                マスク
            </Button>
        </div>
    );
};