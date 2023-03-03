

import { Box, Button } from "@mui/material";

import SaveLogo from '../../../img/FooterLogo/SaveLogo.svg';
import InsideLogo from '../../../img/FooterLogo/InsideLogo.svg';

import './foot.css';
import { GlobalContext } from "../../providers/GlobalProvider";
import { useContext } from "react";

export const Footer = () => {
    const GlobalValue: {
        State?: { 
            ObjectInside:number,
            SetObjectInside:React.Dispatch<React.SetStateAction<number>>
          }
        } = useContext(GlobalContext);  //グローバル変数を読み込み


    const onClickSave = (e: React.MouseEvent<HTMLElement>) => {   //裏表変更
        alert('unknown');
    }
    
    const onClickInside = (e: React.MouseEvent<HTMLElement>) => {   //裏表変更
        if(GlobalValue.State!.ObjectInside ==0){
            GlobalValue.State!.SetObjectInside(1);
        }else if(GlobalValue.State!.ObjectInside ==1){
            GlobalValue.State!.SetObjectInside(0);
        }
    }


    return (
        <Box id='footer'>
            <Button id='SaveButton' onClick={onClickSave}>
                <p>デザインが<br/>完成したら保存</p>
                <img src={SaveLogo}/>
            </Button>

            <Button id='FootButton' onClick={onClickInside}>
                <img src={InsideLogo}/>
                <p>印刷面を選ぶ</p>
            </Button>
        </Box>
    );
};
