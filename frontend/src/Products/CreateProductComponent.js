import React from 'react';
import Navbar from '../components/Navbar';
import axiosInstance from '../components/helpers';
import { VENDORS_LIST_ENDPOINT, BRANDS_LIST_ENDPOINT } from '../components/endpoints';
import { Grid, Segment, Form, Button } from 'semantic-ui-react';



class CreateProductView extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            vendors: [],
            brands: [],
            
            title: '',
            sku: '',
            status: '',
            vendor: '',
            brand: '',
            qty:0

        }
    }

    handleChange(event){
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleSubmit(event){
        event.preventDefault();
        console.log( this.state)
    }

    getVendors(){
        axiosInstance.get(VENDORS_LIST_ENDPOINT)
            .then(respData=>{
                this.setState({
                    vendors: respData.data
                })
            })
    };

    getBrands(){
        axiosInstance.get(BRANDS_LIST_ENDPOINT)
            .then(respData=>{
                this.setState({
                    brands: respData.data
                })
            })
    }

    createProduct(){
        const data = this.state;
        
    }

    componentDidMount(){
        this.getBrands();
        this.getVendors();
    };

    render(){
        const {vendors, brands, status, vendor, title, sku, qty} = this.state;
        let optionsVendor = [];
        let optionsBrand = [];
        if (vendors.length > 0){
            optionsVendor = vendors.map((vendor, index)=>{
                return ({key: vendor.id, text: vendor.title, value:vendor.id})
            })
        }
        if (brands.length){
            optionsBrand = brands.map((brand, index)=>{
                return ({key: brand.id, text:vendor.title, value:vendor.id})
            })
        }

        return (
            <div>
                <Navbar />
                <Grid.Column>
                    <Segment>
                        <Form>
                            <Form.Checkbox label='Status' onChange={this.handleChange} value={status} value={sku} />
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Sku' placeholder='Sku' name='sku' onChange={this.handleChange} />
                                <Form.Input fluid name='title' label='Τιτλος' onChange={this.handleChange}  value={title} placeholder='Τιτλος' />
                                <Form.Select
                                    fluid
                                    label='Gender'
                                    options={optionsVendor}
                                    placeholder='Choose'
                                    name='vendor'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Select
                                    fluid
                                    label='Brands'
                                    options={optionsBrand}
                                    placeholder='Brands'
                                    name='brand'
                                    onChange={this.handleChange}
                                />
                                <Form.Input fluid label='Qty' placeholder='Qty' value={qty} name='qty' />
                            </Form.Group>
                            <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </div>
        )
    }


}



export default CreateProductView;