import { createContext, useState, ReactNode } from "react";

export const GlobalContext = createContext({});
type Children = {
  children: ReactNode
}

export const GlobalProvider = (props: Children) => {
    const { children } = props;

    const [Object, SetObject] = useState({
          'Layer1':[
            {
              type: 'Rect',
              x: 40,
              y: 10,
              width: 50,
              height: 50,
              scaleX:1,
              scaleY:1,
              rotation: 45,
              fill: '#00ff66',
              opacity: 1,
              cornerRadius: 5,
              strokeWidth: 5,
              stroke: '#000000',
              id: 'object0',
            },
            {
              type: 'RegularPolygon',
              x: 150,
              y: 150,
              sides: 3,
              radius: 70,
              scaleX:1,
              scaleY:1,
              rotation: 0,
              fill: '#ff0055',
              opacity: 1,
              strokeWidth: 0,
              stroke: '#000000',
              id: 'object1',
            },
            {
              type: 'Circle',
              x: 100,
              y: 50,
              radius: 30,
              scaleX:1,
              scaleY:1,
              rotation: 0,
              fill: '#0000ff',
              opacity: 1,
              strokeWidth: 0,
              stroke: '#000000',
              id: 'object2',
            }
          ],
          'Layer2':[
            {
              type: 'Text',
              x: 10,
              y: 100,
              scaleX:1,
              scaleY:1,
              fill: '#000000',
              opacity: 1,
              text: 'Hello World!',
              fontSize: 30,
              fontFamily: 'メイリオ',
              fontStyle: '',
              rotation: 340,
              strokeWidth: 0,
              stroke: '#000000',
              id: 'object3',
            }
          ]
        })
    const [Property,SetProperty] = useState(null);

    const global = {
        Canvas: {Object, SetObject},
        CanvasProperty: {
          width: 510,
          height: 400,
          border: '2px solid #000000'
        },
        SideProperty: {Property , SetProperty}
    }

    return (
        <GlobalContext.Provider value = {global}>
            {children}
        </GlobalContext.Provider>
    );
};
