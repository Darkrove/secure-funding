import React from "react";
import { Card, Grid } from 'semantic-ui-react';

import Layout from "../../components/Layout";
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";

const ShowCampaign = (props) => {
    const {
        address,
        minimumContribution,
        balance,
        requestsCount,
        approversCount,
        manager
    } = props;

    const renderCards = () => {
        const items = [
            {
                header: manager,
                meta: "Address of manager",
                description: "The manager created this campaign and can create request to withdraw money.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minium Contribution (wei)",
                description: "You must contribute at least this much money wei to become an member or approver.",
            },
            {
                header: requestsCount,
                meta: "Number of requests",
                description: "A request tries to withdraw money from the contract. Request must be approver by approvers or members.",
            },
            {
                header: approversCount,
                meta: "Number of approvers",
                description: "Number of people who have alredy donated to this campaign.",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign balance (ether)",
                description: "The balance is how much money this campaign has left to spend.",
            }
        ];

        return (
            <Card.Group items={items} />
        )
    };
    return (
        <Layout>
            <h3>Campaign Details</h3>
            <Grid>
                <Grid.Column width={10}>
                    {renderCards()}
                </Grid.Column>
                <Grid.Column width={6}>
                    <ContributeForm address={address} />
                </Grid.Column>
            </Grid>
        </Layout>
    )
}

ShowCampaign.getInitialProps = async (props) => {
    const address = props.query.address;
    const campaign = Campaign(address);
    const summary = await campaign.methods.getSummary().call();
    return {
        address: address,
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4]
    };
}

export default ShowCampaign;