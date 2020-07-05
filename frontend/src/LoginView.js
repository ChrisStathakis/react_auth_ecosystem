import React from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

import {connect} from 'react-redux';
import {loginAction} from './actions/authActions';


class LoginView extends React.Component{

    constructor(props) {
        super(props);
        this.handleText = this.handleText.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state={
            username:'',
            password: '',

        }
    }


    handleText(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    async handleSubmit(evt){
        evt.preventDefault();
        this.props.loginAction(this.state)
    }

    componentDidMount(){
        const isAuthenticated = this.props.isAuthenticated;
        console.log(isAuthenticated);
        console.log('test auth', isAuthenticated);
        if(isAuthenticated === 'true'){
            console.log('here!');
            this.props.history.push('/')
        }
    }

    render(){
        return(
             <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                 <Grid.Column style={{ maxWidth: 450 }}>
                     <Header as='h2' color='teal' textAlign='center'>Log-in to your account</Header>
                     <Form size='large'>
                         <Segment stacked>
                             <Form.Input fluid icon='user' name='username' onChange={this.handleText} iconPosition='left' placeholder='E-mail address' />
                             <Form.Input
                                 fluid
                                 icon='lock'
                                 iconPosition='left'
                                 placeholder='Password'
                                 type='password'
                                 onChange={this.handleText}
                                 name={'password'}
                             />
                             <Button color='teal' fluid size='large' onClick={this.handleSubmit}>
                                 Login
                             </Button>
                         </Segment>
                     </Form>
                     <Message>
                         New to us? <a href='#'>Sign Up</a>
                     </Message>
                 </Grid.Column>
             </Grid>
        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,

});



export default connect(mapStateToProps, {loginAction})(LoginView);