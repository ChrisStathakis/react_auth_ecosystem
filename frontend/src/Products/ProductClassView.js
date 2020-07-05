import React from 'react';
import {connect} from 'react-redux';
import {Grid, Header, Form, Table, Segment, Button} from 'semantic-ui-react';

import {getProductClass} from '../actions/productActions'
import Navbar from '../components/Navbar';
import axiosInstance from "../components/helpers";
import {PRODUCT_CLASS_LIST_ENDPOINT} from "../components/endpoints";
import ProductClassEditView from "./components/ProductClassEditView";



class ProductClassView extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateProduct = this.handleCreateProduct.bind(this);
        this.state = {
            title: '',
            is_service: false,
            have_warehouse: false,
            edit_id: null

        }

    }

    handleDelete(id){
        const endpoint = PRODUCT_CLASS_LIST_ENDPOINT + id + '/';
        axiosInstance.delete(endpoint)
            .then(
                respData=>{
                    this.props.getProductClass()
                }
            )
    }

    handleCheckPoint = (e, data)=>{
        const name = data.name;
        const value = data.value;
        this.setState({
            [name]: value
        })
    };

    handleEditButton(id){
        this.setState({
            edit_id: id
        })
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };

    handleCreateProduct(evt){
        evt.preventDefault();
        const data = this.state;
        axiosInstance.post(PRODUCT_CLASS_LIST_ENDPOINT, data)
            .then(
                respData=>{
                    console.log(respData);
                    this.props.getProductClass();
                }
            )
    }


    componentDidMount(){
        const isAuthenticated = localStorage.getItem('isAuthenticated')
        this.props.getProductClass();
    }


    render(){
        const {productClass} = this.props;
        const {title, is_service, have_warehouse, edit_id } = this.state;
        return (
            <div>
            <Navbar />
            <Grid divided textAlign='center'>
                <Grid.Row>
                    <Grid.Column width={10}>
                       <Table celled>
                           <Table.Header>
                               <Table.Row>
                                   <Table.HeaderCell>ID</Table.HeaderCell>
                                   <Table.HeaderCell>Title</Table.HeaderCell>
                                   <Table.HeaderCell>Support Transcations</Table.HeaderCell>
                                   <Table.HeaderCell>Is Service</Table.HeaderCell>
                                   <Table.HeaderCell>-</Table.HeaderCell>
                               </Table.Row>
                           </Table.Header>
                           <Table.Body>
                               {productClass.map((pr, index)=>{
                                   return (
                                       <Table.Row>
                                           <Table.Cell>{pr.id}</Table.Cell>
                                           <Table.Cell>{pr.title}</Table.Cell>
                                           <Table.Cell>{pr.have_warehouse ? 'True' : 'False'}</Table.Cell>
                                           <Table.Cell>{pr.is_service ? 'True': 'False'}</Table.Cell>
                                           <Table.Cell>
                                               <Button.Group>
                                                   <Button onClick={()=> this.handleDelete(pr.id)} color='red' icon='remove'>Delete</Button>
                                                   <Button.Or />
                                                   <Button onClick={()=> this.handleEditButton(pr.id)} primary icon='edit'>Edit </Button>
                                               </Button.Group>
                                           </Table.Cell>
                                       </Table.Row>
                                   )
                               })}

                           </Table.Body>
                       </Table>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {edit_id ? <ProductClassEditView id={edit_id}/> : null}
                        <Segment>
                            <Header content='New Class'/>
                            <Form>
                                <Form.Field>
                                    <label>Title</label>
                                    <input onChange={this.handleChange} placeholder='...' name='title' value={title} />
                                </Form.Field>
                                <Form.Checkbox
                                    label='Is Service'
                                    name='is_service'
                                    value={is_service}
                                    onChange={this.handleCheckPoint}
                                />
                                <Form.Checkbox
                                    label='Have Warehouse'
                                    name='have_warehouse'
                                    value={have_warehouse}
                                    onChange={this.handleCheckPoint}
                                />
                                <Button onClick={this.handleCreateProduct} primary icon='save' content='Save' />
                            </Form>
                        </Segment>
                    </Grid.Column>

                </Grid.Row>

            </Grid>
            </div>
        )
    }

}

const mapStateToProps = state =>({
    productClass: state.productReducer.productClass
});

export default connect(mapStateToProps, {getProductClass})(ProductClassView)