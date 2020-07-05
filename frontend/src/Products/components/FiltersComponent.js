import React from 'react';
import  {connect} from 'react-redux';
import {Form, Modal, Button, Checkbox, Header, Grid } from 'semantic-ui-react';
import {getBrands, getVendors, getProducts} from '../../actions/productActions';
import {PRODUCTS_ENDPOINT} from "../../components/endpoints";
import axiosInstance from "../../components/helpers";


class FilterComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            selected_vendors: [],
            selected_brands: []
        };


    }

    handleVendor(value){
        let data = this.state.selected_vendors;
        const checkArray  = data.indexOf(value);
        if (checkArray !== -1){ data = data.filter((item)=>item !== value) } else {data = data.concat(value);}
        this.setState({selected_vendors:data})
    };


    handleBrands(value){
        let data = this.state.brands;
        const checkArray = data.indexOf(value);
        if (checkArray !== -1){data = data.filter((item)=> item !== value)} else {data = data.concat(value)}
        this.setState({brands: data})

    }

    componentDidMount(){
        this.props.getBrands();
        this.props.getVendors();
    }

    handleSubmit = () => {
        const endpoint = PRODUCTS_ENDPOINT + '?vendor=' + this.state.selected_vendors + '&brand=' + this.state.selected_brands;
        this.props.getProducts(endpoint);
    };

    render(){
        let {vendors, brands } = this.props;
        return (
            <div>
                <Modal trigger={<Button>Filters</Button>}>
                    <Modal.Header>Show Filters</Modal.Header>
                     <Modal.Content>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                 <Header content='Vendors' />
                                {vendors ? vendors.map((vendor, index)=>{
                                    return (<Form.Field  onClick={()=> this.handleVendor(vendor.id)}  control={Checkbox} label={{ children: vendor.title}} />)
                                }): null
                                }
                            </Grid.Column>
                            <Grid.Column>
                              <Header content='Brands' />
                                {brands ? brands.map((brand, index)=>{
                                    return (<Form.Field onClick={()=> this.handleBrands(brand.id)}  control={Checkbox} label={{ children: brand.name}} />)
                                }): null
                                }
                            </Grid.Column>
                        </Grid.Row>
                        <Button onClick={this.handleSubmit} icon='save' color='blue'/>
                    </Grid>


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

export default connect(mapStateToProps, {getBrands, getVendors, getProducts})(FilterComponent);