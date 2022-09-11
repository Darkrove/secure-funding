import React, {useState} from "react";
import { Button, Input, Form, Message, Icon } from "semantic-ui-react";

import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";

const NewRequest = (props) => {
    const { address } = props;

    const [description, setDescription] = useState("");
    const [value, setValue] = useState("");
    const [recipient, setRecipient] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(address);
            await campaign.methods.createRequest(
                description , 
                web3.utils.toWei(value, 'ether'), 
                recipient)
                .send({
                from: accounts[0]
            });
            Router.pushRoute(`/campaigns/${address}/requests`);
        } catch (err) {
            setError(err.message);
        }
        setDescription("");
        setValue("");
        setRecipient("");
        setLoading(false);
    };
    return (
        <Layout>
            <Link route={`/campaigns/${address}/requests`}>
                <a>
                    <Icon name="arrow left"/> Back
                </a>
            </Link>
            <h3>Create New Request</h3>
            <Form onSubmit={onSubmit} error={!!error}>
                <Form.Field>
                    <label>Description</label>
                    <Input 
                        placeholder="Lorem ipsum, or lipsum as it is sometimes known."
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Value in Ether</label>
                    <Input 
                        label="ether" 
                        placeholder="00.00"
                        labelPosition="right"
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input 
                        label="address" 
                        placeholder="0x4951b970dd5A7DdD5E8a0a811Ef145B41Bce5de9"
                        labelPosition="right"
                        value={recipient}
                        onChange={event => setRecipient(event.target.value)}
                    />
                </Form.Field>
                <Message style={{ overflowWrap: "break-word" }} error header="OOPS" content={error}/>
                <Button loading={loading} primary type="submit">Create</Button>
            </Form>
        </Layout>
    )
}

NewRequest.getInitialProps = async (props) => {
    const address = props.query.address;
    return { address:address }
}

export default NewRequest;