import { useContext } from 'react';
import { GlobalContext } from './components/providers/GlobalProvider';

import { TShirt } from './components/canvas/TShirt';
import { Header } from './components/menu/Headmenu';
import { Side } from './components/menu/Sidemenu';

export const App = () => {
  const GlbalValue: {SideProperty?:any} = useContext(GlobalContext);
  const property = GlbalValue.SideProperty.Property;

  return (
    <>
      <Header />
      <TShirt />
      {property != null && <Side />}
    </>
  );
};
