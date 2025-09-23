import { Route, Routes } from "react-router-dom";


import FormCliente from './views/cliente/FormCliente';
import FormEntregador from './views/entregador/FormEntregador';
import FormProduto from './views/produto/FormProduto';

function Rotas() {
    return (
        <>
            <Routes>
           
                <Route path="FormCliente" element={ <FormCliente/> } />
                <Route path="FormProduto" element={ <FormProduto/> } />
                <Route path="FormEntregador" element={ <FormEntregador/> } />
            </Routes>
        </>
    )
}
export default Rotas;