import './App.css';
import FormCliente from './views/cliente/FormCliente';

import { Segment } from 'semantic-ui-react';
import Rotas from "./Rotas";
import FormEntregador from './views/entregador/FormEntregador';
import FormProduto from './views/produto/FormProduto';


function App() {
  return (
    <div className="App">
      
   
      <Rotas/>
      <FormCliente />
      <FormProduto/>
      <FormEntregador/>
      
      

      <div style={{ marginTop: '6%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes
        </Segment>
      </div>

    </div>
  );
}

export default App;
