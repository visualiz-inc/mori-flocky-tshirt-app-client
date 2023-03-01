
// Photoshopとは違うのでレイヤーの概念はいらない
// だから1図形1レイヤーで考えてもいい

export type Prop = {
    Width: number,
    Height: number,
    Border: string,
}

type Color = string;

export type Shape = {
    type: string,
    x: number,
    y: number,
    scaleX: number,
    scaleY: number,
    rotation: number,
    fill: Color,
    opacity: number,
    strokeWidth: number,
    stroke: Color,
    index: number,
    zindex: number, // 階層の深さ
    id: string,
}

export type Rect = Shape & {
    width: number,
    height: number,
    cornerRadius: number,
}

export type Text = Shape & {
    width: number,
    height: number,
    text: string,
    fontFamily: string,
    fontSize: number,
    align:string,
    fontStyle: "",
}

export type RegularPolygon = Shape & {
    sides: number,
    radius: number,
}

export type Circle = Shape& { 
    radius: number,
}

export type Svg = Shape & {
    src: string
}

export type AllShape = Rect | Text | RegularPolygon | Circle | Svg;
export type ItemType = {
    ItemType: string[],
    ImageSrc:string,
    CatchPhrase:string,
    Name: string,
    Money: string,
    Description: string[],
    Color: string[],
    Size: string[]
}
export type TshirtType = ItemType & {
    Thickness: number,
}

export type MaskType = ItemType