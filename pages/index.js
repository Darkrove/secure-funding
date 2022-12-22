import React, { useEffect, useState } from "react";
import { Card, Button, Icon, Grid, Image } from "semantic-ui-react";

import factory from "../ethereum/factory";
import Campaign from "../ethereum/campaign";
import { Link } from "../routes";
import Layout from "../components/Layout";
import images from "../public/assets/avatar";

const CampaignIndex = ({ campaigns, approversCounts }) => {
  const renderCampaigns = () => {
    let items = campaigns.map((address) => {
      return {
        address: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View</a>
          </Link>
        ),
        fluid: true,
        img: images[Math.floor(Math.random() * images.length)],
      };
    });
    items = items.map((item, index) => {
      return (
        <Card.Group key={index}>
          <Card fluid>
            <Card.Content>
              <Image avatar floated="right" src={item.img.src} />
              <Card.Header>Campaign Name</Card.Header>
              <Card.Meta>Address {item.address}</Card.Meta>
              <Card.Description>
                Campaign <strong>Description</strong>.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Grid>
                <Grid.Column width={13}>
                  <Icon name="user" />{approversCounts[index]} People
                </Grid.Column>
                <Grid.Column textAlign="right" width={3}>
                  {item.description}
                </Grid.Column>
              </Grid>
            </Card.Content>
          </Card>
        </Card.Group>
      );
    });

    return items.map((item) => item);
  };
  return (
    <Layout>
      <h3>Open Campaigns</h3>
      <Grid>
        <Grid.Column width={13}>{renderCampaigns()}</Grid.Column>
        <Grid.Column width={3}>
          <Link route="/campaigns/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>
        </Grid.Column>
      </Grid>
    </Layout>
  );
};

CampaignIndex.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  
  const approversCounts = await Promise.all(
    campaigns.map(async (address) => {
      const campaign = Campaign(address);
      const approversCount = await campaign.methods.approversCount().call();
      return approversCount;
    })
  );
  return { campaigns, approversCounts };
};

export default CampaignIndex;
