import React from 'react';
import { withRouter } from "react-router-dom";
import {Container, Segment, Grid, Header, Table, Rating} from 'semantic-ui-react';

import Navbar from '../components/Navbar'
import axiosInstance from "../components/helpers";
import { PRODUCTS_ENDPOINT} from "../components/endpoints";
import TableRow from './components/TableRow';
import CreateProductView from'./CreateProductView'


class ProductHomepage extends React.Component{

    constructor(props){
        super(props);
            this.addNewProductView = this.addNewProductView.bind(this);
            this.state = {
                products: [],
                loadProduct: false,
                newProductPage: false
            }
        }


    async getProducts(){
        try{
            let response = await axiosInstance.get(PRODUCTS_ENDPOINT);
            const products = response.data;
            this.setState({
                products: products,
                loadProduct: true
            })
        } catch(error){
            console.log('Error=>' + JSON.stringify(error, null, 4))
        }
        
    }

    addNewProductView(){
        this.setState({
            newProductPage: !this.state.newProductPage
        })
    }

    componentDidMount(){
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (!isAuthenticated){
            return this.props.history.push('/login/')
        }
        this.getProducts();
    }

    render(){
        const {products, newProductPage} = this.state;
        return (
            <div>
                <Navbar />
                <Header as='h3' content='Products' textAlign='center' style={style.h3} />
                <Grid columns={1} stackable>
                <Grid.Column>
                    <Segment>
                    <button onClick={this.addNewProductView} class="ui positive basic button">
                        <i class="icon plus square"></i>
                        Add
                    </button>
                    {newProductPage ? <CreateProductView /> : null}
                    <Table celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>ID/Sku</Table.HeaderCell>
                                <Table.HeaderCell>Ττιλος</Table.HeaderCell>
                                <Table.HeaderCell>Προμηθευτηε</Table.HeaderCell>
                                <Table.HeaderCell>Εταιρια</Table.HeaderCell>
                                <Table.HeaderCell>Ποσοτητα</Table.HeaderCell>
                                <Table.HeaderCell>Αξια</Table.HeaderCell>
                                <Table.HeaderCell>Κατασταση</Table.HeaderCell>
                                <Table.HeaderCell>-</Table.HeaderCell>
                                
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {products.map((product, index)=>{
                            return <TableRow product={product} key={index} />
                        })}
                        </Table.Body>
                    </Table>
                    </Segment>
                </Grid.Column>
                
                <Grid.Column>
                    <Segment>Content</Segment>
                </Grid.Column>
                <Grid.Row columns={3}>
                    <Grid.Column>
                    <Segment>Content</Segment>
                    </Grid.Column>
                    <Grid.Column>
                    <Segment>Content</Segment>
                    </Grid.Column>
                    <Grid.Column>
                    <Segment>Content</Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Column width={10}>
                    <Segment>Content</Segment>
                </Grid.Column>
                <Grid.Column width={6}>
                    <Segment>Content</Segment>
                </Grid.Column>
                </Grid>
                <Container>
                <Segment.Group>
                    <Segment>Content</Segment>
                    <Segment>Content</Segment>
                    <Segment>Content</Segment>
                    <Segment>Content</Segment>
                </Segment.Group>
                </Container>
                
                
            </div>
        )
    }

}


const style = {
    h1: {
      marginTop: '3em',
    },
    h2: {
      margin: '4em 0em 2em',
    },
    h3: {
      marginTop: '2em',
      padding: '2em 0em',
    },
    last: {
      marginBottom: '300px',
    },
  }

export default withRouter(ProductHomepage);