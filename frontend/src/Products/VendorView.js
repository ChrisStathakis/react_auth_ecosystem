import React from 'react';
import {connect} from 'react-redux';
improt {Grid, Button } from 'semantic-ui-react';

import {getVendors} from  '../actions/productActions'
import { BASE_URL } from '../components/endpoints';
import axiosInstance from '../components/helpers';
import { Grid, Table, Button, Header, Form } from 'semantic-ui-react';


class VendorView extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            createView: true,
            editView: false,
            title: '',
            afm: '',
            active: true,
            balance: 0

        }
    }

    handleDelete(id){
        const endpoint = BASE_URL
        axiosInstance.delete(endpoint)
            .then(
                respData=>{
                    this.props.getVendors
                }
            )
    }

    handleCheckPoint = (e, data) => {
        const name = data.name;
        const value = data.value;
        this.setState({
            [name]: value
        })
    };

    handleEditButton(id){
        this.setState({
            edit_id: id,
            createView: false,
            editView: true
        })
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }




    componentDidMount(){
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        this.props.getVendors()
    }

    render(){
        const {vendors, editView, createView, edit_id} = this.props;
        const {createView, title, active, balance, } = this.props;

        return(
            <Grid divided textAlign='center'>
                <Grid.Row>
                    <Grid.Column width={10}>

                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Vendor</Table.HeaderCell>
                                <Table.HeaderCell>Taxes ID</Table.HeaderCell>
                                <Table.HeaderCell>--</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {vendors.map((pr, index)=>{
                                return (
                                    <Table.Row>
                                        <Table.Cell>{pr.id}</Table.Cell>
                                        <Table.Cell>{pr.title}</Table.Cell>
                                        <Table.Cell>{pr.afm}</Table.Cell>
                                        <Table.Cell>{}</Table.Cell>
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
                    </Grid.Column>
                    <Grid.Column width={6}>
                        {createView ?
                        <Header content='Create Product' />
                        <Form>
                            <Form.Checkbox
                                label='Active'
                                name='active'
                                value={active}
                                onChange={this.handleCheckPoint}
                                />
                            <Form.Field>
                                <label>Title</label>
                                <input onChange={this.handleChange} value={title} name='title' />
                            </Form.Field>

                        </Form> : null}
                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
};



const mapStateToProps = state => ({
    vendors: state.productReducer.vendors
})



export default connect(mapStateToProps, {getVendors})(VendorView)