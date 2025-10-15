import axios from "axios";
import InputMask from 'comigo-tech-react-input-mask';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { notifyError, notifySuccess } from '../../views/util/util';

export default function FormEntregador() {

    const { state } = useLocation();
    const [idEntregador, setEntregador] = useState();


    const [nome, setNome] = useState();
    const [cpf, setCpf] = useState();
    const [dataNascimento, setDataNascimento] = useState();
    const [foneCelular, setFoneCelular] = useState();
    const [foneFixo, setFoneFixo] = useState();
    const [Rg, setRg] = useState();
    const [qtdEntregasRealizadas, setqtdEntregasRealizadas] = useState();
    const [ValorFrete, setValorFrete] = useState();
    const [Rua, setRua] = useState();
    const [Numero, setNumero] = useState();
    const [Bairro, setBairro] = useState();
    const [cidade, setCidade] = useState();
    const [cep, setCep] = useState();
    const [uf, setUf] = useState();
    const [complemento, setComplemento] = useState();
    const [ativo, setAtivo] = useState();


    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/entregador/" + state.id)
                .then((response) => {
                    setEntregador(response.data.id)
                    setNome(response.data.nome)
                    setCpf(response.data.cpf)
                    setDataNascimento(response.data.dataNascimento)
                    setDataNascimento(formatarData(response.data.dataNascimento))
                    setFoneCelular(response.data.foneCelular)
                    setFoneFixo(response.data.foneFixo)
                    setRg(response.data.Rg)
                    setqtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
                    setValorFrete(response.data.ValorFrete)
                    setRua(response.data.Rua)
                    setNumero(response.data.Numero)
                    setBairro(response.data.Bairro)
                    setCidade(response.data.Cidade)
                    setCep(response.data.Cep)
                    setUf(response.data.uf)
                    setComplemento(response.data.complemento)
                    setAtivo(response.data.ativo)



                })
        }
    }, [state]);


    function salvar() {
      let entregadorRequest = {
            nome: nome,
            cpf: cpf,
            dataNascimento: dataNascimento,
            foneCelular: foneCelular,
            foneFixo: foneFixo,

            Rg: Rg,
            qtdEntregasRealizadas: qtdEntregasRealizadas,
            ValorFrete: ValorFrete,
            Rua: Rua,
            Numero: Numero,
            Bairro: Bairro,
            cidade: cidade,
            cep: cep,
            uf: uf,
            complemento: complemento,
            ativo: ativo
        
        };

        if (idEntregador != null) { //Alteração:
            axios.put("http://localhost:8080/api/entregador" + idEntregador, entregadorRequest)
                .then((response) => {
                    notifySuccess('Entregador cadastrado com sucesso.')
                })
                .catch((error) => {
                    if (error.response.data.errors != undefined) {
                        for (let i = 0; i < error.response.data.errors.length; i++) {
                            notifyError(error.response.data.errors[i].defaultMessage)
                        }
                    } else {
                        notifyError(error.response.data.message)
                    }


                });
        }}

        return (

            <div>
                <MenuSistema tela={'entregador'} />

                <div style={{ marginTop: '3%' }}>

                    <Container textAlign='justified' >

                        <h2> <span style={{ color: 'darkgray' }}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro </h2>

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
                                        label='CPF'>
                                        <InputMask
                                            required
                                            value={cpf}
                                            onChange={e => setCpf(e.target.value)}
                                        />
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Rg'
                                        width={10}>
                                        <InputMask
                                            value={Rg}
                                            onChange={e => setRg(e.target.value)} />

                                    </Form.Input>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Input
                                        fluid
                                        label='Data Nascimento'
                                        width={6}
                                    >
                                        <InputMask
                                            mask="99/99/9999"
                                            maskChar={null}
                                            placeholder="Ex: 20/03/1985"
                                            value={dataNascimento}
                                            onChange={e => setDataNascimento(e.target.value)} />

                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='FoneCelular'
                                        width={6}>
                                        <InputMask
                                            mask="(99) 9999.9999"
                                            value={foneCelular}
                                            onChange={e => setFoneCelular(e.target.value)}
                                        />
                                    </Form.Input>


                                    <Form.Input
                                        fluid
                                        label='FoneFixo'
                                        width={6}>
                                        <InputMask
                                            mask="(99) 9999.9999"
                                            value={foneFixo}
                                            onChange={e => setFoneFixo(e.target.value)}
                                        />
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='QTD Entregas realizadas'
                                        width={6}
                                        value={qtdEntregasRealizadas}
                                        onChange={e => setqtdEntregasRealizadas(e.target.value)}
                                    >
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Valor por Frete'
                                        width={6}
                                        value={ValorFrete}
                                        onChange={e => setValorFrete(e.target.value)}
                                    >
                                    </Form.Input>
                                </Form.Group>


                                <Form.Group>
                                    <Form.Input
                                        fluid
                                        label='Rua'
                                        width={15}
                                        value={Rua}
                                        onChange={e => setRua(e.target.value)}
                                    >
                                    </Form.Input>
                                    <Form.Input
                                        fluid
                                        label='Número'
                                        width={6}
                                        value={Numero}
                                        onChange={e => setNumero(e.target.value)}
                                    >
                                    </Form.Input>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Input
                                        fluid
                                        label='Bairro'
                                        width={6}
                                        value={Bairro}
                                        onChange={e => setBairro(e.target.value)}
                                    >
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='Cidade'
                                        width={6}
                                        value={cidade}
                                        onChange={e => setCidade(e.target.value)}
                                    >
                                    </Form.Input>

                                    <Form.Input
                                        fluid
                                        label='CEP'
                                        width={6}
                                        value={cep}
                                        onChange={e => setCep(e.target.value)}
                                    >
                                    </Form.Input>
                                </Form.Group>
                                <Form.Select
                                    fluid
                                    label='UF'
                                    width={15}
                                    options={[
                                        { key: 'AC', text: 'AC', value: 'AC' },
                                        { key: 'AL', text: 'AL', value: 'AL' },
                                        { key: 'AP', text: 'AP', value: 'AP' },
                                        { key: 'AM', text: 'AM', value: 'AM' },
                                        { key: 'BA', text: 'BA', value: 'BA' },
                                        { key: 'CE', text: 'CE', value: 'CE' },
                                        { key: 'DF', text: 'DF', value: 'DF' },
                                        { key: 'ES', text: 'ES', value: 'ES' },
                                        { key: 'GO', text: 'GO', value: 'GO' },
                                        { key: 'MA', text: 'MA', value: 'MA' },
                                        { key: 'MT', text: 'MT', value: 'MT' },
                                        { key: 'MS', text: 'MS', value: 'MS' },
                                        { key: 'MG', text: 'MG', value: 'MG' },
                                        { key: 'PA', text: 'PA', value: 'PA' },
                                        { key: 'PB', text: 'PB', value: 'PB' },
                                        { key: 'PR', text: 'PR', value: 'PR' },
                                        { key: 'PE', text: 'PE', value: 'PE' },
                                        { key: 'PI', text: 'PI', value: 'PI' },
                                        { key: 'RJ', text: 'RJ', value: 'RJ' },
                                        { key: 'RN', text: 'RN', value: 'RN' },
                                        { key: 'RS', text: 'RS', value: 'RS' },
                                        { key: 'RO', text: 'RO', value: 'RO' },
                                        { key: 'RR', text: 'RR', value: 'RR' },
                                        { key: 'SC', text: 'SC', value: 'SC' },
                                        { key: 'SP', text: 'SP', value: 'SP' },
                                        { key: 'SE', text: 'SE', value: 'SE' },
                                        { key: 'TO', text: 'TO', value: 'TO' },
                                    ]}
                                    placeholder="Selecione o UF"
                                    value={uf}
                                    onChange={e => setUf(e.target.value)}
                                >
                                </Form.Select>

                                <Form.Input
                                    fluid
                                    label='Complemento'
                                    width={15}
                                    value={complemento}
                                    onChange={e => setComplemento(e.target.value)}
                                >
                                </Form.Input>

                                <Form.Input
                                    label="Ativo?">
                                    <Form.Radio
                                        label="Sim"
                                        value={true}
                                        checked={ativo === true}
                                        onChange={() => setAtivo(true)}
                                    />
                                    <Form.Radio
                                        label="Não"
                                        value={false}
                                        checked={ativo === false}
                                        onChange={() => setAtivo(false)}
                                    />
                                </Form.Input>

                            </Form>





                            <div style={{ marginTop: '4%' }}>

                                <Link to={'/list-entregador'}>
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
