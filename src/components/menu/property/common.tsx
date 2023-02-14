import { Shape, AllShape } from "../../../Types"

export function Common(
    type: string, 
    Canvas?: {
        Object: Shape[],
        SetObject: React.Dispatch<React.SetStateAction<Shape[]>>
    },
    SideProperty?: {
        Property: AllShape,
        SetProperty: React.Dispatch<React.SetStateAction<Shape & {index:number} | null>>,
    },
    Value?: number | string,
    index?: number) {
    if (index != undefined && Canvas && SideProperty) {
        interface CommonInterface extends Shape {
            [key: string]: number|string|unknown    //ブランケット記法で参照した際の返り値を定義
        }
        let CanvasObject = Canvas.Object as CommonInterface[];
        CanvasObject[index][type] = Value;
        Canvas.SetObject(CanvasObject);   //オブジェクトを代入 
        SideProperty.SetProperty({         //サイドバーに代入
            ...CanvasObject[index],
            'width': SideProperty.Property['width'],
            'height': SideProperty.Property['height'],
            'index': index
        });
    }
}