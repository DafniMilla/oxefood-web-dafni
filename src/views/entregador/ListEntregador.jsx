import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { notifyError, notifySuccess } from '../../views/util/util';


export default function ListEntregador() {
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/entregador")
            .then((response) => {
                setLista(response.data)
            })
    }
    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }


    async function remover() {

        await axios.delete('http://localhost:8080/api/entregador/' + idRemover)
            .then((response) => {

                notifySuccess('Entregador removido com sucesso')

                axios.get("http://localhost:8080/api/entregador")
                    .then((response) => {
                        setLista(response.data)
                    })
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



return (
            <div>
                <MenuSistema tela={'entregador'} />
                <div style={{ marginTop: '3%' }}>

                    <Container textAlign='justified' >

                        <h2> Entregador </h2>
                        <Divider />

                        <div style={{ marginTop: '4%' }}>
                            <Button
                                label='Novo'
                                circular
                                color='orange'
                                icon='clipboard outline'
                                floated='right'
                                as={Link}

                            />
                            <br /><br /><br />

                            <Table color='orange' sortable celled>

                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Nome</Table.HeaderCell>
                                        <Table.HeaderCell>CPF</Table.HeaderCell>
                                        <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                                        <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                                        <Table.HeaderCell>Rg</Table.HeaderCell>
                                        <Table.HeaderCell>qtdEntregasRealizadas</Table.HeaderCell>
                                        <Table.HeaderCell>ValorFrete</Table.HeaderCell>
                                        <Table.HeaderCell>Rua</Table.HeaderCell>
                                        <Table.HeaderCell>Numero</Table.HeaderCell>
                                        <Table.HeaderCell>Bairro</Table.HeaderCell>
                                        <Table.HeaderCell>cidade</Table.HeaderCell>
                                        <Table.HeaderCell>cep</Table.HeaderCell>
                                        <Table.HeaderCell>uf</Table.HeaderCell>
                                        <Table.HeaderCell>complemento</Table.HeaderCell>
                                        <Table.HeaderCell>ativo</Table.HeaderCell>




                                        <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>

                                    {lista.map(entregador => (

                                        <Table.Row key={entregador.id}>
                                            <Table.Cell>{entregador.nome}</Table.Cell>
                                            <Table.Cell>{entregador.cpf}</Table.Cell>
                                            <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                                            <Table.Cell>{entregador.foneCelular}</Table.Cell>
                                            <Table.Cell>{entregador.foneFixo}</Table.Cell>
                                            <Table.Cell>{entregador.rg}</Table.Cell>
                                            <Table.Cell>{entregador.qtdEntregasRelizadas}</Table.Cell>
                                            <Table.Cell>{entregador.valorfrete}</Table.Cell>
                                            <Table.Cell>{entregador.rua}</Table.Cell>
                                            <Table.Cell>{entregador.numero}</Table.Cell>
                                            <Table.Cell>{entregador.bairro}</Table.Cell>
                                            <Table.Cell>{entregador.cidade}</Table.Cell>
                                            <Table.Cell>{entregador.cep}</Table.Cell>
                                            <Table.Cell>{entregador.uf}</Table.Cell>
                                            <Table.Cell>{entregador.complemento}</Table.Cell>
                                            <Table.Cell>{entregador.ativo}</Table.Cell>
                                            <Table.Cell textAlign='center'>

                                                <Button
                                                    inverted
                                                    circular
                                                    color='green'
                                                    title='Clique aqui para editar os dados deste entregador'
                                                    icon>
                                                    <Link to="/form-entregador" state={{ id: entregador.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                                </Button> &nbsp;

                                                <Button
                                                    inverted
                                                    circular
                                                    color='red'
                                                    title='Clique aqui para remover este entregador'
                                                    icon
                                                    onClick={e => confirmaRemover(entregador.id)}>
                                                    <Icon name='trash' />
                                                </Button>

                                            </Table.Cell>
                                        </Table.Row>
                                    ))}

                                </Table.Body>
                            </Table>
                        </div>
                    </Container>
                </div>
                <Modal
                    basic
                    onClose={() => setOpenModal(false)}
                    onOpen={() => setOpenModal(true)}
                    open={openModal}
                >
                    <Header icon>
                        <Icon name='trash' />
                        <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                    </Header>
                    <Modal.Actions>
                        <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                            <Icon name='remove' /> Não
                        </Button>
                        <Button color='green' inverted onClick={() => remover()}>
                            <Icon name='checkmark' /> Sim
                        </Button>
                    </Modal.Actions>
                </Modal>

            </div>
        )
    }}
