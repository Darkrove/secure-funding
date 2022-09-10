import React, {useState} from "react";
import { Button, Input, Form, Message } from "semantic-ui-react";

import { Router } from "../../routes";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

const NewCampaign = () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(value).send({
                from: accounts[0]
            });
            Router.pushRoute("/");
        } catch (err) {
            setError(err.message);
        }
        setValue("");
        setLoading(false);
    };
    return (
        <Layout>
            <h3>Create New Campaign</h3>
            <Form onSubmit={onSubmit} error={!!error}>
                <Form.Field>
                    <label>Minimum Contributuion</label>
                    <Input 
                        label="wei" 
                        placeholder="00.00"
                        labelPosition="right"
                        value={value}
                        onChange={handleChange}
                    />
                </Form.Field>
                <Message error header="OOPS" content={error}/>
                <Button loading={loading} primary type="submit">Create</Button>
            </Form>
        </Layout>
    )
}

export default NewCampaign;