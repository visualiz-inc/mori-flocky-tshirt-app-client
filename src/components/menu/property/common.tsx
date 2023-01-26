export function Common(type:string, Canvas?:any, SideProperty?:any, Value?:number | string, index?:number[]){
    if(index){
        let CanvasObject:any = Canvas.Object;
        const keys = Object.keys(CanvasObject);

        CanvasObject[keys[index[0]]][index[1]][type] = Value;
        Canvas.SetObject(CanvasObject);   //オブジェクトを代入
        SideProperty.SetProperty({         //サイドバーに代入
            ...CanvasObject[keys[index[0]]][index[1]],
            'index': index
        });
    }
}