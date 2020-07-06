import React from 'react';
import {connect} from 'react-redux';
import { VENDORS_LIST_ENDPOINT } from '../../components/endpoints';
import axiosInstance from '../../components/helpers';
import { Segment, Header, Form } from 'semantic-ui-react';


class VendorEditView extends React.Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            title:'',
            active: '',
        }
    }

    handleCheckBox = (e, data )=> {
        const name = data.name;
        const value = data.value;
        this.setState({
            [name]: value
        })
    }

    handleChange(evt){
        const name = evt.target.name;
        const value = evt.target.value;

        this.setState)({
            [name]: value
        })
    };

    handleSubmit(event){
        event.preventDefault();
        const {id} = this.props;
        const endpoint = VENDORS_LIST_ENDPOINT + id + '/';
        const data = this.state;
        axiosInstance.post(endpoint, data)
            .then(respData=>{
                console.log()
                this.props.getVendors()
            })
    };

    getVendor(id){
        const endpoint = VENDORS_LIST_ENDPOINT + id + '/';
        axiosInstance.get(endpoint).then(
            respData=>{
                const vendor = respData.data
                this.setState({
                    title: vendor.title,
                    active: vendor.active
                })
            }
        )
    }

    componentDidMount(){
        const {id} = this.props;

    }

    render(){
        const {title, active} = this.props;

        return (
            <Segment>
                <Header>Edit {title}</Header>
                <Form>
                    <Form.Field>
                        <label>title</label>
                        <input
                            onChange={this.handleChange}
                            name='title'
                            value={title}
                        />
                    </Form.Field>
                    <Form.Checkbox
                        label='Active'
                        name='active'
                        onChange={this.handleChange}
                        value={active}
                    />
                </Form>
            </Segment>
        )
    }
}


const mapStateToProps = state => ({

})

export default connect(mapStateToProps, {getVendors})(VendorEditView)