import React from 'react'
import {
  Container,
  Dropdown,
  Image,
  Menu,

} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';


class Navbar extends React.Component{
  constructor(props){
    super(props);
  }


  render(){
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    return(
        <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as='a' header>
                <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
                Project Name
              </Menu.Item>
              <Link to='/'><Menu.Item as='a'>Αρχικη Σελιδα</Menu.Item></Link>
                <Link to='/products/'><Menu.Item as='a'>Προϊοντα</Menu.Item></Link>
                <Dropdown item simple text='Dropdown'>
                    <Dropdown.Menu>
                        <Dropdown.Item ><Link style={{'color':'black'}} to='/product-class/' >Product Class</Link></Dropdown.Item>
                        <Dropdown.Item ><Link style={{'color':'black'}} to='/vendors/' >Vendors</Link></Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                    <i className='dropdown icon' />
                    <span className='text'>Submenu</span>
                    <Dropdown.Menu>
                      <Dropdown.Item>List Item</Dropdown.Item>
                      <Dropdown.Item>List Item</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown.Item>
                  <Dropdown.Item>List Item</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
                {isAuthenticated === 'true' ?  <Link to='/logout/'><Menu.Item as='a'>Logout</Menu.Item></Link>: <Link to='/login/'><Menu.Item as='a'>Login</Menu.Item></Link>}
            </Container>
          </Menu>
    )
  }
}



const mapStateToProps = state =>({
    isAuthenticated: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps, {})(Navbar);

