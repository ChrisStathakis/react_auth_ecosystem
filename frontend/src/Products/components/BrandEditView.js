import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Segment, Form, Modal, Header, Button} from 'semantic-ui-react';

import axiosInstance from "../../components/helpers";
import {BRANDS_LIST_ENDPOINT} from "../../components/endpoints";
import {getBrands} from "../../actions/productActions";


class BrandEditView extends Component{
    constructor(props){
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            name: '',
            active: false,
            editView: true
        }
    }

    handleInputChange(evt){
        const name = evt.target.name;
        const value = evt.target.value;
        this.setState({
            [name]: value
        })
    }


    handleCheckBox = (e, data) => {this.setState({[data.name]: [data.value]})};

    handleClose(){console.log('click');this.setState({edit_view: false});this.props.closeWindow()}

    handleSubmit(evt){
        evt.preventDefault();
        const data = this.state;
        const endpoint = BRANDS_LIST_ENDPOINT + `${this.props.id}/`;
        axiosInstance.put(endpoint, data)
            .then(respData=>{
                console.log(respData);
                this.props.getBrands();
                this.props.closeWindow();
            })
    }

    fetchBrand(){
        const id = this.props.id;
        const endpoint = BRANDS_LIST_ENDPOINT + `${id}/`;
        axiosInstance.get(endpoint)
            .then(respData=>{
                const data = respData.data;
                this.setState({
                    name: data.name,
                    active: data.active
                })
            })
    }

    handleDelete(){
        const {id} = this.props;
        const endpoint = BRANDS_LIST_ENDPOINT + `${id}/`;
        axiosInstance.delete(endpoint)
            .then(resp=>{
                const status = resp.status;
                console.log(status, resp);
                if(status === 202){
                    alert('You cannot delete this object')
                }
                this.props.getBrands(); this.handleClose()})
    }


    componentDidMount(){
        this.fetchBrand();
        this.setState({
            editView: true
        })
    }

    render(){
        const {name, active, editView} = this.state;
        return (
            <Modal
                open={editView}
                onclose={this.handleClose}
                basic
                >
                <Header content='Edit Brand' />
                <Segment>
                    <Form>
                        <Form.Checkbox
                            label='Status'
                            name='active'
                            value={active}
                            onChange={this.handleCheckBox}
                            />
                        <Form.Input onClick={this.handleInputChange} name='name' value={name} label='name' />
                    </Form>
                    <Button icon='save' content='Save' color='blue' onClick={this.handleSubmit} />
                    <Button icon='delete' content='Delete' color='red'  onClick={this.handleDelete} />
                    <Button icon='close' content='close' color='yellow' onClick={this.handleClose} />
                </Segment>
            </Modal>
        )
    }
}


BrandEditView.propTypes = {
    id: PropTypes.string.isRequired,
    getBrands: PropTypes.func.isRequired,
    closeWindow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {getBrands})(BrandEditView);