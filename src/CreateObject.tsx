import { AllShape } from "./Types";

const AddCommonProgram = (  //共通する処理
    GlobalValue: {
        State?: {
            Object: AllShape[][];
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
            ObjectLog: AllShape[][][],
            SetObjectLog: React.Dispatch<React.SetStateAction<AllShape[][][]>>,
            ObjectLogIndex: number,
            SetObjectLogIndex: React.Dispatch<React.SetStateAction<number>>,
            ObjectInside: number,
            ObjectID: number,
            SetObjectID: React.Dispatch<React.SetStateAction<number>>,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>,
        }
        LogMaxTimes?: number,
    },
    NewObject: AllShape
) => {
    const Objs: AllShape[][] = GlobalValue.State!.Object;
    Objs[GlobalValue.State!.ObjectInside] = Objs[GlobalValue.State!.ObjectInside].map((obj) => {
        obj.zindex += 1;
        return obj;
    })!
    Objs[GlobalValue.State!.ObjectInside] = [
        ...Objs[GlobalValue.State!.ObjectInside],
        NewObject
    ]
    GlobalValue.State!.SetProperty(NewObject);
    GlobalValue.State!.SetObject(Objs);
    GlobalValue.State!.SetObjectID(GlobalValue.State!.ObjectID + 1);

    const LogIndex = Math.min(GlobalValue.State!.ObjectLogIndex + 1, GlobalValue.LogMaxTimes!);
    const MinIndex = Math.max(0, GlobalValue.State!.ObjectLog.length - GlobalValue.LogMaxTimes!);
    const Logs: AllShape[][][] = GlobalValue.State!.ObjectLog.slice(MinIndex, LogIndex).concat([JSON.parse(JSON.stringify(Objs))]);
    GlobalValue.State!.SetObjectLog(Logs);
    GlobalValue.State!.SetObjectLogIndex(LogIndex);
}

export const AddImage = (   //画像追加
    GlobalValue: {
        State?: {
            Object: AllShape[][];
            SetObject: React.Dispatch<React.SetStateAction<AllShape[][]>>,
            ObjectLog: AllShape[][][],
            SetObjectLog: React.Dispatch<React.SetStateAction<AllShape[][][]>>,
            ObjectLogIndex: number,
            SetObjectLogIndex: React.Dispatch<React.SetStateAction<number>>,
            ObjectInside: number,
            ObjectID: number,
            SetObjectID: React.Dispatch<React.SetStateAction<number>>,
            SetProperty: React.Dispatch<React.SetStateAction<AllShape | null>>,
            Images: string[],
            SetImages: React.Dispatch<React.SetStateAction<string[]>>
        },
        LogMaxTimes?: number
    },
    width: number, height: number, src: string) => {
    const DefaultSize = 300;
    const Scale = Math.round(DefaultSize / (width >= height ? width : height) * 100) / 100;
    const NewObject = { //追加するオブジェクト
        type: 'Image',
        x: Math.round(width * Scale / 2 * 100) / 100,
        y: Math.round(height * Scale / 2 * 100) / 100,
        scaleX: Scale, scaleY: Scale,
        offsetX: Math.round(width / 2 * 100) / 100,
        offsetY: Math.round(height / 2 * 100) / 100,
        rotation: 0,
        opacity: 1,
        index: GlobalValue.State!.Object[GlobalValue.State!.ObjectInside].length,
        zindex: 0,
        id: `image${GlobalValue.State!.ObjectID}`,
        width, height,
        imageIndex :GlobalValue.State!.Images.length
    }
    AddCommonProgram(GlobalValue, NewObject);
    GlobalValue.State!.SetImages([
        ...GlobalValue.State!.Images,
        src
    ])
}