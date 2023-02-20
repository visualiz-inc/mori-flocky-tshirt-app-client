import { useContext } from 'react';
import { GlobalContext } from './components/providers/GlobalProvider';
import { Shape } from "./Types"

import { Header } from './components/menu/Head/Header';
import { Side } from './components/menu/Sidemenu';
import { Sidebar } from './components/menu/Side/Sidebar';
import { MainWindow } from './components/main/MainWindow';



export const App = () => {
  const GlobalValue: { State?: { Property: Shape } } = useContext(GlobalContext);
  if (GlobalValue.State) {

    
    const Property = GlobalValue.State.Property;
    return (
      <>
      <div style={{
        marginLeft:'5vw',
        width:'90vw'
        }}>

        <Header />
        <div style={{display:'flex'}}>
          <Sidebar />
          <MainWindow />

        </div>
        {Property && <Side />}
        </div>
      </>
      
    );
  } else {
    return (
      <p>Loading</p>
    )
  }
}