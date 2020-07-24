import React from 'react';
import {connect} from 'react-redux';
import {getBrands} from '../actions/productActions'
import { Grid, Segment, Header, Table, Button, Form } from 'semantic-ui-react';
import Navbar from '../components/Navbar';
import CreateBrandComponent from './components/CreateBrandComponent';
import  BrandEditView from './components/BrandEditView'

class BrandView extends React.Component{
    constructor(props){
        super(props);
        this.handleCreateView = this.handleCreateView.bind(this);
        this.handleEditButton = this.handleEditButton.bind(this);
        this.closeCreateBrand = this.closeCreateBrand.bind(this);
        this.handleEditView   = this.handleEditButton.bind(this);
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

    closeEditBrandModal = () =>{this.setState({editBrandView: false, createBrandView: false})}

    closeCreateBrand(){this.setState({createBrandView: false, editBrandView: false})}

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
                                <Header content='Brands' />
                                <CreateBrandComponent closeWindow={this.handleEditButton} /> 
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
                                                    <Table.Cell>{brand.name}</Table.Cell>
                                                    <Table.Cell>{brand.active ? 'Active': 'Inactive'}</Table.Cell>
                                                    <Table.Cell><Button onClick={()=> this.handleEditButton(brand.id)} /> </Table.Cell>
                                                </Table.Row>
                                            )
                                        })}
                                    </Table.Body>
                                </Table>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            {editBrandView ? <BrandEditView id={edit_id} closeWindow={this.closeEditBrandModal} /> : null}
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