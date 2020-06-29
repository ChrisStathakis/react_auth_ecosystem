import React from 'react';
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import {Container, Segment, Grid, Header, Table} from 'semantic-ui-react';
import {getProducts, getBrands, getVendors} from "../actions/productActions";
import Navbar from '../components/Navbar'

import TableRow from './components/TableRow';
import CreateProductView from'./CreateProductComponent'
import CreateBrandComponent from "./components/CreateBrandComponent";


class ProductHomepage extends React.Component{

    constructor(props){
        super(props);
        this.addNewProductView = this.addNewProductView.bind(this);
        this.state = {
            loadProduct: false,
            newProductPage: false
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
        this.props.getProducts();
        this.props.getBrands();
        this.props.getVendors();
    }

    render(){
        const {products} = this.props;
        const {newProductPage} = this.state;
        return (
            <div>
                <Navbar />
                <Header as='h3' content='Products' textAlign='center' style={style.h3} />
                <Grid columns={1} stackable>
                    <Grid.Column>
                        <Segment>
                            <button onClick={this.addNewProductView} className="ui positive basic button">
                                <i class="icon plus square"></i>Add
                            </button>

                            <CreateBrandComponent />
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

ProductHomepage.propTypes = {
    products: PropTypes.array.isRequired,
    brands: PropTypes.array.isRequired,
    vendors: PropTypes.array.isRequired,


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
  };


const mapStateToProps = state=> ({
  products: state.productReducer.products
});


export default withRouter(
    connect(mapStateToProps, {getProducts, getBrands, getVendors})(ProductHomepage)
)