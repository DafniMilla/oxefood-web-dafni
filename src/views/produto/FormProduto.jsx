import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useState } from "react";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormProduto() {

    function salvar() {

		let produtoRequest = {

		     titulo: Titulo,
             codigo: codigo,
             descricao: descricao,
             valorUnitario: valorUnitario,
             tempoEntregaMinimo: tempoEntregaMinimo,
             tempoEntregaMaximo: tempoEntregaMaximo

		}
	
		axios.post("http://localhost:8080/api/produto", produtoRequest)
		.then((response) => {
		     console.log('Produto cadastrado com sucesso.')
		})
		.catch((error) => {
		     console.log('Erro ao incluir o um produto.')
		})
	}

      const [Titulo, setTitulo] = useState();
      const [codigo, setCodigo] =useState();
      const [descricao,  setDescricao] = useState();
      const [valorUnitario, setvalorUnitario]=useState();
      const [tempoEntregaMinimo, setTempoEntregaminimo]=useState();
      const [tempoEntregaMaximo, setTempoEntregaMaximo]=useState();



    return (

        <div>
            <MenuSistema tela={'produto'} />
            

            <div style={{marginTop: '3%'}}>

                <Container textAlign='justified' >

                    <h2> <span style={{color: 'darkgray'}}> Produto &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{marginTop: '4%'}}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Título'
                                    maxLength="100"
                                    value={Titulo}
                                    onChange={e => setTitulo(e.target.value)}
                                
                    
                                    
                                    
                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Código do produto'>
                                    <InputMask
                                        required
                                        value={codigo}
                                        onChange={e => setCodigo(e.target.value)}
                                    /> 
                                </Form.Input>

                            </Form.Group>
                            
                            <Form.Group>

                                <Form.TextArea
                                    fluid
                                    label='Descrição'
                                    width={16}>
                                    <InputMask 
                                        value={descricao}
                                        onChange={e => setDescricao(e.target.value)}
                                    /> 
                                </Form.TextArea>
                            </Form.Group>

                                <Form.Group>

                                <Form.Input
                                    fluid
                                    label='Valor Unitário'
                                    width={6}>
                                    <InputMask 
                                      
                                        value={valorUnitario}
                                        onChange={e => setvalorUnitario(e.target.value)}
                                    /> 
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Minimo em Minutos'
                                    width={6}
                                     value={tempoEntregaMinimo}
                                    onChange={e => setTempoEntregaminimo(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    fluid
                                    label='Tempo de Entrega Máximo em Minutos'
                                    width={6}
                                    value={tempoEntregaMaximo}
                                    onChange={e => setTempoEntregaMaximo(e.target.value)}
                                >
                                </Form.Input>


                            </Form.Group>
                        
                        </Form>
                        
                        <div style={{marginTop: '4%'}}>

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
