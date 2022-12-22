import React from "react";
import { Button, Icon, Table } from "semantic-ui-react";

import Layout from "../../../components/Layout";
import { Link } from "../../../routes";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

const RequestIndex = (props) => {
  const { address, requests, requestCount, approversCount } = props;
  const { Header, Row, HeaderCell, Body } = Table;
  const renderRows = () => {
    return requests.map((request, index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };
  return (
    <Layout>
      <Link route={`/campaigns/${address}`}>
        <a>
          <Icon name="arrow left" /> Back
        </a>
      </Link>
      <h3>Request Details - Request({requestCount})</h3>
      <Link route={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
        </a>
      </Link>
      <div className="ui clearing divider"></div>
      {requestCount > 0 ? (
        <Table>
          <Header>
            <Row>
              <HeaderCell>Id</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>{renderRows()}</Body>
        </Table>
      ) : <h2>No Request Yet!!</h2>}
    </Layout>
  );
};

RequestIndex.getInitialProps = async (props) => {
  const address = props.query.address;
  const campaign = Campaign(address);
  const requestCount = await campaign.methods.getRequestsCount().call();

  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((element, index) => {
        return campaign.methods.requests(index).call();
      })
  );

  return {
    address,
    requests,
    requestCount,
    approversCount,
  };
};

export default RequestIndex;
