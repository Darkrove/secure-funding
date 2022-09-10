import web3 from "./web3";
import CampaignFactory from "./build/CampaignFacotry.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0x674cE7E0121384466E70Dd2266299220F5dE4D05"
);

export default instance;