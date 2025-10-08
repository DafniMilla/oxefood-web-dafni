import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function FormCidade() {

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }


    const { state } = useLocation();
    const [idCidade, setCidade] = useState();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/cidade/" + state.id)
                .then((response) => {
                    setCidade(response.data.Cidade)
                    setNome(response.data.nome)
                    setEstado(response.data.estado)
                    setQtdPopulacao(response.data.qtdPopulacao)
                    setEhCapital(response.data.ehCapital)
                    setdataFundacao(response.data.dataFundacao)


                })
        }
    }, [state])


    function salvar() {

        let cidadeRequest = {
            nome: nome,
            estado: estado,
            qtdPopulacao: qtdPopulacao,
            ehCapital: ehCapital,
            dataFundacao: dataFundacao
        }

        if (idCidade != null) { //Alteração:
            axios.put("http://localhost:8080/api/cidade/" + idCidade, cidadeRequest)
                .then((response) => { console.log('Cidade alterada com sucesso.') })
                .catch((error) => { console.log('Erro ao alter a cidade.') })
        } else {
            //Cadastro:
            axios.post("http://localhost:8080/api/cidade", cidadeRequest)
                .then((response) => { console.log('Cidade cadastrada com sucesso.') })
                .catch((error) => { console.log('Erro ao incluir cidade.') })
        }

    }




    const [nome, setNome] = useState();
    const [estado, setEstado] = useState();
    const [qtdPopulacao, setQtdPopulacao] = useState();
    const [ehCapital, setEhCapital] = useState();
    const [dataFundacao, setdataFundacao] = useState();

    return (


        <div>
            <MenuSistema tela={'cidade'} />



            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >
                    {idCidade === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cidade &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCidade != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Cidade&nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }


                    <h2> <span style={{ color: 'darkgray' }}> Cidade &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

                    <Divider />

                    <div style={{ marginTop: '4%' }}>

                        <Form>

                            <Form.Group widths='equal'>

                                <Form.Input
                                    required
                                    fluid
                                    label='Nome'
                                    maxLength="100"
                                    value={nome}
                                    onChange={e => setNome(e.target.value)}

                                />

                                <Form.Input
                                    required
                                    fluid
                                    label='Estado'
                                    maxLength="100"
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)} />

                                <Form.Input
                                    
                                    fluid
                                    label='qtdPopulacao'
                                    value={qtdPopulacao}
                                    onChange={e => setQtdPopulacao(e.target.value)} />

                            
                            <Form.Select
                                fluid
                                label='Capital'
                                width={15}
                                options={[
                                    { key: 'true', text: 'true', value: 'true' },
                                    { key: 'false', text: 'false', value: 'false' },
                                      ]}
                                placeholder=""
                                value={ehCapital}
                                onChange={e => setEhCapital(e.target.value)}
                            >
                            </Form.Select>
                            </Form.Group>


                            <Form.Input
                                fluid
                                label='Data Fundação'
                                width={6}
                            >
                                <InputMask
                                    mask="99/99/9999"
                                    maskChar={null}
                                    placeholder="Ex: 20/03/1985"
                                    value={dataFundacao}
                                    onChange={e => setdataFundacao(e.target.value)} />

                            </Form.Input>
                        

                    </Form>
                    <div style={{ marginTop: '4%' }}>
                        <Link to={'/list-cidade'}>
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
            </div >
        </div >

    );

}
