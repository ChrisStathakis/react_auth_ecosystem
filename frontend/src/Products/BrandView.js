import React from 'react';
import {connect} from 'react-redux';
import {getBrands} from '../actions/productActions'
import { Grid, Segment, Header, Table, Button, Form } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import CreateBrandComponent from './components/CreateBrandComponent';


class BrandView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            brands: [],
            createBrandView: true,
            editBrandView: false,
        }

    }

    handleCreateView(){
        this.setState({
            createBrandView: true,
            editBrandView: false
        })
    }

    handleEditView(){
        this.setState({
            createBrandView: false,
            editBrandView: true
        })
    }

    handleEditButton(id){
        this.setState({
            editBrandView: true,
            createBrandView: false,
            edit_id:id
        })
    }

    componentDidMount(){
        this.props.getBrands()
    }

    render(){
        const {brands} = this.props;
        const {createBrandView, editBrandView, edit_id} = this.state;
        return (
            <div>
                <Navbar />
                <Grid divided textAlign='center'>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <Segment>
                                <Header content='Product Class' />
                                {createBrandView ? <CreateBrandComponent /> : null}
                                <Table>
                                    <Table.Header>
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Title</Table.HeaderCell>
                                        <Table.HeaderCell>Active</Table.HeaderCell>
                                        <Table.HeaderCell>-</Table.HeaderCell>
                                    </Table.Header>
                                    <Table.Body>
                                        {brands.map((brand, index)=>{
                                            return (
                                                <Table.Row>
                                                    <Table.Cell>{brand.id}</Table.Cell>
                                                    <Table.Cell>{brand.title}</Table.Cell>
                                                    <Table.Cell>{brand.id}</Table.Cell>
                                                    <Table.Cell><Button onClick={()=> this.handleEditButton(brand.id)} /> </Table.Cell>
                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            
                            {editBrandView ? <p>edit view</p> : null}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}




const mapStateToProps = state => ({
    brands: state.productReducer.brands,

})

export default connect(mapStateToProps, {getBrands})(BrandView);