import web3 from "./web3";
import CampaignFactory from "./build/CampaignFacotry.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x1135Ec41B903412FB1Af6D10B6c9fA1f28909885"
);

export default instance;