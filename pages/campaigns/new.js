import React, {useState} from "react";
import Layout from "../../components/Layout";
import { Button, Input, Form } from "semantic-ui-react";

const NewCampaign = () => {
    const [value, setValue] = useState();
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(value)
    };
    return (
        <Layout>
            <h3>New campaign </h3>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <label>Minimum Contributuion</label>
                    <Input 
                        label="wei" 
                        placeholder='00.00' 
                        labelPosition="right"
                        onChange={handleChange}
                    />
                </Form.Field>
                <Button type='submit'>Create</Button>
            </Form>
        </Layout>
    )
}

export default NewCampaign;