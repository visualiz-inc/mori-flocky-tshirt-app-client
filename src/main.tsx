import { createRoot } from 'react-dom/client';

import { App } from "./App";
import { GlobalProvider } from './components/providers/GlobalProvider';


const container = document.getElementById('root') as HTMLInputElement;
const root = createRoot(container);
root.render(
    <GlobalProvider>
        <App />
    </GlobalProvider>
);