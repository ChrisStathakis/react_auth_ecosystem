import React from 'react';
import {connect} from 'react-redux';
import { VENDORS_LIST_ENDPOINT } from '../../components/endpoints';
import axiosInstance from '../../components/helpers';
import { Segment, Header, Form, Button, Grid } from 'semantic-ui-react';

import {getVendors} from "../../actions/productActions";


class VendorEditView extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
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
        }
    }

    handleCheckBox = (e, data )=> {
        const name = data.name;
        const value = data.checked;
        this.setState({
            [name]: value
        })
    };

    handleChange(evt){
        const name = evt.target.name;
        const value = evt.target.value;

        this.setState({
            [name]: value
        })
    };

    handleSubmit(event){
        event.preventDefault();
        const {id} = this.props;
        const endpoint = VENDORS_LIST_ENDPOINT + id + '/';
        const data = this.state;
        axiosInstance.put(endpoint, data)
            .then(respData=>{
                this.props.getVendors();
                if (respData.status === 200){
                    this.props.handleNewView()
                }
            })
    };

    getVendor(id){
        const endpoint = VENDORS_LIST_ENDPOINT + id + '/';
        axiosInstance.get(endpoint).then(
            respData=>{
                const vendor = respData.data;
                this.setState({
                    title: vendor.title,
                    active: vendor.active,
                    afm: vendor.afm,
                    balance: vendor.balance,
                    doy: vendor.doy,
                    phone: vendor.phone,
                    phone1: vendor.phone1,
                    fax: vendor.fax,
                    email: vendor.email,
                    site: vendor.site,
                    address: vendor.address,
                    description: vendor.description
                })
            }
        )
    }

    componentDidMount(){
        const {id} = this.props;
        this.getVendor(id);
    }

    render(){
        const {title, active, edit_id, email, site, phone,
            phone1, description, afm, fax, doy, address} = this.state;
        console.log(title, active);
        return (
            <Grid>
                <Grid.Column width={6}>
                </Grid.Column>
                <Grid.Column width={10}>
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

            </Grid>

        )
    }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {getVendors})(VendorEditView)