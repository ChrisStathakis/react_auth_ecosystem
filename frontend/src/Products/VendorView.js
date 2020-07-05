import React from 'react';
import {connect} from 'react-redux';
import {getVendors} from  '../actions/productActions'


class VendorView extends React.Component{

    constructor(props){
        super(props);
    }


    componentDidMount(){
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        this.props.getVendors()
    }

    render(){
        const {vendors} = this.props;
    }
};



const mapStateToProps = state => ({
    vendors: state.
})