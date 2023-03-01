import { AllShape } from "../../../../../../Types"

import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../../../providers/GlobalProvider';
import '../../.menu.css';
import { Box, Button } from "@mui/material";

import { Sort } from './Sort'

export const Others = (props:{
    SetPropertyPage:React.Dispatch<React.SetStateAction<number>>
}) => {
    const GlobalValue: {
        State?: {
            Object: AllShape[],
            SetObject: React.Dispatch<React.SetStateAction<AllShape[]>>,
            Property: AllShape,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
        }
    } = useContext(GlobalContext);




            return (
                <>
                    <Button 
                            id='OthersButton'
                            onClick={() => props.SetPropertyPage(0)}
                    >戻る</Button>
                    
                    <Sort/>


                </>
            )
        
    
};