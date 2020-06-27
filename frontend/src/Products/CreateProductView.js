import React from 'react';
import Navbar from '../components/Navbar';
import { Grid, Segment, Form } from 'semantic-ui-react';
import axiosInstance from "../components/helpers";
import {BASE_URL, BRANDS_LIST_ENDPOINT, VENDORS_LIST_ENDPOINT, CREATE_PRODUCT_ENDPOINT} from "../components/endpoints";



class CreateProductView extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            vendors:[],
            brands:[],
            value: 1,
            vendorOptions: [],
            brandOptions: [],

            title: '',
            sku:'',
            status: true
            
        }
    }

    handleChange(evt){
        console.log('mi oyu ff');
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };

    handleSubmit = (evt) =>{
        evt.preventDefault();
        console.log(this.state);
        axiosInstance.post(CREATE_PRODUCT_ENDPOINT, this.state)
            .then(respData=>{
                console.log('after creagte', respData)
            })
    };

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

    componentDidMount(){
        this.getVendors();
        this.getBrands();
    }



    render() {
        const {vendors, brands} = this.state;
        let optionsVendors = [];
        let optionsBrands = [];
        const { status, title, sku } = thi';s.state;
        if(vendors.length>0){
             optionsVendors = vendors.map((vendor, index)=>{
                 return({key: vendor.id, text:vendor.title, value:vendor.id})
        });
            if(brands.length>0){
             optionsBrands = brands.map((vendor, index)=>{
                 return({key: vendor.id, text:vendor.title, value:vendor.id})
        })
        }

        return(
            <div>
                <Navbar />
                <Grid columns={1} stackable>
                    <Grid.Column>
                        <Segment>
                        <Form>
                            <Form.Checkbox label='Status' onChange={this.handleChange} value={status} />
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Sku' placeholder='Sku' />
                                <Form.Input fluid name='title' label='Τιτλος' onChange={this.handleChange}  value={title} placeholder='Τιτλος' />
                                <Form.Select
                                    fluid
                                    label='Gender'
                                    options={optionsVendors}
                                    placeholder='Choose'
                                    name='vendor'
                                />

                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Sku' placeholder='Sku' />
                                <Form.Input fluid name='title' label='Τιτλος' onChange={this.handleChange}  value={title} placeholder='Τιτλος' />
                                <Form.Select
                                    fluid
                                    name='brand'
                                    label='Brand'

                                    options={optionsBrands}
                                    placeholder='Choose'
                                />

                            </Form.Group>
                            </Form>
                            <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
                            
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
            


        )
    }
}

zz CreateProductView;