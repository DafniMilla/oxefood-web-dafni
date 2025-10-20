import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from '../../MenuSistema';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormProduto () {
   const [codigo, setCodigo] = useState();
   const [titulo, setTitulo] = useState();
   const [descricao, setDescricao] = useState();
   const [valorUnitario, setValorUnitario] = useState();
   const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
   const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
//   const [listaCategoria, setListaCategoria] = useState([]);
//  const [idCategoria, setIdCategoria] = useState();


   const { state } = useLocation();
   const [idProduto, setIdProduto] = useState();

useEffect(() => {
       		if (state != null && state.id != null) {
           		axios.get("http://localhost:8080/api/produto/" + state.id)
.then((response) => {
               	    	       setIdProduto(response.data.id)
               	    	       setCodigo(response.data.codigo)
               	    	       setTitulo(response.data.titulo)
               	    	       setDescricao(response.data.descricao)
               	    	       setValorUnitario(response.data.valorUnitario)
               	    	       setTempoEntregaMaximo(response.data.tempoEntregaMaximo)
           		               setTempoEntregaMinimo(response.data.tempoEntregaMinimo)
                             //  setIdCategoria(response.data.categoria.id)
                            })
       		}

    //        axios.get("http://localhost:8080/api/categoriaproduto")
    //   .then((response) => {
    //       const dropDownCategorias = response.data.map(c => ({ text: c.descricao, value: c.id }));
    //       setListaCategoria(dropDownCategorias);
   //    })

   	}, [state])

   function salvar() {

		let produtoRequest = {
         //   idCategoria: idCategoria,
            codigo: codigo,
            titulo: titulo,
            descricao: descricao,
            valorUnitario: valorUnitario,
            tempoEntregaMinimo: tempoEntregaMinimo,
            tempoEntregaMaximo: tempoEntregaMaximo
    	}
    
         if (idProduto != null) { //Alteração:
           axios.put("http://localhost:8080/api/produto/" + idProduto, produtoRequest)
           .then((response) => {
            // console.log('Produto alterado com sucesso.') })
                notifySuccess('Produto alterado com sucesso.')
})
           .catch((error) => { 
           // console.log('Erro ao alterar um produto.') })
           if (error.response.data.errors !== undefined) {
       		for (let i = 0; i < error.response.data.errors.length; i++) {
	       		notifyError(error.response.data.errors[i].defaultMessage)
	    	}
	} else {
		notifyError(error.response.data.message)
	}
})
      } else { //Cadastro:

            axios.post("http://localhost:8080/api/produto", produtoRequest)
            .then((response) => { 
                notifySuccess('Produto cadastrado com sucesso.')
            })
            .catch((error) => { 
                if (error.response.data.errors !== undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                } else {
                    notifyError(error.response.data.message)
                }
            })
        }
	}
    return(
        <div>

            <MenuSistema tela={'produto'} />

            <div style={{marginTop:'3%'}}>

                <Container textAlign='justified' >

{ idProduto === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idProduto !== undefined &&
    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}

<Divider />

                <div style={{marginTop:'4%'}}>

                    
                    <Form>
                        <Form.Group widths='equal'>
                            <Form.Input
                            required
                            fluid
                            label='Título'
                            maxLength="100"
                            placeholder="Informe o título do produto"
                            value={titulo}
			                onChange={e => setTitulo(e.target.value)}
                            />
                 

                           <Form.Input
                           required
                           fluid
                           label='Código do Produto'
                           width={6}
                           >
                            <InputMask 
                            //mask="9999999999" 
                            maskChar={null}
                            placeholder="Informe o código do produto"
                            value={codigo}
			                onChange={e => setCodigo(e.target.value)}
                            /> 
                            </Form.Input>

                        </Form.Group>

                        <Form.Group>
                            <Form.Input
                            fluid
                            label='Descrição'
                            control='textarea'
                            width={16}
                            placeholder='Informe a descrição do produto'
                            value={descricao}
			                onChange={e => setDescricao(e.target.value)}
                            
                           />
                        </Form.Group>

                        <Form.Group>
                            <Form.Input
                            required
                            fluid
                            label='Valor unitário'
                            width={6}
                           >
                                <InputMask 
                                mask="99.99" 
                                value={valorUnitario}
			                    onChange={e => setValorUnitario(e.target.value)}
                            /> 
                        </Form.Input>
                            <Form.Input
                            fluid
                            label='Tempo de entrega Mínima em minutos'
                            width={6}
                           >
                                <InputMask 
                                mask="999" 
                                placeholder="30"
                                value={tempoEntregaMinimo}
			                    onChange={e => setTempoEntregaMinimo(e.target.value)}
                            /> 
                            </Form.Input>
                            <Form.Input
                            fluid
                            label='Tempo de entrega Máxima em minutos'
                            width={6}
                           >
                                <InputMask 
                                mask="999" 
                                placeholder="40"
                                value={tempoEntregaMaximo}
			                    onChange={e => setTempoEntregaMaximo(e.target.value)}
                            /> 
                            </Form.Input>
                        </Form.Group>
                   </Form>
                   <div style={{marginTop: '4%'}}>

                    <Link to={'/list-produto'}>
                            <Button
                                type="button"
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='orange'
                            >
                                <Icon name='reply' />
                                Voltar
                            </Button>

                        </Link>

                            <Button
                                inverted
                                circular
                                icon
                                labelPosition='left'
                                color='blue'
                                floated='right'
                                onClick={() => salvar()}
                            >
                                <Icon name='save' />
                                Salvar
                            </Button>

                        </div>

                    </div>


            </Container>

            </div>
        </div>

    );

}