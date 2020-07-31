import React, {Component} from 'react';
import {Grid, Segment, Header, Loader, Card, Icon, List} from "semantic-ui-react";
import {connect} from "react-redux";
import {INVOICE_LIST_ENDPOINT, PAYMENT_METHOD_ENDPOINT, VENDORS_LIST_ENDPOINT} from "../components/endpoints";
import axiosInstance from "../components/helpers";
import {getInvoices, getPayments} from '../actions/invoiceActions';
import Navbar from "../components/Navbar";


class VendorCardView extends Component{
    constructor(props){
        super(props);

        this.state = {
            vendor: null,
            invoices: [],
            payment: []
        }
    }

    componentDidMount() {
        const {pk} = this.props.match.params;
        axiosInstance.get(VENDORS_LIST_ENDPOINT + `${pk}/`).then(
            respData=>{
                console.log('vendor', respData);
                this.setState({
                    vendor: respData.data
                })
            }
        );
        const invoiceEndpoint = INVOICE_LIST_ENDPOINT+'?vendor=' + pk;
        console.log(invoiceEndpoint);
        const paymentEndpoint = '';
        this.props.getInvoices(invoiceEndpoint);
    }

    render(){
        const {vendor} = this.state;
        const {invoices, payments} = this.props;
        console.log('invoice', invoices);
        if(vendor === null){
            return <Loader />
        }

        return (
            <div>
                <Navbar />
                <Grid columns={3} divided>
                    <Grid.Row>
                        <Grid.Column>
                            <Segment>
                                <Card>
                                    <Card.Content header={vendor.title} />
                                    <Card.Content description='dssdv fds fsdf f dsf' />
                                    <Card.Content description='dssdv fds fsdf f dsf' />
                                    <Card.Content description='dssdv fds fsdf f dsf' />
                                    <Card.Content description='dssdv fds fsdf f dsf' />
                                    <Card.Content description='dssdv fds fsdf f dsf' />

                                    <Card.Content extra>
                                        <Icon name='user' />4 Friends
                                    </Card.Content>
                                </Card>
                            </Segment>
                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header content='Invoices' />
                                <List divided relaxed>
                                    <List.Item>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                                            <List.Description as='a'>Updated 10 mins ago</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                                            <List.Description as='a'>Updated 22 mins ago</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                                            <List.Description as='a'>Updated 34 mins ago</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>

                        </Grid.Column>
                        <Grid.Column>
                            <Segment>
                                <Header content='Payments' />
                                <List divided relaxed>
                                    {invoices.map((invoice, index)=>{
                                        return (
                                            <List.Item>
                                                <List.Icon name='github' color='red' size='large' verticalAlign='middle' />
                                                <List.Content>
                                                    <List.Header as='a'>{invoice.date} - {invoice.title}</List.Header>
                                                    <List.Description as='a'>Updated 10 mins ago</List.Description>
                                                </List.Content>
                                            </List.Item>
                                        )
                                    })}

                                    <List.Item>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>Semantic-Org/Semantic-UI-Docs</List.Header>
                                            <List.Description as='a'>Updated 22 mins ago</List.Description>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='github' size='large' verticalAlign='middle' />
                                        <List.Content>
                                            <List.Header as='a'>Semantic-Org/Semantic-UI-Meteor</List.Header>
                                            <List.Description as='a'>Updated 34 mins ago</List.Description>
                                        </List.Content>
                                    </List.Item>
                                </List>
                            </Segment>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}


const mapStateToProps = state => ({
    payments: [],
    invoices: [],
});


export default connect(mapStateToProps, {getInvoices, getPayments})(VendorCardView);