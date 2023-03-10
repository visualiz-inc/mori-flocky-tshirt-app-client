import { AllShape } from "../../../../../Types"

import { useContext } from 'react';
import { GlobalContext } from '../../../../providers/GlobalProvider';
import '../.menu.css';
import { Button } from "@mui/material";

import LayerTop from '../../../../../img/SideIcon/Layer/LayerTop.svg';
import LayerUp from '../../../../../img/SideIcon/Layer/LayerUp.svg';
import LayerDown from '../../../../../img/SideIcon/Layer/LayerDown.svg';
import LayerBottom from '../../../../../img/SideIcon/Layer/LayerBottom.svg';

export const SortProperty = (props:{Update: (flag: boolean) => void}) => { //順番
    const GlobalValue: {
        State?: {
            Object: AllShape[][],
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
            ObjectInside: number,
            Property: AllShape,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>
        }
    } = useContext(GlobalContext);

    
    const onClockLayerTop = () => {     //最前面へ
        if(GlobalValue.State!.Property.zindex != 0){
        let Objects:AllShape[][] = GlobalValue.State!.Object;
        Objects[GlobalValue.State!.ObjectInside] = Objects[GlobalValue.State!.ObjectInside].map((obj) => {
            const zindex = obj.zindex;
            if(GlobalValue.State!.Property.zindex > zindex){
                obj.zindex += 1;
            }
            return obj;
        })!

        const TopObject: AllShape = {
            ...GlobalValue.State!.Property,
            zindex: 0
        }
        Objects[GlobalValue.State!.ObjectInside][TopObject.index]=TopObject;    //元のindexに代入
        GlobalValue.State!.SetProperty(TopObject);
        GlobalValue.State!.SetObject(Objects);
        props.Update(true);
    }}
    const onClockLayerUp = () => {      //上へ移動
        if(GlobalValue.State!.Property.zindex != 0){
            let Objects:AllShape[][] = GlobalValue.State!.Object;
            Objects[GlobalValue.State!.ObjectInside] = Objects[GlobalValue.State!.ObjectInside].map((obj) => {
                const zindex = obj.zindex;
            if(GlobalValue.State!.Property.zindex - 1 == zindex){
                obj.zindex += 1;
            }
            return obj;
        })!

        const TopObject: AllShape = {
            ...GlobalValue.State!.Property,
            zindex: GlobalValue.State!.Property.zindex - 1
        }
        Objects[GlobalValue.State!.ObjectInside][TopObject.index]=TopObject;    //元のindexに代入
        GlobalValue.State!.SetProperty(TopObject);
        GlobalValue.State!.SetObject(Objects);
        props.Update(true);
    }}
    const onClockLayerDown = () => {      //下へ移動
        if(GlobalValue.State!.Property.zindex != GlobalValue.State!.Object[GlobalValue.State!.ObjectInside].length - 1){
        let Objects:AllShape[][] = GlobalValue.State!.Object;
        Objects[GlobalValue.State!.ObjectInside] = Objects[GlobalValue.State!.ObjectInside].map((obj) => {
            const zindex = obj.zindex;
            if(GlobalValue.State!.Property.zindex + 1 == zindex){
                obj.zindex -= 1;
            }
            
            return obj;
        })!

        const TopObject: AllShape = {
            ...GlobalValue.State!.Property,
            zindex: GlobalValue.State!.Property.zindex + 1
        }
        Objects[GlobalValue.State!.ObjectInside][TopObject.index]=TopObject;    //元のindexに代入
        GlobalValue.State!.SetProperty(TopObject);
        GlobalValue.State!.SetObject(Objects);
        props.Update(true);
    }}
    const onClockLayerBottom = () => {      //最背面へ移動
        if(GlobalValue.State!.Property.zindex != GlobalValue.State!.Object[GlobalValue.State!.ObjectInside].length){
            let Objects:AllShape[][] = GlobalValue.State!.Object;
            Objects[GlobalValue.State!.ObjectInside] = Objects[GlobalValue.State!.ObjectInside].map((obj) => {
                const zindex = obj.zindex;
            if(GlobalValue.State!.Property.zindex < zindex){
                obj.zindex -= 1;
            }
            return obj;
        })!

        const TopObject: AllShape = {
            ...GlobalValue.State!.Property,
            zindex: GlobalValue.State!.Object[GlobalValue.State!.ObjectInside].length - 1
        }
        Objects[GlobalValue.State!.ObjectInside][TopObject.index]=TopObject;    //元のindexに代入
        GlobalValue.State!.SetProperty(TopObject);
        GlobalValue.State!.SetObject(Objects);
        props.Update(true);
    }}

    return (
        <>

            <p style={{
                lineHeight: '0px',
                textAlign: "left",
                fontWeight: "bold"
            }}>並び順 {GlobalValue.State!.Property.zindex + 1}</p>
            <div id='OtherStyleDiv'>
                <Button size='small' onClick={onClockLayerTop}>
                    <img src={LayerTop} />
                    <p>最上面へ</p>
                </Button>
                <Button size='small' onClick={onClockLayerUp}>
                    <img src={LayerUp} />
                    <p>上へ移動</p>
                </Button>
                <Button size='small' onClick={onClockLayerDown}>
                    <img src={LayerDown} />
                    <p>下へ移動</p>
                </Button>
                <Button size='small' onClick={onClockLayerBottom}>
                    <img src={LayerBottom} />
                    <p>最背面へ</p>
                </Button>
            </div>
        </>
    )


};