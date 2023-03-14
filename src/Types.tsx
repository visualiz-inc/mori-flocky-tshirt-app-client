
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
    opacity: number,
    index: number,
    zindex: number, // 階層の深さ
    id: string,
}

export type Rect = Shape & {
    width: number,
    height: number,
    cornerRadius: number,
    fill: Color,
    stroke: Color,
    strokeWidth: number
}

export type Text = Shape & {
    width: number,
    height: number,
    text: string,
    fontFamily: string,
    fontSize: number,
    align:string,
    letterSpacing: number,
    fontStyle: "",
    fill: Color,
    stroke: Color,
    strokeWidth: number
}

export type RegularPolygon = Shape & {
    sides: number,
    radius: number,
    fill: Color,
    stroke: Color,
    strokeWidth: number
}

export type Circle = Shape& { 
    radius: number,
    fill: Color,
    stroke: Color,
    strokeWidth: number
}

export type Picture = Shape & {
    width: number,
    height: number,
    imageIndex:number
}

export type AllShape = Rect | Text | RegularPolygon | Circle | Picture;

export type AllPropertyShapeType = (Shape & Rect & RegularPolygon & Circle & Text & Picture) | null;

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

export type MaskType = ItemType;