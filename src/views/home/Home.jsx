import { Container, Grid, Image } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
export default function Home () {

   return(
       <div>

<MenuSistema tela={'home'} /> 

           <div style={{marginTop: '5%'}}>
               <Container>
                   <Grid columns={2} divided>
                       <Grid.Row>
                           <Grid.Column>
                               <Image src='/logo-IFPE.png' size='large' />
                           </Grid.Column>
                           <Grid.Column>
                              
                                <strong>OxeFood</strong> ! <br/>
                              
                           </Grid.Column>
                       </Grid.Row>
                   </Grid>
               </Container>
           </div>
       </div>
   )
}

