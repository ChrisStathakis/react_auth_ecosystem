import React from 'react';
import {Segment, Header, Form, Button} from 'semantic-ui-react';
import axiosInstance from "../../components/helpers";
import {PRODUCT_CLASS_LIST_ENDPOINT} from "../../components/endpoints";


class ProductClassEditView extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateProduct = this.handleCreateProduct.bind(this);
        this.state = {
            title: '',
            is_service: false,
            have_warehouse: false
        }

    }

    componentDidMount(){
        const {id} = this.props;
        const endpoint = PRODUCT_CLASS_LIST_ENDPOINT + id + '/';
        axiosInstance.get(endpoint)
            .then(respData=> {
                const new_data = respData.data;
                this.setState({
                    title: new_data.title,
                    is_service: new_data.is_service,
                    have_warehouse: new_data.have_warehouse
                })
            })
    }


    handleCheckPoint = (e, data)=>{
        const name = data.name;
        const value = data.value;
        this.setState({
            [name]: value
        })
    };

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    };

    handleCreateProduct(evt){
        evt.preventDefault();
        const data = this.state;
        console.log(data);

    }


    render(){
        const {title, is_service, have_warehouse } = this.state;
        return (
            <Segment>
                <Header content='Edit Product'/>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input onChange={this.handleChange} name='title' value={title} />
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

        )
    }
}

export default ProductClassEditView;