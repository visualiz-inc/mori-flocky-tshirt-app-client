import { useContext } from 'react';
import { GlobalContext } from './components/providers/GlobalProvider';
import { Shape } from "./Types"

import { Header } from './components/menu/Head/Header';
import { Sidebar } from './components/menu/Side/Sidebar';
import { MainWindow } from './components/main/MainWindow';
import { Footer } from './components/menu/Footer/Footer';
import { Box } from '@mui/material';



export const App = () => {
  const GlobalValue: { State?: { Property: Shape } } = useContext(GlobalContext);
  if (GlobalValue.State) {


    const Property = GlobalValue.State.Property;
    return (
      <>
        <div style={{
          marginLeft: '5vw',
          width: '90vw'
        }}>

          <Header />

          <Box sx={{display:'flex'}}>
            <Sidebar />
            <MainWindow />
          </Box>
          <Footer/>
          
        </div>
      </>

    );
  } else {
    return (
      <p>Loading</p>
    )
  }
}