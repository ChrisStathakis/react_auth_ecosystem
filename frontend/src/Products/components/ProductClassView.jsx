import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Grid, Segment, Header, Button} from 'semantic-ui-react';
import { getProductClass } from '../../actions/productActions';
import Navbar from '../../components/Navbar';


class ProductClassView extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            newProductView: true,
            editView: false
        }
    }


    componentDidMount(){
        const  isAuthenticated = localStorage.getItem('isAuthenticated')
        this.props.getProductClass()
    }

    render(){
        const {productClass} = this.props;

        return (
            <div>
                <Navbar />
                <Grid divided textAlign='center' >
                    <Grid.Row>
                        <Grid.Column width={16}>
                            {listView ?
                                <Segment>
                                    <Header content='Product Class' />
                                    
                                </Segment>
                            : null}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    productClass: state.productReducer.productClass
})


export default connect(mapStateToProps, getProductClass)(ProductClassView);