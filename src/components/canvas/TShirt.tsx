import { useContext, useState, useCallback } from 'react';
import { CanvasMain } from './CanvasMain';

import { GlobalContext } from "../providers/GlobalProvider";
import picture from '../../img/ts.png'

export const TShirt = () => {
    const GlobalValue: { CanvasProperty?: any } = useContext(GlobalContext);
    const { width, height, border } = GlobalValue.CanvasProperty;

    const [marginLeft, SetMarginLeft] = useState(Math.max(5, ((window.innerWidth - width) / 2))); //marginLeft初期値  //中央寄せ 最小値5
    const [marginTop, SetMarginTop] = useState(Math.max(50, (window.innerHeight - height) / 4)); //marginTop初期値   //中央寄せ 最小値150

    window.onresize = useCallback(() => { //window.onresize関数 初回のみ定義
        SetMarginLeft(Math.max(5, (window.innerWidth - width) / 2));       //marginLeft更新
        SetMarginTop(Math.max(50, ((window.innerHeight - height) / 4)));  //marginTop更新
    }, [width, height]);  //エラー避け

    return (
        <div  //位置指定用div
            style={{
                width, height,
                marginLeft, marginTop,
                pointerEvents: 'none',
                position: 'relative',
            }}>
            <img style={{ //シャツの画像
                position: 'absolute',
                left: 0, top: 0,
                userSelect: 'none', pointerEvents: 'none'
            }} src={picture} alt='' />
            <div    //枠線と位置指定用div
                style={{
                    position: 'absolute',
                    width: width / 2.5, height: height / 1.75,
                    top: height * 0.2, left: width * 0.3,
                    border
                }}
            >
                <CanvasMain />
            </div>
        </div>
    );
};
