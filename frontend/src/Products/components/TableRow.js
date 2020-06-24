import React from 'react';
import { Table, Button } from 'semantic-ui-react';



class TableRow extends React.Component {



    render(){
        const {product} = this.props;

        return(
            <Table.Row>
                <Table.Cell singleLine>{product.id} / {product.sku}</Table.Cell>
                    <Table.Cell singleLine>{product.title}</Table.Cell>
                    <Table.Cell singleLine>{product.vendor__title}</Table.Cell>
                    <Table.Cell singleLine>{product.brand__title}</Table.Cell>
                    <Table.Cell singleLine>{product.qty}</Table.Cell>
                    <Table.Cell singleLine>{product.final_value}</Table.Cell>
                    <Table.Cell singleLine>{product.active}</Table.Cell>
                    <Table.Cell singleLine><Button color='blue' title='test' /></Table.Cell>
            </Table.Row>
                
        )
    }
}

export default TableRow