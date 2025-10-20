import InputMask from 'comigo-tech-react-input-mask';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import axios from "axios";
import MenuSistema from '../../MenuSistema';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from '../../views/util/Util';

export default function FormEntregador () {
   const [nome, setNome] = useState();
   const [cpf,setCpf] = useState();
   const [rg, setRg] = useState();
   const [dataNascimento, setDataNascimento] = useState();
   const [foneCelular, setFoneCelular] = useState();
   const [foneFixo, setFoneFixo] = useState();
   const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
   const [valorFrete, setValorFrete] = useState();
   const [enderecoRua, setEnderecoRua] = useState();
   const [enderecoComplemento, setEnderecoComplemento] = useState();
   const [enderecoNumero, setEnderecoNumero] = useState();
   const [enderecoBairro, setEnderecoBairro] = useState();
   const [enderecoCidade, setEnderecoCidade] = useState();
   const [enderecoCep, setEnderecoCep] = useState();
   //const [enderecoUf, setEnderecoUf] = useState();
   const [enderecoUf, setEnderecoUf] = useState("");
   const [ativo, setAtivo] = useState();

   const { state } = useLocation();
   const [idEntregador, setIdEntregador] = useState();

useEffect(() => {
       		if (state != null && state.id != null) {
           		axios.get("http://localhost:8080/api/entregador/" + state.id)
.then((response) => {
               	    	
             setIdEntregador(response.data.id)
             setNome(response.data.nome)
             setCpf(response.data.cpf)
		         setRg(response.data.rg)
             setDataNascimento(formatarData(response.data.dataNascimento))
             setFoneCelular(response.data.foneCelular)
             setFoneFixo(response.data.foneFixo)
             setQtdEntregasRealizadas(response.data.qtdEntregasRealizadas)
             setValorFrete(response.data.valorFrete)
             setEnderecoRua(response.data.enderecoRua)
             setEnderecoComplemento(response.data.enderecoComplemento)
             setEnderecoNumero(response.data.enderecoNumero)
             setEnderecoBairro(response.data.enderecoBairro)
             setEnderecoCidade(response.data.enderecoCidade)
             setEnderecoCep(response.data.enderecoCep)
             setEnderecoUf(response.data.enderecoUf)
             setAtivo(response.data.ativo)
            
           		})
       		}
   	}, [state])

    function formatarData(dataParam) {

       if (dataParam === null || dataParam === '' || dataParam === undefined) {
           return ''
       }

       let arrayData = dataParam.split('-');
       return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
   }

   
   function salvar() {
    let dataFormatada = dataNascimento ? dataNascimento.replace(/-/g, "/") : "";


		let entregadorRequest = {
		         nome: nome,
		         cpf: cpf,
             rg: rg,
             dataNascimento: dataFormatada,
             foneCelular: foneCelular,
             foneFixo:foneFixo,
             qtdEntregasRealizadas: qtdEntregasRealizadas,
             valorFrete: valorFrete,
             enderecoRua: enderecoRua,
             enderecoComplemento: enderecoComplemento,
             enderecoNumero: enderecoNumero,
             enderecoBairro: enderecoBairro,
             enderecoCidade: enderecoCidade,
             enderecoCep: enderecoCep,
             enderecoUf: enderecoUf,
             ativo: ativo
		}
	  console.log("Dados enviados:", entregadorRequest);

         if (idEntregador != null) { //Alteração:
           axios.put("http://localhost:8080/api/entregador/" + idEntregador, entregadorRequest)
           .then((response) => {
            // console.log('Entregador alterado com sucesso.') })
                notifySuccess('Entregador alterado com sucesso.')
})
           .catch((error) => { 
           // console.log('Erro ao alterar um entregador.') })
           if (error.response.data.errors !== undefined) {
       		for (let i = 0; i < error.response.data.errors.length; i++) {
	       		notifyError(error.response.data.errors[i].defaultMessage)
	    	}
	} else {
		notifyError(error.response.data.message)
	}
})
      } else { //Cadastro:

            axios.post("http://localhost:8080/api/entregador", entregadorRequest)
            .then((response) => { 
                notifySuccess('Entregador cadastrado com sucesso.')
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

    const estados = [
  { key: "ac", value: "AC", text: "Acre" },
  { key: "al", value: "AL", text: "Alagoas" },
  { key: "ap", value: "AP", text: "Amapá" },
  { key: "am", value: "AM", text: "Amazonas" },
  { key: "ba", value: "BA", text: "Bahia" },
  { key: "ce", value: "CE", text: "Ceará" },
  { key: "df", value: "DF", text: "Distrito Federal" },
  { key: "es", value: "ES", text: "Espírito Santo" },
  { key: "go", value: "GO", text: "Goiás" },
  { key: "ma", value: "MA", text: "Maranhão" },
  { key: "mt", value: "MT", text: "Mato Grosso" },
  { key: "ms", value: "MS", text: "Mato Grosso do Sul" },
  { key: "mg", value: "MG", text: "Minas Gerais" },
  { key: "pa", value: "PA", text: "Pará" },
  { key: "pb", value: "PB", text: "Paraíba" },
  { key: "pr", value: "PR", text: "Paraná" },
  { key: "pe", value: "PE", text: "Pernambuco" },
  { key: "pi", value: "PI", text: "Piauí" },
  { key: "rj", value: "RJ", text: "Rio de Janeiro" },
  { key: "rn", value: "RN", text: "Rio Grande do Norte" },
  { key: "rs", value: "RS", text: "Rio Grande do Sul" },
  { key: "ro", value: "RO", text: "Rondônia" },
  { key: "rr", value: "RR", text: "Roraima" },
  { key: "sc", value: "SC", text: "Santa Catarina" },
  { key: "sp", value: "SP", text: "São Paulo" },
  { key: "se", value: "SE", text: "Sergipe" },
  { key: "to", value: "TO", text: "Tocantins" },
];


    return(
        <div>

             <MenuSistema tela={'entregador'} />
             
            <div style={{marginTop:'3%'}}>
                <Container textAlign='justified' >

{ idEntregador === undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
}
{ idEntregador !== undefined &&
    <h2> <span style={{color: 'darkgray'}}> Entregador &nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
}

<Divider />

                <div style={{marginTop:'4%'}}>

                    
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
                                    mask="999.999.999-99"
                                    value={cpf}
			                        onChange={e => setCpf(e.target.value)}
                                    /> 
                            </Form.Input>

                           <Form.Input
                            required
                            fluid
                            label='RG'>
                                <InputMask
                                    required
                                    mask="99.999.999-9"
                                    value={rg}
                                    onChange={e => setRg(e.target.value)}
                                    /> 
                            </Form.Input>

                        </Form.Group>

                        <Form.Group>
                          <Form.Input
                           fluid
                           label='DT Nascimento'
                           width={6}
                           >
                            <InputMask 
                             mask="99/99/9999"
                             maskChar={null}
                             placeholder='Ex: 20/06/2006'
                             value={dataNascimento}
                             onChange={e => setDataNascimento(e.target.value)}
                             /> 
                            </Form.Input>

                          <Form.Input
                            fluid
                            label='Fone Celular'
                            width={6}>
                            <InputMask 
                             mask="(99) 9999.9999"
                             value={foneCelular}
                             onChange={e => setFoneCelular(e.target.value)}
                             /> 
                            </Form.Input>

                            <Form.Input
                            fluid
                            label='Fone Fixo'
                            width={6}>
                             <InputMask 
                              mask="(99) 9999.9999"
                              value={foneFixo}
                              onChange={e => setFoneFixo(e.target.value)}
                              /> 
                            </Form.Input>

                             <Form.Input
                             fluid
                             label='QNTD Entregs Realizadas'
                             width={6}
                             value={qtdEntregasRealizadas}
                             onChange={e => setQtdEntregasRealizadas(e.target.value)}
                             />
                        
                             <Form.Input
                             fluid
                             label='Valor por frete'
                             width={6}
                             >
                            <InputMask 
                            mask="99.99"
                            value={valorFrete}
                            onChange={e => setValorFrete(e.target.value)}
                            /> 
                            </Form.Input>
                        </Form.Group>

                        <Form.Group>
                            <Form.Input
                            required
                            fluid
                            label='Rua'
                            width={6}
                            value={enderecoRua}
                            onChange={e => setEnderecoRua(e.target.value)}
                           />

                            <Form.Input
                            fluid
                            label='Número'
                            width={6}
                           >
                                <InputMask 
                                mask="999" 
                                value={enderecoNumero}
                                onChange={e => setEnderecoNumero(e.target.value)}
                            /> 
                            </Form.Input>
                        </Form.Group>

                        <Form.Group>
                            <Form.Input
                            required
                            fluid
                            label='Bairro'
                            width={6}
                            value={enderecoBairro}
                            onChange={e => setEnderecoBairro(e.target.value)}
                           /> 

                            <Form.Input
                            fluid
                            label='Cidade'
                            width={6}
                            value={enderecoCidade}
                            onChange={e => setEnderecoCidade(e.target.value)}
                           />

                            <Form.Input
                            fluid
                            label='CEP'
                            width={6}>
                             <InputMask 
                              mask="99-999-999" 
                              value={enderecoCep}
                              onChange={e => setEnderecoCep(e.target.value)}
                            /> 
                            </Form.Input>
                        </Form.Group>

                        <Form.Group widths="equal">
                            <Form.Select
                                fluid
                                label="UF"
                                options={estados}
                                placeholder="Selecione o estado"
                                value={enderecoUf}
                                onChange={(_, data) => setEnderecoUf(data.value)}
                                />

                            </Form.Group>
                            
                          <Form.Group>
                            <Form.Input
                            //required
                            fluid
                            label='Complemento'
                            width={6}
                            onChange={e => setEnderecoComplemento(e.target.value)}
                           >

                            </Form.Input>
                            
                        </Form.Group>

                        <Form.Group>
                            <label>Ativo</label>
                              
                           <Form.Radio
                            label="Sim"
                            name="ativo"
                            value={true}
                            checked={ativo === true}
                            onChange={() => setAtivo(true)}
                            />
                          <Form.Radio
                            label="Não"
                            name="ativo"
                            value={false}
                            checked={ativo === false}
                            onChange={() => setAtivo(false)}
                            />

                             
                        </Form.Group>
                   </Form>
                   <div style={{marginTop: '4%'}}>

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
                                <Icon name='save' 
                                />
                                Salvar
                            </Button>

                        </div>

                    </div>

            </Container>

            </div>
        </div>

    );

}