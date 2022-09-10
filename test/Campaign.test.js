const mocha = require('mocha');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const assert = require('assert');

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFacotry.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async() => {
    accounts = await new web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(JSON.parse(compiledCampaign.interface), campaignAddress)
})

describe("Crowd funding contract", () => {
    it("Factory deployed?", () => {
        assert.ok(factory.options.address);
    });
    it("Campaign deployed?", () => {
        assert.ok(campaign.options.address);
    });
    it("Manager assigned?", async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager)
    });
    it("Approvers working?", async () => {
        await campaign.methods.contribute().send({
            value: "200",
            from: accounts[1],
        });
        const isContributor = await campaign.methods.approvers(accounts[1]);
        assert.ok(isContributor)
    });
    it("Minimum contribution required?", async () => {
        try {
            await campaign.methods.contribute().send({
                value:"5",
                from: accounts[1]
            });
            assert(false)
        } catch (error) {
            assert(error)
        }
    });
    it("Only manager is able to create request?", async () => {
        await campaign.methods.createRequest(
            "Buy batteries",
            "100",
            accounts[2]
        ).send({ from: accounts[0], gas: "1000000" });
        const request = await campaign.methods.requests(0).call();
        assert.equal("Buy batteries", request.description);
        assert.equal("100", request[1])
    });
    it("Manager able to finalize request?", async () => {
        await campaign.methods.contribute().send({
            from: accounts[1],
            value: web3.utils.toWei("10", "ether")
        });
        await campaign.methods.contribute().send({
            from: accounts[2],
            value: web3.utils.toWei("10", "ether")
        });
        await campaign.methods.createRequest(
            "Buy batteries",
            web3.utils.toWei("15", "ether"),
            accounts[3]
        ).send({ from: accounts[0], gas: "1000000" });
        await campaign.methods.approveRequest(0).send({
            from: accounts[1],
            gas: "1000000"
        });
        await campaign.methods.approveRequest(0).send({
            from: accounts[2],
            gas: "1000000"
        });
        await campaign.methods.finalizeRequest(0).send({ 
            from: accounts[0],
            gas: "1000000"
        });
        let balance = await web3.eth.getBalance(accounts[3]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);
        assert(balance > 114)
    })
});