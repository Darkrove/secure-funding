import React, { useEffect, useState } from "react";
import { Card, Button, Icon, Grid, Image } from 'semantic-ui-react';

import factory from "../ethereum/factory";
import { Link } from "../routes";
import Layout from "../components/Layout"
import img1 from "../public/assets/1.png";
import img2 from "../public/assets/2.png";
import img3 from "../public/assets/3.png";
import img4 from "../public/assets/4.png";
import img5 from "../public/assets/5.png";

const CampaignIndex = ({ campaigns }) => {
    const images = [img1,img2,img3,img4,img5];
    
    const renderCampaigns = () => {
        let items = campaigns.map(address => {
            return {
                header: address,
                description: (
                    <Link route={`/campaigns/${address}`}>
                        <a>View</a>
                    </Link>
                ),
                fluid: true,
                img: images[Math.floor(Math.random() * images.length)]
            }
        });
        items = items.map(item => {
            return (
                <Card.Group>
                    <Card fluid>
                        <Card.Content>
                            <Image
                                avatar
                                floated='right'
                                src={item.img.src}
                            />
                            <Card.Header>Campaign Name</Card.Header>
                            <Card.Meta>Address {item.header}</Card.Meta>
                            <Card.Description>
                                Campaign <strong>Description</strong>.
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Grid>
                                <Grid.Column width={13}>
                                    <Icon name='user' />4 People
                                </Grid.Column>
                                <Grid.Column textAlign="right" width={3}>
                                    {item.description}
                                </Grid.Column>
                            </Grid>
                        </Card.Content>
                    </Card>
                </Card.Group >
            )
        });

        return (items.map(item => item))
    }
    return (
        <Layout>

            <h3>Open Campaigns</h3>
            <Grid>
                <Grid.Column width={13}>
                    {renderCampaigns()}
                </Grid.Column>
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
        </Layout >
    )
};

CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns }
}

export default CampaignIndex;