import React from "react";
import { Button, Icon, Table } from 'semantic-ui-react';

import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = (props) => {
    const { address, requests } = props;
    const { Header, Row, HeaderCell, Body } = Table;
    const renderRows = () => {
        return requests.map((request, index) => {
            return (<RequestRow
                key={index}
                id={index + 1}
                request={request}
                address={address}
            />
            )
        })
    }
    return (
        <Layout>
            <Link route={`/campaigns/${address}`}>
                <a>
                    <Icon name="arrow left" /> Back
                </a>
            </Link>
            <h3>Request Details</h3>
            <Link route={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary >Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>Id</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Staus</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
        </Layout>
    )
}

RequestIndex.getInitialProps = async (props) => {
    const address = props.query.address;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();

    const requests = await Promise.all(
        Array(requestCount)
            .fill()
            .map((element, index) => {
                return campaign.methods.requests(index).call();
            }
        )
    );

    console.log(requests)
    return {
        address,
        requests
    }
}

export default RequestIndex;