import web3 from "./web3";
import CampaignFactory from "./build/CampaignFacotry.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x7eE2dAc787773f01A17BCd504f329A9f579c32EF"
);

export default instance;