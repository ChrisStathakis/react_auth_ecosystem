import React from 'react';
import {connect} from 'react-redux';

import {Grid, Table, Button, Header, Segment} from 'semantic-ui-react'

import CreateInvoiceView from './components/CreateInvoiceView'
import Navbar from "../components/Navbar";
import {getInvoices} from "../actions/invoiceActions";


class InvoiceHomepage extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            newInvoiceView: true,
            editInvoiceView: false
        }

    }

    componentDidMount(){
        this.props.getInvoices()
    }

    render(){
        const {invoices } = this.props;

        return(
            <div>
                <Navbar />
                <Header content='Invoices' />
                <CreateInvoiceView />
                <Segment>
                    <Table celled padded>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell singleLine>Date</Table.HeaderCell>
                                <Table.HeaderCell>Title</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Vendor</Table.HeaderCell>
                                <Table.HeaderCell>Clean Value</Table.HeaderCell>
                                <Table.HeaderCell>Taxes</Table.HeaderCell>
                                <Table.HeaderCell>Value</Table.HeaderCell>
                                <Table.HeaderCell>-</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {invoices.map((invoice, index)=>{
                                return (
                                    <Table.Row>
                                        <Table.Cell>{invoice.date}</Table.Cell>
                                        <Table.Cell>{invoice.title}</Table.Cell>
                                        <Table.Cell>{invoice.type}</Table.Cell>
                                        <Table.Cell>{invoice.tag_vendor}</Table.Cell>
                                        <Table.Cell>{invoice.tag_clean_value}</Table.Cell>
                                        <Table.Cell>{invoice.tag_taxes}</Table.Cell>
                                        <Table.Cell>{invoice.tag_value}</Table.Cell>
                                        <Table.Cell><Button color='blue' icon='edit' content='edit' /> </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Segment>
            </div>
        )

    }



}



const mapStateToProps = state => ({
    vendors: state.productReducer.vendors,
    invoices: state.invoiceReducer.invoices
});


export default connect(mapStateToProps, {getInvoices})(InvoiceHomepage);