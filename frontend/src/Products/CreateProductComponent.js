import React from 'react';
import {connect} from 'react-redux';
import Navbar from '../components/Navbar';
import axiosInstance from '../components/helpers';
import {VENDORS_LIST_ENDPOINT, BRANDS_LIST_ENDPOINT, CREATE_PRODUCT_ENDPOINT} from '../components/endpoints';
import {getProducts, getVendors, getBrands} from "../actions/productActions";
import { Grid, Segment, Form } from 'semantic-ui-react';
import productReducer from "../reducers/productReducers";



class CreateProductView extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title: '',
            sku: '',
            status: '',
            vendor: '',
            brand: '',
            qty:0,
            value:0

        }
    }

    handleChange(event){
        event.preventDefault();
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    handleDropdown = (e, data)=>{
        const name = data.name;
        const value = data.value;
        console.log('hitted', name, value);
        this.setState({
            [name]: value
        })
   };


    handleSubmit(event){
        event.preventDefault();
        this.createProduct();
    }


    createProduct(){
        const data = this.state;
        console.log('submit data', data)
        axiosInstance.post(CREATE_PRODUCT_ENDPOINT, data)
            .then(respData=>{
                console.log('result', respData);
                this.props.getProducts()
            })
    }

    componentDidMount(){
        this.props.getBrands();
        this.props.getVendors();
    };

    render(){
        const {vendors, brands} = this.props;
        const {status, title, sku, qty} = this.state;
        let optionsVendor = [];
        let optionsBrand = [];
        if (vendors !== undefined){
            optionsVendor = vendors.map((vendor, index)=>{
                return ({key: vendor.id, text: vendor.title, value:vendor.id})
            })
        }
        if (brands !== undefined){
            optionsBrand = brands.map((brand, index)=>{
                return ({key: brand.id, text:brand.name, value:brand.id})
            })
        }

        return (
            <div>
                <Grid.Column>
                    <Segment>
                        <Form>
                            <Form.Checkbox label='Status' onChange={this.handleChange} name={status} value={sku} />
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Sku' placeholder='Sku' name='sku' onChange={this.handleChange} />
                                <Form.Input fluid name='title' label='Τιτλος' onChange={this.handleChange}  value={title} placeholder='Τιτλος' />
                                <Form.Select
                                    fluid
                                    label='Gender'
                                    options={optionsVendor}
                                    placeholder='Choose'
                                    name='vendor'
                                    onChange={this.handleDropdown}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Select
                                    fluid
                                    label='Brands'
                                    options={optionsBrand}
                                    placeholder='Brands'
                                    name='brand'
                                    onChange={this.handleDropdown}
                                />
                                <Form.Input fluid label='Value' placeholder='0' name='value' onChange={this.handleChange} />
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

const mapStateToProps = state => ({
    brands: state.productReducer.brands,
    vendors: state.productReducer.vendors
});

export default connect(mapStateToProps, {getProducts, getVendors, getBrands})(CreateProductView);