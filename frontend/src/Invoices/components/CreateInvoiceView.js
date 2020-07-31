import React, {Component} from 'react';
import {Modal, Button, Form, Header} from 'semantic-ui-react';
import {DateInput} from "semantic-ui-calendar-react";
import {connect} from 'react-redux'
import axiosInstance from "../../components/helpers";
import {INVOICE_LIST_ENDPOINT} from "../../components/endpoints";
import {getPaymentMethod} from '../../actions/invoiceActions';
import {getVendors} from "../../actions/productActions";


class CreateInvoiceView extends Component{
    constructor(props){
        super(props);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            title: '',
            date: '',
            vendor: '',
            payment_method: '',
            openModal: true
        }


    };


    handleChangeInput(evt){this.setState({[evt.target.name]: evt.target.value})}

    handleSubmit = (evt) => {
        evt.preventDefault();
        axiosInstance.post(INVOICE_LIST_ENDPOINT, this.state)
            .then(respData => {
                this.getInvoices();
                this.closeModal();
            })
    };

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    };
    
    handleDropdown = (e, data)=>{
        const name = data.name;
        const value = data.value;
        this.setState({
            [name]: value
        })
    };

    closeModal = ()=> {
        this.setState({
            openModal: false
        })
    };

    componentDidMount(){
        this.props.getPaymentMethod();
        this.props.getVendors();
    }

    render(){
        const {title, date, openModal} = this.state;
        const {vendors, payment_methods} = this.props;
        console.log('Wee!!', vendors);
        let vendorOptions = [];
        let paymentMethodOptions = [];
        if (payment_methods !== undefined){
            paymentMethodOptions = payment_methods.map((payment, index)=>{
                return ({key: payment.id, text: payment.title, value:payment.id})}
            );
        }

        if (vendors !== undefined){
            vendorOptions = vendors.map((vendor, index)=>{
                return ({key: vendor.id, text: vendor.title, value:vendor.id})
            })
        }

        return (
            <Modal open={openModal} onClose={this.closeModal} trigger={<Button color='green' content='Create Invoice' /> }>
                <Modal.Header>Add a invoice</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header content='Add a Invoice' />
                        <Form>
                            <DateInput
                                name="date"
                                placeholder="Date"
                                value={date}
                                iconPosition="left"
                                onChange={this.handleChange}
                            />
                            <Form.Input label='Title' name='title' value={title} onChange={this.handleChangeInput} />v

                            <Form.Select
                                fluid
                                label='Vendor'
                                options={vendorOptions}
                                placeholder='Select'
                                name='vendor'
                                onClick={this.handleDropdown}
                            />
                            <Form.Select
                                fluid
                                label='Payment Method'
                                options={paymentMethodOptions}
                                placegolder='Choose'
                                onClick={this.handleDropdown}
                            />
                            <Button icon='save' content='Save' color='blue' onClick={this.handleSubmit}/>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
            </Modal>

        )
    }

}


const mapStateToProps = state => ({
    vendors: state.productReducer.vendors,
    payment_methods: state.generalReducer.payment_methods
});

export default connect(mapStateToProps, {getVendors, getPaymentMethod})(CreateInvoiceView)