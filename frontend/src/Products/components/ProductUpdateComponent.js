import React from 'react';
import {Grid, Segment, Form} from 'semantic-ui-react'
import axiosInstance from "../../components/helpers";
import {BASE_URL, UPDATE_DESTROY_PRODUCT_ENDPOINT} from "../../components/endpoints";



class ProductUpdateComponent extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            active: false,
            title:'',
            sku:'',
            brand:'',
            vendor:'',
            qty:''
        }
    }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleDropdown = (e, data) =>{
        const name = data.name;
        const value = data.value;
        this.setState({
            [name]: value
        })
    }


    componentDidMount(){
        const id = this.props.id;
        const endpoint = UPDATE_DESTROY_PRODUCT_ENDPOINT  + id + '/';
        axiosInstance.get(endpoint)
            .then(
                respData=>{
                    console.log(respData.data);
                    const data = respData.data;
                    this.setState({
                        status: data.active,
                        sku: data.sku,
                        vendor: data.vendor,
                        brand: data.brand,
                        qty: data.qty,
                        barcode: data.barcode
                    })
                }
            )
    }


    render(){
        const {active, title, sku, brand, vendor, qty} = this.state;
        return (
            <Grid.Column>
                    <Segment>
                        <Form>
                            <Form.Checkbox label='Status' onChange={this.handleChange} name={active} value={active} />
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Sku' placeholder='Sku' name='sku' value={sku} onChange={this.handleChange} />
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
        )
    }

}


export default ProductUpdateComponent;