import axios from 'axios';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Header, Icon, Modal, Table } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListProduto() {
    const [openModal, setOpenModal] = useState(false);
    const [idRemover, setIdRemover] = useState();
    const [lista, setLista] = useState([]);

    useEffect(() => {
        carregarLista();
    }, []);

    function carregarLista() {
        axios.get("http://localhost:8080/api/produto")
            .then((response) => setLista(response.data));
    }

    function confirmaRemover(id) {
        setOpenModal(true);
        setIdRemover(id);
    }

    async function remover() {
        await axios.delete('http://localhost:8080/api/produto/' + idRemover)
            .then(() => {
                console.log('Produto removido com sucesso.');
                carregarLista();
            })
            .catch(() => console.log('Erro ao remover um produto.'));
        setOpenModal(false);
    }

    return (
        <div>
            <MenuSistema tela={'produto'} />
            <div style={{ marginTop: '3%' }}>
                <Container textAlign='justified'>
                    <h2>Produto</h2>
                    <Divider />

                    <Button
                        label='Novo'
                        circular
                        color='orange'
                        icon='clipboard outline'
                        floated='right'
                        as={Link}
                        to='/form-produto'
                    />
                    <br /><br /><br />

                    <Table color='orange' sortable celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Código</Table.HeaderCell>
                                <Table.HeaderCell>Categoria</Table.HeaderCell>
                                <Table.HeaderCell>Título</Table.HeaderCell>
                                <Table.HeaderCell>Descrição</Table.HeaderCell>
                                <Table.HeaderCell>Valor Unitário</Table.HeaderCell>
                                <Table.HeaderCell>Tempo Mínimo de Entrega</Table.HeaderCell>
                                <Table.HeaderCell>Tempo Máximo de Entrega</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {lista.map(produto => (
                                <Table.Row key={produto.id}>
                                    <Table.Cell>{produto.codigo}</Table.Cell>
                                    <Table.Cell>{produto.categoria?.descricao}</Table.Cell>
                                    <Table.Cell>{produto.titulo}</Table.Cell>
                                    <Table.Cell>{produto.descricao}</Table.Cell>
                                    <Table.Cell>{produto.valorUnitario}</Table.Cell>
                                    <Table.Cell>{produto.tempoEntregaMinimo}</Table.Cell>
                                    <Table.Cell>{produto.tempoEntregaMaximo}</Table.Cell>
                                    <Table.Cell textAlign='center'>
                                        <Button
                                            inverted
                                            circular
                                            color='green'
                                            as={Link}
                                            to="/form-produto"
                                            state={{ id: produto.id }}
                                        >
                                            <Icon name='edit' />
                                        </Button> &nbsp;

                                        <Button
                                            inverted
                                            circular
                                            color='red'
                                            onClick={() => confirmaRemover(produto.id)}
                                        >
                                            <Icon name='trash' />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Container>
            </div>

            <Modal
                basic
                onClose={() => setOpenModal(false)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}>Tem certeza que deseja remover esse registro?</div>
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
    );
}
