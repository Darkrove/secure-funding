import React from "react";
import { Button, Icon, Table } from "semantic-ui-react";

import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";

function RequestRow(props) {
  const onApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const onFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };
  const { id, request, address, approversCount } = props;
  const { Row, Cell } = Table;
  const readyToBeFianalize = request.approvalCount > approversCount/2;
  return (
    <Row disabled={request.complete} positive={readyToBeFianalize && !request.complete}>
      <Cell>{id + 1}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, "ether")}</Cell>
      <Cell>{request.recipient}</Cell>
      <Cell>
        {request.approvalCount}/{approversCount}
      </Cell>
      <Cell>{request.complete ? "complete" : "pending"}</Cell>
      <Cell>
        <Button
          color="green"
          disabled={request.complete}
          basic
          onClick={onApprove}
        >
          Approve
        </Button>
      </Cell>
      <Cell>
        <Button
          color="teal"
          disabled={request.complete}
          basic
          onClick={onFinalize}
        >
          Finalize
        </Button>
      </Cell>
    </Row>
  );
}

export default RequestRow;
