import React from 'react';
import {Form, Modal, Header, Button, Icon} from 'semantic-ui-react';
import axiosInstance from "../../components/helpers";
import { BRAND_CREATE_ENDPOINT} from "../../components/endpoints";

class CreateBrandComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            active:true,
            name:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    cleanForm(){this.setState({name: '', active: ''})}

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault();
        const data = this.state;
        axiosInstance.post(BRAND_CREATE_ENDPOINT, data)
            .then(respData=>{this.props.getBrands(); this.cleanForm(); this.props.closeWindow()})
    }


    handleClick(evt){
        evt.preventDefault();
        axiosInstance.post(BRAND_CREATE_ENDPOINT, this.state)
            .then(
                respData=>{
                    console.log('success',respData)
                }
            )

    }

    render(){
        const {name, status} = this.state;

        return(
            <Modal trigger={<Button className='ui primary button float-left'>Create Brand</Button>} centered={false}>
                <Modal.Header>Add a Brand</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Brand</Header>
                        <Form.Checkbox label='Status' onChange={this.handleChange} name='status' value={status} />
                        <Form.Input onChange={this.handleChange}  fluid name='name' value={name} label='title' />
                        <hr />
                        <Button onClick={this.handleClick} icon='save' color='blue' />
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }
}


export default CreateBrandComponent;