import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from '../App';
import Header from '../head';
import Listuser from '../listuser';
import Pagescad from '../pages/pages.cad';
import Cadastro from '../pages/cadastro';

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/head" element={<Header />} />
                <Route path="/listuser" element={<Listuser />} />
                <Route path="/pagescad" element={<Pagescad />} />
                <Route path="/cadastro" element={<Cadastro />} />

            </Routes>


        </BrowserRouter>
    )
}
export default AppRoutes; 