
// Photoshopとは違うのでレイヤーの概念はいらない
// だから1図形1レイヤーで考えてもいい

export type Canvas = {
    name: string,
    width: number,
    height: number,
    layers: Shape[],
}

type ShapeType = unknown | "Rect" | "Circle" | "RegularPolygon" | "Svg" | "Text" | "Svg"

type Color = string;

type Shape<TShapeType extends ShapeType = unknown> = {
    type: TShapeType,
    x: number,
    y: number,
    width: number,
    height: number,
    scaleX: number,
    scaleY: number,
    rotation: number,
    fill: Color,
    opacity: number,
    cornerRadius: number,
    strokeWidth: number,
    stroke: Color,
    id: string,
    zIndex: number, // 階層の深さ
}

type Text = Shape<"Text"> & {
    text: string,
    fontFamily: string,
    fontSize: number,
    fontStyle: "",
}

type RegularPolygon = Shape<"RegularPolygon"> & {
    sides: number
}

type Svg = Shape<"Svg"> & {
    src: string
}

// 上記のように各図形を定義していく


