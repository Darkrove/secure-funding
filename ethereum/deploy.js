const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFacotry.json');

const provider = new HDWalletProvider(
  "silly modify obtain syrup switch catalog bleak angry liberty salon reject arena",
  "https://rinkeby.infura.io/v3/33b26cd915e34572897371449db71b12"
);
const web3 = new Web3(provider);

const deployFactory = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Factory contract deployed to', result.options.address);
  provider.engine.stop();
};
deployFactory();