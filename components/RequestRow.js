import React from "react";
import { Button, Icon, Table } from 'semantic-ui-react';

import web3 from "../ethereum/web3"

function RequestRow(props) {
    const { id, request, address } = props;
    const { Row, Cell } = Table;
    return (
        <Row>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}</Cell>
            <Cell>{request.complete ? "complete" : "pending"}</Cell>
            <Cell>Hello</Cell>
            <Cell>Hello</Cell>
        </Row>
    )
}

export default RequestRow