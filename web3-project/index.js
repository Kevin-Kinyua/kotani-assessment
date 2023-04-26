require('dotenv').config();
const Web3 = require('web3');

const infuraProjectId = process.env.INFURA_PROJECT_ID;
const infuraProjectSecret = process.env.INFURA_PROJECT_SECRET;

const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraProjectId}`);

web3.eth.getBlockNumber((err, blockNumber) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Current block number: ${blockNumber}`);
  }
});

