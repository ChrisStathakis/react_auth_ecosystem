import React from 'react';
import Navbar from '../components/Navbar';
import { Grid, Segment, Form } from 'semantic-ui-react';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
  ]
  

class CreateProductView extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            value: 1,
            vendorOptions: [],
            brandOptions: [],

            title: '',
            sku:'',
            status: true
            
        }
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleSubmit = (evt) =>{
        evt.preventDefault();
        console.log(this.state)
    }




    render() {
        const vendorOptions = this.state
        const { value, status, title, sku } = this.state
        return(
            <div>
                <Navbar />
                <Grid columns={1} stackable>
                    <Grid.Column>
                        <Segment>
                        <Form>
                            <Form.Checkbox label='Status' onChange={this.handleChange} value={status} />
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='Sku' placeholder='Sku' />
                                <Form.Input fluid label='Τιτλος' placeholder='Τιτλος' />
                                <Form.Select
                                    fluid
                                    label='Προμηθευτης'
                                    options={vendorOptions}
                                    placeholder='Προμηθευτης'
                                />
                                </Form.Group>
                                <Form.Group inline>
                                <label>Size</label>
                                <Form.Radio
                                    label='Small'
                                    value='sm'
                                    checked={value === 'sm'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='Medium'
                                    value='md'
                                    checked={value === 'md'}
                                    onChange={this.handleChange}
                                />
                                <Form.Radio
                                    label='Large'
                                    value='lg'
                                    checked={value === 'lg'}
                                    onChange={this.handleChange}
                                />
                                </Form.Group>
                                
                                
                                <Form.Button onClick={this.handleSubmit}>Submit</Form.Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>

            </div>
        )
    }
}

export default CreateProductView;