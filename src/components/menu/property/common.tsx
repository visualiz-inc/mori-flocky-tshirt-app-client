import { useContext } from "react";
import { AllShape, Rect, RegularPolygon, Circle, Svg } from "../../../Types"
import { GlobalContext } from "../../providers/GlobalProvider";

export function Common(
    type: string,
    Value: number | string,
    index: number) {
    const GlobalValue: {
        State?: {
            Object: (Rect | RegularPolygon | Circle | Text | Svg)[],
            SetObject: React.Dispatch<React.SetStateAction<(Rect | RegularPolygon | Circle | Text | Svg)[]>>,
            SetProperty: React.Dispatch<React.SetStateAction<(Rect | RegularPolygon | Circle | Text | Svg) | null>>
        }
    } = useContext(GlobalContext);

    if (index != undefined && GlobalValue.State){
        interface CommonInterface extends AllShape {
            [key: string]: number | string | unknown    //ブランケット記法で参照した際の返り値を定義
        }
        let TempObject = GlobalValue.State.Object as CommonInterface[];
        TempObject[index][type] = Value;
        GlobalValue.State.SetObject(TempObject);   //オブジェクトを代入 
        GlobalValue.State.SetProperty({         //サイドバーに代入
            ...TempObject[index],
            'index': index
        });
    }
}