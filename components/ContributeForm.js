import React, { useState } from "react";
import { Button, Input, Form, Message } from "semantic-ui-react";

import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

function ContributeForm({ address }) {
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
            const campaign = Campaign(address);
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, "ether")
            })
            Router.replaceRoute(`/campaigns/${address}`);
        } catch (err) {
            setError(err.message);
        }
        setValue("");
        setLoading(false);
    };
    return (
        <Form onSubmit={onSubmit} error={!!error}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input
                    label="ether"
                    placeholder="00.00"
                    labelPosition="right"
                    value={value}
                    onChange={handleChange}
                />
            </Form.Field>
            <Message style={{ overflowWrap: "break-word" }} error header="OOPS" content={error} />
            <Button loading={loading} primary type="submit">
                Contribute!
            </Button>
        </Form>
    )
}

export default ContributeForm