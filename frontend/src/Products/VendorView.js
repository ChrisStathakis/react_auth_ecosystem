import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Grid, Table, Header, Form, Button, Responsive, Segment, Icon, Modal, Radio } from 'semantic-ui-react';
import {getVendors} from  '../actions/productActions'
import {BASE_URL, VENDORS_LIST_ENDPOINT} from '../components/endpoints';
import axiosInstance from '../components/helpers';
import { useHistory, withRouter } from 'react-router-dom';

import Navbar from '../components/Navbar';
import VendorEditView from './components/VendorEditView';



const getWidth = () =>{
    const isSSR = typeof window === 'undefined';
    return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
};


class VendorView extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateVendor = this.handleCreateVendor.bind(this);
        this.handleNewButton = this.handleNewButton.bind(this);
        this.showCreateView = this.showCreateView.bind(this);
        this.showListView = this.showListView.bind(this);
        this.clearForm = this.clearForm.bind(this);

        this.state = {
            createView: false,
            editView: false,
            listView:true,
            edit_id: null,
            title: '',
            afm: '',
            active: true,
            balance: 0,
            doy:'',
            phone:'',
            phone1: '',
            fax:'',
            email:'',
            site: '',
            address: '',
            description: '',
            activeFilter: true,
            filterModal: false,
            searchFilter:''

        }
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
            editView: true,
            listView: false
        })
    }

    showCreateView(){
        this.setState({
            createView:true,
            listView: false,
            editView: false
        })
    }

    showListView(){
        this.setState({
            createView: false,
            listView: true,
            editView: false
        })
    }

    handleNewButton(){
        this.setState({
            edit_id: null,
            createView: true,
            editView: false
        })
    }

    clearForm(){
        this.setState({
            title: '',
            afm: '',
            active: true,
            balance: 0,
            doy:'',
            phone:'',
            phone1: '',
            fax:'',
            email:'',
            site: '',
            address: '',
            description: ''
        })
    }

    handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    handleFilters = () => {
        this.handleFilterModal();
        const filters = {
            active: this.state.activeFilter,
            search: this.state.searchFilter
        };
        this.props.getVendors(filters)
    };

    clearFilters = () => {
        this.setState({
            activeFilter: null,
            searchFilter: ''
        })
        this.props.getVendors();
        this.handleFilterModal();
    };

    goToCardView(id){
        this.props.history.push(`/vendors/${id}`)
    };


    handleCreateVendor(event){
        event.preventDefault();
        const data = this.state;
        axiosInstance.post(VENDORS_LIST_ENDPOINT, data)
            .then(
                respData=>{
                    const status = respData.status;
                    console.log('status'. status);
                    if( status === 201){
                        console.log('vendor created!');
                        this.clearForm();
                        this.props.getVendors();
                        this.showListView()
                    }
                }
            )
    }

    handleFilterModal = () => {
        this.setState({
            filterModal: !this.state.filterModal
        })
    }

    componentDidMount(){
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        this.props.getVendors()
    }

    render(){
        const {vendors} = this.props;
        const {createView, title, active, editView,
            listView, edit_id, email, site, phone,
            phone1, description, afm, fax, doy, address, activeFilter, searchFilter,
            filterModal
        } = this.state;

        return(
            <Responsive width={getWidth}>
                <Navbar />
                <Grid divided textAlign='center' style={segmentStyle}>
                    <Grid.Row>
                    <Grid.Column width={16}>
                        {listView ?
                            <Segment>
                                <Header content='Vendors' />
                                <Button color='green' content='Create Vendor' onClick={this.showCreateView}/>
                                <Modal 
                                    trigger={<Button onClick={this.handleFilterModal}>Filters</Button>}
                                    open={filterModal}
                                    onClose={this.handleFilterModal} 
                                    >
                                    <Modal.Header>Filters</Modal.Header>
                                    <Modal.Content>
                                        <Form>
                                            <Form.Input onChange={this.handleChange} label='Search' name='searchFilter' value={searchFilter} />
                                            <Form.Field>
                                                Active <b>{this.state.value}</b>
                                            </Form.Field>
                                            <Form.Field>
                                                <Radio
                                                    label='Active Vendors'
                                                    name='activeFilter'
                                                    value='true'
                                                    checked={this.state.activeFilter === 'true'}
                                                    onChange={this.handleCheckPoint}
                                                />
                                            </Form.Field>
                                            <Form.Field>
                                              <Radio
                                                label='Disable Vendors'
                                                name='activeFilter'
                                                value='false'
                                                checked={this.state.activeFilter === 'false'}
                                                onChange={this.handleCheckPoint}
                                              />
                                            </Form.Field>
                                            <Button icon='search' content='Search' onClick={this.handleFilters}/>
                                            <Button icon='remove' content='Clear Filters' onClick={this.clearFilters} warning />
                                        </Form>
                                    </Modal.Content>
                                </Modal>
                                <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Vendor</Table.HeaderCell>
                                        <Table.HeaderCell>Taxes ID</Table.HeaderCell>
                                        <Table.HeaderCell>Phone 1</Table.HeaderCell>
                                        <Table.HeaderCell>Phone 2</Table.HeaderCell>
                                        <Table.HeaderCell>Balance</Table.HeaderCell>
                                        <Table.HeaderCell>Status</Table.HeaderCell>
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
                                                <Table.Cell>{pr.phone}</Table.Cell>
                                                <Table.Cell>{pr.phone1}</Table.Cell>
                                                <Table.Cell>{pr.tag_balance}</Table.Cell>
                                                <Table.Cell>{pr.active ? <Icon name='check' color='green' />: <Icon name='check' color='red' />}</Table.Cell>

                                                <Table.Cell>
                                                       <Button.Group>
                                                           <Button onClick={() => this.goToCardView(pr.id)}  color='green' icon='remove'>Card</Button>
                                                           <Button.Or />
                                                           <Button onClick={()=> this.handleEditButton(pr.id)} primary icon='edit'>Edit </Button>
                                                       </Button.Group>
                                                   </Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>
                                </Table>
                            </Segment>
                            : null}
                    </Grid.Column>
                        {createView ?
                            <Grid.Column width={16}>
                                <Segment>
                                    <Header content='Create Vendor' />
                                    <Button icon='remove' onClick={this.showListView} color='red'/>
                                    <Form>
                                        <Form.Checkbox
                                            label='Active'
                                            name='active'
                                            value={active}
                                            onChange={this.handleCheckPoint}
                                        />
                                        <Form.Group widths='equal'>
                                            <Form.Input label='title' onChange={this.handleChange} name='title' value={title} />
                                            <Form.Input label='Taxes ID' onChange={this.handleChange} name='afm' value={afm} />
                                            <Form.Input label='doy' onChange={this.handleChange} name='doy' value={doy} />
                                        </Form.Group>
                                        <Form.Group widths='equal'>
                                            <Form.Input label='Phone' onChange={this.handleChange} name='phone' value={phone} />
                                            <Form.Input label='Second Phone' onChange={this.handleChange} name='phone1' value={phone1} />
                                            <Form.Input label='fax' onChange={this.handleChange} name='fax' value={fax} />
                                        </Form.Group><Form.Group widths='equal'>
                                            <Form.Input label='Email' onChange={this.handleChange} name='email' value={email} />
                                            <Form.Input label='Website' onChange={this.handleChange} name='site' value={site} />
                                            <Form.Input label='Address' onChange={this.handleChange} name='address' value={address} />
                                        </Form.Group>
                                        <Form.Input label='Description' onChange={this.handleChange} name='description' value={description} />
                                        <Button onClick={this.handleCreateVendor} icon='save' content='Save' />
                                    </Form>
                                </Segment>
                            </Grid.Column>
                            : null
                        }

                        {editView ?
                            <div>
                            <VendorEditView id={edit_id} handleNewView={this.handleNewButton} />
                                <Button onClick={this.handleNewButton} content='Create view'/>
                            </div>
                        : null
                        }
                </Grid.Row>
            </Grid>
            </Responsive>
        )
    }
}


const segmentStyle = {
    marginTop: '7%',
};



const mapStateToProps = state => ({
    vendors: state.productReducer.vendors
});



export default compose(
    withRouter,
    connect(mapStateToProps, {getVendors})
)(VendorView);