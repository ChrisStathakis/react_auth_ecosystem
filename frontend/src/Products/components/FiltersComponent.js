import React from 'react';
import  {connect} from 'react-redux';
import {Form, Modal, Button, Checkbox, Header, Grid } from 'semantic-ui-react';
import {getBrands, getVendors} from '../../actions/productActions';


class FilterComponent extends React.Component {

    componentDidMount(){
        this.props.getBrands();
        this.props.getVendors();
    }


    render(){
        let {vendors, brands } = this.props;
        console.log('vendors', vendors)
        return (
            <div>
                <Modal trigger={<Button>Filters</Button>}>
                    <Modal.Header>Show Filters</Modal.Header>
                    <Modal.Content>
                        <Header content='Vendors' />
                        {vendors ? vendors.map((vendor, index)=>{
                            return (<Form.Field  control={Checkbox} label={{ children: vendor.title}} />)
                        }): null
                        }
                    <Modal.Description>
                       
                    </Modal.Description>
                    </Modal.Content>
                </Modal>
                
            </div>
        )
    }
}


const mapStateToProps = state =>({
    brands: state.productReducer.brands,
    vendors: state.productReducer.vendors
})

export default connect(mapStateToProps, {getBrands, getVendors})(FilterComponent);