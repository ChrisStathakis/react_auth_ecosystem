import React from 'react';
import {connect} from 'react-redux';
import {logoutAction} from './actions/authActions';
import Navbar from './components/Navbar';

class LogoutView extends React.Component{
    constructor(props){
        super(props);
    }


    handleLogout = () => {
        this.props.logoutAction({})
    };

    render(){

        return(
            <div>
                <Navbar />
                <h4>hello</h4>
                <button onClick={this.handleLogout}>Logout</button>
                <p>{this.props.isAuthenticated}</p>
            </div>

        )
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated,

});




export default connect(mapStateToProps,{ logoutAction })(LogoutView)