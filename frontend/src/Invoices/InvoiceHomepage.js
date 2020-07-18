import React from 'react';
import {connect} from 'react-redux';


class InvoiceHomepage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newInvoiceView: true,
            editInvoiceView: false
        }

    }



    componentDidMount(){
        this.props.getVendors()
    }



}



const mapStateToProps = state => ({
    vendors: state.productReducer.vendors
})